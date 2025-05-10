'use client';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-geist-sans: var(--font-geist-sans);
          --font-geist-mono: var(--font-geist-mono);
        }
      `}</style>
      {children}
    </>
  );
}
