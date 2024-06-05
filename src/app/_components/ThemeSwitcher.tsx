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
      {theme === "dark" ? (
        <Button
          size={size ?? "md"}
          isIconOnly
          variant="light"
          onClick={() => setTheme("light")}
        >
          <Icon icon="ion:sunny-outline" fontSize={20} />
        </Button>
      ) : (
        <Button
          isIconOnly
          size={size ?? "md"}
          variant="light"
          onClick={() => setTheme("dark")}
        >
          <Icon icon="ion:moon-outline" fontSize={20} />
        </Button>
      )}
    </div>
  );
}
