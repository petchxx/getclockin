import { Skeleton } from "@nextui-org/react";
import React from "react";
import ClockCard from "~/app/_components/app/ClockCard";
import TopBar from "~/app/_components/app/TopBar";
import { type Clock } from "~/lib/interface/clock";
import { type Employee } from "~/lib/interface/employee";
import { api } from "~/trpc/server";

export default async function page() {
  const clocks = await api.employee.getClocks();
  const employee = await api.employee.get();
  return (
    <div>
      <TopBar title="ประวัติการเข้างาน" isBack />
      <div className=" flex justify-center pt-20">
        <div className="mt-4 flex min-h-[280px] w-80 flex-col gap-2">
          {!clocks ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </div>
          ) : clocks.length > 0 ? (
            clocks?.map((clock, index) => (
              <ClockCard
                key={index}
                clock={clock}
                employee={employee as Employee}
              />
            ))
          ) : (
            <div className="group flex h-[280px] w-full items-center justify-center gap-2 text-foreground/50"></div>
          )}
        </div>
      </div>
    </div>
  );
}
