"use client";
import React from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Avatar, Skeleton } from "@nextui-org/react";
import { api } from "~/trpc/react";

export default function TopBar() {
  const employee = api.employee.get.useQuery().data;
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-screen-lg items-center justify-between p-4">
        <div className="flex gap-4">
          <Skeleton isLoaded={employee != null} className="rounded-2xl">
            <Avatar
              isBordered
              radius="lg"
              src=""
              size="lg"
              color="primary"
              name={employee?.name}
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
