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

Build the narrow Phase 2 vertical slice defined by the authoritative prompt. Current M4Q(R1) content is kept separate from draft M4Q(R2) future-readiness material. Official-source metadata may be verified while all interpretive demonstration content remains explicitly marked as an editorial draft until qualified human review is recorded.

## Environment notes

The host initially lacked Node.js/npm and GitHub CLI. A checksum-verified portable Node.js distribution is kept under ignored `.tools/` for local validation. No GitHub remote was available during discovery.

## Current repository connection

2026-07-15 재검증 결과 `origin`은 `https://github.com/woojunxnam/regulatory-execution-hub.git`에 연결되어 있고, `main`과 `origin/main`은 commit `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`에서 동기화되어 있습니다. 위의 “No GitHub remote was available during discovery”는 최초 discovery 당시의 historical fact이며 현재 상태가 아닙니다.

GitHub의 `github-pages` deployment record는 application deployment가 아닙니다. 해당 환경 URL은 repository `README.md`를 렌더링하고 CTD route는 `404`를 반환합니다.

2026-07-15에 Vercel Git integration을 연결하고 `main` commit `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`을 `https://regulatory-execution-hub.vercel.app`에 production deployment했습니다. 실제 URL을 대상으로 HTTP, desktop/mobile, keyboard, accessibility, console, filter, export, print, official-source link, editorial-draft 및 educational-use boundary를 검증했습니다.
