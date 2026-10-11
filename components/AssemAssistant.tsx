"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

type Message = { role: "user" | "assistant"; content: string };

function answerWithProjectLinks(content: string) {
  const markdownLink = /\[([^\]]+)\]\((\/projects\/[a-z0-9-]+)\)/g;
  const rawPath = /(\/projects\/[a-z0-9-]+)/g;
  const normalized = content.replace(markdownLink, "$1 $2");
  const chunks = normalized.split(rawPath);
  return chunks.map((chunk, index) => /^\/projects\/[a-z0-9-]+$/.test(chunk)
    ? <Link className="assem-assistant-inline-link" href={chunk} key={`${chunk}-${index}`}>{chunk.replace("/projects/", "")} ↗</Link>
    : <span key={index}>{chunk}</span>);
}

export function AssemAssistant() {
  const { language } = useLanguage();
  const ar = language === "ar";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  const welcome = ar
    ? "أهلًا، أنا مساعد موقع عاصم. أقدر أعرّفك بمجالات العمل والدراسات الموجودة هنا، أو أساعدك تجهّز ملخص مشروع. بعض الأعمال المعروضة دراسات افتراضية وليست أعمال عملاء مؤكدة."
    : "Hello, I’m Assem’s portfolio assistant. I can explain the disciplines and studies shown here, or help you shape a project brief. Some featured work is fictional concept study, not verified client work.";

  const send = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || (ar ? "تعذر الرد الآن." : "Unable to respond right now."));
      setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : (ar ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Please try again."));
    } finally { setBusy(false); }
  };

  return (
    <div className={`assem-assistant ${open ? "is-open" : ""}`} dir={ar ? "rtl" : "ltr"}>
      {open && <section className="assem-assistant-panel" aria-label={ar ? "مساعد عاصم" : "Assem assistant"} aria-live="polite">
        <header className="assem-assistant-header">
          <span className="assem-assistant-avatar" aria-hidden="true">MA</span>
          <div><strong>{ar ? "مساعد عاصم" : "ASK ASSEM"}</strong><small><i />{ar ? "مساعد الأعمال والمحفظة" : "PORTFOLIO CONCIERGE"}</small></div>
          <button type="button" className="assem-assistant-close" onClick={() => setOpen(false)} aria-label={ar ? "إغلاق المساعد" : "Close assistant"}>×</button>
        </header>
        <div className="assem-assistant-messages" ref={listRef}>
          <div className="assem-assistant-message assistant-message">{welcome}</div>
          {messages.map((message, index) => <div key={index} className={`assem-assistant-message ${message.role === "user" ? "user-message" : "assistant-message"}`}>{message.role === "assistant" ? answerWithProjectLinks(message.content) : message.content}</div>)}
          {busy && <div className="assem-assistant-typing" aria-label={ar ? "جارٍ التفكير" : "Thinking"}><i/><i/><i/></div>}
          {error && <p className="assem-assistant-error" role="alert">{error}</p>}
        </div>
        <form className="assem-assistant-form" onSubmit={send}>
          <input ref={inputRef} value={input} maxLength={1800} onChange={(event) => setInput(event.target.value)} placeholder={ar ? "اسأل عن الأعمال أو احكِ عن مشروعك…" : "Ask about the work or share a brief…"} aria-label={ar ? "رسالتك" : "Your message"} disabled={busy} />
          <button type="submit" disabled={busy || !input.trim()} aria-label={ar ? "إرسال" : "Send"}>↗</button>
        </form>
        <p className="assem-assistant-footnote">{ar ? "يعتمد على المعلومات المعتمدة في الموقع فقط." : "Answers are grounded in approved portfolio content."}</p>
      </section>}
      <button type="button" className="assem-assistant-launcher" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? (ar ? "إغلاق المساعد" : "Close assistant") : (ar ? "اسأل مساعد عاصم" : "Ask Assem assistant")}>
        <span className="assem-assistant-launcher-mark">{open ? "×" : "MA"}</span><span>{open ? (ar ? "إغلاق" : "CLOSE") : (ar ? "اسأل عاصم" : "ASK ASSEM")}</span>
      </button>
    </div>
  );
}
