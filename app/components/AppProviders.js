"use client";

import { AuthProvider } from "@/app/components/AuthProvider";
import { ThemeProvider } from "@/app/components/ThemeProvider";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
