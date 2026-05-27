export const metadata = {
    title: "Цепные стропы — производство и продажа | ТТК-Билдинг",
    description:
        "Цепные стропы высокой прочности для промышленного использования. Производство и оптовая поставка по России.",
};

export default function Page() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-20">

            <h1 className="text-5xl font-black">
                Цепные стропы
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
                Цепные стропы отличаются высокой прочностью и долговечностью.
                Используются для подъёма тяжёлых грузов в промышленности и строительстве.
            </p>

            <h2 className="mt-10 text-2xl font-bold">
                Преимущества
            </h2>

            <ul className="mt-4 space-y-2 text-slate-700">
                <li>✔ высокая грузоподъёмность</li>
                <li>✔ устойчивость к износу</li>
                <li>✔ длительный срок службы</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold">
                Применение
            </h2>

            <p className="mt-4 text-slate-600 leading-7">
                Используются в строительстве, логистике, промышленности и на складах.
            </p>

        </main>
    );
}