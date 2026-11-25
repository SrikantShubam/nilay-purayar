// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/header";
import { getSettings } from "./lib/settings";

const poppins = Poppins({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-poppins" });
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSettings();

  return {
    // Everything relative below (canonical, og:image) resolves against this.
    // getSettings falls back to the Vercel address if the Site Settings site
    // URL is missing or not a usable https address.
    metadataBase: new URL(seo.siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Nilay Purayar", url: seo.siteUrl }],
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
      canonical: seo.siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: seo.siteUrl,
      title: seo.title,
      description: seo.shareDescription,
      siteName: seo.siteName,
      // Width and height are deliberately left out. The share image is
      // editable in Tina, so hardcoded dimensions would start lying the
      // moment it is replaced; platforms read the real size themselves.
      images: seo.shareImage
        ? [{ url: seo.shareImage, alt: seo.shareImageAlt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.shareDescription,
      ...(seo.xHandle ? { creator: seo.xHandle } : {}),
      images: seo.shareImage ? [seo.shareImage] : undefined,
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
}



export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

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
          <Header navbar={settings.navbar} />
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
