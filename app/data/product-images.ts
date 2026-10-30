import type { Product } from './product';
export function webbingColor(load?:string) {
  const n=Number.parseFloat((load||'').replace(',','.'));
  return ({0.5:'violet',1:'violet',2:'green',3:'yellow',4:'gray',5:'red',6:'brown',8:'blue'} as Record<number,string>)[n]||'orange';
}
export function studioAsset(p:Product, execution='СТКК') {
  if (p.type === 'СТП') return 'webbing-'+webbingColor(p.load);
  const assets:Record<string,string>={ 'ВЦ':'chain-vc','Цепь крепления':'lashing-chain','Цепь + талреп':'lashing-kit','Талреп цепной':'chain-binder','Стяжной ремень':'ratchet-strap','Спансет стальной':'span-steel','Скоба 2130 СИ гайка':'shackle-2130','Зажим усиленный 1142':'clamp-1142','Зажим хозяйственный 741':'clamp-741','Талреп вилка-вилка':'turnbuckle-fork','ТБЛп':'tow-webbing','ТБСДп':'tow-dynamic','ТБСп':'tow-steel' };
  if(p.type && assets[p.type]) return assets[p.type];
  if (p.type === '4СЦ') return 'chain-4sc';
  if (p.type === '2СЦ') return 'chain-2sc';
  if (p.type === '1СЦ') return 'chain-1sc';
  if (p.type === 'УСК1 (СКП)') return 'wire-usk1';
  if (p.type === '4СК') return 'wire-4sk';
  if (p.type === 'СТКК/СТПК') return execution === 'СТПК' ? 'round-stpk' : 'round-stkk';
  if (p.type === 'Спансет текстильный') return 'span-black';
  if (p.type === 'Скоба 209 СИ резьба') return 'shackle-209';
  return null;
}
export function productImage(p:Product) { const asset=studioAsset(p); return asset ? `/products/studio/${asset}.webp` : p.image; }
