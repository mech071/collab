import React from 'react'
import { SiMaterialformkdocs } from "react-icons/si";
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-2.5">
                <div className="flex items-center gap-2 cursor-pointer">
                    <SiMaterialformkdocs className="text-xl" />
                    <Link href="/">
                        <span className="text-base font-semibold tracking-tight">
                            Collab
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="/user/login"
                        className="text-sm text-gray-800 hover:text-black transition"
                    >
                        Login
                    </Link>
                    <Link
                        href="/user/signup"
                        className="text-sm bg-black text-white px-4 py-1.5 rounded-md hover:bg-gray-900 transition delay-100"
                    >
                        Get Started
                    </Link>
                </div>

            </div>
        </nav>
    )
}

export default Navbar