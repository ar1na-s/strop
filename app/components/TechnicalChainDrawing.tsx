import type { Product } from "../data/product";
import styles from "./catalog.module.css";

export default function TechnicalChainDrawing({product,length,id}:{product:Product;length:string;id:string}) {
  const branches=product.type==='4СЦ'?[-24,-8,8,24]:product.type==='2СЦ'?[-20,20]:[0];
  const hook=<g fill="white" stroke="#111" strokeWidth="1"><circle cy="5" r="6"/><circle cy="5" r="3"/><path d="M-3 11C-2 21-17 26-16 37C-15 54 11 55 16 36L12 29C10 44-5 46-7 36C-9 29 6 25 5 15L3 11Z"/><path d="M4 17L12 30L10 32L2 19Z"/></g>;
  return <figure className={styles.visual} style={{background:'white'}}>
    <div className={styles.visualTop}><span>{product.type}</span><span>СХЕМА ИЗДЕЛИЯ</span></div>
    <svg viewBox="0 0 480 400" role="img" aria-labelledby={`${id}-technical-title`} className={styles.drawing}>
      <title id={`${id}-technical-title`}>{product.name}. Схема стропа, длина {length}</title>
      <defs><marker id={`${id}-technical-arrow`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto-start-reverse"><path d="M0 0L8 3L0 6Z" fill="#111"/></marker></defs>
      <rect width="480" height="400" fill="white"/>
      <path d="M240 24V312" fill="none" stroke="#555" strokeWidth=".6" strokeDasharray="13 3 2 3"/>
      <rect x="220" y="34" width="40" height="66" rx="20" fill="white" stroke="#111" strokeWidth="1.4"/>
      <rect x="225" y="39" width="30" height="56" rx="15" fill="white" stroke="#111" strokeWidth="1"/>
      {branches.map((angle,index)=><g key={angle} transform={`translate(${240+(index-(branches.length-1)/2)*7} 100) rotate(${-angle})`}>
        {Array.from({length:10},(_,i)=><g key={i} transform={`translate(0 ${i*13})`} fill="white" stroke="#111" strokeWidth=".9">
          <rect x={i%2?-2.5:-6} y="0" width={i%2?5:12} height="19" rx={i%2?2.5:6}/>
          <rect x={i%2?-1:-4} y="2" width={i%2?2:8} height="15" rx={i%2?1:4}/>
        </g>)}
        <g transform="translate(0 145)">{product.type==='ВЦ'?<><rect x="-12" y="0" width="24" height="39" rx="12" fill="white" stroke="#111" strokeWidth="1.2"/><rect x="-8" y="4" width="16" height="31" rx="8" fill="white" stroke="#111" strokeWidth="1"/></>:hook}</g>
      </g>)}
      <g stroke="#111" strokeWidth=".65" fill="none"><path d="M213 34H91M155 290H91"/><path d="M102 34V290" markerStart={`url(#${id}-technical-arrow)`} markerEnd={`url(#${id}-technical-arrow)`}/></g>
      <g fill="#111" fontFamily="Arial,sans-serif" fontSize="13"><text transform="translate(91 162) rotate(-90)" textAnchor="middle">L · {length}</text><text x="240" y="329" textAnchor="middle">Размер цепи: {product.dimensions?.diameter||'уточняется'}</text><text x="240" y="355" textAnchor="middle" fontSize="11">Размеры комплектующих — на чертежах ниже</text><text x="240" y="382" textAnchor="middle" fontSize="11">Условная схема · не в масштабе</text></g>
    </svg>
  </figure>;
}
