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
  type Selection,
  TimeInput,
} from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import moment from "moment";
import { Time } from "@internationalized/date";
import { api } from "~/trpc/react";
import { type Company } from "~/lib/interface/company";

export default function AddEmployee() {
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

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const addEmployee = api.employee.create.useMutation({
    onSuccess(data) {
      console.log(data);
      router.refresh();
      toast.success("เพิ่มพนักงานสำเร็จ");
      setEmail("");
      setName("");
      setPhone("");
      setRole("");
      setSalary("");
      setStartTime(new Time(9));
      setStopTime(new Time(18));
      setOffDays(new Set([]));
    },
    onError(error) {
      console.error(error);
      router.refresh();
      toast.error(error.message, {
        autoClose: 5000,
      });
    },
  });

  const handleAddEmployee = async (onClose: void) => {
    const offDaysArray = Array.from(offDays);
    console.log(
      email,
      name,
      phone,
      role,
      salary,
      startTime,
      stopTime,
      offDaysArray,
    );

    addEmployee.mutate({
      email,
      name,
      phone,
      role,
      salary: salary.toString(),
      start_time: startTime.toString(),
      stop_time: stopTime.toString(),
      off_days: offDaysArray as string[],
    });
    onClose
  };

  return (
    <main>
      <Button
        color="primary"
        onPress={onOpen}
        endContent={<Icon icon="ion:add-outline" />}
      >
        เพิ่มพนักงาน
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ข้อมูลพนักงาน
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
                  ปิด
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await handleAddEmployee(onClose());
                  }}
                >
                  เพิ่ม
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
