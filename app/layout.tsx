import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display } from 'next/font/google';
import RedirectOnLoad from "./components/RedirectOnLoad";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Craftly is coming!",
  description: "Craftly is a curated storefront for creators, makers, and artisans. Join our launch waitlist.",
  keywords: ["Craftly", "creator marketplace", "handmade store", "launch soon", "ecommerce for artisans"],
  openGraph: {
    title: "Craftly is coming!",
    description: "Craftly is a curated storefront for creators, makers, and artisans. Join our launch waitlist.",
    url: "https://app-craftly.vercel.app.com", // replace with your actual domain
    siteName: "Craftly",
    images: [
      {
        url: "https://app-craftly.vercel.app.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Craftly Coming Soon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Craftly is coming!",
    description: "Craftly is a curated storefront for creators, makers, and artisans. Join our launch waitlist.",
    images: ["https://app-craftly.vercel.app.com/og-image.png"], // replace
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>
        <RedirectOnLoad />
        {children}
      </body>
    </html>
  );
}
