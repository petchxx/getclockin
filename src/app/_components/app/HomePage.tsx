"use client";
import { I18nProvider } from "@react-aria/i18n";

import { Time } from "@internationalized/date";

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
import { type Employee } from "~/lib/interface/employee";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Icon } from "@iconify/react";
import { Input } from "postcss";
import { toast } from "react-toastify";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import moment from "moment";
import TopBar from "./TopBar";
import LiveClock from "./LiveClock";

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

  const utils = api.useUtils();
  const clock = api.employee.clock.useMutation({
    async onSuccess(data) {
      toast.success((data == "in" ? "เข้า" : "ออก") + "งานสำเร็จ");
      await utils.invalidate();
      router.refresh();
    },
    async onError(error) {
      toast.error(error.message);
      await utils.invalidate();
      router.refresh();
    },
  });

  const data = api.employee.recentClock.useQuery().data;
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
    const today = moment().startOf("day"); // Get the start of the current day

    // Set the date part of each time to today
    const start_time = moment(start, "HH:mm:ss").set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    const stop_time = moment(stop, "HH:mm:ss").set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    const clock_time = moment(clock_date_time).set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    if (status === "in") {
      const difference = clock_time.diff(start_time, "minutes");

      if (difference < 0) {
        const earlyBy = Math.abs(difference - 1);
        return (
          <p className="text-foreground/50">
            ก่อน {Math.floor(earlyBy / 60)}.{earlyBy % 60} ชม.
          </p>
        );
      } else if (difference === 0) {
        return <p className="text-foreground/50">ตรงเวลา</p>;
      } else {
        const lateBy = Math.abs(difference);
        return (
          <p className="text-red-500">
            สาย {Math.floor(lateBy / 60)}.{lateBy % 60} ชม.
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
            ก่อน {Math.floor(earlyBy / 60)}.{earlyBy % 60} ชม.
          </p>
        );
      } else if (difference === 0) {
        return <p className="text-foreground/50">ตรงเวลา</p>;
      } else {
        const lateBy = Math.abs(difference);
        return (
          <p className="text-foreground/50">
            เกิน {Math.floor(lateBy / 60)}.{lateBy % 60} ชม.
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
    <div className="">
      <TopBar />
      <main className="z-10 pb-24 pt-20">
        <div className="mt-2 flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center gap-2">
            <LiveClock />
          </div>
          <div className="w-80">
            <div className="mt-6 flex justify-between">
              <p>การเข้างาน</p>
              <p
                className="cursor-pointer text-primary"
                onClick={() => {
                  router.push("/app/clocks");
                }}
              >
                เพิ่มเติม
              </p>
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
                  <div
                    className="transform transition-transform duration-300 ease-in-out hover:scale-105"
                    key={index}
                  >
                    <Card className="flex-row justify-between gap-2 p-4">
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
                          <p className="">
                            {clock.status == "in" ? "เข้างาน" : "ออกงาน"}
                          </p>
                          <p className="text-xs text-foreground/50">
                            {new Date(clock.date_time).toLocaleDateString(
                              "th-TH",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        <p className="">
                          {moment(clock.date_time).format("HH:mm")}
                        </p>
                        <p className="text-xs ">
                          {calculateEarlyLate(
                            employee.start_time,
                            employee.stop_time,
                            clock.status,
                            clock.date_time,
                          )}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))
              ) : (
                <div className="group flex h-[280px] w-full items-center justify-center gap-2 text-foreground/50">
                  <div
                    onClick={async () => {
                      await onOpenModal();
                    }}
                    className="flex flex-col items-center justify-center"
                  >
                    <Icon
                      icon="ion:finger-print-outline"
                      className="transition-colors duration-300 ease-in-out group-hover:text-primary"
                      fontSize={64}
                    />
                    <p className="mt-4 transition-colors duration-300 ease-in-out group-hover:text-primary">
                      กดเข้างานได้เลย!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="shadow"
            className="mt-6 h-12 w-80"
            color={`${employee.status == "in" ? "danger" : "primary"}`}
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
          className="h-[99%] sm:h-auto"
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
                  <div className="flex  justify-end gap-1">
                    <Button color="danger" variant="light" onPress={onClose}>
                      ปิด
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => handleClock(onClose)}
                    >
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
    </div>
  );
}
