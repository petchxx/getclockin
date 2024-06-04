"use client";
import React from "react";
import { Link } from "@nextui-org/link";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { api } from "~/trpc/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const createCompany = api.company.create.useMutation({
    async onSuccess(data) {
      console.log(data);
      await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        callbackUrl: "/dashboard",
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  async function handleSignUp(formData: FormData) {
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return toast.error("รหัสผ่านไม่ตรงกัน");
    }
    createCompany.mutate({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  }

  return (
    <main>
      <Link className="absolute left-0 top-0 ml-4 mt-4" href="/">
        back
      </Link>
      <div className="flex h-[100dvh] flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center p-10">
          <h1 className="cursor-pointer text-5xl font-bold text-primary">
            ClockIn
          </h1>
          <p className="text-l text-gray-400">ลงทะเบียน</p>
          <form action={handleSignUp}>
            <Input
              className="mt-6 w-80"
              type="email"
              label="อีเมล"
              name="email"
              variant="bordered"
              placeholder="example@gmail.com"
            />
            <Input
              className="mt-4 w-80"
              type="password"
              label="รหัสผ่าน"
              name="password"
              placeholder="********"
              variant="bordered"
            />
            <Input
              className="mt-4 w-80"
              type="password"
              label="ยืนยันรหัสผ่าน"
              placeholder="********"
              name="confirmPassword"
              variant="bordered"
            />
            <Button
              color="primary"
              className="mt-6 h-12 w-80"
              type="submit"
              variant="shadow"
            >
              ยืนยัน
            </Button>

            {/* <SignUpButton /> */}
          </form>
          <p className="mt-4 text-sm text-gray-400">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/signin" className="text-sm">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <form>
                <ModalHeader className="flex flex-col gap-1">
                  กรอกข้อมูลบริษัทของคุณ
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    type="text"
                    label="ชื่อบริษัท"
                    variant="bordered"
                    name="name"
                  />
                  <Input
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">@</span>
                      </div>
                    }
                    label="Company Key ( ชื่อบริษัท )"
                    type="text"
                    variant="bordered"
                    name="company_key"
                  />
                  <Input
                    label="รหัสแอพพลิเคชั่น"
                    type="password"
                    variant="bordered"
                    name="app_password"
                  />
                  <div className="flex px-1 py-2">
                    <Checkbox
                      // isSelected={isCheck}
                      classNames={{
                        label: "text-small",
                      }}
                      // onValueChange={(isCheck) => setIsCheck(isCheck)}
                      className="flex items-center"
                    >
                      <div className="flex items-center gap-1">
                        <p className="text-base">ยอมรับ</p>
                        <Link href="/terms" className="text-base">
                          ข้อตกลงและเงื่อนไข
                        </Link>
                      </div>
                    </Checkbox>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="bordered" onPress={onClose}>
                    ยกเลิก
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    variant="shadow"
                    onPress={onClose}
                  >
                    สมัคร
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
    </main>
  );
}
