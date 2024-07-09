"use client";
import { Button, Input, Link } from "@nextui-org/react";
import React from "react";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton";

export default function SignInPage() {
  const router = useRouter();
  async function handleSignIn(formData: FormData) {
    const signin = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      company_name: formData.get("company_name") as string,
      role: "employee",
      redirect: false,
    });
    if (!signin?.ok) {
      toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } else {
      router.refresh();
    }
  }
  return (
    <main>
      <div className=" flex h-[100dvh] items-center justify-center">
        <div className="flex flex-col items-center justify-center p-10">
          <Link
            className="cursor-pointer text-5xl font-bold text-primary"
            href={"/"}
          >
            ClockIn
          </Link>
          <p className="text-l text-gray-400">แอพพลิเคชั่น</p>
          <form action={handleSignIn}>
            <Input
              name="company_name"
              className="mt-6 w-80"
              type="text"
              autoCapitalize="none"
              label="ชื่อบริษัท"
              placeholder="testcompany"
              variant="bordered"
              startContent={<p className="text-sm">@</p>}
            />
            <Input
              name="email"
              className="mt-2 w-80"
              type="email"
              label="อีเมล"
              placeholder="example@gmail.com"
              variant="bordered"
            />
            <Input
              name="password"
              className="mt-2 w-80"
              label="รหัสผ่าน"
              placeholder="********"
              type="password"
              variant="bordered"
            />
            <SubmitButton title="เข้าสู่ระบบ" />
          </form>
          {/* <p className="mt-4 text-sm text-gray-400"> */}
          {/*   ยังไม่มีบัญชีใช่หรือไม่? */}
          {/*   <Link className="cursor-pointer text-primary" href={"/signup"}> */}
          {/*     {" "} */}
          {/*     สมัครเลย */}
          {/*   </Link> */}
          {/* </p> */}
        </div>
      </div>
    </main>
  );
}
