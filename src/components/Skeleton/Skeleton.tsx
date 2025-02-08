import React from "react";
import { cn } from "@/utils/cn"; // Tu helper para clases condicionales

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rectangular" | "circular";
  animation?: "wave" | "pulse" | "none";
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  variant = "text",
  animation = "wave",
  className,
}: SkeletonProps) {
  const styles = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        "bg-gray-300 dark:bg-gray-700 rounded",
        animation === "wave" && "animate-wave",
        animation === "pulse" && "animate-pulse",
        variant === "text" && "h-4 rounded-sm",
        variant === "rectangular" && "rounded-md",
        variant === "circular" && "rounded-full",
        className
      )}
      style={styles}
    />
  );
}
