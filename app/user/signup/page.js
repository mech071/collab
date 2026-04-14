"use client"
import React from "react";
import Link from "next/link";
import { SiMaterialformkdocs } from "react-icons/si";
import { signIn } from "next-auth/react"
const Signup = () => {
  return (
    <>
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <SiMaterialformkdocs className="text-3xl mb-2" />
            <h1 className="text-xl font-semibold">Collab</h1>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create your account
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="mt-2 bg-black text-white py-2 rounded-md text-sm hover:bg-gray-900 transition delay-100 cursor-pointer"
            >
              Sign up
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link href="/user/login" className="text-black hover:underline">
              Log in
            </Link>
          </p>
          <p className="text-sm text-gray-600 text-center mt-6">
            Or
          </p>
          <button
            type="button"
            onClick={() => signIn("github")}
            className="mt-4 mx-auto flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition delay-100 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 .5C5.65.5.75 5.4.75 11.75c0 5.1 3.3 9.4 7.85 10.95.6.1.8-.25.8-.55v-2.05c-3.2.7-3.85-1.35-3.85-1.35-.55-1.4-1.35-1.75-1.35-1.75-1.1-.75.1-.75.1-.75 1.2.1 1.85 1.25 1.85 1.25 1.1 1.85 2.85 1.3 3.55 1 .1-.8.4-1.3.75-1.6-2.55-.3-5.25-1.25-5.25-5.6 0-1.25.45-2.25 1.2-3.05-.1-.3-.5-1.55.1-3.2 0 0 1-.3 3.3 1.2.95-.25 2-.4 3-.4s2.05.15 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.65.2 2.9.1 3.2.75.8 1.2 1.8 1.2 3.05 0 4.35-2.7 5.3-5.25 5.6.45.4.8 1.15.8 2.35v3.5c0 .3.2.65.8.55 4.55-1.55 7.85-5.85 7.85-10.95C23.25 5.4 18.35.5 12 .5z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

      </main>
    </>
  );
};

export default Signup;