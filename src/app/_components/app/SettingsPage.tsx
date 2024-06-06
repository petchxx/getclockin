"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";

export default function SettingsPage() {
  return (
    <Button
      color="danger"
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </Button>
  );
}
