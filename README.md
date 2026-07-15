# Regulatory Execution Hub

FDA/EMA 규제 실행을 위한 evidence-linked educational decision-support prototype입니다. 현재 Phase 2 foundation은 CTD Module 3 Drug Product의 여섯 section과 linked Module `2.3` traceability를 통해 source readiness, consistency, version history, reviewer preparation을 구조화합니다.

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

현재 `codex/deployment-phase2-hardening` branch의 확장 내용은 아직 `main` production에 포함되지 않았습니다. GitHub Pages URL `https://woojunxnam.github.io/regulatory-execution-hub/`는 legacy repository `README.md` 렌더링이며 application URL이 아닙니다.

## 구현 범위

- CTD Builder와 Module 3 Drug Product navigation
- `3.2.P.1`, `3.2.P.2`, `3.2.P.3`, `3.2.P.5`, `3.2.P.7`, `3.2.P.8` structured editorial draft
- linked Module `2.3` Quality Overall Summary traceability
- source-to-CTD matrix와 text/CSV authoring packet export
- deterministic authoring-readiness와 cross-module consistency rules
- source/content version history 및 citation integrity validation
- content version과 source-set hash에 고정된 qualified `ReviewRecord` workflow

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

실제 production을 재검증하려면 PowerShell에서 다음을 실행합니다.

```powershell
$env:PLAYWRIGHT_BASE_URL="https://regulatory-execution-hub.vercel.app"
npm run test:e2e
```

## Content architecture

- CTD schema, integrity, deterministic rules: `src/lib/ctd/`
- Structured section, traceability, source-matrix data: `src/data/ctd/`
- Reusable regulatory UI: `src/components/ctd/`
- Routes: `src/app/submission-navigator/ctd/`

새 section은 `ctdSectionSchema`로 검증되는 structured record로 추가하고 reusable detail component로 렌더링합니다. Regulatory business rule은 UI component에 직접 숨기지 않습니다.

## Regulatory boundary

이 project는 independent educational decision-support prototype입니다. FDA, EMA, European Commission 또는 ICH와 제휴하지 않았고 legal/regulatory advice, final regulatory determination 또는 validated GxP system이 아닙니다. Confidential product, patient 또는 dossier information을 입력하거나 저장해서는 안 됩니다.
