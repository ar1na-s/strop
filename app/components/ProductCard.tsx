import type { Product } from "../data/product";
import ProductVisual from "./ProductVisual";
import styles from "./catalog.module.css";
import Link from "next/link";

export const formatPrice = (price: number) => new Intl.NumberFormat("ru-RU").format(price) + " ₽";

export default function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  return <article className={styles.card}>
    <Link href={`/product/${product.slug}`} prefetch={false} className={styles.cardLink} onClick={e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onOpen(product);}}} aria-label={`Открыть ${product.name}`}>
    <ProductVisual product={product}/>
    <div className={styles.body}>
      <p className={styles.category}>{product.kind}</p>
      <h3 className={styles.name}>{product.name}</h3>
      <dl className={styles.specs}>
        <div><dt>{product.load?.includes('/')?'Рабочая / максимальная':'Грузоподъёмность'}</dt><dd>{product.load||'По задаче'}</dd></div>
        <div><dt>Длина</dt><dd>{product.length||'Уточняется'}</dd></div>
        {product.dimensions?.diameter&&<div><dt>Калибр × шаг цепи</dt><dd>{product.dimensions.diameter}</dd></div>}
        {product.dimensions?.width&&<div><dt>{product.type==='СТП'||product.type==='Стяжной ремень'?'Ширина ленты':'Ширина звена'}</dt><dd>{product.dimensions.width}</dd></div>}
      </dl>
      <div className={styles.priceRow}><div><div className={styles.price}>{product.price>0?`от ${formatPrice(product.price)}`:'Цена по запросу'}</div><div className={styles.priceNote}>{product.variants?.[0]?`За изделие длиной ${product.variants[0].length}`:'За базовую комплектацию'}</div></div></div>
      <div className={styles.cardHint}>Подробнее <span aria-hidden="true">↗</span></div>
    </div>
    </Link>
  </article>;
}
