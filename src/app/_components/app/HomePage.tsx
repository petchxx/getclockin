"use client";
import Clock from "react-live-clock";

import { signOut } from "next-auth/react";
import { Avatar, Button, Card, Skeleton, User } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Employee } from "~/lib/interface/employee";
import { ThemeSwitcher } from "../ThemeSwitcher";

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
          <div className="flex justify-between">
            <p>การเข้างาน</p>
            <p className="text-primary">เพิ่มเติม</p>
          </div>
          <div>
            <Card>Hi</Card>
          </div>
        </div>
        <Button variant="shadow" className="mt-6 h-12 w-80" color="primary">
          Clock In
        </Button>
      </div>
      <p>{employee?.status}</p>
      {employee?.name}
    </main>
  );
}
