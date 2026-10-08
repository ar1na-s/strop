import SiteClient from "../SiteClient";
import { pageMetadata } from "../data/seo";
export const metadata = pageMetadata("Каталог стропов и такелажа", "Цены, характеристики и комплектация цепных и текстильных стропов, натяжителей и средств крепления груза.", "/catalog");
export default function CatalogPage() { return <SiteClient key="catalog" initialView="catalog"/>; }
