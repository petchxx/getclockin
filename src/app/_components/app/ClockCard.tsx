import { Icon } from "@iconify/react/dist/iconify.js";
import { Card } from "@nextui-org/react";
import moment from "moment";
import React from "react";
import { type Clock } from "~/lib/interface/clock";
import { type Employee } from "~/lib/interface/employee";

type Props = {
  clock: Clock;
  employee: Employee;
};

export default function ClockCard({ clock, employee }: Props) {
  const calculateEarlyLate = (
    start: string,
    stop: string,
    status: string,
    clock_date_time: Date,
  ) => {
    const today = moment().startOf("day"); // Get the start of the current day

    // Set the date part of each time to today
    const start_time = moment(start, "HH:mm:ss").set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    const stop_time = moment(stop, "HH:mm:ss").set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    const clock_time = moment(clock_date_time).set({
      year: today.year(),
      month: today.month(),
      date: today.date(),
    });

    if (status === "in") {
      const difference = clock_time.diff(start_time, "minutes");

      if (difference < 0) {
        const earlyBy = Math.abs(difference - 1);
        return (
          <p className="text-foreground/50">
            ก่อน {Math.floor(earlyBy / 60)}.{earlyBy % 60} ชม.
          </p>
        );
      } else if (difference === 0) {
        return <p className="text-foreground/50">ตรงเวลา</p>;
      } else {
        const lateBy = Math.abs(difference);
        return (
          <p className="text-red-500">
            สาย {Math.floor(lateBy / 60)}.{lateBy % 60} ชม.
          </p>
        );
      }
    }

    if (status === "out") {
      const difference = clock_time.diff(stop_time, "minutes");

      if (difference < 0) {
        const earlyBy = Math.abs(difference - 1);
        return (
          <p className="text-red-500">
            ก่อน {Math.floor(earlyBy / 60)}.{earlyBy % 60} ชม.
          </p>
        );
      } else if (difference === 0) {
        return <p className="text-foreground/50">ตรงเวลา</p>;
      } else {
        const lateBy = Math.abs(difference);
        return (
          <p className="text-foreground/50">
            เกิน {Math.floor(lateBy / 60)}.{lateBy % 60} ชม.
          </p>
        );
      }
    }
  };

  return (
    <div className="transform transition-transform duration-300 ease-in-out hover:scale-105">
      <Card className="flex-row justify-between gap-2 p-4">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${clock.status == "in" ? "bg-primary/20" : "bg-red-500/20"}`}
          >
            {clock.status == "in" ? (
              <Icon
                icon="ion:log-in-outline"
                fontSize={24}
                className="text-primary"
              />
            ) : (
              <Icon
                icon="ion:log-out-outline"
                fontSize={24}
                className="text-red-500"
              />
            )}
          </div>
          <div className="flex flex-col ">
            <p className="">{clock.status == "in" ? "เข้างาน" : "ออกงาน"}</p>
            <p className="text-xs text-foreground/50">
              {new Date(clock.date_time).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <p className="">{moment(clock.date_time).format("HH:mm")}</p>
          <div className="text-xs ">
            {calculateEarlyLate(
              employee.start_time,
              employee.stop_time,
              clock.status,
              clock.date_time,
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
