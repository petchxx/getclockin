"use client";
import React from "react";
import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";
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
import { Icon } from "@iconify/react/dist/iconify.mjs";
type Props = {};

export default function LeavePage({}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function handleLeave(onClose: () => void) {
    // await fetch("/api/leave", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     note,
    //   }),
    // });
    onClose();
  }
  const leaveType = [
    { key: "ลากิจ", label: "ลากิจ" },
    { key: "ลาป่วย", label: "ลาป่วย" },
    { key: "ลาพักร้อน", label: "ลาพักร้อน" },
  ];
  return (
    <div>
      <Topbar title="ขอลางาน" />
      <Button
        className="absolute bottom-[12%] right-[4%] h-12 w-12 rounded-xl"
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
                <DateRangePicker
                  label="วันที่ต้องการลา"
                  isRequired
                  className=""
                />
                <Select
                  label="ประเภทวันลา"
                  placeholder="เลือกประเภทวันลา"
                  isRequired
                >
                  {leaveType.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                {/* <TimeInput */}
                {/*   label={`เวลา${employee.status == "in" ? "ออกงาน" : "เข้างาน"}`} */}
                {/*   hourCycle={24} */}
                {/*   isReadOnly */}
                {/*   value={ */}
                {/*     new Time(new Date().getHours(), new Date().getMinutes()) */}
                {/*   } */}
                {/* ></TimeInput> */}
                <Textarea
                  label="หมายเหตุ"
                  placeholder="หมายเหตุการขอลางาน..."
                  minRows={4}
                  // onChange={(e) => setNote(e.target.value)}
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
