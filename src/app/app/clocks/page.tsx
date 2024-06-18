import React from "react";
import TopBar from "~/app/_components/app/TopBar";
import { type Clock } from "~/lib/interface/clock";
import { api } from "~/trpc/server";

export default async function page() {
  const clock = await api.employee.getClocks();
  return (
    <div>
      <TopBar title="ประวัติการเข้างาน" />
      <div className="pt-20">
        {clock.map((c: Clock, index) => (
          <div key={index}>
            <p>{c.date_time.toISOString()}</p>
            <p>{c.status}</p>
            <p>{c.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
