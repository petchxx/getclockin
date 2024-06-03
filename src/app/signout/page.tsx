"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {};

export default function page({}: Props) {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/signin" });
  }, []);
  return <div>Signing out...</div>;
}
