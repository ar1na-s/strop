"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "../data/product";
import { describeConfiguration } from "../data/product";
import { COMPANY } from "../data/company";
import styles from "./checkout.module.css";

const money = (value: number) => `${value.toLocaleString("ru-RU")} ₽`;
const deliveryOptions = [
  { value: "Самовывоз", title: "Самовывоз", detail: "Москва, ул. Горбунова, 2с3 · в день оплаты" },
  { value: "Доставка по Москве", title: "Доставка по Москве", detail: "Собственная доставка / курьер · 1–2 дня" },
  { value: "Доставка по Московской области", title: "Московская область", detail: "Срок 1–3 дня · стоимость по километражу от МКАД" },
  { value: "Транспортная компания по РФ", title: "Регионы России", detail: "3–10 дней · Деловые Линии, СДЭК, ПЭК и другие" },
  { value: "Нужна помощь менеджера", title: "Помогите выбрать способ", detail: "Менеджер предложит подходящий вариант" },
];

export default function CartCheckout({ items, onRemove, onClose }: { items: Product[]; onRemove: (index: number) => void; onClose: () => void }) {
  const [checkout, setCheckout] = useState(false);
  const [delivery, setDelivery] = useState("");
  const [city, setCity] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") close.current();
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, textarea, [tabindex="0"]') || []).filter(el => el.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("keydown", key); previous?.focus(); };
  }, []);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const ready = reviewed && !!delivery && items.length > 0;
  const summary = `Здравствуйте! Прошу оформить заказ:\n${items.map((item, i) => `${i + 1}. ${describeConfiguration(item)}`).join("\n")}\nИтого за товары: ${money(total)}\nСпособ получения: ${delivery}\nГород / пожелания: ${city || "уточню с менеджером"}\nПрошу подтвердить наличие, сроки и стоимость доставки.`;
  const changeStep = (value: boolean) => { setCheckout(value); setReviewed(false); setCopied(false); dialog.current?.scrollTo(0, 0); dialog.current?.focus(); };
  return <div className={styles.overlay} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.dialog} ref={dialog} role="dialog" aria-modal="true" aria-labelledby="cart-title" tabIndex={-1}>
      <button className={styles.close} onClick={onClose} aria-label="Закрыть корзину">×</button>
      <p className={styles.eyebrow}>{checkout ? "02 / ОФОРМЛЕНИЕ" : "01 / ВАШ ВЫБОР"}</p>
      <h2 id="cart-title">{checkout ? "Оформление заказа" : "Корзина"}</h2>
      {!items.length ? <p>В корзине пока нет товаров.</p> : <>
        {checkout && <p>Проверьте товары, длину и комплектацию перед обращением к менеджеру.</p>}
        <ul className={styles.items}>{items.map((item, i) => <li key={i}>
          <div><strong>{item.name}</strong><p>{item.load} · {item.length} · 1 шт.</p>{!!item.selectedServices?.length && <p>{item.selectedServices.map(s => `${s.name} × ${s.quantity}`).join("; ")}</p>}</div>
          <div className={styles.itemPrice}><strong>{money(item.price)}</strong>{!checkout && <button onClick={() => { onRemove(i); setReviewed(false); }} aria-label={`Удалить ${item.name}`}>Удалить</button>}</div>
        </li>)}</ul>
        <div className={styles.total}><span>Итого за товары</span><strong>{money(total)}</strong></div>
        {checkout ? <>
          <fieldset className={styles.delivery}><legend>Выберите способ получения</legend><p className={styles.deliveryIntro}>Сроки взяты из раздела «Доставка». Точную стоимость и дату менеджер подтвердит после проверки адреса и наличия.</p>{deliveryOptions.map(option => <label className={styles.deliveryOption} key={option.value}><input type="radio" name="delivery" value={option.value} checked={delivery === option.value} onChange={() => { setDelivery(option.value); setCopied(false); }} /><span><strong>{option.title}</strong><small>{option.detail}</small></span></label>)}</fieldset>
          <label className={styles.city}>Город и пожелания к доставке (необязательно)<textarea rows={2} maxLength={500} value={city} onChange={event => { setCity(event.target.value); setCopied(false); }} placeholder="Например: Казань, до терминала транспортной компании" /></label>
          <p className={styles.note}>Сумма заказа показывает только товары. Доставка рассчитывается отдельно по адресу и не оплачивается автоматически на сайте.</p>
          <label className={styles.review}><input type="checkbox" checked={reviewed} onChange={event => setReviewed(event.target.checked)} />Я проверил товары, длину, комплектацию и сумму заказа</label>
          {ready ? <section className={styles.contact} aria-label="Связь с менеджером">
            <h3>Завершите оформление с менеджером</h3><p>Позвоните или отправьте состав заказа по почте. Заказ будет оформлен после согласования с менеджером.</p>
            <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}>{COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Заказ с сайта МПК")}&body=${encodeURIComponent(summary)}`}>{COMPANY.email} — написать</a>
            <button onClick={async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { setCopied(false); } }}>Скопировать состав заказа</button>
            <p role="status">{copied ? "Состав заказа скопирован — вставьте его в письмо менеджеру." : "Кнопка почты откроет ваше почтовое приложение с составом заказа."}</p>
          </section> : <p className={styles.note} role="status">Выберите способ получения и подтвердите проверку товаров — появятся контакты для завершения заказа.</p>}
          <button className={styles.secondary} onClick={() => changeStep(false)}>Вернуться к товарам</button>
        </> : <div className={styles.actions}><button className={styles.primary} onClick={() => changeStep(true)}>Оформление заказа</button><button className={styles.secondary} onClick={onClose}>Продолжить покупки</button></div>}
      </>}
    </div>
  </div>;
}
