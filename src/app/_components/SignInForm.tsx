"use client";
import React from "react";
import Link from "next/link";
import { Card, Input, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SignInForm() {
  const router = useRouter();
  const { pending } = useFormStatus();

  async function handleSignIn(formdata: FormData) {
    const signin = await signIn("credentials", {
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
      role: "company",
      redirect: false,
    });
    if (!signin?.ok) {
      toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return;
    } else {
      return router.push("/dashboard");
    }
  }

  return (
    <main>
      <Link className="absolute left-0 top-0 ml-4 mt-4" href="/">
        <Icon icon="ion:chevron-back-outline" fontSize={24} />
      </Link>
      <div className=" flex h-[100dvh] items-center justify-center">
        <div className="flex flex-col items-center justify-center p-10">
          <p className="cursor-pointer text-5xl font-bold text-primary">
            ClockIn
          </p>
          <p className="text-l text-gray-400">แดชบอร์ด</p>
          <form action={handleSignIn}>
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
            <SubmitButton title="เข้าสู่ระบบ" />
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
