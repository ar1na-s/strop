"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

const PAYMENT_URL = "https://yookassa.ru/checkout/PASTE_YOUR_LINK_HERE";

type Product = {
  name: string;
  price: number;
  group: "slings" | "ropes" | "other";
  kind: string;
  type?: string;
  load?: string;
  length?: string;
  image?: string;
  description?: string;
  specs?: string[];
  services?: { name: string; price: number }[];
};

const products: Product[] = [
  { name: "Строп цепной четырёхветвевой 4СЦ 2,5 т", price: 2800, group: "slings", kind: "Цепные", type: "4СЦ", load: "2,5 т", length: "1–8 м", image: "/products/chain-4sc.png", description: "Четырёхветвевой цепной строп 4СЦ 2,5 т для подъёма и перемещения тяжёлых грузов.", specs: ["4 ветви", "цепь 6×18", "звено 2,5 т", "крюк 1,12 т"], services: [{ name: "Доп. комплект регулировки длины", price: 600 }, { name: "Комплектация крюками самозапирающимися", price: 1600 }, { name: "Дополнительный метр", price: 1130 }] },
  { name: "Строп цепной четырёхветвевой 4СЦ 3,15 т", price: 2900, group: "slings", kind: "Цепные", type: "4СЦ", load: "3,15 т", length: "1–8 м", image: "/products/chain-4sc.png", description: "Четырёхветвевой цепной строп 4СЦ 3,15 т.", specs: ["4 ветви", "цепь 6×18"], services: [{ name: "Дополнительный метр", price: 1130 }] },
  { name: "Строп цепной четырёхветвевой 4СЦ 4,3 т", price: 3800, group: "slings", kind: "Цепные", type: "4СЦ", load: "4,3 т", length: "1–8 м", image: "/products/chain-4sc.png", description: "Четырёхветвевой цепной строп 4СЦ 4,3 т.", specs: ["4 ветви", "цепь 8×24"], services: [{ name: "Дополнительный метр", price: 1670 }] },
  { name: "Строп цепной четырёхветвевой 4СЦ 6,7 т", price: 6050, group: "slings", kind: "Цепные", type: "4СЦ", load: "6,7 т", length: "1–8 м", image: "/products/chain-4sc.png", description: "Усиленный четырёхветвевой цепной строп 4СЦ 6,7 т.", specs: ["4 ветви", "цепь 10×30"], services: [{ name: "Дополнительный метр", price: 2125 }] },
  { name: "Строп цепной четырёхветвевой 4СЦ 11,2 т", price: 7870, group: "slings", kind: "Цепные", type: "4СЦ", load: "11,2 т", length: "1–8 м", image: "/products/chain-4sc.png", description: "Профессиональный строп 4СЦ 11,2 т.", specs: ["4 ветви", "цепь 13×39"], services: [{ name: "Дополнительный метр", price: 3400 }] },
  { name: "Строп цепной четырёхветвевой 4СЦ 17,0 т", price: 13600, group: "slings", kind: "Цепные", type: "4СЦ", load: "17,0 т", length: "1–8 м", image: "/products/chain-4sc.png", description: "Тяжёлый четырёхветвевой цепной строп 4СЦ 17,0 т.", specs: ["4 ветви", "цепь 16×48"], services: [{ name: "Дополнительный метр", price: 5500 }] },
  { name: "Строп цепной четырёхветвевой 4СЦ 26,5 т", price: 32000, group: "slings", kind: "Цепные", type: "4СЦ", load: "26,5 т", length: "1–8 м", image: "/products/chain-4sc.png", description: "Мощный цепной строп 4СЦ 26,5 т.", specs: ["4 ветви", "цепь 20×60"], services: [{ name: "Дополнительный метр", price: 10900 }] },
  { name: "Строп цепной двухветвевой 2СЦ 1,6 т", price: 1350, group: "slings", kind: "Цепные", type: "2СЦ", load: "1,6 т", length: "1–8 м", image: "/products/chain-2sc.png", description: "Двухветвевой цепной строп 2СЦ 1,6 т.", specs: ["2 ветви", "цепь 6×18"], services: [{ name: "Дополнительный метр", price: 470 }] },
  { name: "Строп цепной двухветвевой 2СЦ 3,15 т", price: 1900, group: "slings", kind: "Цепные", type: "2СЦ", load: "3,15 т", length: "1–8 м", image: "/products/chain-2sc.png", description: "Двухветвевой цепной строп 2СЦ 3,15 т.", specs: ["2 ветви", "цепь 8×24"], services: [{ name: "Дополнительный метр", price: 700 }] },
  { name: "Строп цепной двухветвевой 2СЦ 5,3 т", price: 2700, group: "slings", kind: "Цепные", type: "2СЦ", load: "5,3 т", length: "1–8 м", image: "/products/chain-2sc.png", description: "Двухветвевой цепной строп 2СЦ 5,3 т.", specs: ["2 ветви", "цепь 10×30"], services: [{ name: "Дополнительный метр", price: 1300 }] },
  { name: "Строп цепной двухветвевой 2СЦ 8,0 т", price: 4700, group: "slings", kind: "Цепные", type: "2СЦ", load: "8,0 т", length: "1–8 м", image: "/products/chain-2sc.png", description: "Двухветвевой цепной строп 2СЦ 8,0 т.", specs: ["2 ветви", "цепь 13×30"], services: [{ name: "Дополнительный метр", price: 1800 }] },
  { name: "Строп цепной двухветвевой 2СЦ 11,2 т", price: 9400, group: "slings", kind: "Цепные", type: "2СЦ", load: "11,2 т", length: "1–8 м", image: "/products/chain-2sc.png", description: "Усиленный двухветвевой строп 2СЦ 11,2 т.", specs: ["2 ветви", "цепь 16×48"], services: [{ name: "Дополнительный метр", price: 2600 }] },
  { name: "Строп цепной двухветвевой 2СЦ 17,0 т", price: 19000, group: "slings", kind: "Цепные", type: "2СЦ", load: "17,0 т", length: "2–8 м", image: "/products/chain-2sc.png", description: "Профессиональный цепной строп 2СЦ 17,0 т.", specs: ["2 ветви", "цепь 20×60"], services: [{ name: "Дополнительный метр", price: 4900 }] },
  { name: "Строп цепной одноветвевой 1СЦ 1,12 т", price: 780, group: "slings", kind: "Цепные", type: "1СЦ", load: "1,12 т", length: "1–8 м", image: "/products/chain-1sc.png", description: "Одноветвевой цепной строп 1СЦ 1,12 т.", specs: ["1 ветвь", "цепь 6×18"], services: [{ name: "Дополнительный метр", price: 260 }] },
  { name: "Строп цепной одноветвевой 1СЦ 2,0 т", price: 1070, group: "slings", kind: "Цепные", type: "1СЦ", load: "2,0 т", length: "1–8 м", image: "/products/chain-1sc.png", description: "Одноветвевой цепной строп 1СЦ 2,0 т.", specs: ["1 ветвь", "цепь 8×24"], services: [{ name: "Дополнительный метр", price: 370 }] },
  { name: "Строп цепной одноветвевой 1СЦ 3,15 т", price: 1700, group: "slings", kind: "Цепные", type: "1СЦ", load: "3,15 т", length: "1–8 м", image: "/products/chain-1sc.png", description: "Одноветвевой цепной строп 1СЦ 3,15 т.", specs: ["1 ветвь", "цепь 10×30"], services: [{ name: "Дополнительный метр", price: 510 }] },
  { name: "Строп цепной одноветвевой 1СЦ 5,3 т", price: 2900, group: "slings", kind: "Цепные", type: "1СЦ", load: "5,3 т", length: "1–8 м", image: "/products/chain-1sc.png", description: "Одноветвевой цепной строп 1СЦ 5,3 т.", specs: ["1 ветвь", "цепь 13×39"], services: [{ name: "Дополнительный метр", price: 750 }] },
  { name: "Строп цепной одноветвевой 1СЦ 8,0 т", price: 4800, group: "slings", kind: "Цепные", type: "1СЦ", load: "8,0 т", length: "1–8 м", image: "/products/chain-1sc.png", description: "Одноветвевой цепной строп 1СЦ 8,0 т.", specs: ["1 ветвь", "цепь 16×48"], services: [{ name: "Дополнительный метр", price: 1350 }] },
  { name: "Строп цепной одноветвевой 1СЦ 12,5 т", price: 7400, group: "slings", kind: "Цепные", type: "1СЦ", load: "12,5 т", length: "1–8 м", image: "/products/chain-1sc.png", description: "Тяжёлый одноветвевой строп 1СЦ 12,5 т.", specs: ["1 ветвь", "цепь 20×60"], services: [{ name: "Дополнительный метр", price: 2150 }] },
  { name: "Ветвь цепная ВЦ 1,12 т", price: 974, group: "slings", kind: "Цепные", type: "ВЦ", load: "1,12 т", length: "1–8 м", image: "/products/chain-vc.png", description: "Цепная ветвь ВЦ 1,12 т.", specs: ["ветвь цепная", "цепь 6×18"], services: [{ name: "Дополнительный метр", price: 260 }] },
  { name: "Ветвь цепная ВЦ 2,0 т", price: 1391, group: "slings", kind: "Цепные", type: "ВЦ", load: "2,0 т", length: "1–8 м", image: "/products/chain-vc.png", description: "Цепная ветвь ВЦ 2,0 т.", specs: ["ветвь цепная", "цепь 8×24"], services: [{ name: "Дополнительный метр", price: 370 }] },
  { name: "Ветвь цепная ВЦ 3,15 т", price: 2048, group: "slings", kind: "Цепные", type: "ВЦ", load: "3,15 т", length: "1–8 м", image: "/products/chain-vc.png", description: "Цепная ветвь ВЦ 3,15 т.", specs: ["ветвь цепная", "цепь 10×30"], services: [{ name: "Дополнительный метр", price: 510 }] },
  { name: "Ветвь цепная ВЦ 5,3 т", price: 3044, group: "slings", kind: "Цепные", type: "ВЦ", load: "5,3 т", length: "1–8 м", image: "/products/chain-vc.png", description: "Цепная ветвь ВЦ 5,3 т.", specs: ["ветвь цепная", "цепь 13×39"], services: [{ name: "Дополнительный метр", price: 750 }] },
  { name: "Ветвь цепная ВЦ 8,0 т", price: 4898, group: "slings", kind: "Цепные", type: "ВЦ", load: "8,0 т", length: "1–8 м", image: "/products/chain-vc.png", description: "Цепная ветвь ВЦ 8,0 т.", specs: ["ветвь цепная", "цепь 16×48"], services: [{ name: "Дополнительный метр", price: 1350 }] },
  { name: "Ветвь цепная ВЦ 12,5 т", price: 4131, group: "slings", kind: "Цепные", type: "ВЦ", load: "12,5 т", length: "1–8 м", image: "/products/chain-vc.png", description: "Цепная ветвь ВЦ 12,5 т.", specs: ["ветвь цепная", "цепь 20×60"], services: [{ name: "Дополнительный метр", price: 2150 }] },
  { name: "Цепь крепления с крюками 6 мм (3,1/5,4 т)", price: 1250, group: "slings", kind: "Цепные", type: "Цепь крепления", load: "3,1 / 5,4 т", length: "2–6 м", image: "/products/chain-lashing.jpg", description: "Цепь крепления с крюками 6 мм.", specs: ["цепь 6 мм", "с крюками"], services: [{ name: "Дополнительный метр", price: 350 }] },
  { name: "Цепь крепления с крюками 8 мм (5,7/8,0 т)", price: 1620, group: "slings", kind: "Цепные", type: "Цепь крепления", load: "5,7 / 8,0 т", length: "2–6 м", image: "/products/chain-lashing.jpg", description: "Цепь крепления с крюками 8 мм.", specs: ["цепь 8 мм", "с крюками"], services: [{ name: "Дополнительный метр", price: 370 }] },
  { name: "Цепь крепления с крюками 10 мм (9,0/12,6 т)", price: 2200, group: "slings", kind: "Цепные", type: "Цепь крепления", load: "9,0 / 12,6 т", length: "2–6 м", image: "/products/chain-lashing.jpg", description: "Усиленная цепь крепления 10 мм.", specs: ["цепь 10 мм", "с крюками"], services: [{ name: "Дополнительный метр", price: 550 }] },
  { name: "Цепь крепления с крюками 13 мм (15,0/21,0 т)", price: 3400, group: "slings", kind: "Цепные", type: "Цепь крепления", load: "15,0 / 21,0 т", length: "2–6 м", image: "/products/chain-lashing.jpg", description: "Мощная цепь крепления 13 мм.", specs: ["цепь 13 мм", "с крюками"], services: [{ name: "Дополнительный метр", price: 900 }] },
  { name: "Цепь крепления с крюками 16 мм (22,0/29,6 т)", price: 6000, group: "slings", kind: "Цепные", type: "Цепь крепления", load: "22,0 / 29,6 т", length: "2–6 м", image: "/products/chain-lashing.jpg", description: "Особо прочная цепь крепления 16 мм.", specs: ["цепь 16 мм", "с крюками"], services: [{ name: "Дополнительный метр", price: 1200 }] },
  { name: "Строп ленточный петлевой СТП 1,0 т", price: 0, group: "slings", kind: "Текстильные", type: "СТП", load: "1,0 т", length: "1–8 м", image: "/products/textile-stp.jpg", description: "Ленточный петлевой строп СТП 1,0 т.", specs: ["ширина 30 мм", "петлевой"], services: [{ name: "Дополнительный метр", price: 0 }] },
  { name: "Строп ленточный петлевой СТП 2,0 т", price: 0, group: "slings", kind: "Текстильные", type: "СТП", load: "2,0 т", length: "1–8 м", image: "/products/textile-stp.jpg", description: "Ленточный петлевой строп СТП 2,0 т.", specs: ["ширина 60 мм"], services: [{ name: "Дополнительный метр", price: 0 }] },
  { name: "Строп ленточный петлевой СТП 3,0 т", price: 0, group: "slings", kind: "Текстильные", type: "СТП", load: "3,0 т", length: "1–8 м", image: "/products/textile-stp.jpg", description: "Ленточный петлевой строп СТП 3,0 т.", specs: ["ширина 90 мм"], services: [{ name: "Дополнительный метр", price: 0 }] },
  { name: "Строп ленточный петлевой СТП 5,0 т", price: 0, group: "slings", kind: "Текстильные", type: "СТП", load: "5,0 т", length: "1–8 м", image: "/products/textile-stp.jpg", description: "Ленточный петлевой строп СТП 5,0 т.", specs: ["ширина 150 мм"], services: [{ name: "Дополнительный метр", price: 0 }] },
  { name: "Строп круглопрядный СТКК/СТПК 1,0 т", price: 160, group: "slings", kind: "Текстильные", type: "СТКК/СТПК", load: "1,0 т", length: "1–6 м", image: "", description: "Круглопрядный текстильный строп 1,0 т.", specs: ["круглопрядный"], services: [{ name: "Дополнительный метр", price: 140 }] },
  { name: "Строп круглопрядный СТКК/СТПК 2,0 т", price: 250, group: "slings", kind: "Текстильные", type: "СТКК/СТПК", load: "2,0 т", length: "1–6 м", image: "", description: "Круглопрядный текстильный строп 2,0 т.", specs: ["круглопрядный"], services: [{ name: "Дополнительный метр", price: 230 }] },
  { name: "Строп круглопрядный СТКК/СТПК 3,0 т", price: 305, group: "slings", kind: "Текстильные", type: "СТКК/СТПК", load: "3,0 т", length: "1–6 м", image: "", description: "Круглопрядный текстильный строп 3,0 т.", specs: ["круглопрядный"], services: [{ name: "Дополнительный метр", price: 290 }] },
  { name: "Строп круглопрядный СТКК/СТПК 5,0 т", price: 460, group: "slings", kind: "Текстильные", type: "СТКК/СТПК", load: "5,0 т", length: "1–6 м", image: "", description: "Круглопрядный текстильный строп 5,0 т.", specs: ["круглопрядный"], services: [{ name: "Дополнительный метр", price: 430 }] },
  { name: "Строп круглопрядный СТКК/СТПК 10,0 т", price: 700, group: "slings", kind: "Текстильные", type: "СТКК/СТПК", load: "10,0 т", length: "1–6 м", image: "", description: "Круглопрядный текстильный строп 10,0 т.", specs: ["круглопрядный"], services: [{ name: "Дополнительный метр", price: 670 }] },
  { name: "Трос буксировочный ленточный с петлями 5 т 4 м", price: 0, group: "ropes", kind: "Автомобильные ленточные", type: "Буксировочный трос", load: "5 т", length: "4 м", image: "/products/tow-rope-textile.jpg", description: "Ленточный буксировочный трос 5 т, 4 м.", specs: ["ленточный", "петли"], services: [{ name: "Шакл 2 шт", price: 0 }] },
  { name: "Трос буксировочный ленточный с петлями 7 т 4 м", price: 0, group: "ropes", kind: "Автомобильные ленточные", type: "Буксировочный трос", load: "7 т", length: "4 м", image: "/products/tow-rope-textile.jpg", description: "Ленточный буксировочный трос 7 т, 4 м.", specs: ["ленточный", "петли"], services: [] },
  { name: "Трос буксировочный ленточный с петлями 14 т 4 м", price: 0, group: "ropes", kind: "Автомобильные ленточные", type: "Буксировочный трос", load: "14 т", length: "4 м", image: "/products/tow-rope-textile.jpg", description: "Ленточный буксировочный трос 14 т, 4 м.", specs: ["ленточный"], services: [] },
  { name: "Трос буксировочный ленточный с петлями 21 т 4 м", price: 0, group: "ropes", kind: "Автомобильные ленточные", type: "Буксировочный трос", load: "21 т", length: "4 м", image: "/products/tow-rope-textile.jpg", description: "Ленточный буксировочный трос 21 т, 4 м.", specs: ["ленточный"], services: [] },
  { name: "Трос буксировочный стальной Ø16 мм 15 т 4 м", price: 0, group: "ropes", kind: "Стальные", type: "Буксировочный трос", load: "15 т", length: "4 м", image: "/products/tow-rope-steel.jpg", description: "Стальной буксировочный трос Ø16 мм, 15 т.", specs: ["стальной канат", "Ø16 мм"], services: [] },
  { name: "Трос буксировочный стальной Ø20 мм 20 т 4 м", price: 0, group: "ropes", kind: "Стальные", type: "Буксировочный трос", load: "20 т", length: "4 м", image: "/products/tow-rope-steel.jpg", description: "Стальной буксировочный трос Ø20 мм, 20 т.", specs: ["стальной канат", "Ø20 мм"], services: [] },
  { name: "Трос буксировочный синтетический динамический 15 т 8 м", price: 0, group: "ropes", kind: "Динамические", type: "Буксировочный трос", load: "15 т", length: "8 м", image: "/products/tow-rope-dynamic.jpg", description: "Динамический трос 15 т, 8 м.", specs: ["синтетический", "динамический"], services: [] },
  { name: "Трос буксировочный синтетический динамический 25 т 8 м", price: 0, group: "ropes", kind: "Динамические", type: "Буксировочный трос", load: "25 т", length: "8 м", image: "/products/tow-rope-dynamic.jpg", description: "Динамический трос 25 т, 8 м.", specs: ["синтетический"], services: [] },
  { name: "Скоба такелажная 2130 СИ гайка 1 т", price: 55, group: "other", kind: "Такелаж", type: "Скоба", load: "1 т", length: "—", image: "/products/rigging.jpg", description: "Скоба такелажная 2130 СИ, 1 т.", specs: ["скоба", "гайка"], services: [] },
  { name: "Скоба такелажная 2130 СИ гайка 2 т", price: 85, group: "other", kind: "Такелаж", type: "Скоба", load: "2 т", length: "—", image: "/products/rigging.jpg", description: "Скоба такелажная 2130 СИ, 2 т.", specs: ["скоба", "гайка"], services: [] },
  { name: "Скоба такелажная 2130 СИ гайка 5 т", price: 240, group: "other", kind: "Такелаж", type: "Скоба", load: "5 т", length: "—", image: "/products/rigging.jpg", description: "Скоба такелажная 2130 СИ, 5 т.", specs: ["скоба"], services: [] },
  { name: "Талреп такелажный М6 (1/4×4) 0,23 т", price: 146, group: "other", kind: "Такелаж", type: "Талреп", load: "0,23 т", length: "200/320 мм", image: "/products/rigging.jpg", description: "Талреп М6, 0,23 т.", specs: ["талреп", "М6"], services: [] },
  { name: "Талреп такелажный М12 (1/2×6) 0,98 т", price: 382, group: "other", kind: "Такелаж", type: "Талреп", load: "0,98 т", length: "330/508 мм", image: "/products/rigging.jpg", description: "Талреп М12, 0,98 т.", specs: ["талреп", "М12"], services: [] },
  { name: "Талреп такелажный М16 (5/8×9) 1,6 т", price: 726, group: "other", kind: "Такелаж", type: "Талреп", load: "1,6 т", length: "454/714 мм", image: "/products/rigging.jpg", description: "Талреп М16, 1,6 т.", specs: ["талреп", "М16"], services: [] },
  { name: "Зажим усиленный 1142 5 мм", price: 9, group: "other", kind: "Такелаж", type: "Зажим", load: "—", length: "5 мм", image: "/products/rigging.jpg", description: "Усиленный зажим 1142, 5 мм.", specs: ["зажим"], services: [] },
  { name: "Зажим хозяйственный 741 5 мм", price: 4, group: "other", kind: "Такелаж", type: "Зажим", load: "—", length: "5 мм", image: "/products/rigging.jpg", description: "Хозяйственный зажим 741, 5 мм.", specs: ["зажим"], services: [] },
  { name: "Стальные канаты", price: 3200, group: "other", kind: "Стальные", type: "Канат", load: "под задачу", length: "под заказ", image: "/images/photo-site14.png", description: "Стальные канаты для грузоподъёмных механизмов, лебёдок, кранов.", specs: ["разные диаметры", "для лебёдок и кранов", "поставка под длину"], services: [{ name: "Нарезка под длину", price: 0 }, { name: "Заплетка петли", price: 0 }, { name: "Комплектация коушами", price: 0 }] },
  { name: "Траверсы", price: 12000, group: "other", kind: "Траверсы", type: "Под заказ", load: "по ТЗ", length: "по ТЗ", image: "/products/traverse.jpg", description: "Траверсы под конкретные схемы подъёма и габариты.", specs: ["под заказ", "по схеме подъёма"], services: [{ name: "Расчёт под задачу", price: 0 }, { name: "Изготовление по ТЗ", price: 0 }] },
  { name: "Такелаж", price: 500, group: "other", kind: "Такелаж", type: "Комплектующие", load: "разные нагрузки", length: "—", image: "/products/rigging.jpg", description: "Скобы, крюки, талрепы, коуши и другие комплектующие.", specs: ["скобы", "крюки", "талрепы"], services: [{ name: "Подбор комплекта", price: 0 }] },
];

const docs = [
  { title: "Сертификат на канатные стропы", text: "Соответствие требованиям ТР ТС 010/2011.", img: "/certificates/certificate-kanatnye.jpg" },
  { title: "Сертификат на круглопрядные стропы", text: "Документ на текстильные круглопрядные стропы.", img: "/certificates/certificate-kruglopryadnye.jpg" },
  { title: "Приложение к декларации", text: "Перечень типов продукции и технических условий.", img: "/certificates/declaration-application.jpg" },
  { title: "Сертификат на цепные стропы", text: "Документ на грузовые цепные стропы.", img: "/certificates/certificate-cepnye.jpg" },
  { title: "Декларация соответствия ЕАЭС", text: "Декларация соответствия требованиям безопасности.", img: "/certificates/declaration-eac.jpg" },
  { title: "Сертификат на текстильные стропы", text: "Документ на текстильные ленточные стропы.", img: "/certificates/certificate-tekstilnye.jpg" },
];

const faq = [
  { q: "Как купить?", a: "Оставьте заявку или свяжитесь с нами по телефону +7 (495) 995-23-60. Менеджер уточнит параметры и подготовит предложение." },
  { q: "Как выбрать буксировочный трос?", a: "Учитывайте массу техники, условия эксплуатации, длину, тип крепления и запас прочности." },
  { q: "Как выбрать грузоподъёмные стропы?", a: "Выбор зависит от веса груза, схемы подъёма, условий работы и требований к поверхности груза." },
  { q: "Какие документы можно получить?", a: "Предоставляем сертификаты соответствия, декларации ЕАЭС, паспорта изделий и сопроводительные документы." },
  { q: "Можно ли изготовить нестандартное изделие?", a: "Да, можно подобрать длину, грузоподъёмность, тип исполнения и комплектацию под конкретную задачу." },
  { q: "Есть ли доставка?", a: "Доставляем по Москве, Московской области и отправляем транспортными компаниями по всей России." },
  { q: "Какой срок изготовления?", a: "Стандартные позиции со склада — 1–3 дня. Нестандартные изделия — от 5 рабочих дней." },
  { q: "Работаете ли с юридическими лицами?", a: "Да, работаем с ООО, ИП и физическими лицами. Предоставляем полный пакет закрывающих документов." },
  { q: "Есть ли сертификаты на продукцию?", a: "Да, на все основные виды продукции есть сертификаты соответствия и декларации ЕАЭС." },
  { q: "Какой минимальный заказ?", a: "Минимального заказа нет — можно приобрести даже одну единицу продукции." },
  { q: "Какие цены на стропы?", a: "Цены зависят от типа, грузоподъёмности и длины. Например, одноветвевой строп 1СЦ 1,12 т стоит от 780 ₽, четырёхветвевой 4СЦ 2,5 т — от 2800 ₽." },
  { q: "Работаете ли с регионами?", a: "Да, отправляем продукцию во все регионы РФ через транспортные компании: Деловые Линии, СДЭК, ПЭК и другие." },
];

const directions = [
  {
    title: "Стропы",
    subtitle: "Хит продаж",
    text: "Цепные, текстильные, канатные и круглопрядные решения для подъёма грузов.",
    image: "/images/photo-site5.png",
    tags: ["1СЦ", "2СЦ", "4СЦ", "ВЦ", "СТП", "СТКК"],
  },
  {
    title: "Буксировочные тросы",
    subtitle: "Для авто и спецтехники",
    text: "Ленточные, стальные и динамические для авто и спецтехники.",
    image: "/images/photo-site6.png",
    tags: ["Ленточные", "Стальные", "Динамические", "5–25 т"],
  },
  {
    title: "Стальные канаты",
    subtitle: "Для лебёдок и кранов",
    text: "Для лебёдок, кранов и тельферов. Разные диаметры, под заказ.",
    image: "/images/photo-site14.png",
    tags: ["Ø 6–40 мм", "Под заказ", "Коуши"],
  },
  {
    title: "Такелаж",
    subtitle: "Комплектующие",
    text: "Скобы, крюки, талрепы, зажимы, коуши и другие комплектующие.",
    image: "/images/photo-site7.png",
    tags: ["Скобы", "Талрепы", "Зажимы", "Крюки"],
  },
  {
    title: "Траверсы",
    subtitle: "Изготовление по ТЗ",
    text: "Траверсы под конкретные схемы подъёма и габариты груза.",
    image: "/images/photo-site9.png",
    tags: ["По ТЗ", "Расчёт", "Изготовление"],
  },
];

const labelLight = "text-xs sm:text-sm font-black uppercase tracking-[0.28em] sm:tracking-[0.32em] text-[#0B1B33]";
const labelDark = "text-xs sm:text-sm font-black uppercase tracking-[0.28em] sm:tracking-[0.32em] text-white/70";
const titleLight = "mt-3 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0B1B33]";
const titleDark = "mt-3 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white";
const buttonOutline = "rounded-full border-2 border-[#0B1B33] bg-white px-5 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-black text-[#0B1B33] shadow-sm transition hover:bg-[#0B1B33] hover:text-white";
const buttonOutlineOnDark = "rounded-full border-2 border-white bg-white px-5 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-black text-[#0B1B33] shadow-sm transition hover:bg-transparent hover:text-white";

const COMPANY = {
  short: "МИКО",
  full: 'ООО «МИКО»',
  legalAddress: "Калужская обл., г. Обнинск, Киевское шоссе 99 км (промзона)",
  physicalAddress: "БЦ «Гранд Сетунь Плаза», Москва, улица Горбунова, 2с3, офис А-214, 2 этаж, 121596",
  inn: "4025452670",
  kpp: "402501001",
  ogrn: "1184027013906",
  account: "40702810301480000081",
  bank: 'АО «АЛЬФА-БАНК» г. Москва',
  bik: "044525593",
  corrAccount: "30101810200000000593",
  phone1: "+7 (495) 995-23-60",
  phone2: "+7 (495) 995-23-92",
  email: "info@strop.su",
};

function ProductVisual({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);

  const imageByType: Record<string, string> = {
    "4СЦ": "/products/chain-4sc.png",
    "2СЦ": "/products/chain-2sc.png",
    "1СЦ": "/products/chain-1sc.png",
    "ВЦ": "/products/chain-vc.png",
    "Цепь крепления": "/products/chain-lashing.jpg",
  };

  const imageSrc = product.image || (product.type && imageByType[product.type]) || "";
  const showImage = !!imageSrc && !imageFailed;

  const isRoundSling = product.type === "СТКК/СТПК";
  const isTextile = product.kind === "Текстильные";
  const isRope = product.group === "ropes";
  const isSteel = product.kind === "Стальные" || product.name.toLowerCase().includes("канат");
  const isRigging = product.kind === "Такелаж";
  const isTraverse = product.kind === "Траверсы";
  const isChain = product.kind === "Цепные";

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F4F7FB] via-[#EEF3F9] to-[#E3EBF4] p-4 sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#0B1B33 1px, transparent 1px), linear-gradient(90deg, #0B1B33 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(74,111,165,0.18),transparent_45%),radial-gradient(circle_at_80%_85%,rgba(11,27,51,0.10),transparent_40%)]" />

      {showImage ? (
        <img
          src={imageSrc}
          alt={product.name}
          onError={() => setImageFailed(true)}
          loading="lazy"
          decoding="async"
          className="relative z-[1] h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover/card:scale-[1.06]"
        />
      ) : (
        <>
          {isChain && !isRope && (
            <svg viewBox="0 0 320 220" className="relative z-[1] h-full w-full max-h-[190px] max-w-[270px]">
              <defs>
                <linearGradient id="chainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8C4D4" />
                  <stop offset="45%" stopColor="#7A8CA5" />
                  <stop offset="100%" stopColor="#3B4759" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((i) => (
                <ellipse key={i} cx="160" cy={40 + i * 46} rx={i % 2 === 0 ? 55 : 40} ry="22" fill="none" stroke="url(#chainGrad)" strokeWidth="14" />
              ))}
            </svg>
          )}

          {isRoundSling && (
            <svg viewBox="0 0 320 220" className="relative z-[1] h-full w-full max-h-[200px] max-w-[280px]">
              <defs>
                <linearGradient id="rsGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8B94B" />
                  <stop offset="50%" stopColor="#C99C33" />
                  <stop offset="100%" stopColor="#8C6B1F" />
                </linearGradient>
              </defs>
              {[0, 1, 2].map((i) => (
                <ellipse key={i} cx={160 + (i - 1) * 12} cy={110} rx={100 - i * 14} ry={70 - i * 12} fill="none" stroke="url(#rsGrad)" strokeWidth={16 - i * 3} opacity={1 - i * 0.15} />
              ))}
            </svg>
          )}

          {isTextile && !isRoundSling && (
            <svg viewBox="0 0 320 220" className="relative z-[1] h-full w-full max-h-[200px] max-w-[280px]">
              <defs>
                <linearGradient id="texGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E8B94B" />
                  <stop offset="50%" stopColor="#D4A32E" />
                  <stop offset="100%" stopColor="#8C6B1F" />
                </linearGradient>
              </defs>
              <rect x="40" y="50" width="240" height="34" rx="17" fill="none" stroke="url(#texGrad)" strokeWidth="14" />
              <rect x="20" y="102" width="280" height="34" rx="17" fill="none" stroke="url(#texGrad)" strokeWidth="14" />
              <rect x="40" y="154" width="240" height="34" rx="17" fill="none" stroke="url(#texGrad)" strokeWidth="14" />
            </svg>
          )}

          {isRope && !isSteel && (
            <svg viewBox="0 0 320 220" className="relative z-[1] h-full w-full max-h-[200px] max-w-[280px]">
              <defs>
                <linearGradient id="ropeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8B94B" />
                  <stop offset="100%" stopColor="#0B1B33" />
                </linearGradient>
              </defs>
              <path d="M 30 130 Q 80 30 130 130 T 230 130 T 320 130" fill="none" stroke="url(#ropeGrad)" strokeWidth="18" strokeLinecap="round" />
            </svg>
          )}

          {isSteel && (
            <svg viewBox="0 0 320 220" className="relative z-[1] h-full w-full max-h-[190px] max-w-[270px]">
              <defs>
                <linearGradient id="steelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E5E7EB" />
                  <stop offset="45%" stopColor="#9CA3AF" />
                  <stop offset="100%" stopColor="#4B5563" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="30" x2="290" y1={70 + i * 24} y2={70 + i * 24} stroke="url(#steelGrad)" strokeWidth="12" strokeLinecap="round" />
              ))}
            </svg>
          )}

          {isRigging && (
            <svg viewBox="0 0 320 220" className="relative z-[1] h-full w-full max-h-[190px] max-w-[270px]">
              <defs>
                <linearGradient id="rigGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C21F32" />
                  <stop offset="100%" stopColor="#7A0F1F" />
                </linearGradient>
              </defs>
              <path d="M 100 60 A 60 60 0 0 0 100 160 L 220 160 A 60 60 0 0 0 220 60 Z" fill="none" stroke="url(#rigGrad)" strokeWidth="16" strokeLinejoin="round" />
              <line x1="100" y1="60" x2="100" y2="30" stroke="url(#rigGrad)" strokeWidth="14" strokeLinecap="round" />
              <circle cx="100" cy="24" r="10" fill="none" stroke="url(#rigGrad)" strokeWidth="6" />
            </svg>
          )}

          {isTraverse && (
            <svg viewBox="0 0 320 220" className="relative z-[1] h-full w-full max-h-[200px] max-w-[280px]">
              <defs>
                <linearGradient id="trGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8B94B" />
                  <stop offset="100%" stopColor="#8C6B1F" />
                </linearGradient>
              </defs>
              <rect x="20" y="60" width="280" height="22" rx="11" fill="url(#trGrad)" />
              <line x1="160" y1="82" x2="160" y2="170" stroke="#0B1B33" strokeWidth="10" />
              <circle cx="160" cy="182" r="12" fill="none" stroke="#0B1B33" strokeWidth="8" />
            </svg>
          )}

          {!isChain && !isRoundSling && !isTextile && !isRope && !isSteel && !isRigging && !isTraverse && (
            <div className="relative z-[1] flex flex-col items-center justify-center rounded-[2rem] bg-[#0B1B33] px-8 py-6 text-center text-white">
              <div className="text-3xl font-black">{product.type || product.kind}</div>
              <div className="mt-2 text-sm text-[#C8D2E0]">{product.kind}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const [search] = useState(searchFromUrl);

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantQuestion, setAssistantQuestion] = useState("");
  const [assistantAnswer, setAssistantAnswer] = useState("");
  const [assistantContact, setAssistantContact] = useState("");
  const [assistantContactSaved, setAssistantContactSaved] = useState(false);
  const [assistantHistory, setAssistantHistory] = useState<{ q: string; a: string }[]>([]);
  const [assistantNeedsHelp, setAssistantNeedsHelp] = useState(false);
  const [assistantForm, setAssistantForm] = useState({ name: "", contact: "", question: "" });
  const [assistantSendStatus, setAssistantSendStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const [directionIndex, setDirectionIndex] = useState(0);

  const [pageView, setPageView] = useState<"home" | "catalog" | "documents" | "production" | "delivery">("home");
  const prevPageRef = useRef<"home" | "catalog" | "documents" | "production" | "delivery">("home");
  const scrollPositionsRef = useRef<Record<string, number>>({});

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterGroup, setFilterGroup] = useState<"all" | "slings" | "ropes" | "other">("all");
  const [filterKind, setFilterKind] = useState("all");
  const [filterType, setFilterType] = useState("");
  const [filterLoad, setFilterLoad] = useState("");
  const [filterLength, setFilterLength] = useState("");

  const [catalogFilter, setCatalogFilter] = useState<{
    group: "slings" | "ropes" | "other" | "all";
    kind: string;
    type?: string;
    load?: string;
    length?: string;
  }>({ group: "all", kind: "all", type: "", load: "", length: "" });

  const [requestForm, setRequestForm] = useState({ name: "", phone: "", company: "", email: "", message: "" });
  const [requestStatus, setRequestStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [requestError, setRequestError] = useState("");

  const isCatalogFilterActive =
    catalogFilter.group !== "all" ||
    (!!catalogFilter.kind && catalogFilter.kind !== "all") ||
    !!catalogFilter.type ||
    !!catalogFilter.load ||
    !!catalogFilter.length;

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || product.name.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query) || product.type?.toLowerCase().includes(query) || product.load?.toLowerCase().includes(query);
    const matchesGroup = catalogFilter.group === "all" || product.group === catalogFilter.group;
    const matchesKind = catalogFilter.kind === "all" || !catalogFilter.kind || product.kind === catalogFilter.kind;
    const matchesType = !catalogFilter.type || product.type === catalogFilter.type;
    const matchesLoad = !catalogFilter.load || product.load === catalogFilter.load;
    const matchesLength = !catalogFilter.length || product.length?.includes(catalogFilter.length);
    return matchesSearch && matchesGroup && matchesKind && matchesType && matchesLoad && matchesLength;
  });

  const openPage = (view: "home" | "catalog" | "documents" | "production" | "delivery") => {
    if (typeof window !== "undefined") {
      scrollPositionsRef.current[pageView] = window.scrollY;
    }
    if (view !== pageView) prevPageRef.current = pageView;
    setPageView(view);
    setIsMobileMenuOpen(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  };

  const goBack = () => {
    const targetView = prevPageRef.current || "home";
    const savedY = scrollPositionsRef.current[targetView] || 0;
    setPageView(targetView);
    setTimeout(() => window.scrollTo({ top: savedY, behavior: "auto" }), 0);
  };

  const openRequest = () => {
    if (pageView !== "home") {
      prevPageRef.current = pageView;
      setPageView("home");
    }
    setIsMobileMenuOpen(false);
    setTimeout(() => document.getElementById("request")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const scrollToContacts = () => {
    setIsMobileMenuOpen(false);
    if (pageView !== "home") {
      prevPageRef.current = pageView;
      setPageView("home");
      setTimeout(() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    setCartCount((prev) => prev + 1);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    setCartCount((prev) => prev - 1);
  };

  const handleCheckout = () => {
    try {
      const orderData = {
        items: cartItems.map((it) => ({ name: it.name, price: it.price, load: it.load, length: it.length })),
        total: cartItems.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toISOString(),
      };
      window.localStorage.setItem("miko_order", JSON.stringify(orderData));
    } catch {}
    if (typeof window !== "undefined") {
      window.location.href = PAYMENT_URL;
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestStatus("sending");
    setRequestError("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "request", ...requestForm }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Ошибка отправки");
      setRequestStatus("ok");
      setRequestForm({ name: "", phone: "", company: "", email: "", message: "" });
    } catch (err: unknown) {
      setRequestStatus("error");
      setRequestError(err instanceof Error ? err.message : "Не удалось отправить заявку");
    }
  };

  const handleAssistantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAssistantSendStatus("sending");
    try {
      const dialogText = assistantHistory.map((m) => `Клиент: ${m.q}\nАссистент: ${m.a}`).join("\n\n");
      const lastQ = assistantHistory.length > 0 ? assistantHistory[assistantHistory.length - 1].q : "";
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "assistant", ...assistantForm, dialog: dialogText, last_question: lastQ }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Ошибка отправки");
      setAssistantSendStatus("ok");
      setAssistantForm({ name: "", contact: "", question: "" });
    } catch {
      setAssistantSendStatus("error");
    }
  };

  const SYNONYMS: Record<string, string[]> = {
    цена: ["стоимость", "сколько", "стоит", "прайс", "руб", "₽", "деньги", "бюджет", "дорого", "дешево", "почем"],
    доставка: ["отправка", "привезти", "транспорт", "курьер", "привезете", "доставите", "отгрузить", "логистика", "перевозка"],
    документ: ["сертификат", "декларация", "паспорт", "бумаги", "еаэс", "тс", "соответствие", "гарантия"],
    строп: ["стропы", "стропа", "стропами", "цепной", "текстильный", "канатный", "круглопрядный", "такелаж", "подъем", "подъём"],
    трос: ["тросы", "троса", "канат", "канаты", "буксир", "буксировочный", "динамический", "стальной"],
    цепь: ["цепи", "цепной", "цепка", "звено", "звенья"],
    скоба: ["скобы", "скобка", "шакл", "шаклы"],
    талреп: ["талрепы", "натяжитель", "натяжение"],
    производство: ["изготовление", "завод", "фабрика", "производитель", "производственная", "делаете", "изготавливаете"],
    контакт: ["телефон", "адрес", "почта", "email", "связаться", "позвонить", "контакты", "написать", "связь"],
    оплата: ["счёт", "счет", "безнал", "наличные", "карта", "перевод", "платеж", "платёж", "оплатить", "заплатить"],
    помощь: ["помогите", "помощь", "подскажите", "подсказать", "нужно", "хочу", "ищу", "ищем", "интересует", "как"],
    привет: ["здравствуйте", "добрый", "хай", "hello", "hi", "приветствую", "здорово"],
    качество: ["надёжность", "надежность", "гарантия", "прочный", "крепкий", "долговечный"],
    размер: ["габариты", "размеры", "длина", "длины", "метраж", "метров"],
    груз: ["вес", "масса", "тоннаж", "грузоподъёмность", "грузоподъемность", "нагрузка", "тонн"],
    срок: ["сроки", "когда", "быстро", "срочно", "дата", "время"],
  };

  const detectIntent = (q: string): string | null => {
    const intents: { name: string; keys: string[] }[] = [
      { name: "price", keys: ["цена", "стоимость", "сколько", "стоит", "прайс", "руб", "₽", "почем", "дорого", "дешево"] },
      { name: "delivery", keys: ["доставка", "отправка", "привезти", "привезете", "доставите", "курьер", "логистика", "регион", "москва"] },
      { name: "docs", keys: ["документ", "сертификат", "декларация", "паспорт", "еаэс", "бумаги", "соответствие"] },
      { name: "production", keys: ["производство", "изготовление", "завод", "производитель", "делаете", "изготавливаете", "нестандарт"] },
      { name: "contacts", keys: ["контакт", "телефон", "адрес", "почта", "email", "позвонить", "связаться", "написать"] },
      { name: "payment", keys: ["оплата", "счёт", "счет", "безнал", "наличные", "карта", "перевод", "платёж", "оплатить", "заплатить"] },
      { name: "greeting", keys: ["привет", "здравствуйте", "добрый", "хай", "hello", "hi"] },
      { name: "products", keys: ["строп", "трос", "канат", "цепь", "скоба", "талреп", "зажим", "такелаж", "траверс", "крюк"] },
      { name: "sizes", keys: ["размер", "длина", "габарит", "метраж", "метр"] },
      { name: "load", keys: ["груз", "вес", "масса", "тоннаж", "нагрузка", "тонн"] },
      { name: "deadline", keys: ["срок", "когда", "быстро", "срочно"] },
      { name: "quality", keys: ["качество", "надёжность", "гарантия", "прочный"] },
      { name: "help", keys: ["помогите", "помощь", "подскажите", "нужно", "хочу", "ищу", "интересует"] },
    ];
    for (const intent of intents) {
      if (intent.keys.some((k) => q.includes(k))) return intent.name;
    }
    return null;
  };

  const expandWithSynonyms = (words: string[]): string[] => {
    const result = new Set<string>();
    words.forEach((w) => {
      result.add(w);
      Object.entries(SYNONYMS).forEach(([key, syns]) => {
        if (key === w || syns.includes(w)) {
          result.add(key);
          syns.forEach((s) => result.add(s));
        }
      });
    });
    return Array.from(result);
  };

  const stem = (w: string): string => {
    return w.replace(/(ами|ями|ах|ях|ов|ев|ой|ый|ий|ая|ое|ые|ие|ую|юю|ам|ям|у|ю|а|я|ы|и|е|о)$/gi, "").toLowerCase();
  };

  const buildKnowledgeBase = () => {
    const kb: { text: string; answer: string; keywords: string[]; intent?: string }[] = [];
    faq.forEach((f) => {
      kb.push({ text: (f.q + " " + f.a).toLowerCase(), answer: f.a, keywords: f.q.toLowerCase().split(/\s+/).filter((w) => w.length > 3).map(stem) });
    });
    products.forEach((p) => {
      const text = `${p.name} ${p.kind} ${p.type || ""} ${p.load || ""} ${p.length || ""} ${p.description || ""} ${(p.specs || []).join(" ")}`.toLowerCase();
      const keywords = text.split(/[\s,.()×]+/).filter((w) => w.length > 3).map(stem);
      const answer = `«${p.name}» — ${p.description || ""} Цена: ${p.price > 0 ? `от ${p.price.toLocaleString()} ₽` : "по запросу"}.`;
      kb.push({ text, answer, keywords, intent: "products" });
    });
    const manualEntries = [
      { intent: "docs", text: "документы сертификаты декларации паспорта еаэс тс соответствие", answer: "На всю продукцию есть сертификаты соответствия, декларации ЕАЭС и паспорта изделий. Откройте раздел «Документы».", keywords: ["документ", "сертификат", "деклараци", "паспорт", "еаэс", "соответств"] },
      { intent: "delivery", text: "доставка отгрузка москва регионы рф транспортная компания сроки", answer: "Доставляем по Москве, Московской области и отправляем ТК по всей России: Деловые Линии, СДЭК, ПЭК и другие. Стоимость и сроки уточняйте у менеджера: +7 (495) 995-23-60.", keywords: ["доставк", "отгрузк", "москв", "регион", "транспорт", "срок"] },
      { intent: "production", text: "производство изготовление завод компания грузоподъёмное оборудование нестандарт", answer: "Мы производственная компания. Изготавливаем грузоподъёмное оборудование и комплектующие. Возможны нестандартные заказы.", keywords: ["производств", "изготовлени", "завод", "производственн", "нестандарт"] },
      { intent: "payment", text: "оплата счёт безнал юрлица договор наличные карта", answer: "Работаем с юрлицами и ИП по безналичному расчёту. Выставляем счёт, заключаем договор, предоставляем полный пакет закрывающих документов.", keywords: ["оплат", "счёт", "счет", "безнал", "юрлиц", "договор", "карт", "наличн"] },
      { intent: "contacts", text: "контакты телефон адрес почта связаться позвонить написать", answer: `Телефоны: ${COMPANY.phone1} и ${COMPANY.phone2}. Email: ${COMPANY.email}. Физический адрес: ${COMPANY.physicalAddress}. Юридический адрес: ${COMPANY.legalAddress}.`, keywords: ["контакт", "телефон", "адрес", "почт", "связат", "позвонит", "email"] },
      { intent: "greeting", text: "привет здравствуйте добрый день хай", answer: "Здравствуйте! Помогу подобрать стропы, тросы, канаты или такелаж. Опишите вашу задачу.", keywords: ["привет", "здравств", "добр", "хай"] },
      { intent: "price", text: "цена стоимость сколько стоит прайс руб", answer: "Цены зависят от типа, грузоподъёмности и длины. Точную цену уточняйте у менеджера или посмотрите в каталоге.", keywords: ["цен", "стоимост", "стоит", "прайс", "руб", "почем"] },
      { intent: "quality", text: "качество надёжность гарантия сертификат прочный", answer: "Вся продукция сертифицирована и соответствует требованиям безопасности. Даём гарантию на изделия.", keywords: ["качеств", "надёжн", "гаранти", "прочн", "сертифицир"] },
      { intent: "sizes", text: "размер длина габариты метраж метров", answer: "Стандартные длины — от 1 до 8 метров. Возможно изготовление под индивидуальный размер.", keywords: ["размер", "длин", "габарит", "метраж", "метр"] },
      { intent: "load", text: "груз вес масса тоннаж грузоподъёмность нагрузка", answer: "Грузоподъёмность от 0,5 т до 26,5 т и выше. Подберём под вашу задачу — учитываем массу груза и схему подъёма.", keywords: ["груз", "вес", "масс", "тоннаж", "нагрузк", "тонн"] },
      { intent: "deadline", text: "срок изготовление когда быстро срочно", answer: "Стандартные позиции со склада отгружаем за 1–3 дня. Нестандартные изделия изготавливаем от 5 рабочих дней.", keywords: ["срок", "изготовлени", "быстр", "срочн", "когда"] },
      { intent: "help", text: "помогите помощь подскажите нужно хочу ищу интересует", answer: "Опишите, что вам нужно: тип груза, вес, длину, условия работы. Подберём подходящее изделие.", keywords: ["помощ", "помогит", "подскаж", "нужн", "хоч", "ищ", "интересу"] },
    ];
    manualEntries.forEach((e) => kb.push(e));
    return kb;
  };

  const knowledgeBase = buildKnowledgeBase();

  const handleAskAssistant = () => {
    const q = assistantQuestion.trim().toLowerCase();
    if (!q) return;

    const isContact = q.includes("@") || /[+\d]{5,}/.test(q.replace(/\s/g, ""));
    if (isContact && !assistantContactSaved) {
      setAssistantContact(q);
      setAssistantContactSaved(true);
      setAssistantAnswer("Спасибо! Ваши контактные данные переданы менеджеру. Он свяжется с вами в ближайшее время.");
      setAssistantHistory((h) => [...h, { q: assistantQuestion, a: "Контакт сохранён" }]);
      setAssistantQuestion("");
      setAssistantNeedsHelp(false);
      return;
    }

    const detectedIntent = detectIntent(q);
    const rawWords = q.replace(/[^\wа-яё\s]/gi, " ").split(/\s+/).filter((w) => w.length > 2);
    const stemmed = rawWords.map(stem);
    const expanded = expandWithSynonyms(stemmed);

    let bestMatch = { score: 0, answer: "", intent: "" as string };
    knowledgeBase.forEach((item) => {
      let score = 0;
      if (detectedIntent && item.intent === detectedIntent) score += 8;
      expanded.forEach((word) => {
        if (item.text.includes(word)) score += 3;
        item.keywords.forEach((kw) => {
          if (kw === word) score += 5;
          else if (kw.includes(word) || word.includes(kw)) score += 2;
        });
      });
      if (score > bestMatch.score) bestMatch = { score, answer: item.answer, intent: item.intent || "" };
    });

    let finalAnswer = "";
    if (bestMatch.score >= 5) {
      finalAnswer = bestMatch.answer;
      setAssistantNeedsHelp(false);
    } else if (bestMatch.score >= 2) {
      finalAnswer = `Возможно, вас интересует: ${bestMatch.answer}\n\nЕсли это не то — уточните вопрос или отправьте его менеджеру через форму ниже.`;
      setAssistantNeedsHelp(true);
    } else {
      finalAnswer = "К сожалению, я не нашёл точного ответа на ваш вопрос. Заполните форму ниже — ваш вопрос уйдёт менеджеру, и он свяжется с вами.";
      setAssistantNeedsHelp(true);
    }

    setAssistantAnswer(finalAnswer);
    setAssistantHistory((h) => [...h, { q: assistantQuestion, a: finalAnswer }]);
    setAssistantQuestion("");
  };

  const openFilterModal = () => {
    setFilterGroup(catalogFilter.group);
    setFilterKind(catalogFilter.kind);
    setFilterType(catalogFilter.type || "");
    setFilterLoad(catalogFilter.load || "");
    setFilterLength(catalogFilter.length || "");
    setIsFilterModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const applyFilter = () => {
    setCatalogFilter({ group: filterGroup, kind: filterKind, type: filterType || undefined, load: filterLoad || undefined, length: filterLength || undefined });
    openPage("catalog");
    setIsFilterModalOpen(false);
  };

  const resetFilter = () => {
    setFilterGroup("all");
    setFilterKind("all");
    setFilterType("");
    setFilterLoad("");
    setFilterLength("");
    setCatalogFilter({ group: "all", kind: "all", type: "", load: "", length: "" });
    setIsFilterModalOpen(false);
  };

  const isHomePage = pageView === "home";
  const isOverlayOpen = !!selectedProduct || isCartOpen || isFilterModalOpen || isMobileMenuOpen;

  useEffect(() => {
    if (!isOverlayOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOverlayOpen]);

  return (
    <main className={`${styles.site} min-h-screen bg-white text-[#0B1B33]`}>
      <header
        className={`${styles.header} ${isHomePage ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={
          isHomePage
            ? { background: "transparent" }
            : { background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(11,27,51,0.1)" }
        }
      >
        <div className="flex min-h-[68px] md:min-h-[92px] items-center justify-between px-4 md:px-10">
          <button type="button" onClick={() => openPage("home")} className="flex items-center gap-3 md:gap-5 text-left">
            <img src="/logo.png" alt="ООО «МИКО»" className="h-10 w-auto object-contain md:h-14 lg:h-16" />
            <div>
              <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-black leading-tight ${isHomePage ? "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]" : "text-[#0B1B33]"}`}>ООО «МИКО»</div>
              <div className={`text-[8px] md:text-[10px] lg:text-xs font-black uppercase tracking-[0.28em] md:tracking-[0.32em] ${isHomePage ? "text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" : "text-[#0B1B33]/65"}`}>STROPS</div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            <button type="button" onClick={() => openPage("home")} className={isHomePage ? "rounded-full bg-white px-5 py-2 font-bold text-[#0B1B33] shadow-md transition" : "rounded-full px-5 py-2 font-bold text-[#0B1B33] transition hover:bg-[#0B1B33]/10"}>Главная</button>
            <button type="button" onClick={() => openPage("catalog")} className={pageView === "catalog" ? "rounded-full bg-[#0B1B33] px-5 py-2 font-bold text-white shadow-md transition" : isHomePage ? "rounded-full px-5 py-2 font-bold text-white transition hover:bg-white/15 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" : "rounded-full px-5 py-2 font-bold text-[#0B1B33] transition hover:bg-[#0B1B33]/10"}>Каталог</button>
            <button type="button" onClick={scrollToContacts} className={isHomePage ? "rounded-full px-5 py-2 font-bold text-white transition hover:bg-white/15 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" : "rounded-full px-5 py-2 font-bold text-[#0B1B33] transition hover:bg-[#0B1B33]/10"}>Контакты</button>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={openFilterModal}
              className={`hidden md:flex h-12 items-center gap-2 rounded-full px-6 text-sm font-black transition ${
                isHomePage
                  ? "border border-white/50 bg-black/30 text-white backdrop-blur-md hover:bg-black/50"
                  : "bg-[#0B1B33] text-white hover:bg-[#102744]"
              }`}
            >
              <span>Фильтр товаров</span>
              <span className="text-lg">☰</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className={`relative rounded-full p-2 md:p-3 shadow-sm transition ${
                isHomePage
                  ? "border border-white/50 bg-black/30 backdrop-blur-md hover:bg-black/50"
                  : "border border-[#0B1B33]/15 bg-white"
              }`}
            >
              <span className="text-xl md:text-2xl">🛒</span>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-[#0B1B33] text-[10px] md:text-xs font-black text-white">{cartCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full ${
                isHomePage
                  ? "border border-white/50 bg-black/30 text-white backdrop-blur-md"
                  : "border border-[#0B1B33]/15 bg-white text-[#0B1B33]"
              }`}
              aria-label="Меню"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="text-xl md:text-2xl">{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ background: "rgba(11,27,51,0.6)", backdropFilter: "blur(8px)" }} onClick={() => setIsMobileMenuOpen(false)}>
          <div id="mobile-menu" className="absolute top-[68px] md:top-[92px] bottom-0 left-0 right-0 overflow-y-auto bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col p-4">
              <button type="button" onClick={() => openPage("home")} className={`rounded-2xl px-5 py-4 text-left text-lg font-black transition ${isHomePage ? "bg-[#0B1B33] text-white" : "text-[#0B1B33] hover:bg-[#F4F7FB]"}`}>Главная</button>
              <button type="button" onClick={() => openPage("catalog")} className={`mt-2 rounded-2xl px-5 py-4 text-left text-lg font-black transition ${pageView === "catalog" ? "bg-[#0B1B33] text-white" : "text-[#0B1B33] hover:bg-[#F4F7FB]"}`}>Каталог</button>
              <button type="button" onClick={scrollToContacts} className="mt-2 rounded-2xl px-5 py-4 text-left text-lg font-black text-[#0B1B33] transition hover:bg-[#F4F7FB]">Контакты</button>
              <button type="button" onClick={openFilterModal} className="mt-4 rounded-full bg-[#0B1B33] px-5 py-4 text-center text-base font-black text-white">Фильтр товаров</button>
            </nav>
          </div>
        </div>
      )}

      {pageView === "home" && (
        <>
          <section className={`${styles.hero} relative overflow-hidden min-h-[640px] md:min-h-screen`}>
            <div className={`${styles.heroImage} absolute inset-0 bg-cover bg-center`} style={{ backgroundImage: "url('/images/photo-site4.png')" }} />
            <div className={`${styles.heroShade} absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30`} />

            <div className={`${styles.heroContent} relative mx-auto grid max-w-[1600px] gap-8 md:gap-12 px-4 md:px-6 pt-[110px] pb-16 md:pt-[140px] md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pt-[160px] lg:pb-32`}>
              <div className="w-full max-w-[900px] rounded-[2rem] md:rounded-[2.5rem] border border-white/20 bg-black/60 p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
                <div className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 md:px-5 py-1.5 md:py-2 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-white">
                  ООО «МИКО» · Подбор · Документы
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] text-white">
                  Грузоподъёмные<br />решения<br />нового поколения
                </h1>
                <p className="mt-5 md:mt-7 max-w-2xl text-base md:text-lg leading-7 md:leading-8 text-white/90">
                  Подбираем <b className="text-white">стропы</b>, <b className="text-white">канаты</b>, <b className="text-white">тросы</b> и <b className="text-white">такелаж</b> под груз, объект и реальные условия работы.
                </p>
                <div className="mt-6 md:mt-10 grid grid-cols-3 gap-3 md:gap-5 border-t border-white/20 pt-5 md:pt-7">
                  <div>
                    <div className="text-xl md:text-3xl font-black text-white">12+</div>
                    <div className="text-xs md:text-sm text-white/80">лет на рынке</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-black text-white">500+</div>
                    <div className="text-xs md:text-sm text-white/80">позиций</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-black text-white">1–3 дня</div>
                    <div className="text-xs md:text-sm text-white/80">отгрузка</div>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 md:gap-5 grid-cols-1 sm:grid-cols-2">
                {[
                  { title: "Точный подбор", subtitle: "под вес и схему подъёма" },
                  { title: "Изготовление", subtitle: "под длину и комплектацию" },
                  { title: "Документы", subtitle: "сертификаты и паспорта" },
                  { title: "Доставка", subtitle: "Москва, область, РФ" },
                ].map((item) => (
                  <div key={item.title} className="min-h-[110px] md:min-h-44 rounded-[1.5rem] md:rounded-[2rem] border border-white/25 bg-black/55 p-5 md:p-7 text-white shadow-xl backdrop-blur-md">
                    <div className="text-lg md:text-2xl font-black text-white">{item.title}</div>
                    <div className="mt-2 md:mt-3 text-sm md:text-base leading-6 md:leading-7 text-white/85">{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#F4F7FB] px-4 md:px-6 py-16 md:py-24 lg:py-32">
            <div className="mx-auto max-w-[1600px]">
              <p className={labelLight}>Комплексная поставка</p>
              <h2 className={titleLight}>Производство, документы и доставка</h2>

              <div className="mt-10 md:mt-14 grid gap-5 md:gap-7 lg:grid-cols-3">
                {[
                  { title: "Производство", text: "Изготовление под длину, нагрузку и тип крепления.", image: "/images/photo-site9.png", page: "production" as const },
                  { title: "Документы", text: "Сертификаты, декларации, паспорта изделий.", image: "/images/photo-site10.png", page: "documents" as const },
                  { title: "Доставка", text: "Москва, область и отправка ТК по РФ.", image: "/images/photo-site11.png", page: "delivery" as const },
                ].map((item) => (
                  <button key={item.title} type="button" onClick={() => openPage(item.page)} className="group overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#0B1B33] text-left text-white shadow-xl transition hover:-translate-y-1">
                    <div className="relative aspect-[16/9] md:aspect-auto md:h-72 overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${item.image}')` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33] via-[#0B1B33]/55 to-transparent" />
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-black text-white">{item.title}</h3>
                      <p className="mt-3 md:mt-4 text-sm md:text-base leading-6 md:leading-7 text-[#C8D2E0]">{item.text}</p>
                      <div className="mt-4 md:mt-5 inline-flex items-center gap-2 text-sm font-black text-white/80">Подробнее <span className="transition group-hover:translate-x-1">→</span></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section id="directions" className="scroll-mt-28 bg-white px-4 md:px-6 py-16 md:py-20">
            <div className="mx-auto max-w-[1500px]">
              <p className={labelLight}>Каталог</p>
              <h2 className={titleLight}>Основные направления</h2>

              <div className="relative mt-8 md:mt-10">
                <div className="overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-2xl">
                  <div
                    className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: `translateX(-${directionIndex * 100}%)` }}
                  >
                    {directions.map((d, i) => (
                      <div
                        key={i}
                        onClick={() => openPage("catalog")}
                        className={`${styles.direction} relative min-h-[380px] md:min-h-[500px] w-full flex-shrink-0 cursor-pointer overflow-hidden bg-[#0B1B33] text-white transition-opacity duration-700 ${i === directionIndex ? "opacity-100" : "opacity-60"}`}
                      >
                        <div
                          className={`${styles.directionImage} absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out ${i === directionIndex ? "scale-100" : "scale-110"}`}
                          style={{ backgroundImage: `url('${d.image}')` }}
                        />
                        <div className={`${styles.directionShade} absolute inset-0 bg-gradient-to-t from-[#0B1B33] via-[#0B1B33]/70 to-[#0B1B33]/10`} />
                        <div className={`${styles.directionContent} absolute inset-x-0 bottom-0 p-5 md:p-8 lg:p-14 transition-all duration-700 ${i === directionIndex ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                          <div className="mb-3 md:mb-4 inline-flex rounded-full bg-white/15 px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-black uppercase tracking-widest text-white backdrop-blur-sm">
                            {d.subtitle}
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white">{d.title}</h3>
                          <p className="mt-3 md:mt-4 max-w-3xl text-sm md:text-lg leading-6 md:leading-8 text-white/85">{d.text}</p>
                          <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                            {d.tags.map((t) => (
                              <span key={t} className="rounded-full border border-white/30 bg-white/10 px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-black text-white backdrop-blur-sm">{t}</span>
                            ))}
                          </div>
                          <div className="mt-4 md:mt-6 inline-flex items-center gap-2 text-xs md:text-sm font-black text-white/90">
                            Перейти в каталог <span>→</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Предыдущее направление"
                  onClick={(e) => { e.stopPropagation(); setDirectionIndex((p) => (p - 1 + directions.length) % directions.length); }}
                  className="absolute left-2 md:left-3 top-[100px] md:top-1/2 z-10 flex h-11 w-11 md:h-14 md:w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#0B1B33]/70 text-2xl md:text-3xl font-black text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0B1B33]"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Следующее направление"
                  onClick={(e) => { e.stopPropagation(); setDirectionIndex((p) => (p + 1) % directions.length); }}
                  className="absolute right-2 md:right-3 top-[100px] md:top-1/2 z-10 flex h-11 w-11 md:h-14 md:w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#0B1B33]/70 text-2xl md:text-3xl font-black text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0B1B33]"
                >
                  ›
                </button>

                <div className="mt-5 md:mt-6 flex items-center justify-between gap-6">
                  <div className="flex gap-2">
                    {directions.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Показать направление ${i + 1}`}
                        onClick={() => setDirectionIndex(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${i === directionIndex ? "w-8 md:w-10 bg-[#0B1B33]" : "w-2 bg-[#0B1B33]/25 hover:bg-[#0B1B33]/50"}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs md:text-sm font-black tracking-widest text-[#0B1B33]/60">
                    {String(directionIndex + 1).padStart(2, "0")} / {String(directions.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="request" className="relative overflow-hidden px-4 md:px-6 py-16 md:py-24" style={{ backgroundImage: "url('/images/photo-site13.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-[#0B1B33]/94" />
            <div className="relative mx-auto grid max-w-[1600px] gap-8 md:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className={labelDark}>Расчёт за 15 минут</p>
                <h2 className={titleDark}>Получить предложение</h2>
                <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-[#C8D2E0]">Опишите задачу — менеджер уточнит параметры и подготовит предложение.</p>
                <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
                  {["Ответим в течение 15 минут в рабочее время", "Подберём 2–3 варианта под ваш бюджет", "Пришлём спецификацию и коммерческое предложение"].map((t) => (
                    <div key={t} className="flex items-start gap-3 text-white text-sm md:text-base">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-white/60" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleRequestSubmit} className="rounded-[2rem] md:rounded-[3rem] bg-[#0B1B33] p-5 md:p-8 lg:p-10 text-white shadow-2xl ring-1 ring-white/10">
                <div className="grid gap-4 md:gap-5 md:grid-cols-2">
                  <input name="name" required value={requestForm.name} onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })} placeholder="Ваше имя" className="rounded-2xl border border-white/10 bg-[#102744] px-4 md:px-5 py-3 md:py-4 text-white outline-none placeholder:text-[#C8D2E0]/60 focus:border-white" />
                  <input name="phone" required value={requestForm.phone} onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })} placeholder="Телефон" className="rounded-2xl border border-white/10 bg-[#102744] px-4 md:px-5 py-3 md:py-4 text-white outline-none placeholder:text-[#C8D2E0]/60 focus:border-white" />
                  <input name="company" value={requestForm.company} onChange={(e) => setRequestForm({ ...requestForm, company: e.target.value })} placeholder="Компания" className="rounded-2xl border border-white/10 bg-[#102744] px-4 md:px-5 py-3 md:py-4 text-white outline-none placeholder:text-[#C8D2E0]/60 focus:border-white" />
                  <input name="email" type="email" value={requestForm.email} onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })} placeholder="E-mail" className="rounded-2xl border border-white/10 bg-[#102744] px-4 md:px-5 py-3 md:py-4 text-white outline-none placeholder:text-[#C8D2E0]/60 focus:border-white" />
                  <textarea name="message" rows={5} value={requestForm.message} onChange={(e) => setRequestForm({ ...requestForm, message: e.target.value })} placeholder="Что нужно изготовить или подобрать?" className="rounded-2xl border border-white/10 bg-[#102744] px-4 md:px-5 py-3 md:py-4 text-white outline-none placeholder:text-[#C8D2E0]/60 focus:border-white md:col-span-2" />
                </div>
                <button type="submit" disabled={requestStatus === "sending"} className={`mt-5 md:mt-6 w-full ${buttonOutlineOnDark} disabled:opacity-60`}>
                  {requestStatus === "sending" ? "Отправляем..." : "Получить расчёт"}
                </button>
                {requestStatus === "ok" && (<p className="mt-4 text-sm leading-6 text-green-300">Заявка отправлена. Менеджер свяжется с вами в течение 15 минут.</p>)}
                {requestStatus === "error" && (<p className="mt-4 text-sm leading-6 text-red-300">{requestError}</p>)}
                {requestStatus === "idle" && (<p className="mt-4 text-xs md:text-sm leading-6 text-[#C8D2E0]">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>)}
              </form>
            </div>
          </section>

          <section id="contacts" className="bg-white px-4 md:px-6 py-12 md:py-20">
            <div className="mx-auto max-w-[1600px]">
              <p className={labelLight}>Связь</p>
              <h2 className={titleLight}>Контакты</h2>

              <div className="relative mt-6 md:mt-10 h-[320px] md:h-[520px] overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-[#0B1B33]/10 shadow-xl">
                <iframe src="https://yandex.ru/map-widget/v1/?ll=37.399399%2C55.726320&z=17&pt=37.399399%2C55.726320%2Cpm2rdm" width="100%" height="100%" style={{ border: 0, position: "absolute", top: 0, left: 0 }} allowFullScreen />
                <a href="https://yandex.ru/maps/?rtext=~55.726320,37.399399&rtt=auto" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 md:bottom-6 right-4 md:right-6 z-10 inline-flex items-center gap-2 rounded-full bg-[#0B1B33] px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-black text-white shadow-2xl transition hover:bg-[#102744]">Построить маршрут</a>
              </div>
            </div>
          </section>
        </>
      )}

      {pageView === "catalog" && (
        <section className="scroll-mt-28 bg-white px-4 md:px-6 py-16 md:py-24">
          <div className="mx-auto max-w-[1600px]">
            <p className={labelLight}>Продукция</p>
            <h2 className={titleLight}>Каталог товаров</h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-[#526174]">Более 500 позиций: стропы, канаты, тросы, такелаж. <b className="text-[#0B1B33]">Подберём под задачу бесплатно.</b></p>

            <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4">
              <button type="button" onClick={goBack} className={buttonOutline}>← Вернуться назад</button>
              {isCatalogFilterActive && (
                <button
                  type="button"
                  onClick={() => setCatalogFilter({ group: "all", kind: "all", type: "", load: "", length: "" })}
                  className={buttonOutline}
                >
                  Показать все товары
                </button>
              )}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-10 md:mt-12 rounded-[2rem] bg-[#0B1B33] p-6 md:p-8 text-white shadow-xl">
                <h3 className="text-2xl md:text-3xl font-black text-white">Ничего не найдено</h3>
                <p className="mt-4 max-w-2xl leading-7 text-[#C8D2E0] text-sm md:text-base">Попробуйте изменить параметры или оставьте заявку — подберём вручную.</p>
                <button type="button" onClick={openRequest} className={`mt-6 ${buttonOutlineOnDark}`}>Оставить заявку</button>
              </div>
            )}

            <div className="mt-10 md:mt-14 grid gap-5 md:gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, idx) => (
                <div key={idx} className="group/card flex flex-col overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-b from-[#0B1B33] to-[#102744] text-white shadow-[0_10px_40px_-15px_rgba(11,27,51,0.5)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-20px_rgba(11,27,51,0.6)]">
                  <div className="relative aspect-[3/2] md:aspect-auto md:h-64 overflow-hidden">
                    <ProductVisual product={product} />
                    {product.type && (
                      <div className="absolute left-4 md:left-5 top-4 md:top-5 z-10 rounded-full bg-[#0B1B33] px-3 md:px-3.5 py-1 md:py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-lg">
                        {product.type}
                      </div>
                    )}
                    <div className="absolute right-4 md:right-5 top-4 md:top-5 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 md:px-3 py-1 md:py-1.5 text-[10px] font-black text-emerald-700 shadow-lg backdrop-blur-sm">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      В наличии
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 md:p-7">
                    <div className="mb-3 md:mb-4 flex flex-wrap gap-2">
                      {product.load && (
                        <span className="rounded-full border border-[#4A6FA5]/50 bg-[#4A6FA5]/15 px-2.5 md:px-3 py-1 md:py-1.5 text-[10px] md:text-[11px] font-black text-[#9AB4D6]">{product.load}</span>
                      )}
                      {product.length && (
                        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 md:px-3 py-1 md:py-1.5 text-[10px] md:text-[11px] font-black text-[#C8D2E0]">{product.length}</span>
                      )}
                    </div>

                    <h3 className="min-h-[48px] md:min-h-[56px] text-base md:text-[19px] font-black leading-tight tracking-tight text-white">{product.name}</h3>
                    <p className="mt-2 md:mt-3 min-h-[40px] md:min-h-[44px] text-xs md:text-sm leading-relaxed text-[#C8D2E0]/80">{product.description}</p>

                    {product.specs && product.specs.length > 0 && (
                      <div className="mt-4 md:mt-5 grid grid-cols-2 gap-2">
                        {product.specs.slice(0, 4).map((spec) => (
                          <div key={spec} className="flex items-center gap-2 rounded-xl bg-white/5 px-2.5 md:px-3 py-2 md:py-2.5 text-[10px] md:text-[11px] font-bold text-[#C8D2E0]">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-[#4A6FA5]" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 md:mt-6 flex items-end justify-between border-t border-white/10 pt-4 md:pt-5">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C8D2E0]/50">Цена</div>
                        <div className="mt-1 text-2xl md:text-3xl font-black leading-none text-white">
                          {product.price > 0 ? `от ${product.price.toLocaleString()} ₽` : "по запросу"}
                        </div>
                      </div>
                      {product.services && product.services.length > 0 && (
                        <div className="text-right">
                          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8D2E0]/50">Доп. услуги</div>
                          <div className="mt-1 text-base md:text-lg font-black text-[#9AB4D6]">+{product.services.length}</div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 md:mt-5 grid gap-2 md:gap-3 grid-cols-2">
                      <button type="button" onClick={() => setSelectedProduct(product)} className="rounded-full border border-white/20 bg-white/5 px-3 md:px-5 py-3 md:py-3.5 text-xs md:text-sm font-black text-white transition hover:border-white hover:bg-white hover:text-[#0B1B33]">Подробнее</button>
                      <button type="button" onClick={() => addToCart(product)} className="rounded-full bg-white px-3 md:px-5 py-3 md:py-3.5 text-xs md:text-sm font-black text-[#0B1B33] transition hover:bg-[#4A6FA5] hover:text-white">В корзину</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {pageView === "documents" && (
        <section className="relative min-h-screen px-4 md:px-6 py-16 md:py-24 bg-[#FAFAF7]">
          <div className="relative mx-auto max-w-[1600px]">
            <div className="flex flex-wrap gap-3 md:gap-4">
              <button type="button" onClick={goBack} className={buttonOutline}>← Вернуться назад</button>
            </div>
            <div className="mt-8 md:mt-12 max-w-4xl">
              <p className={labelLight}>Документы</p>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#0B1B33]">Вся документация — в одном месте</h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-[#526174]">Документы на продукцию собраны отдельно и удобно структурированы, чтобы нужную информацию можно было быстро найти, открыть и проверить.</p>
            </div>
            <div className="mt-8 md:mt-10 grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Сертификаты соответствия", text: "ТР ТС 010/2011" },
                { title: "Декларации ЕАЭС", text: "Соответствие стандартам" },
                { title: "Паспорта изделий", text: "С техническими характеристиками" },
                { title: "Закрывающие документы", text: "Для бухгалтерии" },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] md:rounded-[1.75rem] border border-[#0B1B33]/10 bg-white p-5 md:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="text-base md:text-lg font-black text-[#0B1B33]">{item.title}</div>
                  <div className="mt-2 text-sm text-[#526174]">{item.text}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 md:mt-14 grid gap-5 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((doc, idx) => (
                <div key={idx} className="group overflow-hidden rounded-[2rem] bg-[#0B1B33] text-white shadow-xl transition hover:-translate-y-1">
                  <div className="h-60 md:h-80 overflow-hidden bg-white">
                    <img src={doc.img} alt={doc.title} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 md:p-7">
                    <h3 className="text-xl md:text-2xl font-black text-white">{doc.title}</h3>
                    <p className="mt-3 text-sm md:text-base leading-7 text-[#C8D2E0]">{doc.text}</p>
                    <a href={doc.img} target="_blank" rel="noopener noreferrer" className="mt-5 md:mt-6 inline-flex rounded-full border-2 border-white bg-white px-5 py-3 text-sm font-black text-[#0B1B33] transition hover:bg-transparent hover:text-white">Открыть документ</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {pageView === "production" && (
        <section className="relative min-h-screen px-4 md:px-6 py-16 md:py-24 bg-white">
          <div className="relative mx-auto max-w-[1600px]">
            <div className="flex flex-wrap gap-3 md:gap-4">
              <button type="button" onClick={goBack} className={buttonOutline}>← Вернуться назад</button>
            </div>
            <div className="mt-8 md:mt-12 max-w-5xl">
              <p className={labelLight}>Производство</p>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#0B1B33]">ООО «МИКО» — производственная компания</h1>
              <blockquote className="mt-8 md:mt-10 rounded-[1.5rem] md:rounded-[2rem] border-l-4 md:border-l-8 border-[#0B1B33] bg-[#F4F7FB] p-5 md:p-8 shadow-sm">
                <p className="text-lg md:text-2xl lg:text-3xl font-black italic leading-tight text-[#0B1B33]">«Мы производим не просто грузоподъёмное оборудование — мы создаём решения, от которых зависит безопасность и эффективность работы.»</p>
              </blockquote>
              <div className="mt-8 md:mt-10 space-y-4 md:space-y-6 text-base md:text-lg leading-7 md:leading-8 text-[#526174]">
                <p className="text-lg md:text-xl font-bold text-[#0B1B33]">ООО «МИКО» — производственная компания, специализирующаяся на изготовлении грузоподъёмного оборудования и комплектующих для промышленного применения.</p>
                <p>Мы создаём решения, рассчитанные на <b className="text-[#0B1B33]">реальные рабочие нагрузки</b>, <b className="text-[#0B1B33]">высокую интенсивность эксплуатации</b> и требования современного производства.</p>
                <p>Особое внимание уделяем <b className="text-[#0B1B33]">качеству материалов</b>, <b className="text-[#0B1B33]">точности изготовления</b> и <b className="text-[#0B1B33]">контролю каждого этапа производства</b>.</p>
              </div>
              <div className="mt-10 md:mt-12">
                <h2 className="text-2xl md:text-3xl font-black text-[#0B1B33]">Что мы производим</h2>
                <div className="mt-5 md:mt-6 grid gap-4 md:grid-cols-2">
                  {["Грузоподъёмные стропы различных конструкций", "Цепные, канатные и текстильные изделия", "Комплектующие и решения для подъёма грузов", "Контроль качества и соответствие требованиям безопасности"].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.25rem] md:rounded-[1.5rem] border border-[#0B1B33]/10 bg-[#F4F7FB] p-5 md:p-6 shadow-sm">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4A6FA5]" />
                      <span className="font-bold text-[#0B1B33] text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 md:mt-12">
                <h2 className="text-2xl md:text-3xl font-black text-[#0B1B33]">Как проходит заказ</h2>
                <div className="mt-5 md:mt-6 overflow-x-auto rounded-[1.5rem] md:rounded-[2rem] border border-[#0B1B33]/10 bg-white shadow-xl">
                  <table className="w-full min-w-[560px] text-left">
                    <thead className="bg-[#0B1B33] text-white">
                      <tr><th className="px-4 md:px-6 py-3 md:py-5 text-sm md:text-base font-black">Этап</th><th className="px-4 md:px-6 py-3 md:py-5 text-sm md:text-base font-black">Что происходит</th><th className="px-4 md:px-6 py-3 md:py-5 text-sm md:text-base font-black">Срок</th></tr>
                    </thead>
                    <tbody className="divide-y divide-[#0B1B33]/8">
                      {[["01", "Заявка и уточнение параметров", "15 минут"], ["02", "Подбор и расчёт стоимости", "1 час"], ["03", "Согласование и оплата", "1 день"], ["04", "Изготовление или комплектация", "1–7 дней"], ["05", "Отгрузка с документами", "1 день"]].map(([num, text, term]) => (
                        <tr key={num} className="hover:bg-[#F4F7FB]">
                          <td className="px-4 md:px-6 py-3 md:py-5 font-black text-[#4A6FA5] text-sm md:text-base">{num}</td>
                          <td className="px-4 md:px-6 py-3 md:py-5 font-bold text-[#0B1B33] text-sm md:text-base">{text}</td>
                          <td className="px-4 md:px-6 py-3 md:py-5 text-[#526174] text-sm md:text-base">{term}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-10 md:mt-12">
                <button type="button" onClick={openRequest} className={buttonOutline}>Оставить заявку на производство</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {pageView === "delivery" && (
        <section className="relative min-h-screen px-4 md:px-6 py-16 md:py-24 bg-white">
          <div className="relative mx-auto max-w-[1600px]">
            <div className="flex flex-wrap gap-3 md:gap-4">
              <button type="button" onClick={goBack} className={buttonOutline}>← Вернуться назад</button>
            </div>
            <div className="mt-8 md:mt-12 max-w-5xl">
              <p className={labelLight}>Доставка</p>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#0B1B33]">Доставка по Москве и всей России</h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-[#526174]">Организуем отгрузку продукции со склада в Москве, доставку по Московской области и отправку транспортными компаниями в регионы России.</p>
              <div className="mt-8 md:mt-10 overflow-x-auto rounded-[1.5rem] md:rounded-[2rem] border border-[#0B1B33]/10 bg-white shadow-xl">
                <table className="w-full min-w-[640px] text-left">
                  <thead className="bg-[#0B1B33] text-white">
                    <tr><th className="px-4 md:px-6 py-3 md:py-5 text-sm md:text-base font-black">Регион</th><th className="px-4 md:px-6 py-3 md:py-5 text-sm md:text-base font-black">Срок</th><th className="px-4 md:px-6 py-3 md:py-5 text-sm md:text-base font-black">Как осуществляется</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#0B1B33]/8">
                    {[["Москва", "1–2 дня", "Собственная доставка / курьер"], ["Московская область", "1–3 дня", "По километражу от МКАД"], ["Регионы РФ", "3–10 дней", "Деловые Линии, СДЭК, ПЭК и др."], ["Самовывоз", "в день оплаты", "Со склада: Москва, ул. Горбунова, 2с3"]].map(([a, b, c]) => (
                      <tr key={a} className="hover:bg-[#F4F7FB]">
                        <td className="px-4 md:px-6 py-3 md:py-5 font-black text-[#0B1B33] text-sm md:text-base">{a}</td>
                        <td className="px-4 md:px-6 py-3 md:py-5 text-[#526174] text-sm md:text-base">{b}</td>
                        <td className="px-4 md:px-6 py-3 md:py-5 text-[#526174] text-sm md:text-base">{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 md:mt-12 grid gap-4 md:gap-5 sm:grid-cols-2 md:grid-cols-3">
                {[
                  { title: "Своя упаковка", text: "Надёжно упаковываем каждый заказ" },
                  { title: "Проверенные ТК", text: "Работаем только с надёжными перевозчиками" },
                  { title: "Онлайн-поддержка", text: "Отслеживаем заказ и информируем вас" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] md:rounded-[1.75rem] border border-[#0B1B33]/10 bg-[#F4F7FB] p-5 md:p-6 shadow-sm">
                    <div className="text-lg md:text-xl font-black text-[#0B1B33]">{item.title}</div>
                    <div className="mt-2 text-[#526174] text-sm md:text-base">{item.text}</div>
                  </div>
                ))}
              </div>
              <p className="mt-8 md:mt-10 text-base md:text-lg leading-7 md:leading-8 text-[#526174]">Стоимость доставки рассчитывается индивидуально. Уточняйте у менеджера по телефону <b className="text-[#0B1B33]">{COMPANY.phone1}</b>.</p>
              <div className="mt-6 md:mt-8">
                <button type="button" onClick={openRequest} className={buttonOutline}>Оставить заявку на доставку</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1B33]/85 p-0 md:p-4 backdrop-blur-md">
          <div className="relative h-full md:h-auto max-h-full md:max-h-[92vh] w-full max-w-6xl overflow-y-auto md:rounded-[2.5rem] rounded-none bg-white shadow-2xl">
            <button type="button" onClick={() => setSelectedProduct(null)} className="absolute right-3 md:right-5 top-3 md:top-5 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#0B1B33] text-xl md:text-2xl font-black text-white transition hover:bg-[#102744]">×</button>
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative h-[min(60vh,360px)] md:h-96 lg:h-auto lg:min-h-[520px]">
                <ProductVisual product={selectedProduct} />
                {selectedProduct.type && (
                  <div className="absolute left-3 md:left-6 top-3 md:top-6 rounded-full bg-[#0B1B33] px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg">{selectedProduct.type}</div>
                )}
              </div>
              <div className="p-5 md:p-8 lg:p-12">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#0B1B33] px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-black text-white">{selectedProduct.kind}</span>
                  {selectedProduct.type && <span className="rounded-full border border-[#0B1B33]/15 bg-[#F4F7FB] px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-black text-[#0B1B33]">{selectedProduct.type}</span>}
                  {selectedProduct.load && <span className="rounded-full border border-[#4A6FA5]/30 bg-[#4A6FA5]/10 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-black text-[#0B1B33]">{selectedProduct.load}</span>}
                </div>
                <h3 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-[#0B1B33]">{selectedProduct.name}</h3>
                <p className="mt-3 md:mt-5 text-sm md:text-base lg:text-lg leading-7 md:leading-8 text-[#526174]">{selectedProduct.description}</p>

                <div className="mt-6 md:mt-8 flex items-end justify-between border-y border-[#0B1B33]/10 py-5 md:py-6">
                  <div>
                    <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.22em] text-[#526174]">Цена</div>
                    <div className="mt-1 md:mt-2 text-3xl md:text-4xl font-black text-[#0B1B33]">{selectedProduct.price > 0 ? `от ${selectedProduct.price.toLocaleString()} ₽` : "по запросу"}</div>
                  </div>
                  {selectedProduct.services && selectedProduct.services.length > 0 && (
                    <div className="text-right">
                      <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.22em] text-[#526174]">Доп. услуги</div>
                      <div className="mt-1 md:mt-2 text-2xl md:text-3xl font-black text-[#4A6FA5]">+{selectedProduct.services.length}</div>
                    </div>
                  )}
                </div>

                {selectedProduct.specs && (
                  <div className="mt-6 md:mt-8">
                    <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.22em] text-[#526174]">Характеристики</div>
                    <div className="mt-3 md:mt-4 grid gap-2 md:gap-3 md:grid-cols-2">
                      {selectedProduct.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-3 rounded-2xl bg-[#F4F7FB] px-4 md:px-5 py-3 md:py-4 font-bold text-[#0B1B33]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A6FA5]" />
                          <span className="text-xs md:text-sm">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.services && selectedProduct.services.length > 0 && (
                  <div className="mt-6 md:mt-8 rounded-[1.5rem] md:rounded-[2rem] bg-[#0B1B33] p-5 md:p-6 text-white">
                    <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.22em] text-white/60">Дополнительные услуги</div>
                    <div className="mt-4 md:mt-5 space-y-3">
                      {selectedProduct.services.map((service, i) => (
                        <div key={i} className="flex items-start justify-between gap-3 md:gap-5 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                          <span className="text-xs md:text-sm text-[#C8D2E0]">{service.name}</span>
                          <span className="shrink-0 text-xs md:text-sm font-black text-white">{service.price > 0 ? `+${service.price.toLocaleString()} ₽` : "по запросу"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 md:mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2">
                  <button type="button" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="rounded-full border-2 border-[#0B1B33] bg-white px-6 md:px-8 py-3 md:py-4 text-sm font-black text-[#0B1B33] transition hover:bg-[#0B1B33] hover:text-white">Добавить в корзину</button>
                  <button type="button" onClick={() => { setSelectedProduct(null); openRequest(); }} className="rounded-full bg-[#0B1B33] px-6 md:px-8 py-3 md:py-4 text-sm font-black text-white transition hover:bg-[#102744]">Получить расчёт</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1B33]/85 p-0 md:p-4 backdrop-blur-sm">
          <div className="relative h-full md:h-auto max-h-full md:max-h-[80vh] w-full max-w-2xl overflow-y-auto md:rounded-[2.5rem] rounded-none bg-white shadow-2xl">
            <button type="button" onClick={() => setIsCartOpen(false)} className="absolute right-3 md:right-5 top-3 md:top-5 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#0B1B33] text-xl md:text-2xl font-black text-white">×</button>
            <div className="p-5 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-[#0B1B33]">Корзина</h2>
              {cartItems.length === 0 ? (
                <p className="mt-6 md:mt-8 text-base md:text-lg text-[#526174]">В корзине пока нет товаров.</p>
              ) : (
                <>
                  <div className="mt-5 md:mt-6 divide-y divide-[#0B1B33]/10">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-start justify-between py-4 gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-[#0B1B33] text-sm md:text-base">{item.name}</div>
                          <div className="text-xs md:text-sm text-[#526174]">{item.load} · {item.length}</div>
                        </div>
                        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
                          <span className="font-black text-sm md:text-base">{item.price > 0 ? `${item.price.toLocaleString()} ₽` : "по запросу"}</span>
                          <button type="button" onClick={() => removeFromCart(index)} className="text-xs md:text-sm text-red-600 hover:text-red-800">Удалить</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 md:mt-6 flex justify-between border-t border-[#0B1B33]/10 pt-5 md:pt-6">
                    <span className="text-lg md:text-xl font-black">Итого:</span>
                    <span className="text-lg md:text-xl font-black">{cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()} ₽</span>
                  </div>
                  <div className="mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button type="button" onClick={handleCheckout} className="flex-1 rounded-full bg-[#0B1B33] px-6 py-3 md:py-4 text-center font-black text-white transition hover:bg-[#102744]">Оформить заказ</button>
                    <button type="button" onClick={() => setIsCartOpen(false)} className="min-w-0 flex-1 rounded-full border-2 border-[#0B1B33] px-6 py-3 md:py-4 font-black text-[#0B1B33] transition hover:bg-[#0B1B33] hover:text-white">Продолжить</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1B33]/85 p-0 md:p-4 backdrop-blur-sm">
          <div className="relative h-full md:h-auto max-h-full md:max-h-[90vh] w-full max-w-2xl overflow-y-auto md:rounded-[2.5rem] rounded-none bg-white shadow-2xl">
            <button type="button" onClick={() => setIsFilterModalOpen(false)} className="absolute right-3 md:right-5 top-3 md:top-5 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#0B1B33] text-xl md:text-2xl font-black text-white">×</button>
            <div className="p-5 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-[#0B1B33]">Фильтр товаров</h2>
              <div className="mt-5 md:mt-6 grid gap-4 md:gap-5">
                <label className="block">
                  <span className="font-black text-[#0B1B33] text-sm md:text-base">Группа товаров</span>
                  <select value={filterGroup} onChange={(e) => { setFilterGroup(e.target.value as typeof filterGroup); setFilterKind("all"); setFilterType(""); }} className="mt-2 w-full rounded-2xl border border-[#0B1B33]/20 bg-white px-4 md:px-5 py-3 md:py-4 text-[#0B1B33] outline-none">
                    <option value="all">Все</option><option value="slings">Стропы</option><option value="ropes">Буксировочные тросы</option><option value="other">Другое</option>
                  </select>
                </label>
                {filterGroup === "slings" && (
                  <>
                    <label className="block">
                      <span className="font-black text-[#0B1B33] text-sm md:text-base">Вид стропа</span>
                      <select value={filterKind} onChange={(e) => { setFilterKind(e.target.value); setFilterType(""); }} className="mt-2 w-full rounded-2xl border border-[#0B1B33]/20 bg-white px-4 md:px-5 py-3 md:py-4 text-[#0B1B33] outline-none">
                        <option value="all">Все</option><option value="Текстильные">Текстильные</option><option value="Канатные">Канатные</option><option value="Цепные">Цепные</option>
                      </select>
                    </label>
                    {filterKind !== "all" && (
                      <label className="block">
                        <span className="font-black text-[#0B1B33] text-sm md:text-base">Исполнение</span>
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#0B1B33]/20 bg-white px-4 md:px-5 py-3 md:py-4 text-[#0B1B33] outline-none">
                          <option value="">Все</option>
                          {filterKind === "Цепные" && (<><option value="4СЦ">4СЦ</option><option value="2СЦ">2СЦ</option><option value="1СЦ">1СЦ</option><option value="ВЦ">ВЦ</option></>)}
                          {filterKind === "Текстильные" && (<><option value="СТП">СТП</option><option value="СТКК/СТПК">СТКК/СТПК</option></>)}
                          {filterKind === "Канатные" && (<><option value="1СК">1СК</option><option value="4СК">4СК</option></>)}
                        </select>
                      </label>
                    )}
                  </>
                )}
                {filterGroup === "ropes" && (
                  <label className="block">
                    <span className="font-black text-[#0B1B33] text-sm md:text-base">Вид троса</span>
                    <select value={filterKind} onChange={(e) => setFilterKind(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#0B1B33]/20 bg-white px-4 md:px-5 py-3 md:py-4 text-[#0B1B33] outline-none">
                      <option value="all">Все</option><option value="Автомобильные ленточные">Автомобильные ленточные</option><option value="Стальные">Стальные</option><option value="Круглопрядные">Круглопрядные</option><option value="Динамические">Динамические</option>
                    </select>
                  </label>
                )}
                <label className="block">
                  <span className="font-black text-[#0B1B33] text-sm md:text-base">Грузоподъёмность</span>
                  <select value={filterLoad} onChange={(e) => setFilterLoad(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#0B1B33]/20 bg-white px-4 md:px-5 py-3 md:py-4 text-[#0B1B33] outline-none">
                    <option value="">Любая</option><option value="1,0 т">1,0 т</option><option value="1,6 т">1,6 т</option><option value="2,0 т">2,0 т</option><option value="2,5 т">2,5 т</option><option value="3,15 т">3,15 т</option><option value="4,3 т">4,3 т</option><option value="5,3 т">5,3 т</option><option value="6,7 т">6,7 т</option><option value="8,0 т">8,0 т</option><option value="11,2 т">11,2 т</option><option value="12,5 т">12,5 т</option><option value="17,0 т">17,0 т</option><option value="26,5 т">26,5 т</option>
                  </select>
                </label>
                <label className="block">
                  <span className="font-black text-[#0B1B33] text-sm md:text-base">Длина</span>
                  <select value={filterLength} onChange={(e) => setFilterLength(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#0B1B33]/20 bg-white px-4 md:px-5 py-3 md:py-4 text-[#0B1B33] outline-none">
                    <option value="">Любая</option><option value="1 м">1 м</option><option value="2 м">2 м</option><option value="3 м">3 м</option><option value="4 м">4 м</option><option value="5 м">5 м</option><option value="6 м">6 м</option><option value="7 м">7 м</option><option value="8 м">8 м</option>
                  </select>
                </label>
              </div>
              <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4">
                <button type="button" onClick={applyFilter} className="rounded-full bg-[#0B1B33] px-6 md:px-8 py-3 md:py-4 font-black text-white transition hover:bg-[#102744]">Применить</button>
                <button type="button" onClick={resetFilter} className="rounded-full border-2 border-[#0B1B33] bg-white px-6 md:px-8 py-3 md:py-4 font-black text-[#0B1B33] transition hover:bg-[#0B1B33] hover:text-white">Сбросить</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50">
        <button type="button" onClick={() => setIsAssistantOpen(!isAssistantOpen)} className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#0B1B33] text-2xl md:text-3xl text-white shadow-2xl transition hover:scale-105 hover:bg-[#102744]" aria-label="ИИ-ассистент">💬</button>
      </div>

      {isAssistantOpen && (
        <div className={`${styles.assistant} fixed bottom-36 md:bottom-44 left-3 right-3 md:left-auto md:right-6 z-50 flex md:w-[460px] max-w-[calc(100vw-1.5rem)] md:max-w-[calc(100vw-3rem)] flex-col rounded-3xl bg-white shadow-2xl border border-[#0B1B33]/10 max-h-[70vh] md:max-h-none`}>
          <div className="flex items-center justify-between border-b border-[#0B1B33]/10 p-4 md:p-5">
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl">🤖</span>
              <div>
                <div className="font-black text-[#0B1B33] text-base md:text-lg">ИИ-ассистент</div>
                <div className="text-[10px] md:text-xs text-[#0B1B33]/60">Понимаю разные формулировки</div>
              </div>
            </div>
            <button type="button" onClick={() => setIsAssistantOpen(false)} className="text-xl text-[#0B1B33]">✕</button>
          </div>
          <div className="max-h-[40vh] md:max-h-[420px] min-h-[120px] md:min-h-[160px] overflow-y-auto p-4 md:p-5">
            {assistantHistory.length === 0 && !assistantAnswer && (
              <div className="rounded-2xl bg-[#F4F7FB] p-4 text-sm md:text-base leading-relaxed text-[#0B1B33]">Здравствуйте! Опишите вашу задачу или задайте вопрос о продукции, доставке, документах или ценах.</div>
            )}
            {assistantHistory.map((msg, i) => (
              <div key={i} className="mb-3 space-y-2">
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl bg-[#0B1B33] px-3 md:px-4 py-2 text-xs md:text-sm text-white">{msg.q}</div>
                <div className="w-fit max-w-[90%] rounded-2xl bg-[#F4F7FB] px-3 md:px-4 py-3 text-xs md:text-sm leading-relaxed text-[#0B1B33] whitespace-pre-line">{msg.a}</div>
              </div>
            ))}
            {assistantContactSaved && (<div className="mt-2 rounded-lg bg-green-50 p-3 text-xs md:text-sm text-green-800">Контакт сохранён, менеджер свяжется с вами.</div>)}
          </div>

          {assistantNeedsHelp && (
            <form onSubmit={handleAssistantSubmit} className="border-t border-[#0B1B33]/10 bg-[#FAFAF7] p-4 md:p-5">
              <div className="text-xs md:text-sm font-black text-[#0B1B33]">Отправить вопрос менеджеру</div>
              {assistantSendStatus === "ok" ? (
                <div className="mt-3 rounded-xl bg-green-50 p-3 md:p-4 text-xs md:text-sm text-green-800">Спасибо! Вопрос отправлен.</div>
              ) : (
                <>
                  <div className="mt-3 grid gap-2 md:gap-3">
                    <input required value={assistantForm.name} onChange={(e) => setAssistantForm({ ...assistantForm, name: e.target.value })} placeholder="Ваше имя" className="rounded-xl border border-[#0B1B33]/20 bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm text-[#0B1B33] outline-none focus:border-[#0B1B33]" />
                    <input required value={assistantForm.contact} onChange={(e) => setAssistantForm({ ...assistantForm, contact: e.target.value })} placeholder="Телефон или email" className="rounded-xl border border-[#0B1B33]/20 bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm text-[#0B1B33] outline-none focus:border-[#0B1B33]" />
                    <textarea required rows={2} value={assistantForm.question} onChange={(e) => setAssistantForm({ ...assistantForm, question: e.target.value })} placeholder="Уточните ваш вопрос" className="rounded-xl border border-[#0B1B33]/20 bg-white px-3 md:px-4 py-2.5 md:py-3 text-sm text-[#0B1B33] outline-none focus:border-[#0B1B33]" />
                  </div>
                  <button type="submit" disabled={assistantSendStatus === "sending"} className="mt-3 w-full rounded-full bg-[#0B1B33] px-5 py-2.5 md:py-3 text-sm font-black text-white transition hover:bg-[#102744] disabled:opacity-60">
                    {assistantSendStatus === "sending" ? "Отправляем..." : "Отправить вопрос"}
                  </button>
                </>
              )}
            </form>
          )}

          <div className="border-t border-[#0B1B33]/10 p-3 md:p-4">
            <div className="flex gap-2">
              <input type="text" value={assistantQuestion} onChange={(e) => setAssistantQuestion(e.target.value)} placeholder="Задайте вопрос..." className="min-w-0 flex-1 rounded-full border border-[#0B1B33]/20 px-4 md:px-5 py-2.5 md:py-3 text-sm outline-none focus:border-[#0B1B33]" onKeyDown={(e) => e.key === "Enter" && handleAskAssistant()} />
              <button type="button" onClick={handleAskAssistant} className="rounded-full bg-[#0B1B33] px-4 md:px-5 py-2.5 md:py-3 text-sm font-black text-white transition hover:bg-[#102744]">➤</button>
            </div>
            <div className="mt-2 md:mt-3 flex flex-wrap gap-1.5 md:gap-2">
              {["Цены", "Доставка", "Сертификаты", "Стропы", "Помощь"].map((hint) => (
                <button key={hint} type="button" onClick={() => { setAssistantQuestion(hint); setTimeout(() => handleAskAssistant(), 50); }} className="rounded-full bg-[#0B1B33]/10 px-3 py-1.5 text-xs font-bold text-[#0B1B33] transition hover:bg-[#0B1B33] hover:text-white">{hint}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-[#0B1B33]/10 bg-gradient-to-b from-white to-[#F4F7FB] px-4 md:px-6 pb-32 md:pb-32 pt-10 md:pt-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-2xl md:text-3xl font-black text-[#0B1B33]">ООО «МИКО»</div>
              <div className="mt-2 text-[10px] font-black uppercase tracking-[0.32em] text-[#0B1B33]/60">STROPS</div>
              <p className="mt-4 md:mt-6 text-sm md:text-base leading-7 text-[#526174]">Производство и поставка грузоподъёмного оборудования, стропов, канатов и такелажа. Работаем с 2013 года.</p>
            </div>

            <div>
              <div className="text-xs md:text-sm font-black uppercase tracking-[0.22em] text-[#0B1B33]/60">Контакты</div>
              <div className="mt-4 md:mt-5 space-y-2 text-[#0B1B33] text-sm md:text-base">
                <a href={`tel:${COMPANY.phone1.replace(/[^\d+]/g, "")}`} className="block font-bold transition hover:text-[#4A6FA5]">{COMPANY.phone1}</a>
                <a href={`tel:${COMPANY.phone2.replace(/[^\d+]/g, "")}`} className="block font-bold transition hover:text-[#4A6FA5]">{COMPANY.phone2}</a>
                <a href={`mailto:${COMPANY.email}`} className="block font-bold transition hover:text-[#4A6FA5]">{COMPANY.email}</a>
              </div>
            </div>

            <div>
              <div className="text-xs md:text-sm font-black uppercase tracking-[0.22em] text-[#0B1B33]/60">Адреса</div>
              <div className="mt-4 md:mt-5 space-y-4 md:space-y-5 text-[#0B1B33]">
                <div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#4A6FA5]">Физический адрес</div>
                  <div className="mt-1.5 md:mt-2 text-xs md:text-sm leading-6 text-[#526174]">БЦ «Гранд Сетунь Плаза»,<br />Москва, улица Горбунова, 2с3,<br />офис А-214, 2 этаж, 121596</div>
                </div>
                <div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#4A6FA5]">Юридический адрес</div>
                  <div className="mt-1.5 md:mt-2 text-xs md:text-sm leading-6 text-[#526174]">Калужская обл., г. Обнинск,<br />Киевское шоссе, 99 км (промзона)</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs md:text-sm font-black uppercase tracking-[0.22em] text-[#0B1B33]/60">Реквизиты</div>
              <div className="mt-4 md:mt-5 space-y-1.5 md:space-y-2 text-xs md:text-sm text-[#526174]">
                <div><span className="font-black text-[#0B1B33]">ИНН:</span> {COMPANY.inn}</div>
                <div><span className="font-black text-[#0B1B33]">КПП:</span> {COMPANY.kpp}</div>
                <div><span className="font-black text-[#0B1B33]">ОГРН:</span> {COMPANY.ogrn}</div>
                <div className="pt-1.5 md:pt-2"><span className="font-black text-[#0B1B33]">Р/с:</span> {COMPANY.account}</div>
                <div><span className="font-black text-[#0B1B33]">Банк:</span> {COMPANY.bank}</div>
                <div><span className="font-black text-[#0B1B33]">БИК:</span> {COMPANY.bik}</div>
                <div><span className="font-black text-[#0B1B33]">К/с:</span> {COMPANY.corrAccount}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-14 border-t border-[#0B1B33]/10 pt-5 md:pt-6 text-center text-[10px] md:text-xs text-[#526174]/70">
            © {new Date().getFullYear()} ООО «МИКО». Все права защищены.
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 md:bottom-6 left-1/2 z-40 hidden md:flex -translate-x-1/2 rounded-full border border-[#0B1B33]/10 bg-white/95 p-2 shadow-2xl backdrop-blur-xl">
        <a href={`tel:${COMPANY.phone1.replace(/[^\d+]/g, "")}`} className="rounded-full px-5 lg:px-7 py-3 lg:py-4 text-sm lg:text-base font-black text-[#0B1B33] transition hover:bg-[#F4F7FB]">Позвонить</a>
        <a href="https://max.ru/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0B1B33] px-5 lg:px-7 py-3 lg:py-4 text-sm lg:text-base font-black text-white transition hover:bg-[#102744]">MAX</a>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <HomeContent />
    </Suspense>
  );
}
