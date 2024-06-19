import { Icon } from "@iconify/react/dist/iconify.js";
import { Card } from "@nextui-org/react";
import React from "react";
import { type AppOvertime, type Overtime } from "~/lib/interface/overtime";

type Props = {
  overtime: AppOvertime;
};

export default function OvertimeCard({ overtime }: Props) {
  return (
    <Card key={overtime.id} className="flex-row justify-between gap-2 p-4 ">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${overtime.status == "pending" ? "bg-primary/20" : overtime.status == "approved" ? "bg-success/20" : "bg-red-500/20"}`}
        >
          <Icon
            icon="ion:trending-up-outline"
            fontSize={24}
            className={`${overtime.status == "pending" ? "text-primary" : overtime.status == "approved" ? "text-green-500" : "text-red-500"}`}
          />
        </div>
        <div className="flex flex-col ">
          <p className="">
            {overtime.from.split(":")[0]}:{overtime.from.split(":")[1]} -{" "}
            {overtime.to.split(":")[0]}:{overtime.to.split(":")[1]}
          </p>
          <p className="text-xs text-foreground/50">
            {" "}
            {new Date(overtime.date).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <p
          className={`${
            overtime.status == "pending"
              ? "text-primary"
              : overtime.status == "approved"
                ? "text-green-500"
                : "text-red-500"
          }`}
        >
          {overtime.status == "pending"
            ? "กำลังรอ"
            : overtime.status == "approved"
              ? "อนุมัติ"
              : "ไม่อนุมัติ"}
        </p>
        <p className="text-xs "></p>
      </div>
    </Card>
  );
}
