export const metadata = {
    title: "Каталог продукции — ТТК-Билдинг",
    description:
        "Цепные, текстильные, канатные и круглопрядные стропы.",
};

const products = [
    {
        title: "Цепные стропы",
        desc: "Прочные, долговечные, для тяжёлых нагрузок",
        price: "9 000 ₽",
    },
    {
        title: "Текстильные стропы",
        desc: "Лёгкие, эластичные, не повреждают груз",
        price: "5 000 ₽",
    },
    {
        title: "Канатные стропы",
        desc: "Надёжные и универсальные решения",
        price: "7 000 ₽",
    },
    {
        title: "Круглопрядные стропы",
        desc: "Высокая прочность и гибкость",
        price: "6 500 ₽",
    },
];

export default function CatalogPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">

            <section className="mx-auto max-w-7xl px-6 py-24">

                <h1 className="text-6xl font-black">
                    Каталог продукции
                </h1>

                <p className="mt-6 max-w-3xl text-lg text-slate-400">
                    Производство и поставка грузоподъемного оборудования.
                </p>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {products.map((item) => (

                        <div
                            key={item.title}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8"
                        >

                            <div className="h-14 w-14 rounded-2xl bg-blue-600" />

                            <h2 className="mt-6 text-3xl font-black">
                                {item.title}
                            </h2>

                            <p className="mt-4 text-slate-400">
                                {item.desc}
                            </p>

                            <div className="mt-6 text-2xl font-black text-blue-400">
                                {item.price}
                            </div>

                            <button
                                className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 font-bold hover:bg-blue-700 transition"
                            >
                                Добавить в корзину
                            </button>

                        </div>

                    ))}

                </div>

            </section>

        </main>
    );
}