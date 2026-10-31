"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "../data/product";
import { configureProduct } from "../data/product";
import Link from "./SiteLink";
import ProductVisual, { ComponentDimensions } from "./ProductVisual";
import { ProductDrawing } from "./ProductIllustration";
import { illustrationFor } from "./ProductIllustration";
import ProductPhoto from "./ProductPhoto";
import { productCopy, loadLabel, specPair } from "../data/presentation";
import { formatPrice } from "./ProductCard";
import styles from "./catalog.module.css";

export default function ProductDialog({ product, onClose, onAdd, onRequest, inline = false }: { product: Product; onClose: () => void; onAdd: (product: Product) => void; onRequest: (product: Product) => void; inline?: boolean }) {
  const [index,setIndex]=useState(0);
  const [execution, setExecution] = useState("СТКК");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const ref=useRef<HTMLDivElement>(null);
  const configured=configureProduct(product.type === "СТКК/СТПК" ? {...product, name: product.name.replace("СТКК/СТПК", execution)} : product,index,quantities);
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
  const copy = productCopy(product);
  return <div className={inline ? styles.productPage : styles.overlay} onClick={e=>{if(!inline&&e.target===e.currentTarget)onClose();}}>
    <div ref={ref} className={inline ? styles.inlineDetail : styles.dialog} role={inline ? undefined : "dialog"} aria-modal={inline ? undefined : true} aria-labelledby="product-title" tabIndex={-1}>
      {!inline&&<button type="button" className={styles.close} aria-label="Закрыть карточку товара" onClick={onClose}>×</button>}
      <div className={styles.detailGrid}>
        <div className={styles.detailVisual}><ProductPhoto product={product} execution={execution} detail/></div>
        <div className={styles.detailBody}>
          <p className={styles.category}>{product.kind} / {product.type}</p>
          <Title id="product-title">{product.name}</Title>
          {!inline&&<Link className={styles.permalink} href={`/product/${product.slug}`}>Открыть страницу товара ↗</Link>}
          <p className={styles.description}>{copy.intro}</p>
          <div className={styles.keyFacts}>{product.load && <span>{loadLabel(product)} <b>{product.load}</b></span>}{configured.length && <span>Рабочая длина <b>{configured.length}</b></span>}</div>
          {product.type === "СТКК/СТПК" && <label className={styles.label}>Исполнение · цена одинаковая<select value={execution} onChange={e => setExecution(e.target.value)} style={{display:"block", marginTop:10, padding:12, border:"1px solid #aab8c5", borderRadius:12, width:"100%"}}><option value="СТКК">СТКК — кольцевой</option><option value="СТПК">СТПК — петлевой</option></select></label>}
          {product.clarification&&<p className={styles.notice}>{product.clarification} Менеджер подтвердит исполнение перед заказом.</p>}
          {product.variants&&<><span className={styles.label}>Длина изделия</span><div className={styles.lengths} role="group" aria-label="Длина изделия">{product.variants.map((v,i)=><button type="button" key={v.length} className={styles.length} aria-pressed={index===i} onClick={()=>setIndex(i)}>{v.length}</button>)}</div></>}
          <div className={styles.detailPrice} aria-live="polite"><div className={styles.price}>{configured.price>0?formatPrice(configured.price):'Цена по запросу'}</div><p className={styles.priceNote}>{configured.length?`Длина ${configured.length} · `:''}{configured.selectedServices?.length?'С выбранными дополнениями':'Базовая комплектация'}{configured.requiresQuote?' · предварительный расчёт':''}</p>{configured.requiresQuote&&<p className={styles.priceNote}>Позиции без указанной цены в сумму не включены. Полный расчёт — по заявке.</p>}</div>
          <div className={styles.buttons}>
            {!configured.requiresQuote?<button type="button" className={styles.primary} onClick={()=>{onAdd(configured);if(!inline)onClose();}}>Добавить в корзину</button>:<button type="button" className={styles.primary} onClick={()=>onRequest(configured)}>Запросить стоимость</button>}
            <button type="button" className={styles.secondary} onClick={()=>onRequest(configured)}>Получить расчёт</button>
          </div>
          {!!product.services?.length&&<details className={styles.optionalDetails}><summary>Дополнительная комплектация · {product.services.length} опции</summary><fieldset className={styles.servicePicker}><legend>Дополнительная комплектация и услуги</legend>{product.services.map(s=><label key={s.name} className={styles.serviceRow}>
            {s.name==='Дополнительный метр' ? <input type="number" min="0" max="100" step="1" value={quantities[s.name]||0} aria-label="Дополнительные метры" onChange={e=>setQuantities({...quantities,[s.name]:Number(e.target.value)})}/> : <input type="checkbox" checked={!!quantities[s.name]} onChange={e=>setQuantities({...quantities,[s.name]:e.target.checked?1:0})}/>}
            <span>{s.name}{s.name === "Комплект регулировки длины" && <img src="/products/shortening-hook.svg" alt="Укорачивающий крюк — регулировка рабочей длины цепи" width="64" height="78"/>}</span><b>{s.price>0?`+${formatPrice(s.price)}`:'По запросу'}{s.name==='Дополнительный метр'?' / м':''}</b>
          </label>)}<p className={styles.priceNote}>Дополнительные метры указаны сверх выбранной длины. Возможность удлинения и окончательную стоимость подтвердит менеджер.</p></fieldset></details>}

        </div>
      </div>
      <details className={styles.technicalDetails}><summary>Характеристики и чертежи</summary><section className={styles.technicalSection} aria-label="Характеристики и чертежи">
        <div><p className={styles.eyebrow}>Параметры изделия</p><h2>Характеристики</h2><dl className={styles.factTable}>{product.load && <div><dt>{loadLabel(product)}</dt><dd>{product.load}</dd></div>}{configured.length && <div><dt>Длина</dt><dd>{configured.length}</dd></div>}{product.specs?.map((value,i)=>{const [label,text]=specPair(value);return <div key={i}><dt>{label}</dt><dd>{text}</dd></div>;})}</dl></div>
        <div><p className={styles.eyebrow}>Техническая информация</p><h2>Чертежи и размеры</h2>{illustrationFor(product)?<ProductDrawing product={product} length={configured.length}/>:<ProductVisual product={product} length={configured.length} diagramOnly/>}<ComponentDimensions product={product}/></div>
      </section><p className={styles.description} style={{padding:"0 30px 24px"}}>{copy.use} {copy.detail}</p></details>
    </div>
  </div>;
}
