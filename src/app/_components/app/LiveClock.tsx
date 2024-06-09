import moment from "moment";
import React, { useEffect, useState } from "react";

export default function LiveClock() {
  const [dateTime, setDateTime] = useState<{ date: string; time: string }>({
    date: new Date().toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),

    time: moment().format("HH:mm"),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime({
        date: new Date().toLocaleDateString("th-TH", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),

        time: moment().format("HH:mm"),
      });
    }, 1001);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <p>{dateTime.date}</p>
      <p className="text-7xl ">{dateTime.time}</p>
    </div>
  );
}
