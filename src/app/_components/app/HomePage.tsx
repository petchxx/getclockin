"use client";
import { Time } from "@internationalized/date";

import Clock from "react-live-clock";

import { signOut } from "next-auth/react";
import {
  Avatar,
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Textarea,
  TimeInput,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Employee } from "~/lib/interface/employee";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Icon } from "@iconify/react";
import { Input } from "postcss";
import { toast } from "react-toastify";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type Props = {
  employee: Employee;
};

export default function HomePage({ employee }: Props) {
  const [showClock, setShowClock] = useState(false);
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  useEffect(() => {
    setShowClock(true);
  }, []);
  const clock = api.employee.clock.useMutation({
    async onSuccess(data) {
      toast.success(`${data == "in" ? "เข้า" : "ออก"}งานสำเร็จ`);
      router.refresh();
    },
    async onError(error) {
      toast.error(error.message);
      router.refresh();
    },
  });

  async function onOpenModal() {
    const location = window.navigator?.geolocation;
    if (location) {
      location.getCurrentPosition(
        (position) => {
          // onClose();
          // toast.success(
          //   position.coords.latitude + " " + position.coords.longitude,
          // );

          setLocation(
            `https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`,
          );
          onOpen();
        },
        (error) => {
          toast.error("กรุณาเปิดตำแหน่ง");
        },
      );
    }
  }

  async function handleClock(onClose: () => void) {
    const status = employee.status == "in" ? "out" : "in";
    clock.mutate({
      status: status,
      note: note,
      location: location,
    });

    onClose();
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <main className="">
      <div className="mt-2 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-2">
          <div>
            <Skeleton isLoaded={showClock} className="rounded-2xl">
              <Clock
                format={"dddd, DD MMMM"}
                ticking={true}
                timezone={"Asia/Bangkok"}
                locale={"TH"}
              />
            </Skeleton>
          </div>
          <div>
            <Skeleton isLoaded={showClock} className="rounded-2xl">
              <Clock
                format={"HH:mm"}
                ticking={true}
                timezone={"Asia/Bangkok"}
                locale={"TH"}
                className="text-7xl "
              />
            </Skeleton>
          </div>
        </div>
        <div className="w-80 ">
          <div className="mt-6 flex justify-between">
            <p>การเข้างาน</p>
            <p className="text-primary">เพิ่มเติม</p>
          </div>
          <div className="mt-4 flex min-h-[280px] flex-col gap-2">
            <Card className="flex-row justify-between gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Icon
                    icon="ion:log-out-outline"
                    fontSize={24}
                    className="text-primary"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-medium">เข้างาน</p>
                  <p className="text-sm text-gray-500">มกราคม, 11 วันจันทร์</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p>18:15</p>
                <p className="text-sm text-red-500">-9 ชั่วโมง</p>
              </div>
            </Card>
            <Card className="flex-row justify-between gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Icon
                    icon="ion:log-out-outline"
                    fontSize={24}
                    className="text-primary"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-medium">เข้างาน</p>
                  <p className="text-sm text-gray-500">มกราคม, 11 วันจันทร์</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p>18:15</p>
                <p className="text-sm text-red-500">-9 ชั่วโมง</p>
              </div>
            </Card>

            <Card className="flex-row justify-between gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Icon
                    icon="ion:log-out-outline"
                    fontSize={24}
                    className="text-primary"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-medium">เข้างาน</p>
                  <p className="text-sm text-gray-500">มกราคม, 11 วันจันทร์</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p>18:15</p>
                <p className="text-sm text-red-500">-9 ชั่วโมง</p>
              </div>
            </Card>
          </div>
        </div>
        <Button
          variant="shadow"
          className="mt-6 h-12 w-80"
          color="primary"
          onClick={async () => {
            await onOpenModal();
          }}
          size="lg"
        >
          {employee.status == "in" ? "ออกงาน" : "เข้างาน"}
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        className="h-[85%] sm:h-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {employee.status == "in" ? "ออกงาน" : "เข้างาน"}
              </ModalHeader>
              <ModalBody>
                <TimeInput
                  label={`เวลา${employee.status == "in" ? "ออกงาน" : "เข้างาน"}`}
                  hourCycle={24}
                  isReadOnly
                  value={
                    new Time(new Date().getHours(), new Date().getMinutes())
                  }
                ></TimeInput>
                <Textarea
                  label="หมายเหตุ"
                  placeholder="วันนี้คุณเป็นยังไงบ้าง..."
                  minRows={4}
                  onChange={(e) => setNote(e.target.value)}
                ></Textarea>
                <div className="flex justify-end gap-1">
                  <Button color="danger" variant="light" onPress={onClose}>
                    ปิด
                  </Button>
                  <Button color="primary" onClick={() => handleClock(onClose)}>
                    ยืนยัน
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
