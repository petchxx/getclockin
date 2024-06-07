"use client";
import React from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Avatar, Skeleton } from "@nextui-org/react";
import { api } from "~/trpc/react";

export default function TopBar() {
  const employee = api.employee.get.useQuery().data;
  return (
    <div className="fixed flex w-full justify-center ">
      <div className="flex w-full max-w-screen-sm items-center justify-between p-6">
        <div className="flex gap-4">
          <Skeleton isLoaded={employee != null} className="rounded-2xl">
            <Avatar
              isBordered
              radius="md"
              src=""
              // color="primary"
              name={employee?.name}
              className="h-12 w-12"
            />
          </Skeleton>
          <div className="flex flex-col justify-center gap-2">
            <Skeleton
              isLoaded={employee != null}
              className="h-4 w-32 rounded-2xl"
            >
              <p className="font-semibold">{employee?.name}</p>
            </Skeleton>
            <Skeleton
              isLoaded={employee != null}
              className="h-4 w-52 rounded-2xl"
            >
              <p className="text-sm text-gray-500">{employee?.email}</p>
            </Skeleton>
          </div>
        </div>
        <ThemeSwitcher size="lg" />
      </div>
    </div>
  );
}
