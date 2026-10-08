import nodemailer from "nodemailer";

export async function POST(req: Request) {
    let body: Record<string, unknown>;
    try {
        const data: unknown = await req.json();
        if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid body");
        body = data as Record<string, unknown>;
    } catch {
        return Response.json({ ok: false, error: "Некорректный формат заявки." }, { status: 400 });
    }
    const field = (key: string) => typeof body[key] === "string" ? body[key].trim().slice(0, 10000) : "";
    if (!field("name") || !(field("phone") || field("contact") || field("email"))) {
        return Response.json({ ok: false, error: "Укажите имя и контакт для обратной связи." }, { status: 400 });
    }
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return Response.json({ ok: false, error: "Отправка заявок временно недоступна. Позвоните +7 (926) 629-35-34 или напишите info@strop.su." }, { status: 503 });
    }
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Новая заявка с сайта МПК",
            text: [
                `Имя: ${field("name")}`, `Телефон: ${field("phone")}`,
                `Контакт: ${field("contact")}`, `E-mail: ${field("email")}`,
                `Компания: ${field("company")}`, field("message"), field("question"),
                field("last_question"), field("dialog"),
            ].filter(Boolean).join("\n"),
        });
        return Response.json({ ok: true, success: true });
    } catch {
        return Response.json({ ok: false, error: "Не удалось отправить заявку. Свяжитесь с нами по телефону +7 (926) 629-35-34." }, { status: 502 });
    }
}
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
    const filePath = path.join(process.cwd(), "app/data/leads.json");
    const data = fs.readFileSync(filePath, "utf-8");

    return NextResponse.json(JSON.parse(data));
}
