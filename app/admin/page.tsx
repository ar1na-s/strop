"use client";

import { useEffect, useState } from "react";

type Lead = {
    message: string;
    date: string;
    status?: string;
};

export default function Admin() {
    const [leads, setLeads] = useState<Lead[]>([]);

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) window.location.href = "/admin/login";

        fetch("/api/leads")
            .then((r) => r.json())
            .then(setLeads);
    }, []);

    const updateStatus = async (index: number, status: string) => {
        await fetch("/api/leads/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index, status }),
        });

        location.reload();
    };

    const deleteLead = async (index: number) => {
        await fetch("/api/leads/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index }),
        });

        location.reload();
    };

    return (
        <main className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-black">Админка</h1>

            <div className="mt-10 space-y-4">
                {leads.map((lead, i) => (
                    <div key={i} className="border p-4 rounded-xl">
                        <div className="text-sm text-slate-500">
                            {lead.date}
                        </div>

                        <div className="mt-2">{lead.message}</div>

                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={() => updateStatus(i, "new")}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                Новая
                            </button>

                            <button
                                onClick={() => updateStatus(i, "done")}
                                className="px-3 py-1 bg-green-200 rounded"
                            >
                                Обработано
                            </button>

                            <button
                                onClick={() => deleteLead(i)}
                                className="px-3 py-1 bg-red-200 rounded"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}