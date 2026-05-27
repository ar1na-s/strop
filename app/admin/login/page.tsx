"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (password === "1234") {
            localStorage.setItem("admin", "true");
            router.push("/admin");
        } else {
            alert("Неверный пароль");
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="p-6 border rounded-xl w-80">
                <h1 className="text-xl font-bold">Админ вход</h1>

                <input
                    className="border w-full mt-4 p-2"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="mt-4 bg-blue-600 text-white w-full py-2 rounded"
                >
                    Войти
                </button>
            </div>
        </main>
    );
}