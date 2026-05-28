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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 lg:px-4 py-5">

          {/* LOGO */}
          <div className="mr-10 flex items-center gap-4">
            <img src="/logo.png" alt="ТТК-Билдинг" className="h-14 w-auto object-contain" />

            <h1 className="text-3xl lg:text-4xl font-black tracking-tight whitespace-nowrap">
              ТТК-Билдинг
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-10 md:ml-auto md:flex">

            <a className="text-xl font-black hover:text-blue-400 transition cursor-pointer">Каталог</a>
            <a className="text-xl font-black hover:text-blue-400 transition cursor-pointer">Производство</a>
            <a className="text-xl font-black hover:text-blue-400 transition cursor-pointer">Доставка</a>
            <a className="text-xl font-black hover:text-blue-400 transition cursor-pointer">Контакты</a>

            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              onClick={() => alert(`Товаров: ${cartCount}\nСумма: ${cartTotal} ₽`)}
              className="relative rounded-full border border-white/10 bg-white/10 px-5 py-3"
            >
              🛒
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold">
                {cartCount}
              </span>
            </button>

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
              Производство строп, траверс и грузоподъемного оборудования.
            </p>

          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-5 lg:ml-52">
            {[
              ["500+", "тонн"],
              ["10+", "лет опыта"],
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

    </main>
  );
}