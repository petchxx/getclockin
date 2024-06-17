"use client";
import React from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Avatar, Card, Skeleton } from "@nextui-org/react";
import { api } from "~/trpc/react";
import crypto from "crypto";
import { usePathname } from "next/navigation";
import GravatarImage from "../GravatarImage";

type Props = {
  title?: string;
};

export default function TopBar({ title }: Props) {
  const employee = api.employee.get.useQuery().data;
  const pathname = usePathname();

  return pathname === "/app" ? (
    <div className="fixed top-0 z-20 flex w-full justify-center rounded-none bg-background  ">
      <div className="flex w-full max-w-screen-sm items-center justify-between px-6 py-4 ">
        <div className="flex gap-4">
          <Skeleton isLoaded={employee != null} className="rounded-2xl">
            <Avatar
              isBordered
              radius="md"
              src={GravatarImage({ email: employee?.email ?? "" })}
              color={employee?.status == "in" ? "primary" : "default"}
              name={employee?.name}
              className="h-12 w-12 bg-content3 text-foreground"
            />
          </Skeleton>
          <div className="flex flex-col justify-center gap-2">
            <Skeleton isLoaded={employee != null} className="h-4 rounded-2xl">
              <div>
                <p className="line-clamp-1 w-full font-medium">
                  {employee?.name} My name is too long
                </p>
              </div>
            </Skeleton>
            <Skeleton isLoaded={employee != null} className="h-4 rounded-2xl">
              <p className="line-clamp-1 text-sm text-foreground/50">
                {employee?.role}
              </p>
            </Skeleton>
          </div>
        </div>
        <ThemeSwitcher size="lg" />
      </div>
    </div>
  ) : (
    <div className="fixed z-20 w-full">
      <Card className="flex h-16 items-center justify-center rounded-none bg-background shadow-none">
        <h1 className="text-xl font-medium ">{title}</h1>
      </Card>
    </div>
  );
}
