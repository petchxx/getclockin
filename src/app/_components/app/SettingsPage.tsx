"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import TopBar from "./TopBar";

export default function SettingsPage() {
  const router = useRouter();
  return (
    <div>
      <TopBar title="ตั้งค่า" />
      <Button
        color="danger"
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
