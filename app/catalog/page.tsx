"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Product = {
  title: string;
  length: string;
  chain: string;
  model: string;
  hook: string;
  capacity: string;
};

const products: Product[] = [
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
  const [search, setSearch] = useState("");

  const [selectedLength, setSelectedLength] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedHook, setSelectedHook] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      // 🔎 ПОИСК ТОЛЬКО ПО НАЗВАНИЮ
      const matchesSearch =
        query === "" ||
        product.title.toLowerCase().includes(query);

      // ФИЛЬТРЫ ХАРАКТЕРИСТИК
      const matchesLength =
        selectedLength === "" ||
        product.length === selectedLength;

      const matchesChain =
        selectedChain === "" ||
        product.chain === selectedChain;

      const matchesModel =
        selectedModel === "" ||
        product.model === selectedModel;

      const matchesHook =
        selectedHook === "" ||
        product.hook === selectedHook;

      const matchesCapacity =
        selectedCapacity === "" ||
        product.capacity === selectedCapacity;

      return (
        matchesSearch &&
        matchesLength &&
        matchesChain &&
        matchesModel &&
        matchesHook &&
        matchesCapacity
      );
    });
  }, [
    search,
    selectedLength,
    selectedChain,
    selectedModel,
    selectedHook,
    selectedCapacity,
  ]);

  const resetFilters = () => {
    setSelectedLength("");
    setSelectedChain("");
    setSelectedModel("");
    setSelectedHook("");
    setSelectedCapacity("");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          Каталог строп
        </h1>

        {isProductFilterOpen && (
  <>
    {/* Затемнение страницы */}
    <div
      className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
      onClick={() => setIsProductFilterOpen(false)}
    />

    {/* Панель фильтров */}
    <aside className="fixed right-0 top-0 z-[90] h-screen w-full max-w-md overflow-y-auto bg-[#0B1B33] p-6 text-white shadow-2xl">
      
      {/* Заголовок */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <h2 className="text-2xl font-black">
          Фильтры товаров
        </h2>

        <button
          type="button"
          onClick={() => setIsProductFilterOpen(false)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl transition hover:bg-white/10"
          aria-label="Закрыть фильтры"
        >
          ×
        </button>
      </div>
      {/* ФИЛЬТРЫ */}

<div className="mt-6 space-y-6">

  {/* Длина */}
  <div>
    <label className="mb-2 block text-sm font-bold text-white">
      Длина, м
    </label>

    <div className="grid grid-cols-2 gap-3">
      <input
        type="number"
        placeholder="От"
        value={lengthMin}
        onChange={(e) => setLengthMin(e.target.value)}
        className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-white/40 focus:border-white/30"
      />

      <input
        type="number"
        placeholder="До"
        value={lengthMax}
        onChange={(e) => setLengthMax(e.target.value)}
        className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-white/40 focus:border-white/30"
      />
    </div>
  </div>

  {/* Грузоподъёмность */}
  <div>
    <label className="mb-2 block text-sm font-bold text-white">
      Грузоподъёмность, т
    </label>

    <div className="grid grid-cols-2 gap-3">
      <input
        type="number"
        placeholder="От"
        value={loadMin}
        onChange={(e) => setLoadMin(e.target.value)}
        className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-white/40 focus:border-white/30"
      />

      <input
        type="number"
        placeholder="До"
        value={loadMax}
        onChange={(e) => setLoadMax(e.target.value)}
        className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-white/40"
      />
    </div>
  </div>

  {/* Количество ветвей */}
  <div>
    <label className="mb-3 block text-sm font-bold text-white">
      Количество ветвей
    </label>

    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 4].map((count) => (
        <button
          key={count}
          type="button"
          onClick={() =>
            setBranches(branches === count ? "" : count)
          }
          className={`h-11 rounded-xl border text-sm font-bold transition ${
            branches === count
              ? "border-white bg-white text-[#0B1B33]"
              : "border-white/10 bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          {count}
        </button>
      ))}
    </div>
  </div>

  {/* Тип стропа */}
  <div>
    <label className="mb-3 block text-sm font-bold text-white">
      Тип стропа
    </label>

    <div className="space-y-2">

      {[
        "Текстильный",
        "Канатный",
        "Цепной",
      ].map((type) => (
        <button
          key={type}
          type="button"
          onClick={() =>
            setSlingType(slingType === type ? "" : type)
          }
          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
            slingType === type
              ? "border-white bg-white text-[#0B1B33]"
              : "border-white/10 bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          <span>{type}</span>

          {slingType === type && (
            <span>✓</span>
          )}
        </button>
      ))}

    </div>
  </div>

  {/* Кнопки */}
  <div className="flex gap-3 pt-2">

   

    <button
      type="button"
      onClick={() => setIsProductFilterOpen(false)}
      className="h-12 flex-1 rounded-xl bg-white text-sm font-black text-[#0B1B33] transition hover:bg-slate-100"
    >
      Показать товары
    </button>

  </div>

</div>

      {/* ПОИСК */}
      <div className="mt-8">
        <label
          htmlFor="product-search"
          className="mb-3 block text-lg font-black"
        >
          Поиск по названию товара
        </label>

        <input
          id="product-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Введите название товара..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />

        {search && (
          <p className="mt-3 text-sm text-slate-400">
            По запросу «{search}» найдено:{" "}
            <span className="font-bold text-white">
              {filteredProducts.length}
            </span>
          </p>
        )}
      </div>

      {/* ФИЛЬТРЫ */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black">
            Параметры
          </h3>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold transition hover:border-blue-500"
          >
            Сбросить
          </button>
        </div>

        <Filter
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

        <Filter
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

        <Filter
          title="Модель"
          options={["1СЦ", "2СЦ", "4СЦ"]}
          selected={selectedModel}
          setSelected={setSelectedModel}
        />

        <Filter
          title="Крюк"
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

        <Filter
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
      </div>

    </aside>
  </>
)}

        {/* ТОВАРЫ */}
        <div className="mt-12">

          <h2 className="mb-6 text-2xl font-black">
            Товары ({filteredProducts.length})
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
              <h3 className="text-2xl font-black">
                Товар не найден
              </h3>

              <p className="mt-3 text-slate-400">
                Измените название товара или параметры фильтров.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map((product) => (
                <div
                  key={product.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8"
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
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </main>
  );
}

function Filter({
  title,
  options,
  selected,
  setSelected,
}: {
  title: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-black">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const active = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                setSelected(active ? "" : option)
              }
              className={`rounded-xl border px-4 py-2 font-bold transition ${
                active
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-white/10 bg-white/5 text-white hover:border-blue-500"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}