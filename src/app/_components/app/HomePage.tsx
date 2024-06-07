"use client";
import { Time } from "@internationalized/date";

import Clock from "react-live-clock";

import { signOut } from "next-auth/react";
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
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
import moment from "moment";
import { time } from "console";

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
      toast.success((data == "in" ? "เข้า" : "ออก") + "งานสำเร็จ");
      router.refresh();
      refetch();
    },
    async onError(error) {
      toast.error(error.message);
      router.refresh();
      refetch();
    },
  });

  const { refetch, data, isSuccess } = api.employee.recentClock.useQuery();
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

  const calculateEarlyLate = (
    start: string,
    stop: string,
    status: string,
    clock_date_time: Date,
  ) => {
    const start_time = moment(start, "HH:mm:ss");
    const stop_time = moment(stop, "HH:mm:ss");
    const clock_time = moment(clock_date_time);

    if (status === "in") {
      const difference = clock_time.diff(start_time, "minutes");

      if (difference < 0) {
        const earlyBy = Math.abs(difference - 1);
        return (
          <p className="text-green-500">
            + {Math.floor(earlyBy / 60)}.{earlyBy % 60} ชม.
          </p>
        );
      } else if (difference === 0) {
        return <p className="text-green-500">ตรงเวลา</p>;
      } else {
        const lateBy = Math.abs(difference);
        return (
          <p className="text-red-500">
            - {Math.floor(lateBy / 60)}.{lateBy % 60} ชม.
          </p>
        );
      }
    }

    if (status === "out") {
      const difference = clock_time.diff(stop_time, "minutes");

      if (difference < 0) {
        const earlyBy = Math.abs(difference - 1);
        return (
          <p className="text-red-500">
            - {Math.floor(earlyBy / 60)}.{earlyBy % 60} ชม.
          </p>
        );
      } else if (difference === 0) {
        return <p className="text-green-500">ตรงเวลา</p>;
      } else {
        const lateBy = Math.abs(difference);
        return (
          <p className="text-green-500">
            + {Math.floor(lateBy / 60)}.{lateBy % 60} ชม.
          </p>
        );
      }
    }
  };

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
            {/* display skeleton when loading  */}
            {!data ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
              </div>
            ) : data.length > 0 ? (
              data?.map((clock, index) => (
                <Card
                  key={index}
                  className="flex-row justify-between gap-2 p-4"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${clock.status == "in" ? "bg-primary/20" : "bg-red-500/20"}`}
                    >
                      {clock.status == "in" ? (
                        <Icon
                          icon="ion:log-in-outline"
                          fontSize={24}
                          className="text-primary"
                        />
                      ) : (
                        <Icon
                          icon="ion:log-out-outline"
                          fontSize={24}
                          className="text-red-500"
                        />
                      )}
                    </div>
                    <div className="flex flex-col ">
                      <p className="text-medium">
                        {clock.status == "in" ? "เข้างาน" : "ออกงาน"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {moment(clock.date_time).format("dddd, DD MMMM ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <p className="text-medium">
                      {moment(clock.date_time).format("HH:mm")}
                    </p>
                    <p className="text-sm text-red-500">
                      {calculateEarlyLate(
                        employee.start_time,
                        employee.stop_time,
                        clock.status,
                        clock.date_time,
                      )}
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="mt-6 flex w-full flex-col items-center justify-center gap-2 text-gray-500">
                <Icon icon="ion:finger-print-outline" fontSize={64} />
                <p>ไม่พบการเข้างาน</p>
              </div>
            )}
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
