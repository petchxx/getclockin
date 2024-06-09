"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import TopBar from "./TopBar";

export default function SettingsPage() {
  const router = useRouter();
  return (
    <div className="">
      <TopBar title="ตั้งค่า" />
      <div className="flex justify-center">
        <Button
          color="danger"
          className="mt-4 w-80"
          onClick={async () => {
            await signOut();
          }}
        >
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
}
