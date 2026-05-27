export const metadata = {
    title: "Каталог продукции — ТТК-Билдинг",
    description:
        "Цепные, текстильные, канатные и круглопрядные стропы. Производство и оптовая поставка.",
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
        desc: "Классические, надёжные, универсальные",
        price: "7 000 ₽",
    },
    {
        title: "Круглопрядные стропы",
        desc: "Высокая прочность и гибкость",
        price: "6 500 ₽",
    },
    {
        title: "Траверсы",
        desc: "Для распределения нагрузки при подъёме",
        price: "12 000 ₽",
    },
    {
        title: "Металлоконструкции",
        desc: "Индивидуальное промышленное производство",
        price: "15 000 ₽",
    },
];

export default function CatalogPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">

            {/* HEADER */}
            <section className="mx-auto max-w-7xl px-6 pt-24">

                <h1 className="text-6xl font-black tracking-tight">
                    Каталог продукции
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
                    Производство и поставка грузоподъёмных строп,
                    траверс и промышленного оборудования
                    по всей территории России.
                </p>

            </section>

            {/* GRID */}
            <section className="mx-auto max-w-7xl px-6 py-16">

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {products.map((item) => (

                        <div
                            key={item.title}
                            className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md hover:-translate-y-1 hover:bg-white/10 transition duration-300"
                        >

                            {/* ICON */}
                            <div className="h-14 w-14 rounded-2xl bg-blue-600" />

                            {/* TITLE */}
                            <h2 className="mt-6 text-3xl font-black group-hover:text-blue-400 transition">
                                {item.title}
                            </h2>

                            {/* DESC */}
                            <p className="mt-4 leading-7 text-slate-400">
                                {item.desc}
                            </p>

                            {/* PRICE */}
                            <div className="mt-6 text-2xl font-black text-blue-400">
                                {item.price}
                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={() => {
                                    alert(`${item.title} добавлен в корзину`);
                                }}
                                className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-bold text-white hover:bg-blue-700 transition"
                            >
                                Добавить в корзину
                            </button>

                            {/* LINK */}
                            <div className="mt-5 cursor-pointer text-sm font-semibold text-blue-400 hover:underline">
                                Подробнее →
                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </main>
    );
}