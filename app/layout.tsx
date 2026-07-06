import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Neramind LLP builds Neramind CRM & ERP, delivers AI/ML services, education consultation, bootcamps, internships and hiring — from Kerala, India.";

export const metadata: Metadata = {
  title: {
    default: "Neramind LLP — Immersive software, CRM, ERP & AI",
    template: "%s — Neramind LLP",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://neramindllp.in"),
  keywords: [
    "Neramind",
    "Neramind CRM",
    "Neramind ERP",
    "AI ML services",
    "education consultation",
    "bootcamps",
    "internships",
    "hiring",
    "Kerala software company",
  ],
  openGraph: {
    type: "website",
    siteName: "Neramind LLP",
    title: "Neramind LLP — Immersive software, CRM, ERP & AI",
    description: SITE_DESCRIPTION,
    url: "https://neramindllp.in",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neramind LLP — Immersive software, CRM, ERP & AI",
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-base font-body text-ink antialiased">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
