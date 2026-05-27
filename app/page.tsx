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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-xl font-black tracking-tight">
              ТТК-Билдинг
            </h1>
            <p className="text-xs text-slate-500">
              Industrial lifting equipment
            </p>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a className="hover:text-blue-600 transition">Каталог</a>
            <a className="hover:text-blue-600 transition">Производство</a>
            <a className="hover:text-blue-600 transition">Доставка</a>
            <a className="hover:text-blue-600 transition">Контакты</a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-sm font-semibold"
          >
            Меню
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white px-6 py-4 space-y-3 text-sm">
            <div>Каталог</div>
            <div>Производство</div>
            <div>Доставка</div>
            <div>Контакты</div>
          </div>
        )}
      </header>

      {/* HERO */}

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center">

        <div>
          <p className="inline-block rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700">
            Производство до 500 тонн
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Грузоподъемные
            <br />
            решения нового
            <br />
            поколения
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Производим стропы, траверсы и металлоконструкции
            для промышленности, логистики и строительства.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-slate-900 px-6 py-4 text-white font-semibold hover:bg-blue-600 transition">
              Отправить запрос
            </button>
            <button
              onClick={async () => {
                const textarea = document.querySelector("textarea") as HTMLTextAreaElement;

                await fetch("/api/leads", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: "Запрос с главной страницы",
                  }),
                });

                alert("Заявка отправлена!");
              }}

            >
            </button>

            <button className="rounded-2xl border px-6 py-4 font-semibold hover:border-blue-500 hover:text-blue-600 transition">
              Каталог
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="grid grid-cols-2 gap-4">

          {[
            ["500+", "тонн"],
            ["10+", "лет"],
            ["РФ", "доставка"],
            ["24/7", "поддержка"],
          ].map(([a, b]) => (
            <div
              key={a}
              className="rounded-2xl bg-white p-6 shadow hover:shadow-xl transition"
            >
              <div className="text-3xl font-black">{a}</div>
              <div className="text-sm text-slate-500 mt-2">{b}</div>
            </div>
          ))}

        </div>
      </section>

      {/* PRODUCTS */}

      <section className="mx-auto max-w-7xl px-6 pb-24">

        <h3 className="text-4xl font-black">
          Продукция
        </h3>

        <p className="mt-3 text-slate-600 max-w-2xl">
          Современные решения для грузоподъемных задач
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {products.map((p) => (
            <div
              key={p}
              className="group rounded-3xl bg-white p-7 shadow hover:-translate-y-1 hover:shadow-2xl transition"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-100 group-hover:bg-blue-500 transition" />

              <h4 className="mt-5 text-xl font-bold">
                {p}
              </h4>

              <p className="mt-3 text-sm text-slate-500 leading-6">
                Надежные промышленные решения
                с соблюдением стандартов безопасности.
              </p>

              <div className="mt-6 text-blue-600 font-semibold">
                Подробнее →
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CONTACT */}

      <section className="bg-slate-900 text-white px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <h3 className="text-4xl font-black">
            Контакты
          </h3>

          <div className="mt-10 grid gap-10 md:grid-cols-3 text-sm">

            <div>
              <div className="text-slate-400">Email</div>
              <div className="mt-2 text-lg">info@ttk-b.com</div>
            </div>
            <section className="mx-auto max-w-7xl pt-6 pb-10">

              <h2 className="text-4xl font-black tracking-tight">
                О компании
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300 text-justify">
                Занимаемся оптовой поставкой различных видов строп:
                цепных, текстильных, канатных и круглопрядных.
                Изначально стропы изготавливались только из канатов,
                но впоследствии появились цепные и текстильные решения,
                которые вы можете приобрести в «ТТК-Билдинг».
              </p>



              <div className="mt-10 grid gap-6 md:grid-cols-2">

                

              </div>

            </section>

            <div>
              <div className="text-slate-400">Телефоны</div>
              <div className="mt-2 leading-7">
                +7 (495) 995-23-60<br />
                +7 (495) 995-23-92<br />
                +7 (495) 926-12-45
              </div>
            </div>

            <div>
              <div className="text-slate-400">Адрес</div>
              <div className="mt-2 leading-7">
                Москва, ул. Горбунова 2<br />
                БЦ «Гранд Сетунь Плаза»
              </div>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
