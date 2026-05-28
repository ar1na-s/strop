export const metadata = {
    title: "Каталог продукции — ТТК-Билдинг",
};

const products = [
    {
        title: "Цепные стропы",
        desc: "Прочные и надежные",
        price: "9 000 ₽",
    },
    {
        title: "Текстильные стропы",
        desc: "Легкие и безопасные",
        price: "5 000 ₽",
    },
];

export default function CatalogPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-5xl font-black">
                Каталог
            </h1>

            <div className="mt-10 grid gap-6 md:grid-cols-2">

                {products.map((item) => (
                    <div
                        key={item.title}
                        className="rounded-3xl border border-white/10 bg-white/5 p-8"
                    >
                        <h2 className="text-3xl font-black">
                            {item.title}
                        </h2>

                        <p className="mt-4 text-slate-400">
                            {item.desc}
                        </p>

                        <div className="mt-4 text-2xl text-blue-400 font-black">
                            {item.price}
                        </div>

                        <button
                            className="mt-6 rounded-2xl bg-blue-600 px-5 py-3 font-bold hover:bg-blue-700 transition"
                        >
                            Добавить в корзину
                        </button>
                    </div>
                ))}

            </div>

        </main>
    );
}