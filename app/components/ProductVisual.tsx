"use client";

import { useId } from "react";
import type { Product } from "../data/product";
import styles from "./catalog.module.css";
import ProductIllustration, { illustrationFor } from "./ProductIllustration";

// Vector illustrations stay sharp at any scale. Dimension labels refer to the
// actual component in the supplier drawing, never to the drawing's pixel size.
export default function ProductVisual({ product, length }: { product: Product; length?: string }) {
  const id = useId().replaceAll(":", "");
  const metal = `url(#${id}-metal)`;
  const red = `url(#${id}-red)`;
  const strap = `url(#${id}-strap)`;
  const chain = product.kind === "Цепные";
  const sling = ["4СЦ", "2СЦ", "1СЦ", "ВЦ"].includes(product.type || "");
  const textile = product.kind === "Текстильные" || product.kind === "Автомобильные ленточные" || product.type === "Стяжной ремень";
  const round = product.type === "СТКК/СТПК";
  const dims = product.dimensions;
  const branches = product.type === "4СЦ" ? [-62,-22,22,62] : product.type === "2СЦ" ? [-45,45] : [0];
  const labelLength = length || product.length || "уточняется";
  const line = (x1:number,y1:number,x2:number,y2:number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3d7092" strokeWidth="1.3" markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />;
  const links = (count:number) => Array.from({length:count},(_,i)=><ellipse key={i} cx="0" cy={i*13} rx={i%2?3:7} ry="10" fill="none" stroke={metal} strokeWidth="4.5" />);
  const hook = <g><path d="M-7 0 L-7 16 C-8 27-24 32-22 48 C-20 66 8 66 14 50 L17 32 L8 41 C6 49-5 51-9 43 C-13 33 7 26 7 16 L7 0 Z" fill={red} stroke="#9c3628" strokeWidth="1.2"/><path d="M6 18 L15 35" stroke="#8494a0" strokeWidth="4"/><circle cy="7" r="3" fill="#fff"/></g>;
  if (illustrationFor(product)) return <ProductIllustration product={product} />;
  if(product.image) return <figure className={styles.visual}>
    <div className={styles.visualTop}><span>{product.type || product.kind}</span><span>ВНЕШНИЙ ВИД</span></div>
    <img className={styles.productPhoto} src={product.image} alt={product.name} width="480" height="400" loading="lazy" decoding="async"/>
    <figcaption className={styles.dimensionNote}>Типовое исполнение. Комплектация зависит от выбранных параметров.</figcaption>
  </figure>;
  return <figure className={styles.visual}>
    <div className={styles.visualTop}><span>{product.type || product.kind}</span><span>СХЕМА ИЗДЕЛИЯ</span></div>
    <svg viewBox="0 0 480 400" role="img" aria-labelledby={`${id}-title`} className={styles.drawing}>
      <title id={`${id}-title`}>{`${product.name}. Длина: ${labelLength}. Размеры обозначены стрелками.`}</title>
      <defs>
        <linearGradient id={`${id}-metal`}><stop stopColor="#344454"/><stop offset=".3" stopColor="#bac8d0"/><stop offset=".55" stopColor="#647886"/><stop offset=".8" stopColor="#dce4e8"/><stop offset="1" stopColor="#435364"/></linearGradient>
        <linearGradient id={`${id}-red`}><stop stopColor="#a63d29"/><stop offset=".4" stopColor="#ef8252"/><stop offset=".7" stopColor="#d65c3b"/><stop offset="1" stopColor="#a03727"/></linearGradient>
        <linearGradient id={`${id}-strap`}><stop stopColor="#b48a31"/><stop offset=".45" stopColor="#f0ce6d"/><stop offset="1" stopColor="#b88b2c"/></linearGradient>
        <marker id={`${id}-arrow`} viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M8 4 L0 0 L0 8 Z" fill="#3d7092"/></marker>
        <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#dce4e9" strokeWidth=".6"/></pattern>
      </defs>
      <rect width="480" height="400" fill={`url(#${id}-grid)`}/>
      <ellipse cx="232" cy="286" rx="110" ry="9" fill="#dae2e7" opacity=".55"/>
      {chain && sling ? <g>
        <rect x="216" y="36" width="38" height="67" rx="19" fill="none" stroke={red} strokeWidth="9"/>
        {branches.map((angle,i)=><g key={angle} transform={`translate(${235+(i-(branches.length-1)/2)*8} 105) rotate(${-angle/3})`}>
          {links(product.type==='ВЦ'?11:8)}
          <g transform={product.type==='ВЦ'?'translate(0 149)':'translate(0 108)'}>{product.type==='ВЦ'?<ellipse rx="12" ry="20" fill="none" stroke={metal} strokeWidth="6"/>:hook}</g>
        </g>)}
      </g> : chain ? <g transform="translate(140 195) rotate(-65)">{links(16)}<g transform="translate(0 -48) rotate(180)">{hook}</g><g transform="translate(0 211)">{hook}</g>{product.type==='Цепь + талреп'&&<rect x="-14" y="68" width="28" height="70" rx="7" fill={red}/>}</g>
      : textile ? <g>
        {round ? <ellipse cx="230" cy="160" rx="54" ry="101" fill="none" stroke={strap} strokeWidth="20"/> : <>
          <path d="M216 102 C175 7 282 7 244 102 L244 216 C282 307 175 307 216 216 Z" fill={strap} stroke="#af8634" strokeWidth="2"/>
          <path d="M226 101 C202 40 261 40 235 101 M226 217 C203 271 260 275 235 217" fill="#f7f9fb" stroke="#af8634" strokeWidth="2"/>
          {[221,229,237].map(x=><path key={x} d={`M${x} 108V209`} stroke="#896820" strokeDasharray="3 3" strokeWidth="1"/>)}
          <rect x="213" y="202" width="34" height="13" rx="2" fill="#315b82"/>
          {product.type==='Стяжной ремень'&&<g><rect x="204" y="133" width="54" height="53" rx="8" fill={metal}/><rect x="214" y="143" width="34" height="19" rx="3" fill="#172d43"/><path d="M204 134L270 107L276 125L258 151" fill={metal} stroke="#647886" strokeWidth="3"/></g>}
        </>}
      </g> : product.kind==='Траверсы' ? <g stroke="#a37a22" strokeWidth="3"><path d="M117 135H342V177H117Z" fill={strap}/><path d="M209 135V98H249V135" fill="none" strokeWidth="12"/><path d="M134 177V236M326 177V236"/><circle cx="134" cy="245" r="12" fill="none"/><circle cx="326" cy="245" r="12" fill="none"/></g>
      : product.type?.includes('Талреп') ? <g stroke={metal} strokeWidth="9" fill="none"><rect x="211" y="106" width="44" height="100" rx="17"/><path d="M233 107V66Q197 29 211 68Q216 81 233 75M233 207V253Q268 290 255 250Q249 237 233 244"/>{Array.from({length:7},(_,i)=><path key={i} d={`M225 ${84+i*5}h16 M225 ${215+i*5}h16`} strokeWidth="2"/>)}</g>
      : product.type==='Зажим' ? <g><path d="M198 197V129A35 35 0 0 1 268 129V197" fill="none" stroke={metal} strokeWidth="15"/><rect x="180" y="179" width="106" height="33" rx="5" fill={metal}/><path d="M187 215h24M254 215h24" stroke="#556e80" strokeWidth="10"/></g>
      : product.kind==='Такелаж' ? <g><path d="M187 223V125C187 47 277 47 277 125V223" stroke={metal} strokeWidth="23" fill="none"/><path d="M170 219H293" stroke={red} strokeWidth="18"/><circle cx="170" cy="219" r="15" fill={red}/></g>
      : <g>{[0,1,2,3].map(i=><ellipse key={i} cx={223+i*6} cy={162+i*3} rx={70-i*7} ry={97-i*5} fill="none" stroke={metal} strokeWidth="9"/>)}<path d="M286 161Q338 176 330 242" fill="none" stroke={metal} strokeWidth="10"/></g>}
      <g fill="#3d7092" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600">
        {chain && sling && <>
          {line(221,19,249,19)}
          <text x="277" y="24" fontSize="12">B · {dims?.width || 'уточняется'}</text>
          {product.type !== 'ВЦ' && <>
            <g transform="translate(391 162) scale(.75)">{hook}</g>
            <path d="M391 199H431M391 210H431" stroke="#91a8b7" strokeWidth="1"/>
            {line(423,200,423,209)}
            <text x="386" y="146" textAnchor="middle" fontSize="12">H · {dims?.hookH || 'уточняется'}</text>
            <text x="386" y="239" textAnchor="middle" fontSize="10">Сечение крюка</text>
          </>}
        </>}
        {textile && <>
          <rect x="354" y="194" width="48" height="9" rx="2" fill="#d1a746" stroke="#af8634"/>
          <path d="M403 194H434M403 203H434" stroke="#91a8b7" strokeWidth="1"/>
          {line(426,193,426,204)}
          <text x="382" y="178" textAnchor="middle" fontSize="12">H · уточняется</text>
          <text x="382" y="225" textAnchor="middle" fontSize="10">Сечение ленты</text>
        </>}
        <path d="M104 35H63M104 279H63" stroke="#91a8b7" strokeWidth="1"/>
        {line(74,39,74,275)}
        <text transform="translate(57 157) rotate(-90)" textAnchor="middle">L · {labelLength}</text>
        {textile ? <>{line(216,303,244,303)}<path d="M216 281V311M244 281V311" stroke="#91a8b7"/><text x="230" y="327" textAnchor="middle">B · {dims?.width || 'ширина уточняется'}</text><text x="230" y="352" textAnchor="middle" fontSize="12" fill="#617585">H · толщина уточняется</text></>
        : <><text x="240" y="323" textAnchor="middle">{dims?.diameter ? `Цепь · ${dims.diameter}` : 'B · ширина уточняется'}</text><text x="240" y="347" textAnchor="middle" fontSize="12" fill="#617585">{sling?'Размеры звена и крюка — в характеристиках':'H · высота уточняется'}</text></>}
      </g>
      <text x="240" y="383" textAnchor="middle" fill="#788995" fontSize="11" fontFamily="Arial, sans-serif">Схематичное изображение · не в масштабе</text>
    </svg>
  </figure>;
}

export function ComponentDimensions({ product }: { product: Product }) {
  const d=product.dimensions;
  useId();
  if(!d?.width && !d?.linkLength && !d?.hookH) return null;
  const sling=['4СЦ','2СЦ','1СЦ','ВЦ'].includes(product.type||'');
  if(!sling) return <p className={styles.dimensionNote}>B — ширина ленты: {d.width}. H — толщина: уточняется при заказе.</p>;
  return <div className={styles.componentDimensions}>
    <h4>Размеры комплектующих, мм</h4>
    <div className={styles.componentDrawings}>
      <figure><a href={product.type==='4СЦ'?'https://soft-liger-948183.netlify.app/products/drawings/master-link.png':'https://soft-liger-948183.netlify.app/products/drawings/link.jpg'} target="_blank" rel="noreferrer"><img src={product.type==='4СЦ'?'https://soft-liger-948183.netlify.app/products/drawings/master-link.png':'https://soft-liger-948183.netlify.app/products/drawings/link.jpg'} width="110" height="192" alt="Чертёж звена из таблицы поставщика" loading="lazy"/></a><figcaption>Звено<br/>B = {d.width||'уточняется'}<br/>{product.type==='4СЦ'?'L':'A'} = {d.linkLength||'уточняется'}</figcaption></figure>
      {product.type!=='ВЦ'&&<figure><a href="https://soft-liger-948183.netlify.app/products/drawings/hook.png" target="_blank" rel="noreferrer"><img src="https://soft-liger-948183.netlify.app/products/drawings/hook.png" width="110" height="145" alt="Чертёж крюка с обозначениями H и P1 из таблицы поставщика" loading="lazy"/></a><figcaption>Крюк<br/>H = {d.hookH||'уточняется'}<br/>P1 = {d.hookP||'уточняется'}</figcaption></figure>}
    </div>
    <p>H обозначает высоту сечения крюка. Габаритная высота изделия зависит от исполнения и положения ветвей.</p>
  </div>;
}
