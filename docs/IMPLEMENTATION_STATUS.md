# Implementation Status

## Current phase

Deployment & Phase 2 Hardening. CTD Authoring Foundation의 첫 vertical slice는 `main`에 병합되었고, 현재 gate는 Vercel production deployment입니다.

## Completed

- Canonical document review and historical-delta review
- Empty-repository discovery
- Stack, architecture, content-governance, and validation decisions
- Local Git repository and `codex/ctd-authoring-foundation` branch
- CTD Builder, Module 3, Drug Product index, `3.2.P.5`, Source-to-CTD Matrix, and methodology routes
- Typed Zod schemas, structured safe sample data, and a pure deterministic readiness evaluator
- Source/readiness status filters, progressive disclosure, text/CSV export, and print layout
- Reusable citation, status, trust, readiness, navigation, and matrix components
- Unit, component, route, keyboard, axe, console, responsive, print, and production-build validation
- GitHub remote 연결 및 `main`/`origin/main` 동기화 재검증
- portable Node.js `v24.18.0`을 사용한 clean install 및 전체 baseline 재검증

## Decisions and assumptions

- This is a new repository because the selected directory contained no prior application.
- Current content follows M4Q(R1); M4Q(R2) is draft and is not used as current mandatory content.
- Official source metadata and links can be verified independently from editorial synthesis.
- No content is labeled human-reviewed without a recorded qualified review.
- Demonstration records contain no proprietary technical values.

## Regulatory verification status

- Official ICH/FDA/EMA source URLs and current/draft status: source-checked on 2026-07-13.
- Section summaries, authoring prompts, reviewer lens, consistency checks, and deficiency signals: editorial draft; qualified regulatory review required.

## Known limitations

- Only Module 3 `3.2.P.5` is fully implemented.
- No application-specific intake, confidential workspace, persistence, authentication, or GxP controls.
- Readiness is a demonstration authoring workflow state, not an agency completeness determination.
- Vercel project와 production URL은 아직 검증되지 않았습니다.
- GitHub Pages environment URL `https://woojunxnam.github.io/regulatory-execution-hub/`는 application이 아니라 repository `README.md`를 렌더링합니다. `/submission-navigator/ctd` 및 나머지 application route는 `404`를 반환하므로 production website evidence로 사용할 수 없습니다.

## Repository and deployment evidence

- Remote: `origin = https://github.com/woojunxnam/regulatory-execution-hub.git`
- Default branch sync: `main = origin/main = 5d81907626b69cc8f8fc6e0bf8868827f4e81a90`
- Repository visibility: `public`
- GitHub Pages deployment record: `success` for commit `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`
- GitHub Pages application-route check: root `200` (README rendering), all six CTD/methodology routes `404`
- Vercel dashboard check: authentication required; no project or production deployment could be verified without account authorization
- Verified application production URL: none

## Validation result

- Baseline reverified: 2026-07-15
- Formatting check: pass
- ESLint with zero warnings: pass
- Strict TypeScript check: pass
- Vitest: 5 files, 12 tests passed
- Next.js production build: pass; all application routes statically rendered
- Playwright production-server review: 24 tests passed across desktop Edge and mobile emulation
- axe WCAG A/AA scan: no detected violations on the `3.2.P.5` reference page
- Keyboard controls, print media, source filters, console errors, and desktop/mobile screenshots: pass
- npm audit: 0 known vulnerabilities after the lock-file override for patched PostCSS

## Exact validation commands

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

## Remaining tasks in dependency order

1. Vercel에 로그인하고 Git repository `woojunxnam/regulatory-execution-hub`를 새 project로 import합니다. Framework Preset은 `Next.js`, Root Directory는 repository root, Production Branch는 `main`, Node.js는 `24.x`, Environment Variables는 none으로 설정합니다.
2. 실제 production URL과 deployment commit SHA를 확보한 뒤 모든 route, desktop/mobile layout, keyboard/focus, console, filters/export, print, official-source links, editorial-draft 및 educational-use limitation을 검증합니다.
3. production URL과 검증 evidence를 `README.md` 및 이 문서에 기록합니다.
4. Qualified regulatory reviewer가 제공되지 않는 한 `3.2.P.5` content는 draft로 유지하면서 review-record schema/workflow를 구현합니다.
5. 이후에만 `3.2.P.1`, `3.2.P.2`, `3.2.P.3`, `3.2.P.7`, `3.2.P.8` 및 linked `2.3` traceability를 validated section model로 확장합니다.
