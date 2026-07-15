# Repository Discovery

## Discovery result

The selected directory contained only the three canonical planning documents and was not a Git repository. There was no website, package manifest, lock file, CI, deployment configuration, route, component, content system, or test setup to preserve.

## Canonical inputs

- `blueprint_v0.2.md`: authoritative product blueprint
- `codex_master_build_prompt.md`: authoritative first-phase implementation instructions
- `blueprint.md`: historical context; its manufacturing-site-change first slice is superseded by the CTD authoring slice

## Chosen stack

- Next.js 16 App Router
- React 19 and strict TypeScript
- Tailwind CSS with project-level design tokens and semantic CSS
- Zod for runtime schema validation
- Vitest and Testing Library for unit/component tests
- Playwright with installed Microsoft Edge and axe for route, keyboard, responsive, and accessibility checks
- npm with a committed lock file
- GitHub Actions for the same validation sequence

## Conventions

- Application code under `src/`
- Routes under `src/app/`
- Regulatory domain model and pure rules under `src/lib/ctd/`
- Structured demonstration content under `src/data/ctd/`
- Reusable CTD presentation under `src/components/ctd/`
- No confidential inputs, authentication, upload, payment, or external LLM runtime in this phase

## Implementation approach

Authoritative prompt의 Phase 2 vertical slice를 먼저 구현하고 hardening했습니다. Current M4Q(R1) content는 draft M4Q(R2) future-readiness material과 분리합니다. Official-source metadata는 별도로 검증할 수 있지만 interpretive demonstration content는 qualified human review가 기록될 때까지 `source_verification_required` editorial draft로 유지합니다.

현재 여섯 Drug Product section이 하나의 validated schema와 reusable detail component를 사용합니다. Module `2.3` traceability와 cross-module consistency rule은 structured data 및 pure deterministic evaluator에 위치하며 UI가 규칙을 암묵적으로 결정하지 않습니다.

## Environment notes

The host initially lacked Node.js/npm and GitHub CLI. A checksum-verified portable Node.js distribution is kept under ignored `.tools/` for local validation. No GitHub remote was available during discovery.

## Current repository connection

2026-07-15 재검증 결과 `origin`은 `https://github.com/woojunxnam/regulatory-execution-hub.git`에 연결되어 있고, `main`과 `origin/main`은 commit `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`에서 동기화되어 있습니다. 위의 “No GitHub remote was available during discovery”는 최초 discovery 당시의 historical fact이며 현재 상태가 아닙니다.

GitHub의 `github-pages` deployment record는 application deployment가 아닙니다. 해당 환경 URL은 repository `README.md`를 렌더링하고 CTD route는 `404`를 반환합니다.

2026-07-15에 Vercel Git integration을 연결하고 `main` commit `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`을 `https://regulatory-execution-hub.vercel.app`에 production deployment했습니다. 실제 URL을 대상으로 HTTP, desktop/mobile, keyboard, accessibility, console, filter, export, print, official-source link, editorial-draft 및 educational-use boundary를 검증했습니다.

`codex/deployment-phase2-hardening` branch에서는 `ReviewRecord` gate, six-section model, Module `2.3` traceability, cross-module rules, source/content history를 추가했습니다. Local validation은 Vitest `6 files / 25 tests`, Next.js `16` pages, Playwright `40/40`을 통과했습니다. 이 변경은 PR merge 전까지 production에 포함되지 않습니다.
