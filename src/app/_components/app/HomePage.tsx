"use client";
import Clock from "react-live-clock";

import { signOut } from "next-auth/react";
import { Avatar, Button, Card, Skeleton, User } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Employee } from "~/lib/interface/employee";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  employee: Employee;
};

export default function HomePage({ employee }: Props) {
  const [showClock, setShowClock] = useState(false);

  useEffect(() => {
    setShowClock(true);
  }, []);
  return (
    <main className="">
      <div className="mt-4 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-2">
          <div>
            <Skeleton isLoaded={showClock} className="rounded-2xl">
              <Clock
                format={"dddd, DD MMMM"}
                ticking={true}
                timezone={"Asia/Bangkok"}
                locale={"TH"}
              />
            </Skeleton>
          </div>
          <div>
            <Skeleton isLoaded={showClock} className="rounded-2xl">
              <Clock
                format={"HH:mm"}
                ticking={true}
                timezone={"Asia/Bangkok"}
                locale={"TH"}
                className="text-7xl "
              />
            </Skeleton>
          </div>
        </div>
        <div className="w-80 ">
          <div className="mt-6 flex justify-between">
            <p>การเข้างาน</p>
            <p className="text-primary">เพิ่มเติม</p>
          </div>
          <div className="mt-4 flex min-h-80 flex-col gap-3 ">
            <Card className="flex-row justify-between gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Icon
                    icon="ion:log-out-outline"
                    fontSize={24}
                    className="text-primary"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-medium">เข้างาน</p>
                  <p className="text-sm text-gray-500">มกราคม, 11 วันจันทร์</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p>18:15</p>
                <p className="text-sm text-red-500">-9 ชั่วโมง</p>
              </div>
            </Card>
            <Card className="flex-row justify-between gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Icon
                    icon="ion:log-out-outline"
                    fontSize={24}
                    className="text-primary"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-medium">เข้างาน</p>
                  <p className="text-sm text-gray-500">มกราคม, 11 วันจันทร์</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p>18:15</p>
                <p className="text-sm text-red-500">-9 ชั่วโมง</p>
              </div>
            </Card>

            <Card className="flex-row justify-between gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Icon
                    icon="ion:log-out-outline"
                    fontSize={24}
                    className="text-primary"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-medium">เข้างาน</p>
                  <p className="text-sm text-gray-500">มกราคม, 11 วันจันทร์</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p>18:15</p>
                <p className="text-sm text-red-500">-9 ชั่วโมง</p>
              </div>
            </Card>
          </div>
        </div>
        <Button variant="shadow" className="mt-6 h-12 w-80" color="primary">
          Clock In
        </Button>
      </div>
    </main>
  );
}
