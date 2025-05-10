import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientWrapper from './ClientWrapper';
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer dashboard built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ClientWrapper>
          <header className="bg-blue-600 text-white p-4 text-center">
            <h1 className="text-xl font-bold">Customer Dashboard</h1>
            <nav className="mt-2 space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            </nav>
          </header>
          <div className="container mx-auto p-4">{children}</div>
        </ClientWrapper>
      </body>
    </html>
  );
}
