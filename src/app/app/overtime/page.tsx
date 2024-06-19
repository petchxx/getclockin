import React from "react";
import BottomBar from "~/app/_components/app/BottomBar";
import OvertimePage from "~/app/_components/app/overtime/OvertimePage";

export default function page() {
  return (
    <div>
      <OvertimePage />
      <BottomBar />
    </div>
  );
}
