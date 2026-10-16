
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted Inter: no render-blocking request to fonts.googleapis.com, the woff2 files are
// preloaded from the same origin, and next/font generates a size-adjusted fallback so the
// font swap does not reflow the page.
const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://archivebyoladimeji.netlify.app"),

  title: "Archive",
  description:
    "A digital museum celebrating Nigeria’s creative heritage through photography, music, fashion, and design. We preserve the stories, people, and cultural moments that have shaped our identity, bringing the past and present together to inspire future generations.",

  openGraph: {
    title: "Archive — Nigerian Creative History",
    description:
      "Explore Nigeria’s creative heritage through photography, music, fashion, and design.",
    siteName: "Archive",
    url: "/",
    images: [
      {
        url: "/archive-preview.png",
        width: 1200,
        height: 630,
        alt: "Archive — A Digital Museum of Nigerian Creativity",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Archive — Nigerian Creative History",
    description:
      "Explore Nigeria’s creative heritage through photography, music, fashion, and design.",
    images: ["/archive-preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <noscript>
          <style>
            {`[data-reveal]{opacity:1!important;filter:none!important;transform:none!important}[data-reveal-title]{transform:none!important;filter:none!important}.hero-reveal{animation:none!important}`}
          </style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
