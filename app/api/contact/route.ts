import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const body = await req.json();

    const { message } = body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Новая заявка с сайта ТТК-Билдинг",
        text: message,
    });

    return Response.json({ success: true });
}
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
    const filePath = path.join(process.cwd(), "app/data/leads.json");
    const data = fs.readFileSync(filePath, "utf-8");

    return NextResponse.json(JSON.parse(data));
}