"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";

type Props = {
  size?: "sm" | "md" | "lg";
};

export function ThemeSwitcher({ size }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme == "light" ? (
        <Button
          isIconOnly
          size={size ?? "md"}
          variant="light"
          onClick={() => setTheme("dark")}
        >
          <Icon icon="line-md:moon-rising-loop" fontSize={24} />
        </Button>
      ) : (
        <Button
          size={size ?? "md"}
          isIconOnly
          variant="light"
          onClick={() => setTheme("light")}
        >
          <Icon icon="line-md:sun-rising-loop" fontSize={24} />
        </Button>
      )}
    </div>
  );
}
