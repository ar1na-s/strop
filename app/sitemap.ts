import type { MetadataRoute } from "next";
import { products, categories, categoryProducts } from "./data/catalog";
import { SITE_URL } from "./data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    return ["/", "/catalog", ...categories.filter(c=>categoryProducts(c).length).map(c=>`/catalog/${c.slug}`), ...products.map(p=>`/product/${p.slug}`)].map(path=>({url:SITE_URL+path}));
}
