"use client";
import { I18nProvider } from "@react-aria/i18n";

import { isWeekend, today, getLocalTimeZone } from "@internationalized/date";
import React, { useState } from "react";
import {
  Card,
  DatePicker,
  DateRangePicker,
  type DateValue,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

import Topbar from "./TopBar";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  TimeInput,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { overtimes } from "~/server/db/schema";

export default function OvertimePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [note, setNote] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<DateValue | null>(null);

  async function handleOvertime(onClose: () => void) {
    // console.log(date);
    // console.log(from);
    // console.log(to);
    // console.log(note);
    if (!date || !from || !to) {
      toast.error("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    requestOvertime.mutate({
      note,
      from,
      to,
      date: date?.toDate(getLocalTimeZone()),
    });
    onClose();
  }
  const router = useRouter();
  const utils = api.useUtils();

  const requestOvertime = api.employee.requestOvertime.useMutation({
    async onSuccess() {
      router.refresh();

      await utils.invalidate();
      toast.success("ขอทำงานล่วงเวลาสำเร็จ");
    },
  });

  const getOvertime = api.employee.getOvertime.useQuery({
    limit: 10,
  }).data;

  return (
    <div className="">
      <Topbar title="ขอทำงานล่วงเวลา" />
      <div className="flex w-full justify-center">
        <div className="mt-6 flex w-80 flex-col gap-4">
          <div className="flex justify-between">
            <p>รายการล่าสุด</p>
            <p className="text-primary">เพิ่มเติม</p>
          </div>

          <div className="flex flex-col gap-2">
            {!getOvertime ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
              </div>
            ) : getOvertime.length > 0 ? (
              getOvertime?.map((overtime) => (
                <Card
                  key={overtime.id}
                  className="flex-row justify-between gap-2 p-4 "
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${overtime.status == "pending" ? "bg-primary/20" : overtime.status == "approved" ? "bg-success/20" : "bg-red-500/20"}`}
                    >
                      <Icon
                        icon="ion:trending-up-outline"
                        fontSize={24}
                        className={`${overtime.status == "pending" ? "text-primary" : overtime.status == "approved" ? "text-green-500" : "text-red-500"}`}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <p className="">
                        {new Date(overtime.date).toLocaleDateString("th", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-foreground/50">
                        {overtime.from.split(":")[0]}:
                        {overtime.from.split(":")[1]} -{" "}
                        {overtime.to.split(":")[0]}:{overtime.to.split(":")[1]}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <p
                      className={`${
                        overtime.status == "pending"
                          ? "text-primary"
                          : overtime.status == "approved"
                            ? "text-green-500"
                            : "text-red-500"
                      }`}
                    >
                      {overtime.status == "pending"
                        ? "กำลังรอ"
                        : overtime.status == "approved"
                          ? "อนุมัติ"
                          : "ไม่อนุมัติ"}
                    </p>
                    <p className="text-xs "></p>
                  </div>
                </Card>
              ))
            ) : (
              <p>ไม่มีข้อมูล</p>
            )}
          </div>
        </div>
      </div>
      <Button
        className="fixed bottom-[12%] right-[4%] h-12 w-12 rounded-xl"
        color="primary"
        variant="flat"
        isIconOnly
        onPress={onOpen}
      >
        <Icon icon="ion:add-outline" fontSize={24} />
      </Button>
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
                {/* {employee.status == "in" ? "ออกงาน" : "เข้างาน"} */}
                <h1>ขอทำงานล่วงเวลา</h1>
              </ModalHeader>
              <ModalBody>
                <I18nProvider locale="th">
                  <DatePicker
                    label="วันที่"
                    onChange={setDate}
                    isRequired
                    className=""
                  />
                </I18nProvider>

                <div className="flex gap-2">
                  <TimeInput
                    label="จาก"
                    onChange={(e) => {
                      setFrom(e.toString());
                    }}
                    hourCycle={24}
                  />
                  <TimeInput
                    label="ถึง"
                    hourCycle={24}
                    onChange={(e) => {
                      setTo(e.toString());
                    }}
                  />
                </div>
                <Textarea
                  label="หมายเหตุ"
                  placeholder="หมายเหตุการขอทำงานล่วงเวลา..."
                  minRows={4}
                  onChange={(e) => setNote(e.target.value)}
                ></Textarea>
                <div className="flex  justify-end gap-1">
                  <Button color="danger" variant="light" onPress={onClose}>
                    ปิด
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => handleOvertime(onClose)}
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
    </div>
  );
}
