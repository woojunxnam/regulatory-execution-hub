# Regulatory Execution Hub

FDA/EMA 규제 업무를 official source에서 실제 preparation task로 연결하는 independent educational decision-support prototype입니다. 현재 공개 범위는 source-checked Regulatory Updates와 CTD Quality foundation이며, source-backed application guide와 post-approval change workflow는 다음 release 범위입니다.

## Public production

- URL: `https://regulatory-execution-hub.vercel.app`
- Hosting: Vercel Git integration
- Production branch: `main`
- Current verified production commit: `d1895476d5c607c6f7962dc2a278a6543fb57831`
- Current production verification: desktop/mobile Playwright `88/88` pass
- Home V2 release candidate branch: `codex/home-v2-production`

PR #2를 통해 expanded CTD, Regulatory Updates MVP, trust/policy pages, security headers, SEO discovery files가 이미 `main` production에 반영되었습니다. Home V2는 이 production baseline 위에서 첫 화면을 live task 중심으로 단순화하는 별도 release candidate입니다.

GitHub Pages URL은 application이 아니라 repository `README.md`를 렌더링하므로 production URL로 사용하지 않습니다.

## 구현된 범위

- FDA 4개, EMA 4개의 manually curated source-checked update record와 static detail page
- source document status, official-source status, editorial-review status, source date, last-verification date, applicability boundary
- CTD Module 3 Drug Product navigation과 6개 structured section: `3.2.P.1`, `3.2.P.2`, `3.2.P.3`, `3.2.P.5`, `3.2.P.7`, `3.2.P.8`
- linked Module `2.3` Quality Overall Summary traceability
- Source-to-CTD Matrix, text/CSV authoring packet export, deterministic readiness and consistency rules
- content/source history와 content version·source-set hash에 고정된 `ReviewRecord` gate
- `/about`, `/editorial-policy`, `/privacy`, `/corrections`, canonical metadata, `robots.txt`, `sitemap.xml`, web manifest, security headers
- Home V2 release candidate: live-task navigation, single-line deterministic page finder, latest 3 updates, compact roadmap, mobile menu

모든 CTD sample synthesis는 `source_verification_required` 상태입니다. 실제 qualified review evidence가 없으므로 `human_reviewed` 또는 `reviewer_ready`로 표시하지 않습니다. Update record는 `source_checked`이며 qualified regulatory review를 의미하지 않습니다.

## 아직 구현되지 않은 범위

- Continuous FDA/EMA monitoring 또는 automatic publication
- Source-backed FDA Initial IND 및 EMA Centralised MAA checklist
- FDA/EMA post-approval change classification workflow
- Accounts, persistence, confidential upload, external AI answer generation, analytics, subscriptions

## Local 실행

Node.js `24.18.0` 이상이 필요합니다.

```bash
npm ci
npm run dev
```

Home은 `http://localhost:3000`, CTD Builder는 `http://localhost:3000/submission-navigator/ctd`입니다.

## Quality gate

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Home V2 local verification target:

- Formatting and ESLint zero warnings
- strict TypeScript
- Vitest `11 files / 44 tests`
- Next.js production build `35 static/SSG routes`
- desktop/mobile Playwright `88/88`
- Home, Regulatory Updates, `3.2.P.5` axe WCAG A/AA detected violation `0`

Production을 재검증하려면 다음 environment variable을 사용합니다.

```powershell
$env:PLAYWRIGHT_BASE_URL="https://regulatory-execution-hub.vercel.app"
npm run test:e2e
```

## Content architecture

- CTD schema and rules: `src/lib/ctd/`
- CTD records and source matrix: `src/data/ctd/`
- Regulatory Updates schema and records: `src/lib/regulatory-updates/`, `src/data/regulatory-updates/`
- Home routing data and deterministic matcher: `src/data/home/`, `src/lib/navigation/`
- Reusable UI: `src/components/`
- Public discovery configuration: `src/lib/site.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`

Regulatory business data와 deterministic rules는 UI component 밖에 둡니다. 새 regulatory record는 official-source status, editorial-review status, last-verification date를 포함해야 합니다.

## Search launch

Vercel URL이 public이어도 Google indexing은 자동으로 보장되지 않습니다. Custom domain을 결정한 뒤 canonical origin을 설정하고, Google Search Console property를 verify하고, `/sitemap.xml`을 제출해야 합니다. Source-backed content가 없는 planned thin route는 `noindex`와 sitemap exclusion을 유지합니다.

상세 기준은 [`docs/PRODUCTION_READINESS_CHECKLIST.md`](docs/PRODUCTION_READINESS_CHECKLIST.md), 실행 순서는 [`docs/PRODUCT_PLAN.md`](docs/PRODUCT_PLAN.md)를 기준으로 합니다.

## Regulatory boundary

이 project는 FDA, EMA, European Commission 또는 ICH와 제휴하지 않은 educational decision-support prototype입니다. Legal/regulatory advice, final regulatory determination 또는 validated GxP system이 아닙니다. Confidential product, patient 또는 proprietary dossier information을 입력하거나 저장해서는 안 됩니다.
