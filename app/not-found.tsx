// app/not-found.tsx or pages/404.tsx
"use client";

import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found – Craftly</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center craft-bg craft-text px-6 font-display">
        <h1 className="text-7xl font-medium tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          404
        </h1>
        <p className="text-2xl mt-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Oops! Page not found.
        </p>
        <p className="text-lg mt-2 opacity-70 font-light">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/prelaunch"
          className="mt-6 px-6 py-3 bg-[#7A5D4A] text-white rounded-lg hover:scale-105 duration-300 ease-in-out transition"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}
