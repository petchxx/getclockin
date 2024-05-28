"use client";
import React from "react";
import Link from "next/link";
import { Card, Input, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  return (
    <main>
      <Link className="absolute left-0 top-0 ml-4 mt-4" href="/">
        back
      </Link>
      <div className=" flex h-[100dvh] items-center justify-center">
        <div className="flex flex-col items-center justify-center p-10">
          <Link
            className="cursor-pointer text-5xl font-bold text-primary"
            href={"/"}
          >
            ClockIn
          </Link>
          <p className="text-l text-gray-400">แดชบอร์ด</p>
          <form>
            <Input
              name="email"
              className="mt-6 w-80"
              type="email"
              label="อีเมล"
              placeholder="example@gmail.com"
              variant="bordered"
            />
            <Input
              name="password"
              className="mt-4 w-80"
              label="รหัสผ่าน"
              placeholder="********"
              type="password"
              variant="bordered"
            />
            <Button
              color="primary"
              className="mt-6 h-12 w-80"
              type="submit"
              variant="shadow"
            >
              เข้าสู่ระบบ
            </Button>

            {/* <LoginButton /> */}
          </form>
          <p className="mt-4 text-sm text-gray-400">
            ยังไม่มีบัญชีใช่หรือไม่?
            <Link className="cursor-pointer text-primary" href={"/signup"}>
              {" "}
              สมัครเลย
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
