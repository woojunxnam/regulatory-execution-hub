# Regulatory Execution Hub

An evidence-linked FDA/EMA regulatory execution-support prototype. The first vertical slice helps users understand and assess authoring readiness for CTD Module 3, with a reference implementation for `3.2.P.5 — Control of Drug Product`.

## Deployment status

Production: `https://regulatory-execution-hub.vercel.app`

2026-07-15에 Vercel Git integration으로 `main`의 commit `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`을 production deployment하고 검증했습니다.

- Project: `regulatory-execution-hub`
- Application Preset: `Next.js`
- Root Directory: repository root
- Production Branch: `main`
- Node.js: `package.json`의 `>=24.18.0` engine이 Vercel `24.x` runtime에 매핑됨
- Environment Variables: none
- HTTP: `/`와 6개 CTD/methodology route 모두 `200`
- Production Playwright: desktop/mobile 합계 `28/28` pass
- Official-source links: `5/5` HTTP `200`

GitHub Pages URL `https://woojunxnam.github.io/regulatory-execution-hub/`는 legacy repository `README.md` 렌더링이며 application URL이 아닙니다.

## Local setup

Node.js 24.18.0 or later is required.

```bash
npm install
npm run dev
```

Open `http://localhost:3000/submission-navigator/ctd`.

현재 deployment slice의 재현 가능한 baseline은 `npm ci` 후 `npm run validate`입니다.

## Quality commands

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

`npm run validate` runs the full sequence. Browser tests use installed Microsoft Edge by default.

실제 deployment를 재검증하려면 PowerShell에서 다음을 실행합니다.

```powershell
$env:PLAYWRIGHT_BASE_URL="https://regulatory-execution-hub.vercel.app"
npm run test:e2e
```

## Content architecture

- CTD schemas and deterministic readiness logic: `src/lib/ctd/`
- Structured section and source-matrix data: `src/data/ctd/`
- Reusable regulatory UI: `src/components/ctd/`
- Routes: `src/app/submission-navigator/ctd/`

To add a section, create a structured record, validate it with `ctdSectionSchema`, add its index metadata, and render it through reusable CTD components. Do not embed new regulatory rules only in page components.

## Regulatory boundary

This project is an independent educational decision-support prototype. It is not affiliated with FDA, EMA, the European Commission, or ICH; it is not legal or regulatory advice; and it is not a validated GxP system. Demonstration data must not contain confidential product, patient, or dossier information.
