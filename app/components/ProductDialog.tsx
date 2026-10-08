"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "../data/product";
import { configureProduct } from "../data/product";
import Link from "next/link";
import ProductVisual, { ComponentDimensions } from "./ProductVisual";
import { formatPrice } from "./ProductCard";
import styles from "./catalog.module.css";

export default function ProductDialog({ product, onClose, onAdd, onRequest, inline = false }: { product: Product; onClose: () => void; onAdd: (product: Product) => void; onRequest: (product: Product) => void; inline?: boolean }) {
  const [index,setIndex]=useState(0);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const ref=useRef<HTMLDivElement>(null);
  const configured=configureProduct(product,index,quantities);
  useEffect(()=>{
    if(inline) return;
    const previous=document.activeElement as HTMLElement|null;
    const dialog=ref.current;
    dialog?.focus();
    const key=(e:KeyboardEvent)=>{
      if(e.key==='Escape') onClose();
      if(e.key==='Tab') {
        const elements=Array.from(dialog?.querySelectorAll<HTMLElement>('button, a[href], input, select, summary, [tabindex="0"]')||[]).filter(el=>el.getClientRects().length>0);
        const first=elements[0],last=elements.at(-1);
        if(e.shiftKey && (document.activeElement===first||document.activeElement===dialog)) {e.preventDefault();last?.focus();}
        else if(!e.shiftKey && (document.activeElement===last||document.activeElement===dialog)) {e.preventDefault();first?.focus();}
      }
    };
    document.addEventListener('keydown',key);
    return ()=>{document.removeEventListener('keydown',key);previous?.focus();};
  },[onClose,inline]);
  const Title = inline ? 'h1' : 'h2';
  return <div className={inline ? styles.productPage : styles.overlay} onClick={e=>{if(!inline&&e.target===e.currentTarget)onClose();}}>
    <div ref={ref} className={inline ? styles.inlineDetail : styles.dialog} role={inline ? undefined : "dialog"} aria-modal={inline ? undefined : true} aria-labelledby="product-title" tabIndex={-1}>
      {!inline&&<button type="button" className={styles.close} aria-label="Закрыть карточку товара" onClick={onClose}>×</button>}
      <div className={styles.detailGrid}>
        <div className={styles.detailVisual}><ProductVisual product={product} length={configured.length}/><ComponentDimensions product={product}/></div>
        <div className={styles.detailBody}>
          <p className={styles.category}>{product.kind} / {product.type}</p>
          <Title id="product-title">{product.name}</Title>
          {!inline&&<Link className={styles.permalink} href={`/product/${product.slug}`}>Открыть страницу товара ↗</Link>}
          <p className={styles.description}>{product.description}</p>
          {product.clarification&&<p className={styles.notice}>{product.clarification} Менеджер подтвердит исполнение перед заказом.</p>}
          {product.variants&&<><span className={styles.label}>Длина изделия</span><div className={styles.lengths} role="group" aria-label="Длина изделия">{product.variants.map((v,i)=><button type="button" key={v.length} className={styles.length} aria-pressed={index===i} onClick={()=>setIndex(i)}>{v.length}</button>)}</div></>}
          {!!product.services?.length&&<fieldset className={styles.servicePicker}><legend>Дополнительная комплектация и услуги</legend>{product.services.map(s=><label key={s.name} className={styles.serviceRow}>
            {s.name==='Дополнительный метр' ? <input type="number" min="0" max="100" step="1" value={quantities[s.name]||0} aria-label="Дополнительные метры" onChange={e=>setQuantities({...quantities,[s.name]:Number(e.target.value)})}/> : <input type="checkbox" checked={!!quantities[s.name]} onChange={e=>setQuantities({...quantities,[s.name]:e.target.checked?1:0})}/>}
            <span>{s.name}</span><b>{s.price>0?`+${formatPrice(s.price)}`:'По запросу'}{s.name==='Дополнительный метр'?' / м':''}</b>
          </label>)}<p className={styles.priceNote}>Дополнительные метры указаны сверх выбранной длины. Возможность удлинения и окончательную стоимость подтвердит менеджер.</p></fieldset>}
          <div className={styles.detailPrice} aria-live="polite"><div className={styles.price}>{configured.price>0?formatPrice(configured.price):'Цена по запросу'}</div><p className={styles.priceNote}>{configured.length?`Длина ${configured.length} · `:''}{configured.selectedServices?.length?'С выбранными дополнениями':'Базовая комплектация'}{configured.requiresQuote?' · предварительный расчёт':''}</p>{configured.requiresQuote&&<p className={styles.priceNote}>Позиции без указанной цены в сумму не включены. Полный расчёт — по заявке.</p>}</div>
          <div className={styles.buttons}>
            {!configured.requiresQuote?<button type="button" className={styles.primary} onClick={()=>{onAdd(configured);if(!inline)onClose();}}>Добавить в корзину</button>:<button type="button" className={styles.primary} onClick={()=>onRequest(configured)}>Запросить стоимость</button>}
            <button type="button" className={styles.secondary} onClick={()=>onRequest(configured)}>Получить расчёт</button>
          </div>
          <span className={styles.label}>Характеристики</span>
          <dl className={styles.specs}><div><dt>Нагрузка</dt><dd>{product.load||'Уточняется'}</dd></div><div><dt>Длина</dt><dd>{configured.length||'Уточняется'}</dd></div>{product.specs?.map((s,i)=><div key={i}><dt>{s.includes('цепь')||s.includes('Цепь')?'Цепь':s.startsWith('Звено')?'Звено':s.startsWith('Крюк')?'Крюк':s.includes('Ширина')?'Лента':'Исполнение'}</dt><dd>{s}</dd></div>)}</dl>
        </div>
      </div>
    </div>
  </div>;
}
