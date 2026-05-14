import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { AppShell } from "@/components/layout/AppShell";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PropIQ — Real Estate AI",
  description: "PropIQ — real estate AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <Script id="propiq-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('propiq-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){document.documentElement.classList.remove('dark');}})();`}
        </Script>
      </head>
      <body className={`${plusJakarta.variable} min-h-screen font-sans antialiased`}>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
