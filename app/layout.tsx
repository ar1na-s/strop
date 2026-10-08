import type { Metadata } from "next";
import { COMPANY } from "./data/company";
import "./globals.css";
import { SITE_URL, jsonLd } from "./data/seo";
import Analytics from "./components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.YANDEX_SITE_VERIFICATION || undefined,
  },
  title: `${COMPANY.full} — стропы, канаты, тросы, такелаж`,
  description:
    "Производство и поставка грузоподъёмного оборудования: стропы, канаты, тросы, такелаж. Сертификаты, доставка по РФ.",

  keywords: [
    "стропы",
    "цепные стропы",
    "текстильные стропы",
    "канатные стропы",
    "круглопрядные стропы",
    "грузоподъемное оборудование",
  ],

  openGraph: {
    title: `${COMPANY.full} — грузоподъемные стропы`,
    description: "Производство и оптовая поставка строп по России",
    type: "website",
    locale: "ru_RU",
    siteName: COMPANY.full,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({"@context":"https://schema.org","@type":"Organization",name:COMPANY.full,url:SITE_URL,logo:`${SITE_URL}/logo.png`,telephone:COMPANY.phone,email:COMPANY.email,address:{"@type":"PostalAddress",streetAddress:COMPANY.physicalAddress,addressLocality:"Москва",addressCountry:"RU"}})}}/>{children}<Analytics/></body>
    </html>
  );
}
