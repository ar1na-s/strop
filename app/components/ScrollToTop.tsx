"use client";
import { useEffect, useState } from "react";
export default function ScrollToTop({ hidden }: { hidden: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > Math.max(500, window.innerHeight));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  if (!visible || hidden) return null;
  return <button type="button" aria-label="Наверх" title="Вернуться наверх" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })} className="fixed bottom-6 left-4 md:left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#0B1B33] text-white shadow-xl hover:bg-[#244868] focus-visible:outline-4 focus-visible:outline-blue-400"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 12 6-6 6 6M12 6v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>;
}
