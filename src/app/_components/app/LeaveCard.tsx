import { Icon } from "@iconify/react/dist/iconify.js";
import { Card } from "@nextui-org/react";
import React from "react";
import { type AppLeave, type Leave } from "~/lib/interface/leave";

type Props = {
  leave: AppLeave;
};

export default function LeaveCard({ leave }: Props) {
  return (
    <Card key={leave.id} className="flex-row justify-between gap-2 p-4 ">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${leave.status == "pending" ? "bg-primary/20" : leave.status == "approved" ? "bg-success/20" : "bg-red-500/20"}`}
        >
          <Icon
            icon="ion:trending-up-outline"
            fontSize={24}
            className={`${leave.status == "pending" ? "text-primary" : leave.status == "approved" ? "text-green-500" : "text-red-500"}`}
          />
        </div>
        <div className="flex flex-col ">
          <p className="">{leave.leave_type}</p>
          <p className="text-xs text-foreground/50">
            {" "}
            {new Date(leave.from).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "short",
            })}{" "}
            -{" "}
            {new Date(leave.to).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <p
          className={`${
            leave.status == "pending"
              ? "text-primary"
              : leave.status == "approved"
                ? "text-green-500"
                : "text-red-500"
          }`}
        >
          {leave.status == "pending"
            ? "กำลังรอ"
            : leave.status == "approved"
              ? "อนุมัติ"
              : "ไม่อนุมัติ"}
        </p>
        <p className="text-xs "></p>
      </div>
    </Card>
  );
}
