import { notFound } from "next/navigation";
import SiteClient from "../../SiteClient";
import { products, productCategory } from "../../data/catalog";
import { pageMetadata, SITE_URL, jsonLd } from "../../data/seo";
import { productCopy, loadLabel } from "../../data/presentation";
import { productImage } from "../../data/product-images";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return products.map(p=>({slug:p.slug!})); }
export async function generateMetadata({params}:Props) {
  const {slug}=await params;
  const p=products.find(p=>p.slug===slug);
  if(!p) notFound();
  const metadata=pageMetadata(p.name, `${productCopy(p).intro} ${p.length ? 'Длина '+p.length+'. ' : ''}Характеристики, комплектация и расчёт стоимости.`, `/product/${slug}`);
  const image=productImage(p);
  return {...metadata,openGraph:{...metadata.openGraph,...(image?{images:[{url:image,alt:p.name}]}:{})}};
}
export default async function ProductPage({params}:Props) {
  const {slug}=await params;
  const p=products.find(p=>p.slug===slug);
  if(!p) notFound();
  const category=productCategory(p);
  const prices=(p.variants || [{price:p.price}]).map(v=>v.price).filter(n=>n>0);
  const image=productImage(p);
  const structured = [{ "@context":"https://schema.org", "@type":"Product", name:p.name, description:productCopy(p).intro, sku:p.slug,
    url:`${SITE_URL}/product/${slug}`, image:image?`${SITE_URL}${image}`:undefined,
    category:category.title,
    offers:prices.length&&!p.clarification ? { "@type":"AggregateOffer", priceCurrency:"RUB", lowPrice:Math.min(...prices),highPrice:Math.max(...prices),offerCount:prices.length,url:`${SITE_URL}/product/${slug}` } : undefined,
    additionalProperty:[{ "@type":"PropertyValue",name:loadLabel(p),value:p.load },...(p.length?[{"@type":"PropertyValue",name:"Длина",value:p.length}]:[])]
  }, { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[
    {"@type":"ListItem",position:1,name:"Главная",item:SITE_URL},
    {"@type":"ListItem",position:2,name:category.title,item:`${SITE_URL}/catalog/${category.slug}`},
    {"@type":"ListItem",position:3,name:p.name,item:`${SITE_URL}/product/${slug}`} ] }];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(structured)}}/><SiteClient key={slug} initialView="product" initialProduct={p}/></>;
}
