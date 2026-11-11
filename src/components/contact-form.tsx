 "use client";
import { useState } from "react";
export default function ContactForm({ locale }: { locale: "en" | "ar" }) {
  const ar = locale === "ar"; const [status,setStatus] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const formElement = e.currentTarget; setStatus(ar ? "جارٍ الإرسال..." : "Sending...");
    const form = new FormData(formElement);
    const response = await fetch("/api/contact", { method:"POST", body: JSON.stringify(Object.fromEntries(form)), headers:{"Content-Type":"application/json"} });
    setStatus(response.ok ? (ar ? "تم إرسال رسالتك بنجاح." : "Your message was sent.") : (ar ? "تعذر الإرسال. حاول مرة أخرى." : "Could not send. Please try again."));
    if(response.ok) formElement.reset();
  }
  return <form onSubmit={submit} className="grid gap-3">
    <input className="field" name="name" required placeholder={ar ? "الاسم" : "Your name"} />
    <input className="field" name="email" type="email" required placeholder={ar ? "البريد الإلكتروني" : "Email address"} />
    <textarea className="field min-h-32" name="message" required placeholder={ar ? "أخبرني عن مشروعك" : "Tell me about your project"} />
    <button className="btn w-fit" type="submit">{ar ? "إرسال الرسالة ↗" : "Send message ↗"}</button>
    <p className="text-sm text-[var(--muted)]" aria-live="polite">{status}</p>
  </form>;
}