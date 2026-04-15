"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  FiArchive,
  FiClock,
  FiFileText,
  FiLogOut,
  FiPlus,
  FiRefreshCcw,
  FiSearch,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useAuth } from "@/app/components/AuthProvider";
import { auth, db } from "@/lib/firebase";

const SIDEBAR_ITEMS = [
  { id: "all", label: "All documents", icon: FiFileText },
  { id: "starred", label: "Starred", icon: FiStar },
  { id: "trash", label: "Trash", icon: FiTrash2 },
];

const INITIAL_DOC_CONTENT = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

const formatDate = value => {
  if (!value) {
    return "Just now";
  }

  return new Date(value).toLocaleString();
};

const extractPreview = content => {
  const paragraphs = content?.content || [];
  const text = paragraphs
    .flatMap(item => item.content || [])
    .map(item => item.text || "")
    .join(" ")
    .trim();

  return text || "Open the document to start writing.";
};

export default function DocsDashboard() {
  const { user, loading } = useAuth();
  const [docs, setDocs] = useState([]);
  const [activeSection, setActiveSection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return undefined;
    }

    if (!user) {
      router.push("/user/login");
      return undefined;
    }

    const documentsQuery = query(
      collection(db, "documents"),
      where("ownerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(documentsQuery, snapshot => {
      const nextDocs = snapshot.docs
        .map(item => ({
          id: item.id,
          ...item.data(),
        }))
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

      setDocs(nextDocs);
    });

    return unsubscribe;
  }, [loading, router, user]);

  const filteredDocs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return docs.filter(item => {
      const isTrashed = item.status === "trashed";
      const matchesSection =
        activeSection === "all"
          ? !isTrashed
          : activeSection === "starred"
            ? item.isStarred && !isTrashed
            : isTrashed;

      const haystack = `${item.title || ""} ${extractPreview(item.content)}`.toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 || haystack.includes(normalizedSearch);

      return matchesSection && matchesSearch;
    });
  }, [activeSection, docs, searchTerm]);

  const stats = useMemo(() => {
    const activeDocs = docs.filter(item => item.status !== "trashed");
    const trashedDocs = docs.filter(item => item.status === "trashed");
    const starredDocs = activeDocs.filter(item => item.isStarred);

    return [
      {
        id: "active",
        label: "Active docs",
        value: activeDocs.length,
        icon: FiFileText,
      },
      {
        id: "starred",
        label: "Starred",
        value: starredDocs.length,
        icon: FiStar,
      },
      {
        id: "trash",
        label: "In trash",
        value: trashedDocs.length,
        icon: FiArchive,
      },
    ];
  }, [docs]);

  const createDoc = async () => {
    if (!user) {
      router.push("/user/login");
      return;
    }

    try {
      setIsCreating(true);

      const timestamp = Date.now();
      const newDoc = await addDoc(collection(db, "documents"), {
        title: "Untitled Document",
        content: INITIAL_DOC_CONTENT,
        createdAt: timestamp,
        updatedAt: timestamp,
        ownerId: user.uid,
        ownerEmail: user.email || null,
        status: "active",
        isStarred: false,
        trashedAt: null,
      });
      router.push(`/docs/${newDoc.id}`);
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading workspace...</div>;
  }

  if (!user) {
    return null;
  }

  const toggleStar = async item => {
    await updateDoc(doc(db, "documents", item.id), {
      isStarred: !item.isStarred,
      updatedAt: Date.now(),
    });
  };

  const moveToTrash = async item => {
    await updateDoc(doc(db, "documents", item.id), {
      status: "trashed",
      trashedAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  const restoreFromTrash = async item => {
    await updateDoc(doc(db, "documents", item.id), {
      status: "active",
      trashedAt: null,
      updatedAt: Date.now(),
    });
  };

  const permanentlyDelete = async item => {
    await deleteDoc(doc(db, "documents", item.id));
  };

  const sectionTitle =
    activeSection === "all"
      ? "Workspace"
      : activeSection === "starred"
        ? "Starred documents"
        : "Trash";

  const sectionDescription =
    activeSection === "all"
      ? "Everything you are actively drafting, editing, and shipping."
      : activeSection === "starred"
        ? "Quick access to the documents that matter most."
        : "Soft-deleted documents live here until you restore or permanently delete them.";

  return (
    <div className="min-h-screen bg-[#f3f1ea] text-slate-900 dark:bg-[#07111f] dark:text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="flex w-full flex-col border-b border-black/10 bg-[#e7edf7]/92 px-5 py-6 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r dark:border-white/10 dark:bg-[#0b1728]/94">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950">
                <FiFileText className="text-lg" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  DocsKraft
                </p>
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Workspace</h1>
              </div>
            </div>

            <button
              onClick={createDoc}
              disabled={isCreating}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
            >
              <FiPlus />
              {isCreating ? "Creating..." : "New document"}
            </button>

            <nav className="mt-8 flex flex-col gap-2">
              {SIDEBAR_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = item.id === activeSection;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition ${isActive
                        ? "border-slate-200 bg-white text-black shadow-sm dark:border-white/10 dark:bg-[#13243b] dark:text-slate-100"
                        : "border-transparent text-slate-600 hover:bg-white/70 hover:text-black dark:text-slate-400 dark:hover:bg-[#12233a] dark:hover:text-white"
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="text-base" />
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {item.id === "all"
                        ? stats[0].value
                        : item.id === "starred"
                          ? stats[1].value
                          : stats[2].value}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 border-t border-black/10 pt-5 dark:border-white/10 lg:mt-auto">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
              {user.email || "Signed in"}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <ThemeToggle className="flex-1 justify-center" />
              <button
                type="button"
                onClick={() => signOut(auth)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <div className="rounded-xl border border-black/10 bg-[#fbfaf7]/94 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8 dark:border-white/10 dark:bg-[#0c1a2d]/94 dark:shadow-[0_26px_80px_rgba(2,8,23,0.5)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Docs dashboard
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                  {sectionTitle}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {sectionDescription}
                </p>
              </div>

              <div className="flex w-full max-w-xl items-center justify-end gap-3">
                <div className="relative w-full max-w-md">
                  <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    value={searchTerm}
                    onChange={event => setSearchTerm(event.target.value)}
                    placeholder="Search by title or content..."
                    className="w-full rounded-lg border border-black/10 bg-white px-11 py-3 text-sm outline-none transition focus:border-black dark:border-white/10 dark:bg-[#102038] dark:text-slate-100 dark:focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {stats.map(item => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className="rounded-lg border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#102038]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                      <Icon className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-slate-100">{item.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-[#102038]">
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
                <div>
                  <h3 className="font-semibold text-slate-950 dark:text-slate-100">Documents</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Realtime updates keep this view fresh as docs change.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-[#182d4a] dark:text-slate-300">
                  {filteredDocs.length} shown
                </span>
              </div>

              {filteredDocs.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 dark:bg-[#182d4a]">
                    <FiClock className="text-xl text-slate-400 dark:text-slate-500" />
                  </div>
                  <h4 className="mt-5 text-lg font-semibold text-slate-950 dark:text-slate-100">
                    Nothing here yet
                  </h4>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {activeSection === "trash"
                      ? "Your trash is clear. Deleted documents will appear here until you restore them or remove them forever."
                      : "Create a document to start building out the workspace."}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-black/5 dark:divide-white/10">
                  {filteredDocs.map(item => {
                    const isTrashed = item.status === "trashed";

                    return (
                      <div
                        key={item.id}
                        className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between"
                      >
                        <Link
                          href={`/docs/${item.id}`}
                          className="flex-1 text-left transition hover:opacity-90"
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef3fb] text-slate-600 dark:bg-[#182d4a] dark:text-slate-300">
                              <FiFileText />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-base font-semibold text-slate-950 dark:text-slate-100">
                                  {item.title || "Untitled Document"}
                                </p>
                                {item.isStarred && !isTrashed ? (
                                  <FiStar className="shrink-0 fill-current text-amber-500" />
                                ) : null}
                              </div>
                              <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                {extractPreview(item.content)}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400 dark:text-slate-500">
                                <span>Updated {formatDate(item.updatedAt)}</span>
                                <span>Created {formatDate(item.createdAt)}</span>
                                {item.trashedAt ? (
                                  <span>Trashed {formatDate(item.trashedAt)}</span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className="flex flex-wrap items-center gap-2">
                          {!isTrashed ? (
                            <>
                              <button
                                onClick={() => toggleStar(item)}
                                className={`rounded-lg px-3 py-2 text-sm transition ${item.isStarred
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-400/20 dark:text-amber-200 dark:hover:bg-amber-400/30"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-[#182d4a] dark:text-slate-300 dark:hover:bg-[#203858]"
                                  }`}
                              >
                                {item.isStarred ? "Unstar" : "Star"}
                              </button>
                              <button
                                onClick={() => moveToTrash(item)}
                                className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 transition hover:bg-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:hover:bg-rose-500/25"
                              >
                                Move to trash
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => restoreFromTrash(item)}
                                className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 transition hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-200 dark:hover:bg-emerald-500/25"
                              >
                                <FiRefreshCcw className="text-sm" />
                                Restore
                              </button>
                              <button
                                onClick={() => permanentlyDelete(item)}
                                className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 transition hover:bg-rose-100 dark:bg-rose-500/15 dark:text-rose-200 dark:hover:bg-rose-500/25"
                              >
                                Delete forever
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
