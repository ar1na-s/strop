"use client";
import Link from "next/link";
export default function ErrorPage({reset}:{reset:()=>void}) {
  return <main style={{maxWidth:640,margin:"80px auto",padding:24,fontFamily:"Arial"}}><h1>Не удалось загрузить страницу</h1><p>Попробуйте повторить загрузку или свяжитесь с нами для подбора продукции.</p><button onClick={reset} style={{padding:12,border:"1px solid",margin:"20px 0"}}>Повторить</button><p><Link href="/catalog">Открыть каталог</Link> · <a href="tel:+79266293534">+7 (926) 629-35-34</a></p></main>;
}
