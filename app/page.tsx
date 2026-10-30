import SiteClient from "./SiteClient";
import { pageMetadata } from "./data/seo";

export const metadata = pageMetadata("Стропы, такелаж и крепление груза", "Цепные и текстильные стропы, такелаж и средства крепления груза. Выбор длины и комплектации, расчёт стоимости и доставка по России.", "/");

export default function Home() {
  return <SiteClient />;
}
