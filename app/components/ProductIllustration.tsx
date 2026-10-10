import type { Product } from "../data/product";
import styles from "./catalog.module.css";

export function illustrationFor(product: Product) {
  if (product.type === "Цепь крепления") return "lashing-chain";
  if (product.type === "Цепь + талреп") return "lashing-chain-binder";
  if (product.type === "СТП") return "webbing-sling";
  if (product.type === "Стяжной ремень") return "tie-down-strap";
  return null;
}

export default function ProductIllustration({ product }: { product: Product }) {
  const name = illustrationFor(product);
  return <figure className={styles.visual}>
    <div className={styles.visualTop}><span>{product.type}</span><span className={styles.stockStatus}><i aria-hidden="true"/>В наличии</span></div>
    <img className={styles.productPhoto} src={`/products/${name}-photo.webp`} alt={`Внешний вид: ${product.name}`} width="720" height="720" loading="lazy" decoding="async" />
    <figcaption className={styles.dimensionNote}>Типовое исполнение. Комплектация зависит от выбранных параметров.</figcaption>
  </figure>;
}

export function ProductDrawing({ product, length }: { product: Product; length?: string }) {
  const name = illustrationFor(product);
  if (!name) return null;
  return <figure className={styles.visual} style={{ marginTop: 20 }}>
    <div className={styles.visualTop}><span>{product.type}</span><span>РАЗМЕРНАЯ СХЕМА</span></div>
    <img className={styles.drawing} src={`/products/drawings/${name}.svg`} alt={`Схема ${product.name}: L — длина, ${product.type === "СТП" || product.type === "Стяжной ремень" ? "B — ширина ленты" : "d — диаметр прутка цепи"}`} width="480" height="280" loading="lazy" decoding="async" />
    <figcaption className={styles.dimensionNote}>L — {length || product.length || "уточняется"}. {product.type === "СТП" || product.type === "Стяжной ремень" ? `B — ${product.dimensions?.width || "уточняется"}` : `d — ${product.dimensions?.diameter || "уточняется"}`}.<br/>Схема не в масштабе. Размеры из карточки товара; остальные параметры согласуются с менеджером.</figcaption>
  </figure>;
}
