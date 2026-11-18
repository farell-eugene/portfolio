"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { LiquidButton } from "@/components/liquid";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <LiquidButton
      size="icon"
      lens
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light and dark mode"
      className="text-muted-foreground hover:text-foreground"
    >
      <Sun className="size-[18px] scale-100 rotate-0 transition-transform duration-500 ease-smooth dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[18px] scale-0 rotate-90 transition-transform duration-500 ease-smooth dark:scale-100 dark:rotate-0" />
    </LiquidButton>
  );
}
