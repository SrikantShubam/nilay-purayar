// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/header";

const poppins = Poppins({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-poppins" });
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nilaypurayar.com"), // update if hosted elsewhere
  title: {
    default: "Nilay Purayar | Data Science, Analytics & Strategy Portfolio",
    template: "%s | Nilay Purayar",
  },
  description:
    "Nilay Purayar is a data scientist and analyst translating complex datasets into measurable business impact across finance, marketing, and AI products.",
  keywords: [
    "Nilay Purayar",
    "data science portfolio",
    "business analytics",
    "predictive modelling",
    "power bi dashboards",
    "data-driven strategy",
    "AI product development",
  ],
  authors: [{ name: "Nilay Purayar", url: "https://nilaypurayar.com" }],
  creator: "Nilay Purayar",
  publisher: "Nilay Purayar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nilaypurayar.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nilaypurayar.com",
    title: "Nilay Purayar | Data Science, Analytics & Strategy Portfolio",
    description:
      "Explore projects that boost trading accuracy, reporting efficiency, and strategic decision-making through data-driven insights.",
    siteName: "Nilay Purayar Portfolio",
    images: [
      {
        url: "/projects.png", // replace with a 1200x630 OG image
        width: 1200,
        height: 630,
        alt: "Nilay Purayar Portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilay Purayar | Data Science, Analytics & Strategy Portfolio",
    description:
      "Data scientist & analyst delivering measurable impact via predictive models, dashboards, and AI solutions.",
    creator: "@SrikantShubham", // update with real X handle
    images: ["/projects.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  manifest: "/site.webmanifest",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="relative font-sans bg-background text-foreground antialiased min-h-screen">
        {/* === GLOBAL VERTICAL LINES (background) === */}
        <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block" aria-hidden="true">
          {/* Left line */}
          <div
            className="absolute top-0 bottom-0 border-l border-[#C2B5A8]/70 border-dashed rounded-full"
            style={{ left: "20%", borderWidth: "1px", borderStyle: "dashed" }}
          />
          {/* Right line */}
          <div
            className="absolute top-0 bottom-0 border-l border-[#C2B5A8]/70 border-dashed rounded-full"
            style={{ right: "60%", borderWidth: "1px", borderStyle: "dashed" }}
          />
        </div>

        {/* === ALL REAL CONTENT ABOVE LINES === */}
        <div className="relative z-[5] min-h-screen flex flex-col container-fluid">
          <Header />
          <main className="flex-1">{children}</main>
          {/* <Footer /> */}
        </div>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="d9523d5f-d591-4af2-9e4f-7df504de1141"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}
