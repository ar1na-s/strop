import type { Product } from '../data/product';
import dynamic from 'next/dynamic';
const ProductVisual = dynamic(() => import('./ProductVisual'));
import styles from './catalog.module.css';
import { studioAsset } from '../data/product-images';
import { publicAsset } from '../data/public-asset';
export default function ProductPhoto({product, execution, detail=false}:{product:Product;execution?:string;detail?:boolean}) {
  const asset=studioAsset(product,execution);
  if (!asset) return <ProductVisual product={product}/>;
  return <figure className={styles.studioVisual}>
    <div className={styles.photoType}>{execution && product.type === 'СТКК/СТПК' ? execution : product.type}</div>
    <img src={publicAsset(`/products/${detail?'studio':'thumbs-v1'}/${asset}.webp`)} srcSet={detail?undefined:`${publicAsset(`/products/thumbs-v1/${asset}.webp`)} 450w, ${publicAsset(`/products/studio/${asset}.webp`)} 900w`} sizes={detail?undefined:'(max-width:800px) 45vw, (max-width:1100px) 30vw, 23vw'} alt={`Иллюстрация: ${product.name}`} width="800" height="800" loading={detail?'eager':'lazy'} decoding="async" className={styles.studioPhoto}/>
    {detail && <figcaption>{product.type==='СТП' ? `Типовое исполнение · ${product.specs?.find(s=>s.startsWith('Цвет:')) || ''}` : 'Иллюстрация типового исполнения. Комплектация согласуется при заказе.'}</figcaption>}
  </figure>;
}
