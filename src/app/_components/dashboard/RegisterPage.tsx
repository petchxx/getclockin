"use client";
import { Button, Input, Link } from "@nextui-org/react";
import React from "react";
import { Company } from "~/lib/interface/company";
import { Icon } from "@iconify/react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const register = api.company.register.useMutation({
    onSuccess(data) {
      console.log(data);
      router.refresh();
    },
    onError(error) {
      console.error(error);
    },
  });
  async function handleSubmit(formData: FormData) {
    const name = formData.get("name") as string;
    const app_password = formData.get("app_password") as string;
    register.mutate({ name, app_password });
  }
  return (
    <main>
      <Link className="absolute left-0 top-0 ml-4 mt-4" href="/"></Link>
      <div className=" flex h-[100dvh] items-center justify-center">
        <div className="flex flex-col items-center justify-center p-10">
          <Link
            className="cursor-pointer text-5xl font-bold text-primary"
            href={"/"}
          >
            ClockIn
          </Link>
          <p className="text-l text-gray-400">กรอกข้อมูลเพิ่มเริ่มต้นใช้งาน</p>
          <form action={handleSubmit}>
            <Input
              name="name"
              className="mt-4 w-80"
              label="ชื่อบริษัท"
              placeholder="testcompany"
              type="text"
              variant="bordered"
              startContent={<p className="text-sm">@</p>}
            />
            <Input
              name="app_password"
              className="mt-4 w-80"
              label="รหัสผ่านแอพ"
              placeholder="********"
              type="text"
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
          </form>
        </div>
      </div>
    </main>
  );
}
