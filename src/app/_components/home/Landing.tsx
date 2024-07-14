"use client";
import { Button, Link, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "next-themes";

export default function Landing() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="flex max-w-5xl flex-col-reverse items-center justify-center px-6 md:flex-row">
        <motion.div
          className="mr-12 mt-10 md:mt-0"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "tween" }}
        >
          <h1 className="font-semibold text-primary">คล็อคอิน</h1>
          <h1 className="text-4xl font-semibold">
            ระบบบันทึกเวลาทำงาน
            {/* eng */}
          </h1>
          <p className="mt-4 max-w-xl text-foreground/60">
            ClockIn คือระบบบันทึกเวลาทำงาน
            ที่สามารถบันทึกเวลาและสถานที่เข้าทำงานได้
            และยังสามารถจัดการคำขอลาและการขอทำงานล่วงหน้าได้
            และยังสามารถคำนวนเงินเดือนได้อีกด้วย ระบบ HR ดีที่สุด
            {/* eng */}
            {/*ClockIn is an easy-to-use and convenient time tracking system.
              It can record the time and location of work at all times. And
              can view work reports easily and conveniently. Suitable for
              companies that want to record employee work hours*/}
          </p>
          <div className="mt-6 flex gap-2">
            <Button
              disableRipple
              className="relative overflow-visible bg-primary  text-white shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-xl after:bg-primary/40 after:transition after:!duration-500 after:content-[''] hover:after:scale-150 hover:after:opacity-0"
              as={Link}
              href="/signup"
              size="lg"
            >
              เริ่มต้นใช้งาน
            </Button>

            <Button color="primary" variant="bordered" size="lg">
              ดูตัวอย่าง
            </Button>
          </div>
        </motion.div>
        {/* <div className="h-[600px] w-80 "> */}
        {/*   <Spline scene="https://prod.spline.design/e0XdiplgvapfH87v/scene.splinecode" /> */}
        {/* </div> */}

        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "tween" }}
          className=""
        >
          <Image
            src={
              theme == "dark"
                ? "/images/phone-dark.png"
                : "/images/phone-light.png"
            }
            className="object-cover"
            alt="Clockin"
            width={300}
            height={300}
            priority={true}
          />
        </motion.div>
      </div>
    </div>
  );
}
