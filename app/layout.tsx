import type { Metadata } from 'next';
import { Barlow, Barlow_Condensed, Barlow_Semi_Condensed } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Cursor from './components/layout/Cursor';
import SiteFooter from './components/layout/SiteFooter';
import SiteHeader from './components/layout/SiteHeader';
import { getSettings } from './lib/settings';

// One family in three widths: body and headings in Barlow, labels and nav in
// Semi Condensed, display headings and figures in Condensed.
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-barlow-semicondensed',
  display: 'swap',
});

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
    authors: [{ name: 'Nilay Purayar', url: seo.siteUrl }],
    creator: 'Nilay Purayar',
    publisher: 'Nilay Purayar',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: seo.siteUrl,
      title: seo.title,
      description: seo.shareDescription,
      siteName: seo.siteName,
      // Width and height are deliberately left out. The share image is
      // editable in Tina, so hardcoded dimensions would start lying the
      // moment it is replaced; platforms read the real size themselves.
      images: seo.shareImage ? [{ url: seo.shareImage, alt: seo.shareImageAlt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.shareDescription,
      ...(seo.xHandle ? { creator: seo.xHandle } : {}),
      images: seo.shareImage ? [seo.shareImage] : undefined,
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      other: [
        { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
        { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
      ],
    },
    manifest: '/site.webmanifest',
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${barlowSemiCondensed.variable}`}
    >
      <body className="cursor-host flex min-h-screen flex-col">
        <Cursor />
        <SiteHeader navbar={settings.navbar} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
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
