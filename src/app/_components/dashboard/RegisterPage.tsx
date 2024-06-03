import { Input, Link } from "@nextui-org/react";
import React from "react";
import { Company } from "~/lib/interface/company";

type Props = {
  company: Company;
};

export default function RegisterPage({ company }: Props) {
  return (
    <main>
      <Link className="absolute left-0 top-0 ml-4 mt-4" href="/"></Link>
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
              variant="bordered"
              value=""
            />
            <Input
              name="password"
              className="mt-4 w-80"
              label="รหัสผ่าน"
              placeholder="********"
              type="password"
              variant="bordered"
            />
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
