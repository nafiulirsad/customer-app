import './globals.css';
import { Metadata } from "next";
import Link from "next/link"; // Import Link from next/link

// Metadata for the page
export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer dashboard built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Customer Dashboard</h1>
          <nav className="mt-2 space-x-4">
            <div><Link href="/" className="hover:underline">Home</Link></div>
            <div><Link href="/dashboard" className="hover:underline">Dashboard</Link></div>
          </nav>
        </header>

        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
