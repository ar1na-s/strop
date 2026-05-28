"use client";

import { useState } from "react";

const products = [
    {
        title: "Строп цепной 1СЦ",
        length: "1,0",
        chain: "6×18",
        model: "1СЦ",
        hook: "P-7/8",
        capacity: "1,0т",
    },

    {
        title: "Строп цепной 2СЦ",
        length: "4,0",
        chain: "13×39",
        model: "2СЦ",
        hook: "P-16",
        capacity: "5,0т",
    },

    {
        title: "Строп цепной 4СЦ",
        length: "6,0",
        chain: "16×48",
        model: "4СЦ",
        hook: "H-20",
        capacity: "8,0т",
    },
];

export default function CatalogPage() {
    const [selectedLength, setSelectedLength] = useState("");
    const [selectedChain, setSelectedChain] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedHook, setSelectedHook] = useState("");
    const [selectedCapacity, setSelectedCapacity] = useState("");

    const filteredProducts = products.filter((product) => {
        return (
            (!selectedLength || product.length === selectedLength) &&
            (!selectedChain || product.chain === selectedChain) &&
            (!selectedModel || product.model === selectedModel) &&
            (!selectedHook || product.hook === selectedHook) &&
            (!selectedCapacity || product.capacity === selectedCapacity)
        );
    });

    const FilterButtons = ({
        title,
        options,
        selected,
        setSelected,
    }: any) => (
        <div className="mt-10">

            <h2 className="text-2xl font-black mb-5">
                {title}
            </h2>

            <div className="flex flex-wrap gap-3">

                {options.map((option: string) => (
                    <button
                        key={option}
                        onClick={() =>
                            setSelected(selected === option ? "" : option)
                        }
                        className={`rounded-2xl border px-5 py-3 text-sm font-bold transition
              
              ${selected === option
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-white/5 border-white/10 text-white hover:border-blue-500"
                            }
            `}
                    >
                        {option}
                    </button>
                ))}

            </div>

        </div>
    );

    return (
        <main className="min-h-screen bg-slate-950 text-white px-6 py-20">

            <div className="mx-auto max-w-7xl">

                <h1 className="text-5xl font-black">
                    Каталог строп
                </h1>

                {/* FILTERS */}

                <FilterButtons
                    title="Длина, м"
                    options={[
                        "1,0",
                        "2,0",
                        "3,0",
                        "4,0",
                        "5,0",
                        "6,0",
                        "7,0",
                        "8,0",
                    ]}
                    selected={selectedLength}
                    setSelected={setSelectedLength}
                />

                <FilterButtons
                    title="Цепь, мм"
                    options={[
                        "6×18",
                        "8×24",
                        "10×30",
                        "13×39",
                        "16×48",
                        "20×60",
                    ]}
                    selected={selectedChain}
                    setSelected={setSelectedChain}
                />

                <FilterButtons
                    title="Модель"
                    options={["1СЦ", "2СЦ", "4СЦ"]}
                    selected={selectedModel}
                    setSelected={setSelectedModel}
                />

                <FilterButtons
                    title="Крюки"
                    options={[
                        "P-7/8",
                        "P-10",
                        "P-13",
                        "P-16",
                        "P-20",
                        "H-7/8",
                        "H-10",
                        "H-13",
                        "H-16",
                        "H-20",
                    ]}
                    selected={selectedHook}
                    setSelected={setSelectedHook}
                />

                <FilterButtons
                    title="Грузоподъёмность"
                    options={[
                        "1,0т",
                        "1,6т",
                        "2,0т",
                        "3,15т",
                        "5,0т",
                        "8,0т",
                    ]}
                    selected={selectedCapacity}
                    setSelected={setSelectedCapacity}
                />

                {/* PRODUCTS */}

                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {filteredProducts.map((product) => (
                        <div
                            key={product.title}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
                        >
                            <h3 className="text-2xl font-black">
                                {product.title}
                            </h3>

                            <div className="mt-6 space-y-3 text-slate-300">

                                <div>
                                    Длина: {product.length} м
                                </div>

                                <div>
                                    Цепь: {product.chain}
                                </div>

                                <div>
                                    Модель: {product.model}
                                </div>

                                <div>
                                    Крюк: {product.hook}
                                </div>

                                <div>
                                    Грузоподъёмность: {product.capacity}
                                </div>

                            </div>

                            <button className="mt-8 w-full rounded-2xl bg-blue-600 py-4 font-black hover:bg-blue-700 transition">
                                Добавить в корзину
                            </button>

                        </div>
                    ))}

                </div>

            </div>

        </main>
    );
}