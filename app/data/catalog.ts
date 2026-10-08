import data from "./catalog.json";
import type { Product } from "./product";

// Only items documented in the supplied workbook are offered in the catalogue.
export const products = (data as Product[]).filter(p => p.source);
export const categories = [
  { slug: "stropy", title: "Стропы", group: "slings", kind: "all", description: "Цепные и текстильные стропы: выбор грузоподъёмности, длины и комплектации. Подбор для подъёма грузов и доставка по России." },
  { slug: "buksirovochnye-trosy", title: "Буксировочные тросы", group: "ropes", kind: "all", description: "Подбор буксировочного троса по массе техники, длине и способу крепления. Отправьте параметры для расчёта." },
  { slug: "stalnye-kanaty", title: "Стальные канаты", group: "other", kind: "Стальные", description: "Подбор стального каната для оборудования по диаметру, конструкции и требуемой длине. Расчёт по заявке." },
  { slug: "takelazh", title: "Такелаж", group: "other", kind: "Такелаж", description: "Натяжители цепей и такелажные комплектующие. Характеристики, цены и подбор совместимого исполнения." },
  { slug: "traversy", title: "Траверсы", group: "other", kind: "Траверсы", description: "Подбор траверсы по схеме подъёма, размерам и массе груза. Расчёт по техническому заданию." },
  { slug: "kreplenie-gruza", title: "Крепление груза", group: "other", kind: "Крепление груза", description: "Крепёжные цепи, комплекты цепь с талрепом и стяжные ремни для фиксации груза. Длины, нагрузки и комплектация." },
] as const;
export type Category = typeof categories[number];
export function categoryProducts(category: Category) {
  return products.filter(p => p.group === category.group && (category.kind === "all" || p.kind === category.kind));
}
export function productCategory(product: Product) {
  return categories.find(c => c.group === product.group && (c.kind === "all" || c.kind === product.kind))!;
}
