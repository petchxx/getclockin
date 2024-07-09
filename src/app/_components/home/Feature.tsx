"use client";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function Feature() {
  const features = [
    {
      icon: <Icon icon="ri:account-pin-circle-line" fontSize={20} />,
      title: "บันทึกเวลา เข้า-ออก",
      description: "บันทึกเวลาการเข้าและออกงานของพนักงานได้",
    },

    {
      icon: <Icon icon="ri:line-fill" fontSize={20} />,
      title: "แจ้งเตือนผ่าน Line",
      description: "แจ้งเตือนผ่าน Line ได้ เมื่อพนักงานเข้าและออกงาน",
    },
    {
      icon: <Icon icon="ri:history-line" fontSize={20} />,
      title: "ดูประวัติ",
      description: "ดูประวัติการเข้างานของพนักงานได้",
    },
    {
      icon: <Icon icon="ri:calculator-line" fontSize={20} />,
      title: "คำนวนเงินเดือน",
      description: "ระบบคำนวนเงินเดือนของพนักงานอัตโนมัติ",
    },
    {
      icon: <Icon icon="ri:calendar-event-line" fontSize={20} />,

      title: "ขอลา",
      description: "สามารถให้พนักงานขอลาได้ผ่านระบบ",
    },
    {
      icon: <Icon icon="ri:calendar-schedule-line" fontSize={20} />,
      title: "ขอทำงานล่วงเวลา",
      description: "สามารถให้พนักงานขอทำงานล่วงเวลาได้ผ่านระบบ",
    },
  ];
  return (
    <motion.div
      className="mt-14 flex flex-col items-center justify-center pt-20"
      id="features"
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween" }}
    >
      <Chip color="primary" className="rounded-full ">
        ฟีเจอร์
      </Chip>
      <p className="mt-4 text-center text-4xl">ClockIn ทำอะไรได้?</p>
      <p className="mt-4 max-w-screen-md px-6 text-center text-foreground/60">
        ClockIn ทำให้คุณสามารถบันทึกเวลาการทำงานของพนักงานได้ง่ายๆ และสะดวก
        โดยจะมีการบันทึกเวลาและสถานที่เข้าทำงานที่แม่นยำ
        และยังสมารถคำนวนเงินเดือนได้อีกด้วย
      </p>
      <div className="mt-4 grid w-full grid-cols-1 items-center justify-center gap-6  p-6 sm:w-auto  md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          return (
            <Card
              className="h-48 w-full cursor-pointer p-4 hover:scale-[1.02] md:w-80"
              key={index}
            >
              <CardHeader className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary bg-opacity-20 text-primary">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg ">{feature.title}</p>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-foreground/60">{feature.description}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* <motion.div */}
      {/*   className="mt-12" */}
      {/*   // transition={{ type: "tween" }} */}
      {/* > */}
      {/*   <Image */}
      {/*     src="/images/desktop.svg" */}
      {/*     alt="Clockin" */}
      {/*     height={1000} */}
      {/*     width={1000} */}
      {/*     className="rounded-3xl border-4" */}
      {/*   /> */}
      {/* </motion.div> */}
    </motion.div>
  );
}
