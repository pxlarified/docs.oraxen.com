import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./external-link.css";
import "./nextra-overrides.css";
import ExternalLinkHandler from "../components/ExternalLinkHandler";
import GoogleAnalytics from "../components/GoogleAnalytics";

// Custom logo wrapper that opens external links in new tab
function LogoWithExternalIcon() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <img
        src="/logo_lowres.png"
        width={26}
        height={26}
        alt="Logo"
        style={{ imageRendering: "pixelated" }}
      />
      <span style={{ opacity: "60%" }}>Get Oraxen</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="14"
        height="14"
        style={{ opacity: "0.5", marginLeft: "2px" }}
      >
        <path
          fillRule="evenodd"
          d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.oraxen.com"),
  title: {
    default: "Oraxen Docs",
    template: "%s | Oraxen Docs",
  },
  description: "Oraxen: Create custom items & blocks for Minecraft",
  applicationName: "Oraxen Docs",
  generator: "Next.js",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Oraxen Docs",
  },
  formatDetection: {
    telephone: false,
  },
  twitter: {
    card: "summary_large_image",
    site: "@oraborern",
    creator: "@oraborern",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Oraxen Docs",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const navbar = (
    <Navbar
      logo={<LogoWithExternalIcon />}
      logoLink="https://oraxen.com"
      projectLink="https://git.io/oraxen"
      chatLink="https://discord.gg/2ng6q3JNQ7"
    />
  );
  const pageMap = await getPageMap();
  const normalizedPageMap =
    Array.isArray(pageMap) &&
    pageMap.length === 1 &&
    pageMap[0] &&
    typeof pageMap[0] === "object" &&
    "children" in pageMap[0]
      ? (pageMap[0] as any).children || pageMap
      : pageMap;
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <GoogleAnalytics />
      <Head>
        {/* Safari/iOS theme color - matches dark mode background */}
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        {/* Optimal viewport for PWA */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://cdn.discordapp.com" />
        <link rel="dns-prefetch" href="https://cdn.discordapp.com" />
      </Head>
      <body>
        <ExternalLinkHandler />
        <Layout
          //banner={<Banner storageKey="Nextra 2">Nextra 2 Alpha</Banner>}
          navbar={navbar}
          //footer={<Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/oraxen/docs.oraxen.com/tree/master"
          feedback={{ link: "https://discord.gg/2ng6q3JNQ7" }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={normalizedPageMap as any}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
