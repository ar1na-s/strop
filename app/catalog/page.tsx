export const metadata = {
    title: "Каталог продукции — ТТК-Билдинг",
    description:
        "Цепные, текстильные, канатные и круглопрядные стропы. Производство и оптовая поставка.",
};

const products = [
    {
        title: "Цепные стропы",
        desc: "Прочные, долговечные, для тяжёлых нагрузок",
    },
    {
        title: "Текстильные стропы",
        desc: "Лёгкие, эластичные, не повреждают груз",
    },
    {
        title: "Канатные стропы",
        desc: "Классические, надёжные, универсальные",
    },
    {
        title: "Круглопрядные стропы",
        desc: "Высокая прочность и гибкость",
    },
    {
        title: "Траверсы",
        desc: "Для распределения нагрузки при подъёме",
    },
    {
        title: "Металлоконструкции",
        desc: "Индивидуальное промышленное производство",
    },
];

export default function CatalogPage() {
    return (
        <main className="min-h-screen bg-slate-50">

            {/* HEADER */}
            <section className="max-w-7xl mx-auto px-6 pt-20">

                <h1 className="text-5xl font-black tracking-tight">
                    Каталог продукции
                </h1>

                <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                    Производим и поставляем грузоподъёмные стропы и промышленное оборудование
                    по всей России.
                </p>

            </section>

            {/* GRID */}
            <section className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {products.map((item) => (
                        <div
                            key={item.title}
                            className="group rounded-3xl bg-white p-7 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1 border border-slate-100"
                        >

                            {/* ICON */}
                            <div className="h-12 w-12 rounded-2xl bg-slate-100 group-hover:bg-blue-600 transition" />

                            {/* TITLE */}
                            <h2 className="mt-5 text-2xl font-bold group-hover:text-blue-600 transition">
                                {item.title}
                            </h2>

                            {/* DESC */}
                            <p className="mt-3 text-slate-600 leading-6">
                                {item.desc}
                            </p>

                            {/* BUTTON */}
                            <div className="mt-6 text-sm font-semibold text-blue-600 group-hover:underline cursor-pointer">
                                Подробнее →
                            </div>

                        </div>
                    ))}

                </div>

            </section>

        </main>
    );
}