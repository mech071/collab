"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { SiMaterialformkdocs } from "react-icons/si";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useAuth } from "@/app/components/AuthProvider";
import { auth } from "@/lib/firebase";

const HIDDEN_PREFIXES = ["/docs", "/user"];

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const shouldHideNavbar = HIDDEN_PREFIXES.some(prefix =>
    pathname?.startsWith(prefix)
  );

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-black/10 bg-white/72 backdrop-blur-md dark:border-white/10 dark:bg-[#081322]/84">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-950 transition hover:opacity-80 dark:text-slate-100"
          >
            <SiMaterialformkdocs className="text-xl text-sky-700 dark:text-sky-300" />
            <span className="text-base font-semibold tracking-tight">DocsKraft</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {user ? (
              <>
                <Link
                  href="/docs"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-black/5 hover:text-black dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Open Docs
                </Link>
                <button
                  type="button"
                  onClick={() => signOut(auth)}
                  className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/user/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-black/5 hover:text-black dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/user/signup"
                  className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="h-[73px]" aria-hidden="true" />
    </>
  );
};

export default Navbar;
