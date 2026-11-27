import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import ServiceWorker from "@/components/ServiceWorker";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "open source license",
    "GitHub license",
    "MIT",
    "Apache 2.0",
    "GPL",
    "AGPL",
    "LGPL",
    "BSD",
    "MPL",
    "EPL",
    "CC0",
    "Boost",
    "choose a license",
    "copyleft",
    "permissive license",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary", title: site.name, description: site.description },
  appleWebApp: { capable: true, statusBarStyle: "default", title: site.shortName },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d14" },
  ],
};

const themeScript = `try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")!=="light")}catch(e){document.documentElement.classList.add("dark")}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white text-slate-900 dark:bg-[#0b0d14] dark:text-slate-100">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
