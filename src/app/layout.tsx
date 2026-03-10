import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { defaultLocale, isLocale } from "@/lib/i18n-config";

import "@/app/globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headerList = await headers();
  const headerLocale = headerList.get("x-locale");
  const lang = headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;

  return (
    <html lang={lang}>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
