"use client";
import React from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Avatar, Skeleton } from "@nextui-org/react";
import { api } from "~/trpc/react";
import crypto from "crypto";

export default function TopBar() {
  const employee = api.employee.get.useQuery().data;

  return (
    <div className="fixed top-0 z-20 flex w-full justify-center bg-background ">
      <div className="flex w-full max-w-screen-sm items-center justify-between px-6 py-4 ">
        <div className="flex gap-4">
          <Skeleton isLoaded={employee != null} className="rounded-2xl">
            <Avatar
              isBordered
              radius="md"
              src={
                `https://www.gravatar.com/avatar/${crypto
                  .createHash("sha256")
                  .update(employee?.email ?? "")
                  .digest("hex")}?s=80&d=identicon` ?? ""
              }
              color={employee?.status == "in" ? "primary" : "default"}
              name={employee?.name}
              className="h-12 w-12 bg-content3 text-foreground"
            />
          </Skeleton>
          <div className="flex flex-col justify-center gap-2">
            <Skeleton isLoaded={employee != null} className="h-4 rounded-2xl">
              <p className="font-medium">{employee?.name}</p>
            </Skeleton>
            <Skeleton isLoaded={employee != null} className="h-4 rounded-2xl">
              <p className="text-sm text-foreground/50">{employee?.role}</p>
            </Skeleton>
          </div>
        </div>
        <ThemeSwitcher size="lg" />
      </div>
    </div>
  );
}
