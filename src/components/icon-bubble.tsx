import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Theme-gradient glass bubble holding an icon (blue→violet or orange→red). */
export function IconBubble({ icon: Icon, size = "md", className }: { icon: LucideIcon; size?: "sm" | "md" | "lg"; className?: string }) {
  return (
    <span
      className={cn(
        "glass glass-solid glass-bubble glass-tinted inline-flex shrink-0 items-center justify-center text-white",
        size === "sm" && "size-9 rounded-xl",
        size === "md" && "size-11 rounded-2xl",
        size === "lg" && "size-14 rounded-[1.1rem]",
        className,
      )}
    >
      <Icon className={cn("relative", size === "lg" ? "size-6" : size === "sm" ? "size-4" : "size-5")} aria-hidden="true" />
    </span>
  );
}
