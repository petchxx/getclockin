"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  Selection,
  TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import { api } from "~/trpc/react";

type Props = {
  id: string;
  currentEmail: string;
  currentName: string;
  currentPhone: string;
  currentRole: string;
  currentSalary: number;
  currentStartTime: string;
  currentStopTime: string;
  currentOffDays: string[];
};

export default function UpdateEmployee({
  id,
  currentEmail,
  currentName,
  currentPhone,
  currentRole,
  currentSalary,
  currentStartTime,
  currentStopTime,
  currentOffDays,
}: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [startTime, setStartTime] = React.useState(new Time(9));
  const [stopTime, setStopTime] = React.useState(new Time(18));

  const [offDays, setOffDays] = React.useState<Selection>(new Set([]));

  function convertStringToTime(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return new Time(hours, minutes, seconds);
  }

  useEffect(() => {
    setEmail(currentEmail);
    setName(currentName);
    setPhone(currentPhone);
    setRole(currentRole);
    setSalary(currentSalary.toString());
    setStartTime(convertStringToTime(currentStartTime));
    setStopTime(convertStringToTime(currentStopTime));
    setOffDays(new Set(currentOffDays));
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const updateEmployee = api.employee.update.useMutation({
    async onSuccess() {
      toast.success("แก้ไขพนักงานสำเร็จ");
      router.refresh();
    },
    async onError(error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาด");
      router.refresh();
    },
  });
  const handleUpdateEmployee = async () => {
    const offDaysArray = Array.from(offDays);
    updateEmployee.mutate({
      id: id,
      email: email,
      name: name,
      phone: phone,
      role: role,
      salary: salary,
      start_time: startTime.toString(),
      stop_time: stopTime.toString(),
      off_days: offDaysArray as string[],
    });
  };

  return (
    <main>
      <span
        className="cursor-pointer text-lg text-default-400 active:opacity-50"
        onClick={() => onOpen()}
      >
        <Icon icon="ion:pencil-outline" />
        {/* <MdOutlineEdit /> */}
      </span>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                แก้ไขพนักงาน
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="อีเมลล์"
                  variant="bordered"
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  label="ชื่อ-นามสกุล"
                  variant="bordered"
                  value={name}
                  onValueChange={setName}
                />
                <Input
                  label="เบอร์โทรศัพท์"
                  variant="bordered"
                  type="tel"
                  value={phone}
                  onValueChange={setPhone}
                />
                <Input
                  label="ตำแหน่ง"
                  variant="bordered"
                  value={role}
                  onValueChange={setRole}
                />
                <Input
                  label="เงินเดือน"
                  variant="bordered"
                  value={salary}
                  onValueChange={setSalary}
                />
                <Select
                  label="วันหยุด"
                  selectionMode="multiple"
                  placeholder="เลือกวันหยุด"
                  selectedKeys={offDays}
                  className="w-full"
                  variant="bordered"
                  onChange={(e) => {
                    setOffDays(new Set(e.target.value.split(",")));
                  }}
                >
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day === "Sunday"
                        ? "อาทิตย์"
                        : day === "Monday"
                          ? "จันทร์"
                          : day === "Tuesday"
                            ? "อังคาร"
                            : day === "Wednesday"
                              ? "พุธ"
                              : day === "Thursday"
                                ? "พฤหัสบดี"
                                : day === "Friday"
                                  ? "ศุกร์"
                                  : "เสาร์"}
                    </SelectItem>
                  ))}
                </Select>
                <div className="mb-8 flex justify-between gap-2">
                  <TimeInput
                    value={startTime}
                    onChange={setStartTime}
                    label="เวลาเริ่มงาน"
                    variant="bordered"
                    hourCycle={24}
                  />

                  <TimeInput
                    value={stopTime}
                    onChange={setStopTime}
                    label="เวลาเลิกงาน"
                    variant="bordered"
                    hourCycle={24}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => handleUpdateEmployee()}
                >
                  บันทึก
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
