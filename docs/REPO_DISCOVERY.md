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
