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
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  const [startTime, setStartTime] = React.useState("");
  const [stopTime, setStopTime] = React.useState("");
  const [offDays, setOffDays] = React.useState<Selection>(new Set([]));

  useEffect(() => {
    setEmail(currentEmail);
    setName(currentName);
    setPhone(currentPhone);
    setRole(currentRole);
    setSalary(currentSalary.toString());
    setStartTime(currentStartTime);
    setStopTime(currentStopTime);
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

  const handleUpdateEmployee = async (onClose: any) => {
    const offDaysArray = Array.from(offDays);
    fetch(`/api/employee`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        email: email,
        name: name,
        phone: phone,
        role: role,
        salary: salary,
        start_time: startTime,
        stop_time: stopTime,
        off_days: offDaysArray,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          onClose();
          router.refresh();
          toast.success("Employee updated successfully");
        } else {
          router.refresh();
          toast.error(data.error || "Something went wrong");
        }
      });
  };

  return (
    <main>
      <span
        className="cursor-pointer text-lg text-default-400 active:opacity-50"
        onClick={() => onOpen()}
      >
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
                      {day}
                    </SelectItem>
                  ))}
                </Select>
                <div className="mb-8 flex justify-between">
                  <div className="w-48">
                    <div className="text-sm">
                      <h1>เวลาเริ่มงาน</h1>
                    </div>
                    <Input
                      variant="bordered"
                      type="time"
                      value={startTime}
                      onValueChange={setStartTime}
                    />
                  </div>
                  <div className="w-48">
                    <div className="text-sm">
                      <h1>เวลาเลิกงาน</h1>
                    </div>
                    <Input
                      variant="bordered"
                      type="time"
                      value={stopTime}
                      onValueChange={setStopTime}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleUpdateEmployee(onClose);
                  }}
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
