import Link from 'next/link';
import { COMPANY } from '../data/company';
import { industrialPages, industrialNavigation, industrialByPath } from '../data/industrial';
import { jsonLd, SITE_URL } from '../data/seo';
import styles from './industrial.module.css';
import { products } from '../data/catalog';
import SiteHeader from './SiteHeader';
import RequestForm from './RequestForm';

export default function IndustrialPage({path}:{path:string}) {
  const page=industrialByPath(path);
  const parent=page.parent?industrialByPath(page.parent):undefined;
  const children=industrialPages.filter(p=>p.parent===path);
  const selection=page.productTypes?products.filter(p=>p.type&&page.productTypes!.includes(p.type)):[];
  const crumbs=[{title:'Главная',path:'/'},{title:'Каталог',path:'/catalog'},...(parent?[parent]:[]),page];
  const mail=`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Расчёт: ${page.title}`)}&body=${encodeURIComponent(`Здравствуйте! Прошу рассчитать: ${page.title}.\n\n${page.needs.map(n=>`${n}: `).join('\n')}\nГород получения: \nКонтакт для ответа: `)}`;
  return <div className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.title,item:SITE_URL+c.path}))})}}/>
    <SiteHeader/>
    <main><div className={styles.main}>
      <nav aria-label="Хлебные крошки" className={styles.crumbs}>{crumbs.map((c,i)=><span key={c.path}>{i>0&&' / '}{i===crumbs.length-1?<span aria-current="page">{c.title}</span>:<Link href={c.path}>{c.title}</Link>}</span>)}</nav>
      <section className={styles.hero}><div><p className={styles.eyebrow}>МОСКВА И МОСКОВСКАЯ ОБЛАСТЬ</p><h1>{page.title}</h1><p className={styles.intro}>{page.intro}</p><a className={styles.primary} href="#request">Получить расчёт <span aria-hidden="true">↗</span></a></div><aside className={styles.brief}><p className={styles.eyebrow}>ДАННЫЕ ДЛЯ ПОДБОРА</p><h2>Начнём с вашей задачи</h2><ul>{page.needs.map(n=><li key={n}>{n}</li>)}</ul><p>Стоимость и сроки — после согласования параметров.</p></aside></section>
      {children.length>0&&<section className={styles.section}><h2>Виды и исполнения</h2><div className={styles.cards}>{children.map(p=><Link className={styles.card} key={p.path} href={p.path}><h3>{p.title}</h3><p>{p.intro}</p><span>Подробнее <span aria-hidden="true">↗</span></span></Link>)}</div></section>}
      {selection.length>0&&<section className={styles.section}><h2>Выберите исполнение</h2><p>Откройте карточку, чтобы выбрать длину, проверить параметры и комплектацию.</p><div className={styles.cards}>{selection.map(p=><Link className={styles.card} key={p.slug} href={`/product/${p.slug}`}><h3>{p.name}</h3><p>{[p.length&&`Длина: ${p.length}`,p.load&&`Нагрузка по карточке: ${p.load}`].filter(Boolean).join(' · ')}</p><span>Параметры и стоимость ↗</span></Link>)}</div></section>}
      <section className={styles.section}><h2>Что учесть при заказе</h2><p>{page.note}</p><details className={styles.faq}><summary>{page.question}</summary><p>{page.answer}</p></details></section>
      <section className={styles.request}><div><p className={styles.eyebrow}>РАСЧЁТ ПО ВАШИМ ПАРАМЕТРАМ</p><h2>Обсудим комплектацию и стоимость</h2><p>Отправьте параметры изделия и приложите чертежи или спецификацию к письму. Менеджер уточнит исполнение, состав поставки и сроки.</p><p>Получение в Москве и Московской области согласуем с учётом габаритов и массы заказа. Стоимость доставки рассчитывается отдельно.</p></div><div className={styles.contacts}><a className={styles.primary} href={mail}>Отправить запрос по почте</a><a href="tel:+79266293534">{COMPANY.phone}</a><span>{COMPANY.email}</span><small>Откроется ваше почтовое приложение. Письмо отправляется вами.</small></div></section>
      <section id="request" className={styles.section}><RequestForm subject={page.title} summary={`Для подбора: ${page.needs.join('; ')}`}/></section>
      <nav aria-label="Другие направления" className={styles.section}><h2>Другие направления</h2><div className={styles.links}>{industrialNavigation.filter(p=>p.path!==path).map(p=><Link key={p.path} href={p.path}>{p.title} ↗</Link>)}</div></nav>
    </div></main><footer className={styles.footer}><p>{COMPANY.full}</p><p>Офис: {COMPANY.physicalAddress}</p><Link href="/catalog">Вернуться в каталог</Link></footer>
  </div>;
}
