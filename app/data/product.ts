export type Product = {
  slug?: string;
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
  variants?: { length: string; price: number }[];
  dimensions?: { width?: string; linkLength?: string; hookH?: string; hookP?: string; diameter?: string };
  source?: { sheet: string; range: string };
  clarification?: string;
  selectedServices?: { name: string; price: number; quantity: number }[];
  basePrice?: number;
  requiresQuote?: boolean;
};

export function configureProduct(product: Product, index: number, quantities: Record<string, number>): Product {
  const variant = product.variants?.[index];
  const basePrice = variant?.price ?? product.price;
  const selectedServices = (product.services || []).flatMap(service => {
    const raw = quantities[service.name] || 0;
    const quantity = Number.isFinite(raw) ? Math.max(0, Math.min(100, Math.floor(raw))) : 0;
    return quantity ? [{ ...service, quantity }] : [];
  });
  // Length extensions require an engineering confirmation. Tabular length prices
  // remain authoritative; a service price must never replace a tabular price.
  const requiresQuote = basePrice <= 0 || !!product.clarification || selectedServices.some(s => s.price <= 0 || s.name === "Дополнительный метр");
  return { ...product, length: variant?.length ?? product.length, basePrice, selectedServices, requiresQuote,
    price: basePrice + selectedServices.reduce((sum, s) => sum + s.price * s.quantity, 0) };
}

export function describeConfiguration(product: Product): string {
  const services = product.selectedServices?.map(s => `${s.name} × ${s.quantity} (${s.price > 0 ? (s.price * s.quantity).toLocaleString("ru-RU") + " ₽" : "по запросу"})`).join("; ");
  return `${product.name}${product.length ? ", длина " + product.length : ""}${services ? ". Дополнения: " + services : ""}. ${product.price > 0 ? (product.requiresQuote ? "Известная часть стоимости: " : "Итого: ") + product.price.toLocaleString("ru-RU") + " ₽" : "Цена по запросу"}${product.requiresQuote ? "; требуется подтверждение расчёта" : ""}`;
}
