"use client";

import { useState } from "react";

const products = [
    {
        name: "Текстильные стропы",
        price: 5000,
        material: "текстиль",
    },
    {
        name: "Канатные стропы",
        price: 7000,
        material: "канат",
    },
    {
        name: "Цепные стропы",
        price: 9000,
        material: "цепь",
    },
    {
        name: "Траверсы",
        price: 12000,
        material: "металл",
    },
];

export default function CatalogPage() {
    const [search, setSearch] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [material, setMaterial] = useState("");

    const filtered = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

        const priceOk =
            (!priceFrom || p.price >= Number(priceFrom)) &&
            (!priceTo || p.price <= Number(priceTo));

        const materialOk = !material || p.material === material;

        return matchSearch && priceOk && materialOk;
    });

    return (
        <main
            className="min-h-screen text-white"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1581091870622-2c0a5b9c4f84?q=80&w=2070&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            {/* DARK OVERLAY */}
            <div className="min-h-screen bg-black/80">

                <div className="mx-auto max-w-7xl px-6 py-16">

                    {/* TITLE */}
                    <h1 className="text-5xl font-black">
                        Каталог продукции
                    </h1>

                    {/* FILTER PANEL */}
                    <div className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:grid-cols-4">

                        <input
                            placeholder="Поиск..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-xl bg-black/40 p-3"
                        />

                        <input
                            type="number"
                            placeholder="Цена от"
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                            className="rounded-xl bg-black/40 p-3"
                        />

                        <input
                            type="number"
                            placeholder="Цена до"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            className="rounded-xl bg-black/40 p-3"
                        />

                        <select
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            className="rounded-xl bg-black/40 p-3"
                        >
                            <option value="">Материал</option>
                            <option value="текстиль">Текстиль</option>
                            <option value="канат">Канат</option>
                            <option value="цепь">Цепь</option>
                            <option value="металл">Металл</option>
                        </select>

                    </div>

                    {/* PRODUCTS */}
                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {filtered.map((p) => (
                            <div
                                key={p.name}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:bg-white/10 transition"
                            >
                                <h3 className="text-2xl font-black">{p.name}</h3>

                                <p className="mt-2 text-slate-300">
                                    Материал: {p.material}
                                </p>

                                <div className="mt-6 text-2xl font-black text-blue-400">
                                    {p.price.toLocaleString()} ₽
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </main>
    );
}