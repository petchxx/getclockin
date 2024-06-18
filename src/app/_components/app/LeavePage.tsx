"use client";
import { I18nProvider } from "@react-aria/i18n";

import { isWeekend, today, getLocalTimeZone } from "@internationalized/date";
import React, { useState } from "react";
import {
  Card,
  DateRangePicker,
  Link,
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
import Image from "next/image";
import LeaveCard from "./LeaveCard";
import { type AppLeave, type Leave } from "~/lib/interface/leave";

export default function LeavePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [note, setNote] = useState("");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [leaveType, setLeaveType] = useState("");

  async function handleLeave(onClose: () => void) {
    requestLeave.mutate({
      note,
      from,
      to,
      leave_type: leaveType,
    });
    onClose();
  }
  const leaveTypeList = [
    { key: "ลากิจ", label: "ลากิจ" },
    { key: "ลาป่วย", label: "ลาป่วย" },
    { key: "ลาพักร้อน", label: "ลาพักร้อน" },
  ];
  const router = useRouter();
  const utils = api.useUtils();

  const requestLeave = api.employee.requestLeave.useMutation({
    async onSuccess() {
      router.refresh();

      await utils.invalidate();
      toast.success("ขอลางานสำเร็จ");
    },
  });

  const getLeave = api.employee.getLeaves.useQuery({
    limit: 10,
  }).data as AppLeave[];

  return (
    <div className="">
      <Topbar title="ขอลางาน" />
      <div className="flex w-full justify-center">
        <div className="my-20 flex w-80 flex-col gap-4">
          <div className="flex justify-between">
            <p>รายการล่าสุด</p>
            <Link
              href="/app/leave/history"
              className="cursor-pointer text-primary"
            >
              เพิ่มเติม
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {!getLeave ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
              </div>
            ) : getLeave.length > 0 ? (
              getLeave?.map((leave) => (
                <LeaveCard key={leave.id} leave={leave} />
              ))
            ) : (
              <div className="group flex h-[280px] w-full items-center justify-center gap-2 text-foreground/50">
                <div
                  onClick={async () => {
                    onOpen();
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <Icon
                    icon="ion:calendar-clear-outline"
                    className="transition-colors duration-300 ease-in-out group-hover:text-primary"
                    fontSize={64}
                  />
                  <p className="mt-4 transition-colors duration-300 ease-in-out group-hover:text-primary">
                    ขอลางานได้เลย!
                  </p>
                </div>
              </div>
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
                <h1>ขอลางาน</h1>
              </ModalHeader>
              <ModalBody>
                <I18nProvider locale="th">
                  <DateRangePicker
                    label="วันที่ต้องการลา"
                    isRequired
                    className=""
                    minValue={today(getLocalTimeZone())}
                    onChange={(e) => {
                      setFrom(e.start.toDate(getLocalTimeZone()));
                      setTo(e.end.toDate(getLocalTimeZone()));
                    }}
                  />
                </I18nProvider>
                <Select
                  label="ประเภทวันลา"
                  placeholder="เลือกประเภทวันลา"
                  isRequired
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  {leaveTypeList.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                <Textarea
                  label="หมายเหตุ"
                  placeholder="หมายเหตุการขอลางาน..."
                  minRows={4}
                  onChange={(e) => setNote(e.target.value)}
                ></Textarea>
                <div className="flex  justify-end gap-1">
                  <Button color="danger" variant="light" onPress={onClose}>
                    ปิด
                  </Button>
                  <Button color="primary" onClick={() => handleLeave(onClose)}>
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
