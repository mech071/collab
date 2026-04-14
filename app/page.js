import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen pt-16 bg-white">
      <section className="max-w-6xl mx-auto px-6 py-40 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Build together. Faster.
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl">
          A clean collaborative workspace to write, plan, and ship your ideas.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/user/signup">
            <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition delay-100 cursor-pointer">
              Get Started
            </button>
          </Link>
          <Link href="/info/learn">
            <button className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition delay-100 cursor-pointer">
              Learn More
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}