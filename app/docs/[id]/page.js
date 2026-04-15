"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import Editor from "@/app/components/Editor";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FiArrowLeft, FiClock, FiLogOut, FiStar, FiTrash2 } from "react-icons/fi";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useAuth } from "@/app/components/AuthProvider";

const formatDate = value => {
  if (!value) {
    return "Just now";
  }

  return new Date(value).toLocaleString();
};

export default function DocPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [docData, setDocData] = useState(null);
  const saveTimerRef = useRef(null);

  useEffect(() => {
    if (!id || loading) {
      return undefined;
    }

    if (!user) {
      router.push("/user/login");
      return undefined;
    }

    const ref = doc(db, "documents", id);
    const unsubscribe = onSnapshot(ref, snapshot => {
      if (snapshot.exists()) {
        const nextDoc = {
          id: snapshot.id,
          ...snapshot.data(),
        };

        if (nextDoc.ownerId && nextDoc.ownerId !== user.uid) {
          router.push("/docs");
          return;
        }

        setDocData(nextDoc);
      } else {
        router.push("/docs");
      }
    });

    return () => unsubscribe();
  }, [id, loading, router, user]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const handleUpdate = async (content) => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(async () => {
      const ref = doc(db, "documents", id);

      await updateDoc(ref, {
        content,
        updatedAt: Date.now(),
      });
    }, 300);
  };

  const handleTitleChange = async event => {
    const nextTitle = event.target.value;

    setDocData(current =>
      current
        ? {
            ...current,
            title: nextTitle,
          }
        : current
    );

    await updateDoc(doc(db, "documents", id), {
      title: nextTitle,
      updatedAt: Date.now(),
    });
  };

  const toggleStar = async () => {
    await updateDoc(doc(db, "documents", id), {
      isStarred: !docData.isStarred,
      updatedAt: Date.now(),
    });
  };

  const moveToTrash = async () => {
    await updateDoc(doc(db, "documents", id), {
      status: "trashed",
      trashedAt: Date.now(),
      updatedAt: Date.now(),
    });

    router.push("/docs");
  };

  if (loading || !docData) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] px-4 py-6 text-slate-900 dark:bg-[#07111f] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col gap-4 rounded-xl border border-black/10 bg-white/82 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-[#0c1a2d]/90 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-black dark:text-slate-400 dark:hover:text-white"
              >
                <FiArrowLeft />
                Back to dashboard
              </Link>
              <input
                value={docData.title || ""}
                onChange={handleTitleChange}
                placeholder="Untitled Document"
                className="mt-3 w-full max-w-3xl border-none bg-transparent text-3xl font-semibold tracking-tight text-slate-950 outline-none dark:text-slate-100"
              />
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <FiClock />
                  Last updated {formatDate(docData.updatedAt)}
                </span>
                {docData.status === "trashed" ? (
                  <span className="rounded-lg bg-rose-100 px-3 py-1 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200">
                    In trash
                  </span>
                ) : (
                  <span className="rounded-lg bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
                    Live sync on
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => signOut(auth)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-[#182d4a] dark:text-slate-200 dark:hover:bg-[#203858]"
              >
                <FiLogOut />
                Logout
              </button>
              <button
                onClick={toggleStar}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  docData.isStarred
                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-400/20 dark:text-amber-200 dark:hover:bg-amber-400/30"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#182d4a] dark:text-slate-200 dark:hover:bg-[#203858]"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <FiStar className={docData.isStarred ? "fill-current" : ""} />
                  {docData.isStarred ? "Starred" : "Star"}
                </span>
              </button>
              <button
                onClick={moveToTrash}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:hover:bg-rose-500/25"
              >
                <FiTrash2 />
                Move to trash
              </button>
            </div>
          </div>
        </div>

        <Editor initialContent={docData.content} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}
