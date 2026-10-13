import Link from 'next/link';
import styles from './experience.module.css';
const groups=[
 {title:'Стропы',links:[['Все стропы','/catalog/stropy'],['Цепные: 1СЦ, 2СЦ, 4СЦ, ВЦ','/catalog/stropy/tsepnye'],['Ленточные СТП','/catalog/stropy/tekstilnye'],['Изготовление на заказ','/izgotovlenie-stropov']]},
 {title:'Крепление груза',links:[['Все средства крепления','/catalog/kreplenie-gruza'],['Стяжные ремни','/catalog/kreplenie-gruza/styazhnye-remni'],['Цепи с крюками','/catalog/kreplenie-gruza/tsepi'],['Цепь с натяжителем','/catalog/kreplenie-gruza/tsep-s-talrepom'],['Натяжители цепей','/catalog/takelazh/natyazhiteli-tsepi']]},
 {title:'Траверсы и захваты',links:[['Грузоподъёмные траверсы','/catalog/traversy'],['Монтажные полотенца','/catalog/montazhnye-polotentsa'],['Грузоподъёмные захваты','/catalog/zahvaty']]},
 {title:'Металлоконструкции',links:[['Балки, рамы и фермы','/metallokonstruktsii'],['Контргрузы и противовесы','/catalog/kontrgruzy']]},
 {title:'Тросы и канаты',links:[['Буксировочные тросы — подбор','/catalog/buksirovochnye-trosy'],['Стальные канаты — подбор','/catalog/stalnye-kanaty']]},
];
export default function CatalogNavigation(){return <nav className={styles.categories} aria-label="Разделы каталога">{groups.map(g=><details key={g.title}><summary>{g.title}</summary><div>{g.links.map(([name,url])=><Link key={url} href={url}>{name} ↗</Link>)}</div></details>)}</nav>}
