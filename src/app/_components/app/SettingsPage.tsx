"use client";
import { Avatar, Button, Card, Chip, Switch } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import TopBar from "./TopBar";
import GravatarImage from "../GravatarImage";
import { api } from "~/trpc/react";
import { type Employee } from "~/lib/interface/employee";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const employee = api.employee.get.useQuery().data as Employee;
  return (
    <div className="">
      <TopBar title="ตั้งค่า" />
      <div className="flex flex-col items-center justify-center py-20">
        <Card className="w-80 flex-row items-center justify-start gap-4 p-4">
          <Avatar
            isBordered
            radius="md"
            src={GravatarImage({ email: employee?.email ?? "" })}
            color={employee?.status == "in" ? "primary" : "default"}
            name={employee?.name}
            className="h-12 w-12 bg-content3 text-foreground"
          />
          <div>
            <p className="text-medium">{employee?.name}</p>
            <p className="text-xs text-foreground/50">{employee?.email}</p>
          </div>
        </Card>
        {/* <Chip color="primary" size="sm" className="mt-2"> */}
        {/*   {employee?.role} */}
        {/* </Chip> */}

        <Card className="mt-2 w-80 flex-row items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Icon icon="line-md:moon-rising-loop" fontSize={24} />
            <p>โหมดมืด</p>
          </div>
          <ThemeSwitcher isSwitch />
        </Card>

        <Button
          color="primary"
          variant="bordered"
          className="mt-6 w-80"
          onClick={async () => {
            router.push("/");
          }}
        >
          เกี่ยวกับเรา
        </Button>

        <Button
          color="danger"
          variant="bordered"
          className="mt-4 w-80"
          onClick={async () => {
            await signOut();
          }}
        >
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
}
