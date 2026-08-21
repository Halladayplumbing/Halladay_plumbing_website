import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCTAController } from "@/components/StickyCTAController";
import { StructuredData } from "@/components/StructuredData";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { business } from "@/data/business";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description:
    "Residential and commercial plumbing throughout Cedar City and Southern Utah — plumbing repair, water heaters, drain cleaning, water softeners, and emergency plumbing.",
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="pb-16 xl:pb-0">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnalyticsScripts />
        <StructuredData data={organizationSchema()} />
        <StructuredData data={websiteSchema()} />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <StickyCTAController />
      </body>
    </html>
  );
}
