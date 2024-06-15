"use client";
import { Avatar, Button, Chip } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import TopBar from "./TopBar";
import GravatarImage from "../GravatarImage";
import { api } from "~/trpc/react";
import { type Employee } from "~/lib/interface/employee";
import { ThemeSwitcher } from "../ThemeSwitcher";

export default function SettingsPage() {
  const router = useRouter();
  const employee = api.employee.get.useQuery().data as Employee;
  return (
    <div className="">
      <TopBar title="ตั้งค่า" />
      <div className="flex flex-col items-center justify-center py-20">
        <Avatar
          isBordered
          radius="md"
          src={GravatarImage({ email: employee?.email ?? "" })}
          color={employee?.status == "in" ? "primary" : "default"}
          name={employee?.name}
          className="h-40 w-40 rounded-full bg-content3 text-foreground"
        />
        <p className="mt-6 text-xl">{employee?.name}</p>
        <p className="text-sm text-foreground/50">{employee?.email}</p>
        <Chip color="primary" size="sm" className="mt-2">
          {employee?.role}
        </Chip>
        <div className="mt-2">
          {" "}
          <ThemeSwitcher size="lg" />
        </div>

        <Button
          color="primary"
          variant="bordered"
          className="mt-6 h-12 w-80"
          onClick={async () => {
            await signOut();
          }}
        >
          เกี่ยวกับเรา
        </Button>

        <Button
          color="danger"
          variant="bordered"
          className="mt-4 h-12 w-80"
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
