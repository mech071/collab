import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 pb-16 pt-14 sm:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-1 lg:items-center">
        <div className="border border-white/70 bg-white/74 p-8 shadow-[var(--shadow)] backdrop-blur sm:p-12 dark:border-white/10 dark:bg-[#0b1728]/84">
          <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 dark:text-slate-50 sm:text-6xl">
            A sharper workspace for writing that actually feels finished.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Plan, draft, star, recover, and ship documents from a workspace that
            looks closer to a product studio than a boilerplate template.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/user/signup"
              className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
            >
              Start With DocsKraft
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-white dark:border-white/10 dark:bg-[#102038]/80 dark:text-slate-100 dark:hover:bg-[#173055]"
            >
              Open Workspace
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="border border-sky-100 bg-[#edf4ff] p-4 dark:border-white/10 dark:bg-[#12233b]">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-800 dark:text-sky-300">
                Live
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                Realtime
              </p>
            </div>
            <div className="border border-slate-200 bg-[#f3efe6] p-4 dark:border-white/10 dark:bg-[#16253a]">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
                Safer
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                Trash + restore
              </p>
            </div>
            <div className="border border-emerald-100 bg-[#e9f5ef] p-4 dark:border-white/10 dark:bg-[#122936]">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300">
                Focused
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                Starred work
              </p>
            </div>
            <div className="border border-amber-100 bg-[#f8f1df] p-4 dark:border-white/10 dark:bg-[#2a2416]">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
                Structured
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                Dashboard first
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_50%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.18),transparent_40%)] blur-2xl" />
          <div className="relative overflow-hidden border border-white/70 bg-[#fbfcff]/86 p-6 shadow-[var(--shadow)] backdrop-blur dark:border-white/10 dark:bg-[#091525]/90">
            <div className="border border-slate-200/80 bg-white/90 p-5 dark:border-white/10 dark:bg-[#102038]/90">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Workspace Preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                    Calm on the surface, powerful underneath.
                  </h2>
                </div>
                <div className="border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-white dark:border-sky-300/20 dark:bg-sky-400 dark:text-slate-950">
                  Live Sync
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="border border-sky-100 bg-[#eef4ff] p-4 dark:border-white/10 dark:bg-[#12233b]">
                  <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">
                    Product Narrative v2
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Starred document • updated just now
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0d1b2f]">
                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">
                      Drafts
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">
                      12
                    </p>
                  </div>
                  <div className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0d1b2f]">
                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">
                      Restorable
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100">
                      03
                    </p>
                  </div>
                </div>
                <div className="border border-dashed border-slate-300 p-4 dark:border-white/15">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Search, switch themes, open a document, and keep writing from
                    one place without the UI fighting you.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0d1b2f]">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Search
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-slate-100">
                      Jump into any brief fast
                    </p>
                  </div>
                  <div className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0d1b2f]">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Themes
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-slate-100">
                      Light and dark studio modes
                    </p>
                  </div>
                  <div className="border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0d1b2f]">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Status
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-slate-100">
                      Tracked drafts and restore history
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-12 grid max-w-7xl gap-4 border-t border-black/10 pt-10 dark:border-white/10 lg:grid-cols-4">
        <div className="border border-slate-200 bg-white/72 p-5 backdrop-blur dark:border-white/10 dark:bg-[#0b1728]/84">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Workspace
          </p>
          <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-100">
            A cleaner starting point
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Open documents, review status, and create something new without bouncing between disconnected screens.
          </p>
        </div>
        <div className="border border-slate-200 bg-white/72 p-5 backdrop-blur dark:border-white/10 dark:bg-[#0b1728]/84">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Recovery
          </p>
          <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-100">
            Mistakes stay reversible
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Deleted work moves through trash first, so cleanup stays safe instead of feeling destructive.
          </p>
        </div>
        <div className="border border-slate-200 bg-white/72 p-5 backdrop-blur dark:border-white/10 dark:bg-[#0b1728]/84">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Priority
          </p>
          <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-100">
            Important docs stay close
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Use starred views to keep active narratives, specs, and client-facing drafts from getting buried.
          </p>
        </div>
        <div className="border border-slate-200 bg-white/72 p-5 backdrop-blur dark:border-white/10 dark:bg-[#0b1728]/84">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Flow
          </p>
          <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-100">
            Built to keep momentum
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            The interface stays understated so the writing experience feels calm, direct, and professional.
          </p>
        </div>
      </section>
    </main>
  );
}
