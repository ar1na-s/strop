import type { Product } from "../data/product";
import styles from "./catalog.module.css";

export function illustrationFor(product: Product) {
  if (product.type === "Цепь крепления") return "lashing-chain";
  if (product.type === "Цепь + талреп") return "lashing-chain-binder";
  if (product.type === "СТП") return "webbing-sling";
  return null;
}

export default function ProductIllustration({ product }: { product: Product }) {
  const name = illustrationFor(product);
  return <figure className={styles.visual}>
    <div className={styles.visualTop}><span>{product.type}</span><span>ИЛЛЮСТРАЦИЯ</span></div>
    <img className={styles.productPhoto} src={`/products/${name}.svg`} alt={`Внешний вид: ${product.name}`} width="480" height="360" loading="lazy" decoding="async" />
    <figcaption className={styles.dimensionNote}>Типовое исполнение. Цвет и детали уточняются при заказе.</figcaption>
  </figure>;
}

export function ProductDrawing({ product, length }: { product: Product; length?: string }) {
  const name = illustrationFor(product);
  if (!name) return null;
  return <figure className={styles.visual} style={{ marginTop: 20 }}>
    <div className={styles.visualTop}><span>{product.type}</span><span>РАЗМЕРНАЯ СХЕМА</span></div>
    <img className={styles.drawing} src={`/products/drawings/${name}.svg`} alt={`Схема ${product.name}: L — длина, ${product.type === "СТП" ? "B — ширина ленты" : "d — диаметр прутка цепи"}`} width="480" height="280" loading="lazy" decoding="async" />
    <figcaption className={styles.dimensionNote}>L — {length || product.length || "уточняется"}. {product.type === "СТП" ? `B — ${product.dimensions?.width || "уточняется"}` : `d — ${product.dimensions?.diameter || "уточняется"}`}.<br/>Схема не в масштабе. Размеры из карточки товара; остальные параметры согласуются с менеджером.</figcaption>
  </figure>;
}
