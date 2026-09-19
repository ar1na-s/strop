import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ООО «МИКО» — стропы, канаты, тросы, такелаж",
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
    title: "МИКО — грузоподъемные стропы",
    description: "Производство и оптовая поставка строп по России",
    type: "website",
    locale: "ru_RU",
    siteName: "МИКО",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        {/* FLOAT CONTACT BUTTONS */}
        <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">




        </div>

        {children}

      </body>
    </html>
  );
}