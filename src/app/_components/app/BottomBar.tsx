"use client";
import { Icon } from "@iconify/react";
import { Button, Card } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { title } from "process";
import React from "react";

export default function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();
  const items = [
    {
      icon: "ion:home",
      outline: "ion:home-outline",
      path: "/app",
      title: "Home",
    },
    {
      icon: "ion:calendar",
      outline: "ion:calendar-outline",
      path: "/app/leave",
      title: "Leave",
    },
    {
      icon: "ion:time",
      outline: "ion:time-outline",
      path: "/app/overtime",
      title: "Overtime",
    },
    {
      icon: "ion:settings",
      outline: "ion:settings-outline",
      path: "/app/settings",
      title: "Settings",
    },
  ];
  return (
    <Card className="fixed bottom-0 flex h-[10%] w-full items-center justify-center rounded-none border-t border-content3 bg-background pb-6 pt-1 shadow-none">
      <div className="flex w-full max-w-screen-sm justify-evenly">
        {items.map((item, index) => (
          <Button
            key={index}
            variant="light"
            isIconOnly
            size="lg"
            onClick={() => {
              router.push(item.path);
            }}
            // className="h-12 w-12"
          >
            <Icon
              icon={`${pathname == item.path ? item.icon : item.outline}`}
              fontSize={24}
            />
          </Button>
        ))}
      </div>
    </Card>
  );
}
