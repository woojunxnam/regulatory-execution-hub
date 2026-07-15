# Regulatory Execution Hub

An evidence-linked FDA/EMA regulatory execution-support prototype. The first vertical slice helps users understand and assess authoring readiness for CTD Module 3, with a reference implementation for `3.2.P.5 — Control of Drug Product`.

## Deployment status

2026-07-15 기준으로 application production deployment는 아직 검증되지 않았습니다.

- GitHub Pages deployment `https://woojunxnam.github.io/regulatory-execution-hub/`는 repository `README.md`만 렌더링합니다.
- `/submission-navigator/ctd` 및 나머지 application route는 해당 URL에서 `404`를 반환합니다.
- production target은 Vercel Git integration이며, `main`을 Production Branch로 사용합니다.
- Vercel project 연결과 실제 production URL 검증이 완료되기 전에는 이 repository를 공개 실행 중인 website로 간주하지 않습니다.

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

## Content architecture

- CTD schemas and deterministic readiness logic: `src/lib/ctd/`
- Structured section and source-matrix data: `src/data/ctd/`
- Reusable regulatory UI: `src/components/ctd/`
- Routes: `src/app/submission-navigator/ctd/`

To add a section, create a structured record, validate it with `ctdSectionSchema`, add its index metadata, and render it through reusable CTD components. Do not embed new regulatory rules only in page components.

## Regulatory boundary

This project is an independent educational decision-support prototype. It is not affiliated with FDA, EMA, the European Commission, or ICH; it is not legal or regulatory advice; and it is not a validated GxP system. Demonstration data must not contain confidential product, patient, or dossier information.
