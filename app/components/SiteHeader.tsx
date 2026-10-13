"use client";
import {useState} from 'react';
import {useCart} from '../data/cart';
import {COMPANY} from '../data/company';
import CartCheckout from './CartCheckout';
import styles from './experience.module.css';
export default function SiteHeader({onCart,onFilter}:{onCart?:()=>void;onFilter?:()=>void}){
 const [items,setItems]=useCart();const [open,setOpen]=useState(false);
 return <><header className={styles.header}><a href="/" className={styles.brand}><img src="/logo.png" alt="" width="48" height="48"/><span>{COMPANY.full}</span></a><nav aria-label="Основная навигация"><a href="/catalog">Каталог</a><a href="/izgotovlenie-stropov">На заказ</a><a href="/#contacts">Контакты</a></nav><a className={styles.phone} href="tel:+79266293534">{COMPANY.phone}</a><button className={styles.cart} onClick={()=>onCart?onCart():setOpen(true)} aria-label={`Открыть корзину: ${items.length} товаров`}><span className={styles.cartLabel}>Корзина</span><svg className={styles.cartIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 4h2l3 12h11l2-9H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg><span>{items.length}</span></button>{onFilter&&<button className={styles.filter} onClick={onFilter}>Фильтры</button>}</header>{open&&<CartCheckout items={items} onRemove={i=>setItems(items.filter((_,n)=>n!==i))} onClose={()=>setOpen(false)}/>}</>;
}
