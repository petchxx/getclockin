import React from "react";

import Topbar from "./TopBar";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.mjs";
type Props = {};

export default function OvertimePage({}: Props) {
  return (
    <div>
      <Topbar title="ขอทำงานล่วงเวลา" />
      <Button
        className="absolute bottom-24 right-6 h-16 w-16 rounded-xl"
        color="primary"
        variant="flat"
        isIconOnly
      >
        <Icon icon="ion:add-outline" fontSize={24} />
      </Button>
    </div>
  );
}
