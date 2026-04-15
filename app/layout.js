import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "./components/AppProviders";
import Navbar from "./components/Navbar"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DocsKraft",
  description: "DocsKraft is a collaborative writing workspace for drafting, editing, and shipping documents together.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <AppProviders>
          <Navbar/>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
