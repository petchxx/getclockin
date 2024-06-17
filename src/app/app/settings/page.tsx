import React from "react";
import BottomBar from "~/app/_components/app/BottomBar";
import SettingsPage from "~/app/_components/app/SettingsPage";

export default function page() {
  return (
    <div>
      <SettingsPage />
      <BottomBar />
    </div>
  );
}
