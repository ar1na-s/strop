"use client";

import { useState } from "react";

const products = [
  "Текстильные стропы",
  "Канатные стропы",
  "Цепные стропы",
  "Круглопрядные стропы",
  "Траверсы",
  "Металлоконструкции",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              ТТК-Билдинг
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-10 md:flex">

            <a className="text-lg font-black hover:text-blue-400 transition cursor-pointer">
              Каталог
            </a>

            <a className="text-lg font-black hover:text-blue-400 transition cursor-pointer">
              Производство
            </a>

            <a className="text-lg font-black hover:text-blue-400 transition cursor-pointer">
              Доставка
            </a>

            <a className="text-lg font-black hover:text-blue-400 transition cursor-pointer">
              Контакты
            </a>

            {/* SEARCH */}
            <div className="relative">

              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full bg-white/10 border border-white/10 px-5 py-2 pl-10 text-sm outline-none focus:border-blue-500"
              />

              <div className="absolute left-3 top-2.5 text-sm opacity-60">
                🔍
              </div>

            </div>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-sm font-bold"
          >
            Меню
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black px-6 py-4 space-y-4">

            <div className="font-bold">Каталог</div>
            <div className="font-bold">Производство</div>
            <div className="font-bold">Доставка</div>
            <div className="font-bold">Контакты</div>

          </div>
        )}

      </header>

      {/* HERO */}

      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-32 lg:grid-cols-2 lg:items-center">

          <div>

            {/* TITLE */}
            <div className="inline-block rounded-3xl bg-black/50 backdrop-blur-md p-8 border border-white/10">

              <h2 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                <span className="block">Грузоподъемные</span>
                <span className="block">решения</span>
                <span className="block">нового поколения</span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Производим стропы, траверсы и металлоконструкции
                для промышленности, логистики и строительства.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                {/* BUTTON */}
                <button
                  onClick={() => {
                    alert("Форма заявки скоро будет подключена");
                  }}
                  className="rounded-2xl bg-blue-600 px-7 py-4 text-lg font-bold text-white hover:bg-blue-700 transition"
                >
                  Задать вопрос
                </button>

                <button className="rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-lg font-bold hover:border-blue-500 hover:text-blue-400 transition">
                  Каталог
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT BLOCK */}
          <div className="grid grid-cols-2 gap-5 lg:ml-32">

            {[
              ["500+", "тонн"],
              ["10+", "лет опыта"],
              ["РФ", "доставка"],
              ["24/7", "поддержка"],
            ].map(([a, b]) => (
              <div
                key={a}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md hover:bg-white/10 transition"
              >
                <div className="text-4xl font-black">{a}</div>

                <div className="mt-3 text-sm text-slate-300">
                  {b}
                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}