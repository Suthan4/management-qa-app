"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@components/layout/themeProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
