"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/app/components/ThemeProvider";

const ThemeToggle = ({ className = "" }) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/75 px-3 py-2 text-sm font-medium text-slate-700 backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-[#12233a]/85 dark:text-slate-200 dark:hover:bg-[#19304f] ${className}`}
    >
      {isDark ? <FiSun /> : <FiMoon />}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;
