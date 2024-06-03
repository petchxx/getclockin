"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button, toggle } from "@nextui-org/react";
import SidebarItem from "./SidebarItem";
import { Icon } from "@iconify/react";
import { Company } from "~/lib/interface/company";

type Props = {
  company: Company;
};

export default function Sidebar({ company }: Props) {
  return (
    <div
      className={`sticky top-0 hidden h-screen w-80 border-r-1 border-foreground/30 bg-background p-4 shadow-sm shadow-foreground/20 lg:block`}
    >
      <h1 className="flex text-4xl font-bold text-primary ">ClockIn</h1>
      <div className="mt-6">
        {/* <h1 className='text-black'>Dashboard</h1> */}
        {company.status !== "active" ? (
          ""
        ) : (
          <div className="">
            <SidebarItem
              path="/dashboard"
              icon={<Icon icon="ri:account-pin-circle-line" fontSize={20} />}
              title="แดชบอร์ด"
            />

            <p className="mt-2 text-sm ">จัดการพนักงาน</p>
            <SidebarItem
              path="/dashboard/employee"
              icon={<Icon icon="ri:account-pin-circle-line" fontSize={20} />}
              title="พนักงาน"
            />

            <SidebarItem
              path="/dashboard/calculate"
              icon={<Icon icon="ri:account-pin-circle-line" fontSize={20} />}
              title="คำนวนเงินเดือน"
            />

            <p className="mt-2 text-sm">คำขอ</p>

            <SidebarItem
              path="/dashboard/leave"
              icon={<Icon icon="ri:account-pin-circle-line" fontSize={20} />}
              title="ลางาน"
            />

            <SidebarItem
              path="/dashboard/overtime"
              icon={<Icon icon="ri:account-pin-circle-line" fontSize={20} />}
              title="เพิ่มเวลาทำงาน"
            />
          </div>
        )}
        <p className="mt-2 text-sm">บัญชี</p>
        <SidebarItem
          path="/dashboard/status"
          icon={<Icon icon="ri:account-pin-circle-line" fontSize={20} />}
          title="สถานะ"
        />

        <SidebarItem
          path="/dashboard/settings"
          icon={<Icon icon="ri:account-pin-circle-line" fontSize={20} />}
          title="ตั้งค่า"
        />
      </div>
    </div>
  );
}
