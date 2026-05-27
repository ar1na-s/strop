export const metadata = {
    title: "Круглопрядные стропы — производство | ТТК-Билдинг",
    description:
        "Эластичные и прочные круглопрядные стропы для промышленности.",
};

export default function Page() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-20">

            <h1 className="text-5xl font-black">
                Круглопрядные стропы
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
                Обладают высокой эластичностью и равномерным распределением нагрузки.
            </p>

            <h2 className="mt-10 text-2xl font-bold">Преимущества</h2>

            <ul className="mt-4 space-y-2 text-slate-700">
                <li>✔ гибкость</li>
                <li>✔ прочность</li>
                <li>✔ безопасность</li>
            </ul>

        </main>
    );
}