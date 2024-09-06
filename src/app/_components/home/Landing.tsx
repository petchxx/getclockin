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
      <div
        className="flex max-w-5xl flex-col-reverse items-center justify-center px-6 md:flex-row"
        style={{
          perspective: "2000px",
        }}
      >
        <motion.div className="mr-12 mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
            className="text-lg text-primary"
          >
            คล็อคอิน
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              delay: 0.2,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-6xl  font-semibold  text-transparent"
          >
            ระบบบันทึกเวลาทำงาน
            {/* eng */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              delay: 0.5,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="mt-4 max-w-xl bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-lg text-transparent"
          >
            ClockIn คือระบบบันทึกเวลาทำงาน
            ที่สามารถบันทึกเวลาและสถานที่เข้าทำงานได้
            และยังสามารถจัดการคำขอลาและการขอทำงานล่วงหน้าได้
            และยังสามารถคำนวณเงินเดือนได้อีกด้วย ระบบ HR ดีที่สุด
            {/* eng */}
            {/*ClockIn is an easy-to-use and convenient time tracking system.
              It can record the time and location of work at all times. And
              can view work reports easily and conveniently. Suitable for
              companies that want to record employee work hours*/}
          </motion.div>
          <div className="mt-6 flex gap-2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                type: "tween",
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <Button
                disableRipple
                className="relative overflow-visible bg-primary  text-white shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-xl after:bg-primary/40 after:transition after:!duration-500 after:content-[''] hover:after:scale-150 hover:after:opacity-0"
                as={Link}
                href="/signup"
                size="lg"
              >
                เริ่มต้นใช้งาน
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeOut",
                delay: 1,
              }}
            >
              <Button color="primary" variant="bordered" size="lg">
                ดูตัวอย่าง
              </Button>
            </motion.div>
          </div>
        </motion.div>
        {/* <div className="h-[600px] w-80 "> */}
        {/*   <Spline scene="https://prod.spline.design/e0XdiplgvapfH87v/scene.splinecode" /> */}
        {/* </div> */}

        <motion.div
          initial={{ opacity: 0, rotateX: -45 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            type: "spring",
            duration: 1,
            ease: "easeOut",
          }}
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
