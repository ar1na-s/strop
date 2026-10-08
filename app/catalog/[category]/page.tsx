import { notFound } from "next/navigation";
import SiteClient from "../../SiteClient";
import { categories, categoryProducts } from "../../data/catalog";
import { pageMetadata, SITE_URL, jsonLd } from "../../data/seo";
type Props = { params: Promise<{ category: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return categories.map(c=>({category:c.slug})); }
export async function generateMetadata({params}: Props) {
  const { category: slug } = await params;
  const category = categories.find(c=>c.slug===slug);
  if(!category) notFound();
  return { ...pageMetadata(category.title, category.description, `/catalog/${slug}`), robots: categoryProducts(category).length ? undefined : { index: false, follow: true } };
}
export default async function CategoryPage({params}: Props) {
  const { category: slug } = await params;
  const category = categories.find(c=>c.slug===slug);
  if(!category) notFound();
  const structured = { "@context":"https://schema.org", "@type":"ItemList", name:category.title,
    itemListElement:categoryProducts(category).map((p,i)=>({"@type":"ListItem",position:i+1,name:p.name,url:`${SITE_URL}/product/${p.slug}`})) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(structured)}}/><SiteClient key={slug} initialView="catalog" category={category}/></>;
}
