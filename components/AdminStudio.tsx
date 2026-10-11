"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import type { HomeProjectFixture } from "@/data/homepage-fixture";

type ProjectContent = { ar: HomeProjectFixture[]; en: HomeProjectFixture[] };
type EditableField = "title" | "client" | "category" | "format" | "role" | "summary" | "conceptLabel" | "visualTitle" | "visualSubline" | "year" | "poster";

const fields: { key: EditableField; label: string; multiline?: boolean }[] = [
  { key: "title", label: "Project title / عنوان المشروع" },
  { key: "client", label: "Client or concept label / العميل أو نوع الدراسة" },
  { key: "category", label: "Category / التصنيف" },
  { key: "format", label: "Format / صيغة العمل" },
  { key: "role", label: "Role / الدور" },
  { key: "summary", label: "Summary / الوصف", multiline: true },
  { key: "conceptLabel", label: "Concept label / وسم الدراسة" },
  { key: "visualTitle", label: "Artwork title / عنوان العمل البصري" },
  { key: "visualSubline", label: "Artwork subtitle / العنوان الفرعي" },
  { key: "year", label: "Index label / رقم الدراسة" },
  { key: "poster", label: "Poster artwork / الصورة المستخدمة" },
];

export function AdminStudio() {
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [content, setContent] = useState<ProjectContent | null>(null);
  const [language, setLanguage] = useState<"ar" | "en">("en");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [branch, setBranch] = useState("main");

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/projects", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) { setSignedIn(false); setError(""); return; }
        throw new Error(data.error || "Could not load project content.");
      }
      setContent(data.content as ProjectContent);
      setBranch(data.branch || "main");
      setSignedIn(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load project content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => { void loadContent(); });
    return () => window.cancelAnimationFrame(frame);
  }, [loadContent]);

  const updateField = (projectId: string, field: EditableField, value: string) => {
    setContent((current) => {
      if (!current) return current;
      return {
        ...current,
        [language]: current[language].map((project) => project.id === projectId ? { ...project, [field]: value } : project),
      };
    });
    setMessage("");
  };

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sign-in failed.");
      setPassword("");
      await loadContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally { setBusy(false); }
  };

  const addProject = () => {
    setContent((current) => {
      if (!current) return current;
      const id = `concept-${Date.now().toString(36)}`;
      const number = String(current.en.length + 1).padStart(2, "0");
      const base: HomeProjectFixture = {
        id, number, title: "عنوان الدراسة الجديدة", client: "دراسة مفاهيمية · افتراضية",
        category: "تصنيف العمل", format: "صيغة العمل", role: "الدور الإبداعي",
        summary: "أضف وصفًا واضحًا للفكرة والاتجاه البصري في هذه الدراسة.",
        conceptLabel: "دراسة مفاهيمية", tone: "ember", poster: "/images/concept-after-light.svg",
        visualTitle: "NEW CONCEPT", visualSubline: "ART DIRECTION STUDY", year: `CONCEPT / ${number}`,
      };
      const english: HomeProjectFixture = {
        ...base, title: "New concept study", client: "Concept study · Fictional",
        category: "Project category", format: "Project format", role: "Creative role",
        summary: "Describe the premise, intended feeling and visual direction of this study.",
        conceptLabel: "CONCEPT STUDY",
      };
      return { ar: [...current.ar, base], en: [...current.en, english] };
    });
    setMessage("");
    setError("");
  };

  const removeProject = (projectId: string, title: string) => {
    if (!window.confirm(`Remove "${title}" from both languages? Publishing is required to make this permanent.`)) return;
    setContent((current) => current ? ({
      ar: current.ar.filter((project) => project.id !== projectId),
      en: current.en.filter((project) => project.id !== projectId),
    }) : current);
    setMessage("");
  };

  const publish = async () => {
    if (!content) return;
    if (!window.confirm("Publish these bilingual project changes to the configured Git branch? This creates a Git commit and may trigger a deployment.")) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/projects", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Publish failed.");
      setMessage(`Published to ${data.branch || branch}. The deployment may take a few minutes to update.`);
      if (data.commit) setMessage(`Published to ${data.branch || branch}. Commit: ${data.commit}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed.");
    } finally { setBusy(false); }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setSignedIn(false); setContent(null); setMessage(""); setError("");
  };

  const currentProjects = useMemo(() => content?.[language] || [], [content, language]);

  if (loading) return <main className="admin-shell"><p className="admin-status">Loading studio…</p></main>;

  if (!signedIn) return (
    <main className="admin-shell">
      <section className="admin-login">
        <Link href="/" className="admin-wordmark">MA <span>PORTFOLIO STUDIO</span></Link>
        <p className="admin-eyebrow">PRIVATE WORKSPACE / 01</p>
        <h1>Content, <em>in your hands.</em></h1>
        <p className="admin-intro">Sign in to edit the bilingual project studies. Publishing writes a versioned commit to the configured Git branch.</p>
        <form onSubmit={login} className="admin-login-form">
          <label htmlFor="admin-password">Admin password</label>
          <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button type="submit" disabled={busy}>{busy ? "Signing in…" : "Enter studio ↗"}</button>
        </form>
        {error && <p className="admin-alert admin-alert-error" role="alert">{error}</p>}
        <Link className="admin-back-link" href="/">← Back to portfolio</Link>
      </section>
    </main>
  );

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <Link href="/" className="admin-wordmark">MA <span>PORTFOLIO STUDIO</span></Link>
        <div><span className="admin-branch-label">PUBLISH BRANCH / {branch}</span><button className="admin-quiet-button" type="button" onClick={logout}>Sign out</button></div>
      </header>
      <section className="admin-workspace">
        <div className="admin-workspace-heading">
          <div><p className="admin-eyebrow">CONTENT MANAGEMENT / PROJECTS</p><h1>Project <em>editor.</em></h1><p>Edit copy in both languages, then publish a versioned update.</p></div>
          <div className="admin-heading-actions"><button type="button" className="admin-add-button" onClick={addProject} disabled={!content || currentProjects.length >= 20}>+ Add project</button><button type="button" className="admin-publish-button" onClick={publish} disabled={busy || !content}>{busy ? "Publishing…" : "Publish changes ↗"}</button></div>
        </div>
        <div className="admin-toolbar">
          <div className="admin-language-switch" role="group" aria-label="Content language">
            <button type="button" className={language === "en" ? "is-selected" : ""} onClick={() => setLanguage("en")}>English / LTR</button>
            <button type="button" className={language === "ar" ? "is-selected" : ""} onClick={() => setLanguage("ar")}>العربية / RTL</button>
          </div>
          <span>{currentProjects.length} projects · {language.toUpperCase()}</span>
        </div>
        {error && <p className="admin-alert admin-alert-error" role="alert">{error}</p>}
        {message && <p className="admin-alert admin-alert-success" role="status">{message}</p>}
        <div className="admin-project-list" dir={language === "ar" ? "rtl" : "ltr"}>
          {currentProjects.map((project, index) => (
            <details className="admin-project-editor" key={project.id} open={index === 0}>
              <summary><span className="admin-project-number">{project.number}</span><span className="admin-project-title">{project.title}</span><span className="admin-project-slug">/{project.id}</span><span className="admin-expand">+</span></summary>
              <div className="admin-editor-fields">
                {fields.map((field) => <label className={field.multiline ? "admin-field admin-field-wide" : "admin-field"} key={field.key}>
                  <span>{field.label}</span>
                  {field.multiline
                    ? <textarea rows={3} maxLength={2400} value={project[field.key]} onChange={(event) => updateField(project.id, field.key, event.target.value)} />
                    : field.key === "poster"
                      ? <select value={project.poster} onChange={(event) => updateField(project.id, "poster", event.target.value)}><option value="/images/concept-after-light.svg">After the Last Light — ember</option><option value="/images/concept-form-motion.svg">Form in Motion — gold</option><option value="/images/concept-human-frequency.svg">Human Frequency — steel</option><option value="/images/concept-signal-story.svg">Signal to Story — paper</option></select>
                      : <input maxLength={2400} value={project[field.key]} onChange={(event) => updateField(project.id, field.key, event.target.value)} />}
                </label>)}
                <div className="admin-readonly"><span>SLUG / {project.id}</span><span>POSTER / {project.poster}</span><Link href={`/projects/${project.id}`} target="_blank">Preview case study ↗</Link><button type="button" className="admin-remove-button" onClick={() => removeProject(project.id, project.title)}>Remove project</button></div>
              </div>
            </details>
          ))}
        </div>
        <footer className="admin-footer"><span>MA / VISUAL DIRECTION</span><span>Drafts stay in this browser until published.</span><button type="button" onClick={publish} disabled={busy || !content}>Publish changes ↗</button></footer>
      </section>
    </main>
  );
}
