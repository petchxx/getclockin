"use client";
import { Button, Input, Link } from "@nextui-org/react";
import React from "react";
import { Company } from "~/lib/interface/company";
import { Icon } from "@iconify/react";

type Props = {
  company: Company;
};

export default function RegisterPage({ company }: Props) {
  async function handleSubmit(formData: FormData) {
    console.log(formData.get("name"));
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
              name="email"
              className="mt-6 w-80"
              type="email"
              label="อีเมล"
              variant="bordered"
              value={company.email}
              isDisabled
            />

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
