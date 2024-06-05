"use client";
import Clock from "react-live-clock";

import { signOut } from "next-auth/react";
import { Avatar, Button, User } from "@nextui-org/react";
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
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-4">
          <Avatar
            isBordered
            radius="lg"
            src=""
            size="lg"
            color="primary"
            name={employee?.name}
          />
          <div className="flex flex-col justify-center">
            <p className="font-semibold">{employee?.name}</p>
            <p className="text-sm text-gray-500">{employee?.email}</p>
          </div>
        </div>
        <ThemeSwitcher size="lg" />
      </div>
      <div className="mt-4 flex flex-col items-center justify-center p-4">
        {showClock ? (
          <div className="flex flex-col items-center gap-2">
            <div>
              <Clock
                format={"dddd, DD MMMM"}
                ticking={true}
                timezone={"Asia/Bangkok"}
                locale={"TH"}
              />
            </div>
            <div>
              <Clock
                format={"HH:mm"}
                ticking={true}
                timezone={"Asia/Bangkok"}
                locale={"TH"}
                className="text-7xl "
              />
            </div>
          </div>
        ) : (
          <span></span>
        )}
        <Button variant="shadow" className="h-12 w-80" color="primary">
          Clock In
        </Button>
      </div>
      <p>{employee?.status}</p>
      {employee?.name}
      <Button
        color="danger"
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </Button>
    </main>
  );
}
