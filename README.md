# Regulatory Execution Hub

Production-readiness 운영 기준과 domain/hosting 결정은 [`docs/PRODUCTION_READINESS_CHECKLIST.md`](docs/PRODUCTION_READINESS_CHECKLIST.md)에 정리되어 있습니다.

FDA/EMA 규제 실행을 위한 evidence-linked educational decision-support prototype입니다. Product architecture는 `Application Preparation`, `Lifecycle Changes`, `Regulatory Updates`, `CTD Workspace`의 네 영역을 연결합니다. 현재 release candidate에는 CTD Module 3 Drug Product의 여섯 section, linked Module `2.3` traceability, 그리고 8개의 source-checked FDA/EMA update record가 포함됩니다. Application checklist와 continuous monitoring은 아직 planned 상태입니다.

## Deployment 상태

Production: `https://regulatory-execution-hub.vercel.app`

Vercel Git integration으로 `main`의 commit `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`을 production deployment하고 `2026-07-15`에 검증했습니다.

- Project: `regulatory-execution-hub`
- Application Preset: `Next.js`
- Root Directory: repository root
- Production Branch: `main`
- Node.js: `package.json`의 `>=24.18.0` engine을 사용
- Environment Variables: none
- Production baseline Playwright: desktop/mobile 합계 `28/28` pass
- Official-source links: unique URL `5/5` HTTP `200`

`codex/deployment-phase2-hardening` branch의 expanded CTD, guided Home, broader product IA, Regulatory Updates MVP, trust pages, security headers, and SEO discovery files는 PR #2를 통해 `main` production으로 승격합니다. GitHub Pages URL `https://woojunxnam.github.io/regulatory-execution-hub/`는 legacy repository `README.md` 렌더링이며 application URL이 아닙니다.

## 구현 범위

- CTD Builder와 Module 3 Drug Product navigation
- `Applications`, `Lifecycle Changes`, `Regulatory Updates`, `CTD Workspace` top-level information architecture
- Browser-only deterministic Home query routing과 honest `Available`/`Building`/`Planned` coverage
- Application/lifecycle/update landing routes와 source/review publication contract
- FDA 4개, EMA 4개의 source-checked update record와 static detail pages
- Draft/final/effective/updated source status, applicability boundary, official link, last-verification date
- `3.2.P.1`, `3.2.P.2`, `3.2.P.3`, `3.2.P.5`, `3.2.P.7`, `3.2.P.8` structured editorial draft
- linked Module `2.3` Quality Overall Summary traceability
- source-to-CTD matrix와 text/CSV authoring packet export
- deterministic authoring-readiness와 cross-module consistency rules
- source/content version history 및 citation integrity validation
- content version과 source-set hash에 고정된 qualified `ReviewRecord` workflow
- Canonical metadata, `robots.txt`, `sitemap.xml`, web manifest, WebSite JSON-LD

모든 published section은 `source_verification_required` 상태입니다. 실제 qualified review evidence가 없으므로 `human_reviewed` 또는 `reviewer_ready`로 표시하지 않습니다.

## Local 실행

Node.js `24.18.0` 이상이 필요합니다.

```bash
npm ci
npm run dev
```

`http://localhost:3000/submission-navigator/ctd`를 엽니다.

## Quality 명령

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

`npm run validate`는 위 sequence 전체를 실행합니다. Browser test는 기본적으로 installed Microsoft Edge를 사용합니다.

Current local verification: format/lint/type-check pass, unit `11 files / 43 tests`, production build `35 static/SSG routes`, desktop/mobile E2E `88/88` pass.

실제 production을 재검증하려면 PowerShell에서 다음을 실행합니다.

```powershell
$env:PLAYWRIGHT_BASE_URL="https://regulatory-execution-hub.vercel.app"
npm run test:e2e
```

## Content architecture

- CTD schema, integrity, deterministic rules: `src/lib/ctd/`
- Structured section, traceability, source-matrix data: `src/data/ctd/`
- Regulatory update schema and records: `src/lib/regulatory-updates/`, `src/data/regulatory-updates/`
- Reusable regulatory UI: `src/components/ctd/`
- Product-area coverage model: `src/data/product/`
- Public discovery configuration: `src/lib/site.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`
- Routes: `src/app/submission-navigator/ctd/`

새 section은 `ctdSectionSchema`로 검증되는 structured record로 추가하고 reusable detail component로 렌더링합니다. Regulatory business rule은 UI component에 직접 숨기지 않습니다.

## Public launch와 Google Search

Vercel URL은 production deploy 직후 public access가 가능하지만 Google indexing을 보장하지 않습니다.

1. Branch를 review/merge하여 Vercel production에 배포합니다.
2. Production에서 `/robots.txt`, `/sitemap.xml`, canonical metadata와 `noindex` boundary를 검증합니다.
3. 가능하면 production에 custom domain을 연결하고 `NEXT_PUBLIC_SITE_URL`을 canonical domain으로 설정합니다.
4. Google Search Console에서 Domain property를 verify합니다.
   - Custom domain이 아직 없으면 URL-prefix property와 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` meta token을 사용할 수 있습니다.
5. `https://<canonical-domain>/sitemap.xml`을 Search Console에 제출합니다.
6. Home과 source-backed flagship pages를 URL Inspection으로 확인하고 indexing을 요청합니다.
7. Planned thin pages는 source-verified content가 생기기 전까지 `noindex`와 sitemap exclusion을 유지합니다.
8. Original, useful, source-backed content와 외부에서 발견 가능한 link를 지속적으로 구축합니다.

Custom domain을 사용하지 않으면 default canonical은 `https://regulatory-execution-hub.vercel.app`입니다. `.env.example`은 production URL 설정 예시입니다.

## Regulatory boundary

이 project는 independent educational decision-support prototype입니다. FDA, EMA, European Commission 또는 ICH와 제휴하지 않았고 legal/regulatory advice, final regulatory determination 또는 validated GxP system이 아닙니다. Confidential product, patient 또는 dossier information을 입력하거나 저장해서는 안 됩니다.
