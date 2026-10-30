"use client";
import type { Product } from "../data/product";
import ProductPhoto from "./ProductPhoto";
import styles from "./catalog.module.css";
import Link from "next/link";

export const formatPrice = (price: number) => new Intl.NumberFormat("ru-RU").format(price) + " ₽";
function compactName(p:Product) {
  if(['4СЦ','2СЦ','1СЦ'].includes(p.type||'')) return `Цепной строп ${p.type}`;
  if(p.type==='ВЦ')return 'Цепная ветвь ВЦ';
  if(p.type==='СТП')return 'Ленточный строп СТП';
  if(p.type==='СТКК/СТПК')return 'Круглопрядный строп СТКК/СТПК';
  if(p.type==='УСК1 (СКП)'||p.type==='4СК')return `Канатный строп ${p.type}`;
  return p.name;
}

export default function ProductCard({ product, onOpen }: { product: Product; onOpen?: (product: Product) => void }) {
  return <article className={styles.card}>
    <Link href={`/product/${product.slug}`} prefetch={false} className={styles.cardLink} onClick={e=>{if(onOpen&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onOpen(product);}}} aria-label={`Открыть ${product.name}`}>
    <ProductPhoto product={product}/>
    <div className={styles.body}>
      <h3 className={styles.name}>{compactName(product)}</h3>
      <div className={styles.cardFacts}>{product.load && <span>{product.load}</span>}{product.length && <span>{product.length}</span>}</div>
      <div className={styles.compactPrice}><strong>{product.price>0?`от ${formatPrice(product.price)}`:'По запросу'}</strong><span aria-hidden="true">↗</span></div>
    </div>
    </Link>
  </article>;
}
