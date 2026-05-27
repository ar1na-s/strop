export const metadata = {
    title: "Канатные стропы — производство | ТТК-Билдинг",
    description:
        "Канатные стропы высокой прочности для промышленного использования.",
};

export default function Page() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-20">

            <h1 className="text-5xl font-black">Канатные стропы</h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
                Надёжные канатные стропы для тяжёлых условий эксплуатации.
            </p>

            <h2 className="mt-10 text-2xl font-bold">Преимущества</h2>

            <ul className="mt-4 space-y-2 text-slate-700">
                <li>✔ высокая прочность</li>
                <li>✔ универсальность</li>
                <li>✔ долгий срок службы</li>
            </ul>

        </main>
    );
}