"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Card, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { type Company } from "~/lib/interface/company";
import { api } from "~/trpc/react";

type Props = {
  company: Company;
};

export default function SettingsPage({ company }: Props) {
  const [name, setName] = useState(company.name ?? "");
  const [email, setEmail] = useState(company.email ?? "");
  const [lineToken, setLineToken] = useState(company.line_token ?? "");
  const [appPassword, setAppPassword] = useState(company.app_password ?? "");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const updateCompany = api.company.update.useMutation({
    async onSuccess() {
      toast.success("บันทึกสำเร็จ");
    },
  });

  async function handleSubmit() {
    updateCompany.mutate({
      name,
      email,
      line_token: lineToken,
      app_password: appPassword,
    });
  }

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
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </div>

        <Divider className="" />
        <Button
          onClick={async () => {
            await handleSubmit();
          }}
          className="m-4 w-24"
          variant="flat"
          color="primary"
        >
          บันทึก
        </Button>
      </Card>
      <Card className="mt-4 ">
        <div className="m-4">
          <p className="text font-bold">ชื่อบริษัท</p>
          <p className="text-sm text-foreground/50">ใช้ในการเข้าแอปพลิเคชั่น</p>
          <Input
            className="mt-4"
            variant="bordered"
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <Divider className="" />
        <Button
          className="m-4 w-24"
          onClick={async () => {
            await handleSubmit();
          }}
          variant="flat"
          color="primary"
        >
          บันทึก
        </Button>
      </Card>
      <Card className="mt-4 ">
        <div className="m-4">
          <p className=" font-bold">Line Notify Key</p>
          <p className="text-sm text-foreground/50">
            ใช้ในการแจ้งเตือนผ่านไลน์
          </p>
          <Input
            className="mt-4"
            variant="bordered"
            onChange={(e) => {
              setLineToken(e.target.value);
            }}
            defaultValue={lineToken}
          />
        </div>

        <Divider className="" />
        <Button
          onClick={() => handleSubmit()}
          className="m-4 w-24"
          variant="flat"
          color="primary"
        >
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
            onClick={async () => {
              await handleSubmit();
            }}
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
            type={isPasswordVisible ? "text" : "password"}
            defaultValue={company.app_password ?? ""}
            onChange={(e) => {
              setAppPassword(e.target.value);
            }}
            endContent={
              <Icon
                icon={isPasswordVisible ? "bi:eye-slash" : "bi:eye"}
                className="cursor-pointer"
                onClick={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              />
            }
          />
        </div>

        <Divider className="" />
        <Button
          className="m-4 w-24"
          onClick={async () => {
            await handleSubmit();
          }}
          variant="flat"
          color="primary"
        >
          บันทึก
        </Button>
      </Card>
    </div>
  );
}
