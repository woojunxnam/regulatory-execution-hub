# 구현 상태

Last updated: `2026-07-16`

## 현재 단계

PR #2의 Phase 2 hardening과 Regulatory Updates MVP, PR #3의 Home V2, PR #5의 Home V3가 `main` production에 반영되었습니다. 현재 production release는 live Regulatory Updates와 CTD task를 우선하고, application/lifecycle guide는 source-backed workflow가 준비될 때까지 planned로 유지합니다.

기술적 Stage A public prototype gate는 충족할 수 있지만, qualified human review가 없으므로 regulatory content를 `human_reviewed` 또는 `reviewer_ready`로 상향하지 않습니다. 이 governance blocker는 Home V3 deployment와 별개로 유지됩니다.

Home V3는 세로형 LLM-style entry와 더 짧은 copy를 production에 반영했지만, 생성형 regulatory answer를 제공하지 않고 deterministic page navigation boundary를 유지합니다.

## Public production truth

- URL: `https://regulatory-execution-hub.vercel.app`
- Production branch: `main`
- Home V3 application commit: `2bb07a40eb98cdf9fde4a4cc9e6bf2a7ced8f26c`
- Merged PRs: `#2`, `#3`, `#5`
- Production verification: desktop/mobile Playwright `88/88` pass
- Public routes: `35` static/SSG routes

## 구현 완료

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS, Zod
- CTD Builder, Module 3, Drug Product index, Source-to-CTD Matrix
- 6개 structured CTD section과 linked Module `2.3` QOS traceability
- deterministic readiness, cross-module consistency, export, print, history, citation integrity
- version/source-set fingerprint 기반 `ReviewRecord` gate
- 8개 official-source update record와 index/detail route
- source/document/editorial status, source date, last-verification date, applicability boundary
- About, Editorial Policy, Privacy, Corrections, security headers, canonical, robots, sitemap, manifest, social preview

## Home V2 production release

- 첫 화면을 `Regulatory Updates + CTD Quality` live scope 중심으로 재구성
- main navigation을 live routes 4개로 축소: `Regulatory Updates`, `CTD Builder`, `Trust & Sources`, `About`
- LLM answer처럼 보이지 않는 single-line deterministic page finder
- available example만 노출하고 planned task는 검색 결과 또는 compact roadmap에서 명확히 구분
- latest 3 source-checked updates를 Home에 직접 노출
- mobile menu와 mobile-first ordering 적용
- Home density: 약 `652 → 330 words`, top-level section `5 → 3`, page height 약 `3996 → 2317px` at `1280 × 720`

## Home V3 production release

- 좌우 분할 hero를 제거하고 headline → task finder → live/planned coverage 순서의 단일 세로 flow로 재구성
- 중복 CTA와 설명을 제거하고 Home을 약 `330 → 210 words`, `2317 → 1831px`로 축소 at `1280 × 720`
- search input과 example query를 첫 hero 안에 유지하고 available/planned result를 계속 분리
- external LLM answer, query persistence, confidential-data collection을 추가하지 않음
- desktop/mobile layout, keyboard/search behavior, accessibility, route, console checks 통과
- PR #5, Vercel production deployment, public URL desktop/mobile `88/88` 재검증 완료

## 최신 local and production validation

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
| Safety Intelligence          | source families checked       | schema/source plan only                         | 없음             |
| Application/lifecycle guides | 아직 source-backed guide 없음 | planned                                         | 없음             |

Update의 `Official source checked`는 official page와 metadata를 확인했다는 뜻이며, regulatory impact conclusion이 qualified human review를 받았다는 뜻이 아닙니다.

## 알려진 제한

- application-specific intake, account, persistence, RBAC, audit trail, GxP control 없음
- confidential product/patient/dossier data 수집 없음
- readiness는 demonstration workflow state이며 agency completeness 또는 filing acceptability가 아님
- continuous source monitoring과 automatic publication 없음
- Safety Intelligence는 schema와 source boundary만 확정됐으며 published record 없음
- FDA Initial IND, EMA Centralised MAA, post-approval change source-backed checklist 없음
- actual qualified `ReviewRecord` 없음

## 다음 작업

1. Shared `OfficialSource`와 `ChecklistItem` schema를 확정합니다.
2. FDA Initial IND source package/checklist와 Safety Intelligence schema/4–6 curated source packages를 bounded track으로 구현합니다.
3. Qualified RA reviewer를 확보하고 review record workflow를 실제 운영합니다.
4. 첫 5–10명 CMC/RA user interview와 usability test로 task priority를 검증합니다.
5. Monitoring cadence, superseded handling, correction ownership이 정해진 뒤 update detection automation을 설계합니다.
