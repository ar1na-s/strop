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
  title: "ТТК-Билдинг — производство грузовых строп до 500 тонн",
  description:
    "ООО ТТК-Билдинг — оптовая поставка строп: цепные, текстильные, канатные, круглопрядные. Доставка по всей России.",

  keywords: [
    "стропы",
    "цепные стропы",
    "текстильные стропы",
    "канатные стропы",
    "круглопрядные стропы",
    "грузоподъемное оборудование",
  ],

  openGraph: {
    title: "ТТК-Билдинг — грузоподъемные стропы",
    description: "Производство и оптовая поставка строп по России",
    type: "website",
    locale: "ru_RU",
    siteName: "ТТК-Билдинг",
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

          {/* TELEGRAM */}
          <a
            href="https://t.me/your_username"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition text-center"
          >
            Telegram
          </a>

          {/* MAX */}
          <a
            href="https://max.ru/"
            target="_blank"
            className="bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg transition text-center"
          >
            MAX
          </a>

        </div>

        {children}

      </body>
    </html>
  );
}