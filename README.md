# Mohamed Assem — Visual Director Portfolio

A bilingual (Arabic RTL / English LTR) portfolio built with Next.js App Router, React, GSAP/ScrollTrigger, Framer Motion and a CSS 3D camera sequence.

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Set these in a local `.env.local` file and in the hosting provider when the corresponding feature is needed. Never commit secret values.

| Variable | Used by | Notes |
| --- | --- | --- |
| `GEMINI_API_KEY` | Assem AI assistant | Server-side Gemini API key. Without it, the assistant displays a clear not-connected message. |
| `GEMINI_MODEL` | Assem AI assistant | Optional model override; defaults to `gemini-2.5-flash`. |
| `ADMIN_PASSWORD` | Admin Studio | Strong, unique password for `/admin`. |
| `ADMIN_SESSION_SECRET` | Admin Studio | Long random secret used to sign an 8-hour HttpOnly session cookie. Use at least 32 random characters. |
| `GITHUB_TOKEN` | Admin Studio | Fine-grained GitHub token with **Contents: read and write** access to this repository. It is used server-side only. |
| `GITHUB_REPOSITORY` | Admin Studio | Optional repository override; defaults to `Abdo1629/assem-portfolio-web`. |
| `ADMIN_CONTENT_BRANCH` | Admin Studio | Optional publishing branch; defaults to `main`. A publish creates a Git commit on this branch and may trigger a deployment. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact section | Optional public email address; only set after Assem confirms the correct contact email. |

Generate an admin session secret locally with:

```bash
openssl rand -base64 48
```

The admin editor currently manages bilingual project copy in `data/project-content.json`. It validates the payload and writes a versioned commit through the GitHub Contents API. Keep the token in server-side environment variables; do not prefix it with `NEXT_PUBLIC_`. Before enabling the editor on production, restrict the token to this repository and review the configured branch.

## Content accuracy

The four included projects are clearly marked as fictional concept studies in both languages. They are presentation fixtures, not claims of commissioned client work. Replace them with approved case studies and real media when the owner supplies verified material.

## AI assistant grounding

The assistant API uses a server-side Gemini key and passes only approved portfolio copy, services, process and project metadata as context. It is instructed not to invent client names, awards, outcomes, pricing or contact details. Review the prompt and privacy requirements before production use; add a durable rate limiter / abuse protection before promoting the assistant to a high-traffic public site.

## Verification

`npm run lint` and `npm run build` are the available repository scripts. Review the branch's CI and Vercel preview before merging; a successful file write is not a substitute for a verified build, keyboard/mobile QA, or visual review.
