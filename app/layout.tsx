import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { fleet, site } from "@/lib/site";
import "./globals.css";
import { cn } from "@/lib/utils";


const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Self-Drive Car Rental in Butuan City`,
  description: site.description,
  keywords: [
    "car rental Butuan",
    "rent a car Butuan City",
    "self drive Butuan",
    "Butuan airport car rental",
    "CARAGA car rental",
  ],
  openGraph: {
    title: `${site.name} | Self-Drive Car Rental`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_PH",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phones.map((p) => p.e164),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "PH",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
  priceRange: `₱${Math.min(...fleet.map((v) => v.rates.butuan))} - ₱${Math.max(...fleet.map((v) => v.rates.mindanao))}`,
  sameAs: [site.facebook, site.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased", jakarta.variable)}
    >
      <body className="min-h-full font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
