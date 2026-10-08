"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Metrika = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
declare global { interface Window { ym?: Metrika } }
const rawId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "";
const counterId = /^\d+$/.test(rawId) ? Number(rawId) : 0;
let initialized = false;
export function reachGoal(goal: "add_to_cart" | "request_sent" | "product_open") {
  if(counterId && typeof window !== "undefined") window.ym?.(counterId,"reachGoal",goal);
}
export default function Analytics() {
  const pathname = usePathname();
  useEffect(()=>{
    if(!counterId || pathname.startsWith('/admin')) return;
    if(!initialized) {
      const queue: Metrika = (...args:unknown[])=>{ (queue.a ||= []).push(args); };
      queue.l=Date.now();
      window.ym ||= queue;
      window.ym(counterId,"init",{defer:true,clickmap:false,trackLinks:true,accurateTrackBounce:true,webvisor:false});
      const script=document.createElement('script');
      script.src="https://mc.yandex.ru/metrika/tag.js";
      script.async=true;
      document.head.appendChild(script);
      initialized=true;
    }
    // Query strings and form contents are never passed to analytics.
    window.ym?.(counterId,"hit",window.location.origin+pathname,{title:document.title});
  },[pathname]);
  return null;
}
