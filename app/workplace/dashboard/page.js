"use client"
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-3 text-gray-700">
          <a href="#" className="hover:text-black">Home</a>
          <a href="#" className="hover:text-black">Analytics</a>
          <a href="#" className="hover:text-black">Messages</a>
          <a href="#" className="hover:text-black">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-4xl">
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-2">Card 1</h2>
              <p className="text-sm text-gray-600">Some content here</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-2">Card 2</h2>
              <p className="text-sm text-gray-600">Some content here</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-2">Card 3</h2>
              <p className="text-sm text-gray-600">Some content here</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-2">Card 4</h2>
              <p className="text-sm text-gray-600">Some content here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;