import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";


const CONTENT_PATH = "data/project-content.json";
const REPOSITORY = process.env.GITHUB_REPOSITORY || "Abdo1629/assem-portfolio-web";
const BRANCH = process.env.ADMIN_CONTENT_BRANCH || "main";
const API_ROOT = "https://api.github.com";

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function githubRequest(path: string, init: RequestInit = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured.");
  const response = await fetch(`${API_ROOT}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof payload?.message === "string" ? payload.message : "GitHub request failed.";
    throw new Error(`${message} (HTTP ${response.status})`);
  }
  return payload;
}

function validateProjects(value: unknown): value is { ar: Record<string, unknown>[]; en: Record<string, unknown>[] } {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  if (!Array.isArray(data.ar) || !Array.isArray(data.en) || data.ar.length !== data.en.length || data.ar.length < 1 || data.ar.length > 20) return false;
  const required = ["id", "number", "title", "client", "category", "format", "role", "summary", "conceptLabel", "tone", "poster", "visualTitle", "visualSubline", "year"];
  const ids = new Set<string>();
  for (const locale of ["ar", "en"] as const) {
    const localeIds = new Set<string>();
    for (const raw of data[locale] as unknown[]) {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) return false;
      const project = raw as Record<string, unknown>;
      for (const field of required) {
        if (typeof project[field] !== "string" || !(project[field] as string).trim() || (project[field] as string).length > 2400) return false;
      }
      if (!/^[a-z0-9-]{2,80}$/.test(project.id as string)) return false;
      if (typeof project.poster !== "string" || !/^\/images\/[a-zA-Z0-9._-]+\.(svg|png|jpe?g|webp)$/.test(project.poster as string)) return false;
      if (!["ember", "gold", "steel", "paper"].includes(project.tone as string)) return false;
      if (localeIds.has(project.id as string)) return false;
      localeIds.add(project.id as string);
    }
    if (locale === "ar") for (const id of localeIds) ids.add(id);
    else if (ids.size !== localeIds.size || [...ids].some((id) => !localeIds.has(id))) return false;
  }
  return true;
}

async function readCurrentContent() {
  const file = await githubRequest(`/repos/${REPOSITORY}/contents/${CONTENT_PATH}?ref=${encodeURIComponent(BRANCH)}`);
  if (typeof file.content !== "string" || typeof file.sha !== "string") throw new Error("Project content file was not returned by GitHub.");
  const content = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
  return { content: JSON.parse(content), sha: file.sha };
}

export async function GET(request: NextRequest) {
  if (!hasAdminSession(request)) return errorResponse("Please sign in to the admin panel.", 401);
  try {
    const current = await readCurrentContent();
    return NextResponse.json({ content: current.content, branch: BRANCH }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Could not load project content.", 502);
  }
}

export async function PUT(request: NextRequest) {
  if (!hasAdminSession(request)) return errorResponse("Please sign in to the admin panel.", 401);
  let body: unknown;
  try { body = await request.json(); } catch { return errorResponse("Invalid JSON body.", 400); }
  const content = body && typeof body === "object" && "content" in body ? body.content : undefined;
  if (!validateProjects(content)) return errorResponse("Content failed validation. Keep matching project IDs in both languages and use approved local poster paths.", 422);
  const serialized = JSON.stringify(content, null, 2) + "\n";
  if (Buffer.byteLength(serialized, "utf8") > 64_000) return errorResponse("Project content is too large to publish.", 413);

  try {
    const current = await readCurrentContent();
    const result = await githubRequest(`/repos/${REPOSITORY}/contents/${CONTENT_PATH}`, {
      method: "PUT",
      body: JSON.stringify({
        message: "Update portfolio projects from admin studio",
        content: Buffer.from(serialized, "utf8").toString("base64"),
        sha: current.sha,
        branch: BRANCH,
      }),
    });
    return NextResponse.json({ ok: true, commit: result.commit?.html_url || null, branch: BRANCH }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Could not publish project content.", 502);
  }
}
