import type { Metadata } from "next";
import { COMPANY } from "./company";
export const SITE_URL = "https://strop.su";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title: `${title} | МПК`, description, alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: COMPANY.full, type: "website", locale: "ru_RU", images: [{ url: "/logo.png", alt: COMPANY.full }] } };
}
export function jsonLd(data: unknown) { return JSON.stringify(data).replace(/</g, "\\u003c"); }
