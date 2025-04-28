import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageContainer({
  children,
  className,
  fullWidth = false,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "min-h-screen pt-24 pb-16",
        !fullWidth && "container mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </main>
  );
}
