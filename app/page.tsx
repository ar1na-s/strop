"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const products = [
  { name: "Текстильные стропы", price: 5000 },
  { name: "Канатные стропы", price: 7000 },
  { name: "Цепные стропы", price: 9000 },
  { name: "Круглопрядные стропы", price: 6500 },
  { name: "Траверсы", price: 12000 },
  { name: "Металлоконструкции", price: 15000 },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="flex w-full items-center justify-between px-6 py-5">

          {/* LOGO */}
          <div className="flex items-center gap-4 ml-2">
            <img src="/logo.png" alt="ТТК-Билдинг" className="h-14 w-auto object-contain" />

            <h1 className="text-3xl lg:text-4xl font-black tracking-tight whitespace-nowrap">
              ТТК-Билдинг
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-8 md:flex ml-auto">

            <a>Каталог</a>
            <a>Производство</a>
            <a>Доставка</a>
            <a>Контакты</a>

            {/* поиск */}
            <div>...</div>

            {/* корзина */}
            <button>...</button>

          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden font-bold">
            Меню
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black px-6 py-4 md:hidden">
            <div className="font-bold">Каталог</div>
            <div className="font-bold">Производство</div>
            <div className="font-bold">Доставка</div>
            <div className="font-bold">Контакты</div>
          </div>
        )}
      </header>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto grid max-w-7xl gap-20 px-6 py-32 lg:grid-cols-2 lg:items-center"
        >

          {/* LEFT */}
          <div className="inline-block rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-md">

            <h2 className="text-5xl font-black leading-[0.95] md:text-7xl">
              Грузоподъемные решения нового поколения
            </h2>

            <p className="mt-6 text-lg text-slate-300">
              Производство строп текстильных, цепных,
              канатных, траверс для промышленности,
              логистики и строительства.
            </p>

          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-5 lg:ml-52">
            {[
              ["до 500", "тонн"],
              ["более 10", "лет опыта"],
              ["РФ", "доставка"],
              ["24/7", "поддержка"],
            ].map(([a, b]) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
              >
                <div className="text-4xl font-black">{a}</div>
                <div className="mt-3 text-sm text-slate-300">{b}</div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </motion.section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <h3 className="text-5xl font-black">Продукция</h3>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filteredProducts.map((product) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md hover:-translate-y-1 hover:bg-white/10 transition"
            >
              <h4 className="text-2xl font-black">{product.name}</h4>

              <div className="mt-6 text-2xl font-black text-blue-400">
                {product.price.toLocaleString()} ₽
              </div>

              <button
                onClick={() => {
                  setCartCount(cartCount + 1);
                  setCartTotal(cartTotal + product.price);
                }}
                className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 font-bold hover:bg-blue-700"
              >
                Добавить в корзину
              </button>
            </motion.div>
          ))}

        </div>
      </section>
      {/* CONTACT MAP SECTION */}
      <section className="border-t border-white/10 bg-black px-6 py-20">

        <div className="mx-auto max-w-7xl">

          {/* MAP */}
          <div className="overflow-hidden rounded-3xl border border-white/10">

            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.3977%2C55.7193&z=16&pt=37.3977%2C55.7193%2Cpm2rdm"
              width="100%"
              height="400"
              style={{ border: 0 }}
            />

          </div>

          {/* BUTTON */}
          <div className="mt-6">
            <a
              href="https://yandex.ru/maps/?rtext=~55.7193,37.3977&rtt=auto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition"
            >
              Построить маршрут
            </a>
          </div>

          {/* INFO */}
          <div className="mt-10 grid gap-10 md:grid-cols-3">

            {/* ADDRESS */}
            <div>
              <h3 className="text-xl font-black">Адрес</h3>

              <p className="mt-3 text-slate-300 leading-7">
                БЦ «Гранд Сетунь Плаза»<br />
                Москва, ул. Горбунова, 2 стр.3<br />
                офис А-214, 2 этаж<br />
                Можайский район, 121596
              </p>
            </div>

            {/* CONTACTS */}
            <div>
              <h3 className="text-xl font-black">Контакты</h3>

              <p className="mt-3 text-slate-300 leading-7">
                +7 (495) 995-23-60<br />
                +7 (495) 995-23-92<br />
                info@ttk-b.com
              </p>
            </div>

            {/* REQUISITES */}
            <div>
              <h3 className="text-xl font-black">Реквизиты</h3>

              <p className="mt-3 text-slate-300 leading-7">
                ИНН: 7731460616<br />
                ОГРН: 5137746132827
              </p>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}