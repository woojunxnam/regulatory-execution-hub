# Regulatory Execution Hub

An evidence-linked FDA/EMA regulatory execution-support prototype. The first vertical slice helps users understand and assess authoring readiness for CTD Module 3, with a reference implementation for `3.2.P.5 — Control of Drug Product`.

## Local setup

Node.js 24.18.0 or later is required.

```bash
npm install
npm run dev
```

Open `http://localhost:3000/submission-navigator/ctd`.

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
