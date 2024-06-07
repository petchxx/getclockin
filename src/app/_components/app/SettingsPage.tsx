"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SettingsPage() {
  const router = useRouter();
  return (
    <Button
      color="danger"
      onClick={async () => {
        await signOut();
        router.push("/");
      }}
    >
      Sign Out
    </Button>
  );
}
