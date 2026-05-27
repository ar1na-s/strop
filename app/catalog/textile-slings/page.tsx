export const metadata = {
    title: "Текстильные стропы — оптовая поставка | ТТК-Билдинг",
    description:
        "Лёгкие и эластичные текстильные стропы. Производство и доставка по России.",
};

export default function Page() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-20">

            <h1 className="text-5xl font-black">
                Текстильные стропы
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
                Текстильные стропы отличаются лёгкостью и удобством использования.
                Они не повреждают поверхность груза.
            </p>

            <h2 className="mt-10 text-2xl font-bold">Преимущества</h2>

            <ul className="mt-4 space-y-2 text-slate-700">
                <li>✔ лёгкие</li>
                <li>✔ безопасные для груза</li>
                <li>✔ удобны в эксплуатации</li>
            </ul>

        </main>
    );
}