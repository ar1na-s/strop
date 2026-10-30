import type { Product } from '../data/product';
import ProductVisual from './ProductVisual';
import styles from './catalog.module.css';
import { studioAsset } from '../data/product-images';
export default function ProductPhoto({product, execution, detail=false}:{product:Product;execution?:string;detail?:boolean}) {
  const asset=studioAsset(product,execution);
  if (!asset) return <ProductVisual product={product}/>;
  return <figure className={styles.studioVisual}>
    <div className={styles.photoType}>{execution && product.type === 'СТКК/СТПК' ? execution : product.type}</div>
    <img src={`/products/studio/${asset}.webp`} alt={`Иллюстрация: ${product.name}`} width="800" height="800" loading={detail?'eager':'lazy'} decoding="async" className={styles.studioPhoto}/>
    {detail && <figcaption>{product.type==='СТП' ? `Типовое исполнение · ${product.specs?.find(s=>s.startsWith('Цвет:')) || ''}` : 'Иллюстрация типового исполнения. Комплектация согласуется при заказе.'}</figcaption>}
  </figure>;
}
