import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { index, status } = await req.json();

    const filePath = path.join(process.cwd(), "app/data/leads.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    data[index].status = status;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ ok: true });
}