"use client";
import { Icon } from "@iconify/react";
import { Button, Card } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
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
      icon: "ion:home",
      outline: "ion:home-outline",
      path: "/app/leave",
      title: "Leave",
    },
    {
      icon: "ion:home",
      outline: "ion:home-outline",
      path: "/app",
    },
    {
      icon: "ion:home",
      outline: "ion:home-outline",
      path: "/app",
    },
  ];
  return (
    <div className="absolute bottom-0 flex w-full justify-center rounded-none border-t-1 border-foreground/10 bg-background p-2">
      <div className="flex w-full max-w-screen-lg justify-evenly ">
        {items.map((item, index) => (
          <Button
            key={index}
            variant="light"
            isIconOnly
            onClick={() => {
              router.push(item.path);
            }}
            className="h-12 w-12"
          >
            <Icon
              icon={`${pathname == "/app" ? "ion:home" : "ion:home-outline"}`}
              fontSize={20}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
