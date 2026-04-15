"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { SiMaterialformkdocs } from "react-icons/si";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useAuth } from "@/app/components/AuthProvider";
import { auth } from "@/lib/firebase";

const LoginPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/docs");
    }
  }, [loading, router, user]);

  const handleProviderSignIn = async providerName => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const provider =
        providerName === "google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();

      await signInWithPopup(auth, provider);
      router.push("/docs");
    } catch {
      setErrorMessage(
        `Could not continue with ${providerName === "google" ? "Google" : "GitHub"}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm rounded-xl border border-white/60 bg-white/78 p-8 shadow-[var(--shadow)] backdrop-blur dark:border-white/10 dark:bg-[#0c1828]/88">
        <div className="mb-8 flex flex-col items-center">
          <SiMaterialformkdocs className="mb-2 text-3xl text-sky-700 dark:text-sky-300" />
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            DocsKraft
          </h1>
        </div>
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Welcome back
        </h2>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleProviderSignIn("google")}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white/90 px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-[#102038] dark:text-slate-100 dark:hover:bg-[#163154]"
          >
            <span className="text-base">G</span>
            {isSubmitting ? "Connecting..." : "Continue with Google"}
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleProviderSignIn("github")}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
          >
            <span className="text-base">GH</span>
            {isSubmitting ? "Connecting..." : "Continue with GitHub"}
          </button>
          {errorMessage ? (
            <p className="text-sm text-rose-600 dark:text-rose-300">
              {errorMessage}
            </p>
          ) : null}
        </div>
        <p className="mt-5 text-center text-sm leading-6 text-slate-600 dark:text-slate-400">
          Sign in with the provider you want to use for DocsKraft.
        </p>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Need an account?{" "}
          <Link
            href="/user/signup"
            className="text-slate-950 hover:underline dark:text-slate-100"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
