# 구현 상태

## 현재 단계

`Deployment & Phase 2 Hardening`을 진행 중입니다. Vercel production gate와 구조적 hardening은 통과했지만, qualified human review가 없어 Phase 2 exit criteria는 아직 모두 충족되지 않았습니다. 따라서 Phase 3는 시작하지 않습니다.

## 완료된 범위

- canonical 문서 및 historical delta 검토
- Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS, Zod 기반 구조 확립
- CTD Builder, Module 3, Drug Product index, Source-to-CTD Matrix, methodology route 구현
- `3.2.P.1`, `3.2.P.2`, `3.2.P.3`, `3.2.P.5`, `3.2.P.7`, `3.2.P.8` 구조화 editorial draft 구현
- 여섯 섹션을 동일한 `CtdSection` model과 reusable detail component로 렌더링
- linked Module `2.3` Quality Overall Summary traceability route 구현
- cross-module consistency rules와 deterministic reviewer-readiness gate 구현
- source document, source data, ownership, dependencies, questions, consistency, reviewer lens, citation을 포함하는 section model 구현
- source/content version history와 expectation-to-citation validation 구현
- `ReviewRecord` schema, qualified reviewer metadata, content version, SHA-256 source-set fingerprint 기반 review gate 구현
- 현재 version/source set과 일치하는 approved `ReviewRecord` 없이는 `human_reviewed` 및 `reviewer_ready` 상태를 허용하지 않음
- source/readiness filter, progressive disclosure, text/CSV export, print layout 구현
- local 및 external deployment를 대상으로 route, keyboard, axe, console, responsive, print, export 검증
- GitHub remote 연결, Vercel Git integration, `main` production deployment 및 canonical domain 검증

## 규제 및 편집 상태

- official ICH/FDA/EMA source URL과 current/draft status: `source_checked`, last verified `2026-07-13`
- section purpose, authoring prompts, reviewer lens, consistency checks, deficiency signals: `source_verification_required`
- qualified human review record: 없음
- published demonstration section의 `reviewRecords`: 모두 빈 배열
- test fixture의 reviewer record: deterministic branch 검증용 synthetic record이며 live review evidence가 아님
- demonstration record에는 product name, patient information, formulation value, process parameter, result value와 같은 confidential technical content를 저장하지 않음

## Phase 2 exit criteria 재평가

| Exit criterion                                                                                              | 상태       | 증거                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| section purpose, expected information, source documents, ownership, dependencies, reviewer questions가 보임 | 충족       | reusable detail component가 여섯 available section에 동일 구조를 제공함                                                   |
| missing 또는 unapproved source가 final-readiness를 차단함                                                   | 충족       | `evaluateAuthoringReadiness`와 unit tests가 critical missing, draft, unresolved dependency를 차단함                       |
| invented technical content를 생성하지 않음                                                                  | 충족       | UI는 structured demonstration metadata와 prompts만 렌더링하고 runtime LLM 또는 technical value generation을 사용하지 않음 |
| 모든 sample regulatory content가 source-linked이고 human-reviewed임                                         | **미충족** | source/citation link는 schema로 검증되지만 qualified human `ReviewRecord`가 없음                                          |
| source evidence를 CTD section까지 추적하고 authoring packet을 export할 수 있음                              | 충족       | source-document mapping, Module `2.3` traceability, text/CSV download test가 통과함                                       |

결론: Phase 2의 네 가지 기준은 충족했지만 human-review 기준이 남아 있습니다. review evidence 없이 상태를 상향하지 않으며 Phase 3로 이동하지 않습니다.

## 알려진 제한

- application-specific intake, confidential workspace, persistence, authentication, role-based access, audit trail 또는 GxP control이 없음
- readiness는 demonstration authoring workflow state이며 agency completeness, filing acceptability 또는 regulatory conclusion이 아님
- Product-specific requirement, regional exception, agency advice, waiver, commitment의 실제 applicability를 결정하지 않음
- `3.2.P.4`와 `3.2.P.6`, Module 1/4/5는 planned 상태임
- Vercel production은 현재 `main`의 first vertical slice commit을 제공하며, 이 branch의 Phase 2 hardening은 merge 전까지 production에 포함되지 않음
- GitHub Pages URL은 application이 아니라 repository `README.md`를 렌더링하므로 production evidence로 사용하지 않음

## repository 및 deployment 증거

- Remote: `origin = https://github.com/woojunxnam/regulatory-execution-hub.git`
- Production project: `namwoojun/regulatory-execution-hub`
- Production URL: `https://regulatory-execution-hub.vercel.app`
- Production deployment ID: `dpl_BS7VyaL8yhDP8ueQCpxk1xtPcg7R`
- Production commit: `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`
- Production baseline route check: `/`와 기존 CTD/methodology route `200`
- Production baseline Playwright: desktop/mobile 합계 `28/28` pass
- Official-source link health: unique ICH/EMA/FDA URL `5/5` HTTP `200`
- Current hardening branch: `codex/deployment-phase2-hardening`

## 최신 local validation 결과

- 재검증일: `2026-07-15`
- Formatting: pass
- ESLint zero warnings: pass
- strict TypeScript: pass
- Vitest: `6 files / 25 tests` pass
- Next.js production build: pass; `16` static/SSG pages generated
- Playwright local production-server review: desktop/mobile 합계 `40/40` pass
- axe WCAG A/AA: `3.2.P.5` reference page에서 detected violation 없음
- keyboard controls, print media, filters, text/CSV export, console error, desktop/mobile screenshots: pass
- npm audit baseline: known vulnerability `0`

## 검증 명령

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

external production 재검증:

```powershell
$env:PLAYWRIGHT_BASE_URL="https://regulatory-execution-hub.vercel.app"
npm run test:e2e
```

## 남은 작업

1. Qualified regulatory reviewer가 현재 content version과 source-set fingerprint를 검토하고 실제 `ReviewRecord`를 제공해야 합니다.
2. Reviewer가 요청한 변경이 있으면 새 content version과 history를 기록하고 해당 version을 다시 검토해야 합니다.
3. 이 branch를 PR review/merge한 뒤 Vercel production에서 expanded route와 `40/40` test suite를 재검증해야 합니다.
4. 모든 Phase 2 exit criteria가 충족된 뒤에만 Phase 3 착수를 재평가합니다.
