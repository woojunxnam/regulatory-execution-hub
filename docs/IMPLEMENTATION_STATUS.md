# 구현 상태

Last updated: `2026-07-16`

## 현재 단계

PR #2의 Phase 2 hardening과 Regulatory Updates MVP는 `main` production에 반영되었습니다. 현재 작업은 `codex/home-v2-production` branch의 Home V2 release candidate를 검증하고 production으로 승격하는 단계입니다.

기술적 Stage A public prototype gate는 충족할 수 있지만, qualified human review가 없으므로 regulatory content를 `human_reviewed` 또는 `reviewer_ready`로 상향하지 않습니다. 이 governance blocker는 Home V2 deployment와 별개로 유지됩니다.

## Public production truth

- URL: `https://regulatory-execution-hub.vercel.app`
- Production branch: `main`
- Verified production commit: `d1895476d5c607c6f7962dc2a278a6543fb57831`
- Merged PR: `#2`
- Production verification: desktop/mobile Playwright `88/88` pass
- Public routes: `35` static/SSG routes
- Current release candidate: `codex/home-v2-production`

## 구현 완료

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS, Zod
- CTD Builder, Module 3, Drug Product index, Source-to-CTD Matrix
- 6개 structured CTD section과 linked Module `2.3` QOS traceability
- deterministic readiness, cross-module consistency, export, print, history, citation integrity
- version/source-set fingerprint 기반 `ReviewRecord` gate
- 8개 official-source update record와 index/detail route
- source/document/editorial status, source date, last-verification date, applicability boundary
- About, Editorial Policy, Privacy, Corrections, security headers, canonical, robots, sitemap, manifest, social preview

## Home V2 release candidate

- 첫 화면을 `Regulatory Updates + CTD Quality` live scope 중심으로 재구성
- main navigation을 live routes 4개로 축소: `Regulatory Updates`, `CTD Builder`, `Trust & Sources`, `About`
- LLM answer처럼 보이지 않는 single-line deterministic page finder
- available example만 노출하고 planned task는 검색 결과 또는 compact roadmap에서 명확히 구분
- latest 3 source-checked updates를 Home에 직접 노출
- mobile menu와 mobile-first ordering 적용
- Home density: 약 `652 → 330 words`, top-level section `5 → 3`, page height 약 `3996 → 2317px` at `1280 × 720`

## 최신 local validation

- Formatting: pass
- ESLint zero warnings: pass
- strict TypeScript: pass
- Vitest: `11 files / 44 tests` pass
- Next.js production build: `35` routes pass
- Playwright: desktop/mobile `88/88` pass
- Home, Regulatory Updates, `3.2.P.5` axe WCAG A/AA detected violation: `0`
- browser console, mobile navigation, query routing, print, export, security and SEO route checks: pass

## 규제 및 편집 상태

| Content                      | Official-source status        | Editorial status                                | Qualified review |
| ---------------------------- | ----------------------------- | ----------------------------------------------- | ---------------- |
| CTD sources                  | official/source checked       | sample synthesis `source_verification_required` | 없음             |
| Regulatory Updates           | official/source checked       | `source_checked`                                | 없음             |
| Application/lifecycle guides | 아직 source-backed guide 없음 | planned                                         | 없음             |

Update의 `Official source checked`는 official page와 metadata를 확인했다는 뜻이며, regulatory impact conclusion이 qualified human review를 받았다는 뜻이 아닙니다.

## 알려진 제한

- application-specific intake, account, persistence, RBAC, audit trail, GxP control 없음
- confidential product/patient/dossier data 수집 없음
- readiness는 demonstration workflow state이며 agency completeness 또는 filing acceptability가 아님
- continuous source monitoring과 automatic publication 없음
- FDA Initial IND, EMA Centralised MAA, post-approval change source-backed checklist 없음
- actual qualified `ReviewRecord` 없음

## 다음 작업

1. Home V2 PR을 review, merge, Vercel production deploy하고 public `88/88`을 재검증합니다.
2. Shared `OfficialSource`와 `ChecklistItem` schema를 확정합니다.
3. FDA Initial IND source package와 checklist acceptance criteria를 먼저 구현합니다.
4. Qualified RA reviewer를 확보하고 review record workflow를 실제 운영합니다.
5. 첫 5–10명 CMC/RA user interview와 usability test로 task priority를 검증합니다.
