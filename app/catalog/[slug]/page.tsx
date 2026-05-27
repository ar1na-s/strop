import { notFound } from "next/navigation";

type Product = {
    title: string;
    description: string;
    advantages: string[];
};

const products: Record<string, Product> = {
    "chain-slings": {
        title: "Цепные стропы",
        description:
            "Цепные стропы высокой прочности для промышленного использования.",
        advantages: [
            "Высокая грузоподъёмность",
            "Долгий срок службы",
            "Устойчивость к износу",
        ],
    },

    "textile-slings": {
        title: "Текстильные стропы",
        description:
            "Лёгкие и эластичные стропы, не повреждают поверхность груза.",
        advantages: [
            "Лёгкие",
            "Безопасные для груза",
            "Удобные в использовании",
        ],
    },

    "rope-slings": {
        title: "Канатные стропы",
        description:
            "Классические стропы с высокой прочностью и универсальностью.",
        advantages: ["Прочные", "Универсальные", "Надёжные"],
    },

    "round-slings": {
        title: "Круглопрядные стропы",
        description:
            "Эластичные стропы с равномерным распределением нагрузки.",
        advantages: ["Гибкие", "Прочные", "Безопасные"],
    },
};

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}) {
    const product = products[params.slug];

    return {
        title: product?.title
            ? `${product.title} — ТТК-Билдинг`
            : "Товар — ТТК-Билдинг",
        description: product?.description ?? "",
    };
}

export default function Page({
    params,
}: {
    params: { slug: string };
}) {
    const product = products[params.slug];

    if (!product) return notFound();

    return (
        <main className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-5xl font-black">{product.title}</h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
                {product.description}
            </p>

            <h2 className="mt-10 text-2xl font-bold">Преимущества</h2>

            <ul className="mt-4 space-y-2 text-slate-700">
                {product.advantages.map((a) => (
                    <li key={a}>✔ {a}</li>
                ))}
            </ul>
        </main>
    );
}