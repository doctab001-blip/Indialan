import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HindiQuest — Learn Hindi",
  description: "A gamified path to learning Hindi, one lesson at a time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Loaded as a plain <link> rather than next/font/google so that
          `next build` never depends on reaching fonts.googleapis.com —
          next/font fetches at BUILD time and hard-fails the build if that
          host is unreachable (CI runners, offline Docker builds, locked-down
          corporate networks). A <link> just degrades to the fallback font
          in the browser if it can't load, same as any ordinary website.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
