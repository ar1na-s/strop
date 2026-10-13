import type { MetadataRoute } from "next";
import { products, categories, categoryProducts } from "./data/catalog";
import { SITE_URL } from "./data/seo";
import { industrialPages } from "./data/industrial";

export default function sitemap(): MetadataRoute.Sitemap {
    return [...new Set(["/", "/catalog", ...categories.filter(c=>categoryProducts(c).length).map(c=>`/catalog/${c.slug}`), ...products.map(p=>`/product/${p.slug}`), ...industrialPages.map(p=>p.path)])].map(path=>({url:SITE_URL+path}));
}
