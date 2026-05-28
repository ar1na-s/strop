"use client";

import { useState } from "react";

const products = [
  {
    name: "Текстильные стропы",
    price: 5000,
  },
  {
    name: "Канатные стропы",
    price: 7000,
  },
  {
    name: "Цепные стропы",
    price: 9000,
  },
  {
    name: "Круглопрядные стропы",
    price: 6500,
  },
  {
    name: "Траверсы",
    price: 12000,
  },
  {
    name: "Металлоконструкции",
    price: 15000,
  },
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
          <div className="mr-10">
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight whitespace-nowrap">
              ТТК-Билдинг
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-10 md:ml-auto md:flex">

            <a className="text-xl font-black hover:text-blue-400 transition cursor-pointer">
              Каталог
            </a>

            <a className="text-xl font-black hover:text-blue-400 transition cursor-pointer">
              Производство
            </a>

            <a className="text-xl font-black hover:text-blue-400 transition cursor-pointer">
              Доставка
            </a>

            <a className="text-xl font-black hover:text-blue-400 transition cursor-pointer">
              Контакты
            </a>

            {/* SEARCH */}
            <div className="relative">

              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 pl-11 text-sm outline-none focus:border-blue-500"
              />

              <div className="absolute left-4 top-3 opacity-60">
                🔍
              </div>

            </div>

            {/* CART */}
            <button
              onClick={() =>
                alert(`Товаров: ${cartCount}\nСумма: ${cartTotal} ₽`)
              }
              className="relative rounded-full border border-white/10 bg-white/10 px-5 py-3 hover:border-blue-500 transition"
            >
              🛒

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold">
                {cartCount}
              </span>
            </button>

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
          <div className="space-y-4 border-t border-white/10 bg-black px-6 py-4 md:hidden">

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

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative mx-auto grid max-w-7xl gap-20 px-6 py-32 lg:grid-cols-2 lg:items-center">

          {/* LEFT */}
          <div>

            <div className="inline-block rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-md">

              <h2 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">

                <span className="block">
                  Грузоподъемные
                </span>

                <span className="block">
                  решения
                </span>

                <span className="block">
                  нового
                </span>

                <span className="block">
                  поколения
                </span>

              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Производство строп, траверс и грузоподъемного
                оборудования для промышленности,
                строительства и логистики.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">





              </div>

            </div>

          </div>

          {/* RIGHT BLOCKS */}
          <div className="grid grid-cols-2 gap-5 lg:ml-52">

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
                <div className="text-4xl font-black">
                  {a}
                </div>

                <div className="mt-3 text-sm text-slate-300">
                  {b}
                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <h3 className="text-5xl font-black">
          Продукция
        </h3>

        <p className="mt-4 text-lg text-slate-400">
          Производство и поставка грузоподъемного оборудования
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filteredProducts.map((product) => (

            <div
              key={product.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md hover:-translate-y-1 hover:bg-white/10 transition"
            >

              <div className="h-12 w-12 rounded-2xl bg-blue-600" />

              <h4 className="mt-6 text-2xl font-black">
                {product.name}
              </h4>

              <p className="mt-4 text-slate-400">
                Надежное промышленное решение
                для грузоподъемных задач.
              </p>

              <div className="mt-6 text-2xl font-black text-blue-400">
                {product.price.toLocaleString()} ₽
              </div>

              <button
                onClick={() => {
                  setCartCount(cartCount + 1);
                  setCartTotal(cartTotal + product.price);
                }}
                className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-bold hover:bg-blue-700 transition"
              >
                Добавить в корзину
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* ABOUT */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-5xl font-black">
          О компании
        </h2>

        <p className="mt-8 text-lg leading-9 text-slate-300">

          ООО «ТТК-Билдинг» занимается производством
          и поставкой различных видов грузоподъемных строп:
          цепных, текстильных, канатных и круглопрядных.

          Компания поставляет продукцию по всей территории России,
          обеспечивая надежность, качество и соблюдение стандартов безопасности.

        </p>

      </section>
      <div className="mt-16">

        <button
          onClick={() => {
            window.location.href = "mailto:info@ttk-b.com";
          }}
          className="rounded-2xl bg-blue-600 px-8 py-5 text-lg font-black hover:bg-blue-700 transition"
        >
          Задать вопрос
        </button>

      </div>

      {/* CONTACTS */}

      <section className="border-t border-white/10 bg-black px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <h3 className="text-5xl font-black">
            Контакты
          </h3>

          <div className="mt-12 grid gap-10 md:grid-cols-3">

            <div>
              <div className="text-slate-500">
                Email
              </div>

              <div className="mt-3 text-xl">
                info@ttk-b.com
              </div>
            </div>

            <div>
              <div className="text-slate-500">
                Телефоны
              </div>

              <div className="mt-3 leading-8 text-lg">
                +7 (495) 995-23-60
                <br />
                +7 (495) 995-23-92
                <br />
                +7 (495) 926-12-45
              </div>
            </div>

            <div>
              <div className="text-slate-500">
                Адрес
              </div>

              <div className="mt-3 leading-8 text-lg">
                Москва, ул. Горбунова 2
                <br />
                БЦ «Гранд Сетунь Плаза»
              </div>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}