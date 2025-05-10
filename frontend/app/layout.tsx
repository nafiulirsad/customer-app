import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // Import Link from next/link

// Custom font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the page
export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer dashboard built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Apply the custom fonts globally */}
        <style jsx global>{`
          :root {
            --font-geist-sans: ${geistSans.style.fontFamily};
            --font-geist-mono: ${geistMono.style.fontFamily};
          }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Customer Dashboard</h1>
          <nav className="mt-2 space-x-4">
            {/* Use Link from next/link for client-side navigation */}
            <div><Link href="/" className="hover:underline">Home</Link></div>
            <div><Link href="/dashboard" className="hover:underline">Dashboard</Link></div>
          </nav>
        </header>

        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
