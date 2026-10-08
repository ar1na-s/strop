"use client";
import { useSyncExternalStore } from "react";
import { products } from "./catalog";
import type { Product } from "./product";
const empty: Product[] = [];
let current: Product[] | undefined;
const listeners = new Set<() => void>();
function subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
function getSnapshot() {
  if (current) return current;
  try {
    const stored = JSON.parse(sessionStorage.getItem("mpk-cart-v1") || "[]");
    current = Array.isArray(stored) ? stored.filter((p: Product) => p && typeof p.name === "string" && Number.isFinite(p.price) && p.price > 0 && products.some(item=>item.slug===p.slug)) : empty;
  } catch { current = empty; }
  return current!;
}
function setCart(items: Product[]) {
  current=items;
  try { sessionStorage.setItem("mpk-cart-v1",JSON.stringify(items)); } catch { /* Private browsing may disallow storage. */ }
  listeners.forEach(listener=>listener());
}
export function useCart() { return [useSyncExternalStore(subscribe,getSnapshot,()=>empty),setCart] as const; }
