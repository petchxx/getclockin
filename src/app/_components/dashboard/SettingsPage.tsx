"use client";
import { Button, Card, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { type Company } from "~/lib/interface/company";

type Props = {
  company: Company;
};

export default function SettingsPage({ company }: Props) {
  const [name, setName] = useState(company.name ?? "");
  const [email, setEmail] = useState(company.email ?? "");
  const [lineToken, setLineToken] = useState(company.line_token ?? "");
  const [appPassword, setAppPassword] = useState(company.app_password ?? "");
  return (
    <div className="py-4">
      <Card className="">
        <div className="m-4">
          <p className="text  font-bold">อีเมล์</p>
          <p className="text-sm text-foreground/50">ใช้ในการเข้าแดชบอร์ด</p>
          <Input
            className="mt-4"
            variant="bordered"
            defaultValue={email}
            name="email"
          />
        </div>

        <Divider className="" />
        <Button className="m-4 w-24" variant="flat" color="primary">
          บันทึก
        </Button>
      </Card>
      <Card className="mt-4 ">
        <div className="m-4">
          <p className="text font-bold">ชื่อบริษัท</p>
          <p className="text-sm text-foreground/50">ใช้ในการเข้าแอปพลิเคชั่น</p>
          <Input className="mt-4" variant="bordered" defaultValue={name} />
        </div>

        <Divider className="" />
        <Button className="m-4 w-24" variant="flat" color="primary">
          บันทึก
        </Button>
      </Card>
      <Card className="mt-4 ">
        <div className="m-4">
          <p className=" font-bold">Line Notify Key</p>
          <p className="text-sm text-foreground/50">
            ใช้ในการแจ้งเตือนผ่านไลน์
          </p>
          <Input className="mt-4" variant="bordered" defaultValue={lineToken} />
        </div>

        <Divider className="" />
        <Button className="m-4 w-24" variant="flat" color="primary">
          บันทึก
        </Button>
      </Card>
      <Card className="mt-4 ">
        <form>
          <div className="m-4">
            <p className="font-bold">รหัสผ่านแดชบอร์ด</p>
            <p className="text-sm text-foreground/50">
              ใช้ในการเข้าแอปพลิเคชั่น
            </p>
            <Input
              className="mt-4"
              variant="bordered"
              type="password"
              label="รหัสผ่านเก่า"
              name="password"
            />

            <Input
              className="mt-4"
              variant="bordered"
              type="password"
              label="รหัสผ่านใหม่"
              name="new_password"
            />
            <Input
              className="mt-4"
              variant="bordered"
              type="password"
              label="ยืนยันรหัสผ่านใหม่"
              name="confirm_password"
            />
          </div>

          <Divider className="" />
          <Button
            type="submit"
            className="m-4 w-24"
            variant="flat"
            color="primary"
          >
            บันทึก
          </Button>
        </form>
      </Card>
      <Card className="mt-4 ">
        <div className="m-4">
          <p className="font-bold">รหัสผ่านแอปพลิเคชั่น</p>
          <p className="text-sm text-foreground/50">ใช้ในการเข้าแอปพลิเคชั่น</p>
          <Input
            className="mt-4"
            variant="bordered"
            type="password"
            defaultValue={company.app_password ?? ""}
          />
        </div>

        <Divider className="" />
        <Button className="m-4 w-24" variant="flat" color="primary">
          บันทึก
        </Button>
      </Card>
    </div>
  );
}
