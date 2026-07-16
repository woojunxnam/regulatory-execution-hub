# Regulatory Execution Hub — 현재 구현 보고서, 개선안 및 향후 Roadmap

**보고 기준일:** 2026-07-16  
**대상:** 제품 소유자, 외부 regulatory/QA reviewer, UX/product reviewer, 다른 ChatGPT/LLM  
**프로젝트:** `Regulatory Execution Hub`  
**Tagline:** `From regulation to execution.`

> **Planning update — 2026-07-16:** 외부 GPT research report와 `Application & Lifecycle Preparation Hub` 제안을 검토하여 current release sequence를 `docs/PRODUCT_PLAN.md`에 반영했다. 이 문서는 detailed snapshot과 long-range report로 유지되며, build 우선순위가 다를 경우 `docs/PRODUCT_PLAN.md`가 current execution order를 정한다. 제안별 수용·수정·유보 판단은 `docs/EXTERNAL_REVIEW_DECISION_LOG.md`에 기록했다.

> **Production/Home V2 update — 2026-07-16:** PR #2는 merge되어 commit `d1895476d5c607c6f7962dc2a278a6543fb57831`이 public production에 배포·검증되었다. 따라서 아래에서 PR #2, old branch, commit `5d81907`, 또는 “hardening이 production에 없음”이라고 설명하는 부분은 당시의 historical snapshot이다. 현재 release candidate는 `codex/home-v2-production`이며, Home을 약 330 words·3 top-level sections로 축소하고 live Updates/CTD navigation, deterministic page finder, latest 3 updates, compact roadmap, mobile menu를 제공한다. Current truth와 실행 순서는 `docs/IMPLEMENTATION_STATUS.md`와 `docs/PRODUCT_PLAN.md`가 우선한다.

---

## 1. 이 문서의 목적

이 문서는 local repository나 desktop에 접근할 수 없는 reviewer가 다음을 독립적으로 평가할 수 있도록 작성한 self-contained report이다.

1. 현재 실제로 구현되어 공개된 것은 무엇인가?
2. 최신 branch에만 있고 production에는 아직 없는 것은 무엇인가?
3. 원래 제품 vision은 무엇이며, 현재 구현과 어떤 차이가 있는가?
4. FDA/EMA news 또는 update section이 왜 보이지 않는가?
5. 다음에 무엇을 어떤 순서로 만들어야 하는가?
6. 규제 정확성, editorial governance, UX, search/SEO, engineering, security, commercialization 측면에서 무엇을 개선해야 하는가?

이 문서는 제품 설명서이자 외부 review brief이다. 규제 요건 또는 제품별 결론을 제공하는 문서가 아니다.

---

## 2. Executive summary

`Regulatory Execution Hub`의 목표는 FDA/EMA human medicinal product 업무에서 official source를 실제 실행 단계로 연결하는 public educational decision-support platform을 만드는 것이다. 단순 news aggregation이나 generic project tracker가 아니라 다음 연결을 명확하게 만드는 것이 핵심이다.

```text
Official source
    ↓
Requirement / recommendation / uncertainty
    ↓
Affected submission, CTD section, document, system, and function
    ↓
Owner, dependency, and next action
    ↓
Completion evidence, review status, and version history
```

현재 구현은 이 전체 vision 중 **Phase 2 — CTD Authoring Foundation**과 **Phase 1 — Regulatory Updates foundation의 첫 vertical slice**를 함께 포함한다. CTD에는 `Module 3 Drug Product`의 6개 section, linked `Module 2.3`, source traceability, deterministic readiness, review-record gate, export, test가 구현되어 있다. Updates에는 FDA 4개, EMA 4개의 source-checked record, index, 8개 static detail page, source/editorial/date/applicability metadata가 구현되어 있다. 다만 qualified regulatory reviewer가 제공한 실제 `ReviewRecord`가 없으므로 CTD sample editorial synthesis는 모두 `source_verification_required`, update record는 모두 `source_checked` 상태다.

FDA/EMA update section이 처음에 빠졌던 이유는 source가 없어서가 아니다. Canonical blueprint에는 **Phase 1 — Public Content MVP**로 명시되어 있었지만, 실제 첫 coding instruction인 `codex_master_build_prompt.md`가 CTD vertical slice를 먼저 구현하도록 범위를 좁혔기 때문에 Phase 1 update/content layer를 건너뛰고 Phase 2부터 만들었다. 이 sequencing gap은 2026-07-16에 `/regulatory-updates`와 8개 detail page를 구현하여 일부 해소했다. 아직 없는 것은 RSS ingestion, continuous monitoring, automated diff, filter/search, digest, qualified review다.

구현된 MVP는 generic news feed가 아니라 **official-source-first Regulatory Updates snapshot**이다. 각 record는 official source, document status, source date, last verification date, editorial status, RA relevance, applicability boundary, verification questions를 제공한다. 다음 단계에서는 `What changed`, `What did not change`, `Recommended actions`, version history를 더 구조화하고, 자동화는 detection/diff/tag 후보까지만 담당하며 impact와 publication은 human review를 거치게 한다.

---

## 3. 현재 접근 가능한 website, repository, PR

### 3.1 Public production

- URL: [https://regulatory-execution-hub.vercel.app](https://regulatory-execution-hub.vercel.app)
- Hosting: Vercel
- Production branch: `main`
- 현재 production commit: `5d81907626b69cc8f8fc6e0bf8868827f4e81a90`
- Production 검증일: `2026-07-15`
- 현재 의미: 첫 CTD vertical slice는 공개되어 있지만, 최신 hardening branch 내용은 아직 포함되지 않음

### 3.2 Latest development branch

- Branch: `codex/deployment-phase2-hardening`
- Latest commit: `dd511e1 feat: harden Phase 2 CTD traceability`
- Draft PR: [PR #2 — Harden Phase 2 CTD traceability and review gates](https://github.com/woojunxnam/regulatory-execution-hub/pull/2)
- PR 상태 확인일: `2026-07-16`
- State: `OPEN`
- Draft: `true`
- Mergeability: `MERGEABLE`
- Formal review decision: 없음
- GitHub Actions `validate`: `SUCCESS`
- Vercel check: `SUCCESS`
- Vercel Preview Comments: `SUCCESS`
- Latest preview: [https://regulatory-execution-da03iqdcc-namwoojun.vercel.app](https://regulatory-execution-da03iqdcc-namwoojun.vercel.app)

Latest Vercel preview는 현재 Vercel authentication wall 뒤에 있다. 따라서 일반 외부 reviewer에게는 production URL과 GitHub PR을 제공하는 편이 정확하다. 최신 branch 기능을 public production에서 보려면 PR review/merge 후 production 재검증이 필요하다.

### 3.3 Repository

- GitHub: [https://github.com/woojunxnam/regulatory-execution-hub](https://github.com/woojunxnam/regulatory-execution-hub)
- Default branch: `main`
- 현재 local worktree에는 user-owned untracked file `handoff_passon_prompt.md`가 있으며, 제품 code 변경 대상으로 취급하지 않는다.

---

## 4. 제품 목표와 명확한 경계

### 4.1 North Star

FDA/EMA human medicinal product 전문가가 official information을 발견한 뒤 다음 5개 질문에 답할 수 있게 만드는 것이 목표다.

1. 무엇이 바뀌었는가?
2. 왜 중요한가?
3. 내 product, procedure 또는 change에 적용될 가능성이 있는가?
4. 어떤 CTD section, source document, system, function이 영향을 받을 수 있는가?
5. 다음 action은 무엇이며 completion evidence는 무엇인가?

### 4.2 주요 사용자

- Regulatory Affairs
- Regulatory CMC
- Regulatory Operations/publishing
- Quality Assurance
- Labeling/artwork/e-labeling
- Pharmacovigilance
- Inspection-readiness team
- Small biotech 및 virtual pharmaceutical company
- Regulatory consultant
- FDA/EMA 업무로 이동하려는 early-career professional

### 4.3 제품이 아닌 것

- Final regulatory determination system
- Legal 또는 product-specific regulatory advice
- Unconstrained LLM chatbot
- Confidential dossier repository
- Validated GxP system of record
- Enterprise RIM replacement
- FDA/EMA affiliation 또는 agency-endorsed tool

현재 public MVP에서는 confidential product, patient, clinical subject, proprietary manufacturing 또는 dossier data를 입력하거나 저장해서는 안 된다.

---

## 5. 현재 실제 구현 범위

### 5.1 Technology stack

| 영역                     | 현재 구현                        |
| ------------------------ | -------------------------------- |
| Framework                | `Next.js 16.2.10` App Router     |
| UI runtime               | `React 19.2.7`                   |
| Language                 | `TypeScript 6.0.3`, strict mode  |
| Styling                  | `Tailwind CSS 4.3.2`             |
| Runtime validation       | `Zod 4.4.3`                      |
| Unit/component tests     | `Vitest 4.1.10`, Testing Library |
| Browser tests            | `Playwright 1.61.1`              |
| Accessibility            | `@axe-core/playwright 4.12.1`    |
| CI                       | GitHub Actions                   |
| Hosting                  | Vercel Git integration           |
| Runtime Node requirement | `>=24.18.0`                      |

현재 없는 infrastructure:

- Database
- CMS
- Authentication/authorization
- User account
- File upload
- Analytics
- Search engine/index
- External LLM runtime
- Scheduled regulatory-source monitor
- Newsletter provider
- Payment
- Private workspace

### 5.2 현재 route inventory

```text
/
/about
/applications
/corrections
/editorial-policy
/lifecycle-changes
/methodology
/privacy
/regulatory-updates
/regulatory-updates/[slug] (8 static records)
/submission-navigator/ctd
/submission-navigator/ctd/module-2/quality-overall-summary
/submission-navigator/ctd/module-3
/submission-navigator/ctd/module-3/drug-product
/submission-navigator/ctd/module-3/drug-product/3-2-p-1
/submission-navigator/ctd/module-3/drug-product/3-2-p-2
/submission-navigator/ctd/module-3/drug-product/3-2-p-3
/submission-navigator/ctd/module-3/drug-product/3-2-p-5
/submission-navigator/ctd/module-3/drug-product/3-2-p-7
/submission-navigator/ctd/module-3/drug-product/3-2-p-8
/submission-navigator/ctd/source-matrix
```

Public discovery endpoints:

```text
/manifest.webmanifest
/opengraph-image
/robots.txt
/sitemap.xml
```

`/lifecycle-changes`는 coverage가 얇은 planned route이므로 현재 `noindex, follow`이며 sitemap에서 제외된다. `/regulatory-updates`와 8개 source-checked detail route는 indexable하며 sitemap에 포함된다. `/applications`는 guide publication contract와 coverage roadmap을 제공하지만 source-backed checklist는 아직 없다.

`3.2.P.4`와 `3.2.P.6`은 planned 상태다. Module 1, 4, 5도 구현되어 있지 않다.

### 5.3 CTD section model

6개 available Drug Product section은 하나의 reusable `CtdSection` model과 공통 UI를 사용한다.

- `3.2.P.1 Description and Composition`
- `3.2.P.2 Pharmaceutical Development`
- `3.2.P.3 Manufacture`
- `3.2.P.5 Control of Drug Product`
- `3.2.P.7 Container-Closure System`
- `3.2.P.8 Stability`

각 section record가 표현하는 정보:

- Section purpose와 scope boundary
- Expected information과 conditional information
- Classification
- Official citations
- Source documents와 source data
- Owner, contributor, approver
- Dependencies와 prerequisites
- Cross-references와 downstream outputs
- Authoring questions와 SME questions
- Expected tables와 figures
- Consistency checks
- Reviewer questions
- Common deficiency/risk signals
- Inspection relevance
- Source status
- Editorial-review status
- Last-verification date
- Content/source version history
- Readiness context

Regulatory business data는 `src/data/ctd/`, schema와 deterministic logic은 `src/lib/ctd/`, reusable UI는 `src/components/ctd/`에 분리되어 있다. UI component 자체가 regulatory conclusion을 암묵적으로 결정하지 않는다.

### 5.4 Deterministic readiness

지원하는 state:

```text
not_ready
ready_for_initial_drafting
ready_for_final_authoring
reviewer_ready
```

`evaluateAuthoringReadiness`는 visible/tested rule로 다음을 평가한다.

- Critical source missing 여부
- Core source가 draft 또는 unapproved인지
- Required dependency가 unresolved인지
- Required citation이 존재하는지
- Critical consistency check가 unresolved 또는 unable-to-compare인지
- Review comment closure 상태
- Source/content verification metadata
- Current content/source set에 유효한 approved review evidence

이는 agency completeness, filing acceptability 또는 product-specific readiness 결정이 아니다. Demonstration authoring workflow state일 뿐이다.

### 5.5 Review-record gate

`ReviewRecord`에는 다음이 포함된다.

- Reviewer identity
- Reviewer role
- Qualifications
- Review date
- Result
- Notes
- Content version
- SHA-256 `sourceSetHash`

`human_reviewed` 상태가 되려면 approved `ReviewRecord`가 현재 section, 현재 content version, 현재 source set과 일치해야 한다. 또한 review date는 content/source verification 이후여야 하며 reviewer metadata도 일치해야 한다.

현재 live demonstration record의 `reviewRecords`는 모두 빈 배열이다. Test fixture에 있는 synthetic review record는 code path 검증용이며 실제 regulatory review evidence가 아니다. 따라서 site는 sample content를 `Editorial draft — source verification required`로 유지한다. 이는 미완료 사항이지만 동시에 제품의 honesty control이 작동한다는 증거다.

### 5.6 Source/content versioning과 integrity

구현된 검증:

- Citation ID integrity
- Source version validation
- Expectation-to-citation mapping
- Complete source-set fingerprint
- Source version history
- Content version history
- Superseded/current status separation
- Current `M4Q(R1)`과 draft future-readiness `M4Q(R2)` 분리

현재 source catalog는 ICH, FDA, EMA의 5개 official URL을 포함하며 `2026-07-13`에 link/status가 확인되었다. Source URL 확인과 editorial synthesis의 qualified review는 별개로 취급한다.

### 5.7 Module 2.3 traceability

Linked `Quality Overall Summary` route는 다음 관계를 보여준다.

```text
2.3.P.1 ↔ 3.2.P.1
2.3.P.2 ↔ 3.2.P.2
2.3.P.3 ↔ 3.2.P.3
2.3.P.5 ↔ 3.2.P.5
2.3.P.7 ↔ 3.2.P.7
2.3.P.8 ↔ 3.2.P.8
```

Summary item에서 supporting Module 3 source document와 consistency check까지 추적할 수 있다.

### 5.8 Cross-module consistency

현재 deterministic check 예시:

- Composition와 batch formula 간 정합성
- Pharmaceutical development rationale와 manufacture/control strategy 간 정합성
- Container-closure information과 stability evidence 간 정합성
- `Module 2.3`과 `Module 3` source version 간 정합성

Critical inconsistency가 unresolved이면 `reviewer_ready`를 허용하지 않는다.

### 5.9 Source-to-CTD matrix와 export

구현된 사용자 기능:

- Source status filter
- Source readiness filter
- Missing/unapproved evidence visibility
- Source-to-section mapping
- CSV export
- Section text authoring-packet export
- Print layout
- Progressive disclosure
- Keyboard interaction
- Desktop/mobile responsive rendering

Export는 non-confidential demonstration metadata와 prompts를 제공하며 finished regulatory prose를 자동 생성하지 않는다.

### 5.10 Methodology와 safety boundary

`/methodology`는 다음을 공개한다.

- Primary official sources 우선순위
- Required, conditional, recommended, potentially impacted, best practice, undetermined 구분
- Deterministic readiness 원칙
- Human-review limitation
- FDA, EMA, EC, ICH와 무관한 independent prototype임
- Legal/regulatory advice 또는 GxP system이 아님

### 5.11 Public trust, privacy, discovery, and response hardening

Current branch에는 다음 production-readiness layer가 local로 구현되어 있다.

- `/about`: current coverage와 product/non-product boundary
- `/editorial-policy`: source hierarchy, classification meaning, qualified review, versioning, correction, AI boundary
- `/privacy`: browser-only Home query, no-account/no-upload, infrastructure boundary, confidential-data prohibition
- `/corrections`: public GitHub issue 기반 content feedback process와 confidential-data warning
- Footer-wide trust navigation, release version, content metadata date
- Canonical metadata, WebSite JSON-LD, `robots.txt`, `sitemap.xml`, web manifest
- Generated Open Graph image와 large-image social card metadata
- Global CSP, HSTS, COOP, clickjacking, MIME-sniffing, referrer, permission headers

이 hardening은 production에 아직 배포되지 않았다. Merge/deploy 후 실제 response와 public route를 다시 검증해야 한다.

---

## 6. 검증 증거

### 6.1 Latest local validation

검증일 `2026-07-16`:

| Check                                            | 결과                       |
| ------------------------------------------------ | -------------------------- |
| Prettier format check                            | `pass`                     |
| ESLint                                           | `pass`, zero warnings      |
| strict TypeScript                                | `pass`                     |
| Vitest                                           | `11 files / 43 tests pass` |
| Next.js production build                         | `pass`                     |
| Static/SSG output                                | `35 pages`                 |
| Playwright local production server               | `88/88 pass`               |
| axe WCAG A/AA on Home, Updates, and reference    | detected violation `0`     |
| Keyboard, filters, export, print, console checks | `pass`                     |
| Security header and social image route checks    | `pass`                     |
| Desktop/mobile checks                            | `pass`                     |
| Browser visual/interaction check                 | `pass`                     |

`npm audit`는 이번 hardening validation에서 다시 실행하지 않았다. Previous baseline 결과와 current audit 결과를 혼동하지 않는다.

### 6.2 Production baseline validation

- Production baseline Playwright: `28/28 pass`
- Prominent official-source URLs: unique `5/5`, HTTP `200`
- `/` 및 baseline CTD/methodology route: HTTP success

Production baseline과 latest branch test 수가 다른 이유는 latest branch에 route와 behavior가 추가되었기 때문이다.

### 6.3 Remaining gate

Phase 2 exit criteria 중 기술적 항목은 대부분 충족했지만 다음은 미충족이다.

> 모든 sample regulatory content가 source-linked이고 qualified human-reviewed일 것.

Source link/schema는 존재하지만 실제 qualified review evidence가 없다. 따라서 Phase 2를 완전히 종료했다고 표현해서는 안 된다.

---

## 7. 아직 구현되지 않은 것

### 7.1 Public content/update layer

- FDA update list/detail
- EMA update list/detail
- `What changed / Why it matters / Action required` pages
- MDX 또는 다른 article content system
- Update filter/search
- Update RSS output
- Source RSS/API ingestion
- Automated diff/deduplication
- Human editorial queue
- Correction submission workflow
- Sitemap/robots/Article structured data
- Analytics/Search Console
- Newsletter/digest
- 8개 flagship guide/template
- Custom domain

### 7.2 Broader workflows

- Change Impact Navigator
- Inspection Readiness
- FDA PAI traceability workspace
- Labeling & e-Labeling hub
- FDA SPL/EMA ePI comparison tool
- Application Planner
- Regional Module 1 builders
- Claim-to-Evidence Matrix UI
- Full cross-module checker
- Saved workspaces 또는 alerts

### 7.3 Platform capabilities

- User accounts
- Persistence
- Database
- Role-based access
- Audit trail
- Confidential workspace
- API
- Payment
- Team collaboration
- Validated electronic record/e-signature controls

이 부재는 bug가 아니라 현재 MVP scope와 safety boundary의 결과다.

---

## 8. FDA/EMA update section이 처음에 보이지 않았던 이유와 현재 상태

### 8.1 직접적인 이유

이 report의 최초 baseline에서 app에는 update route와 content가 없었고, Home은 두 가지 action만 강조했다.

1. `Open CTD Builder`
2. `Review methodology`

Navigation에도 Regulatory Updates entry가 없다. 따라서 FDA/EMA update를 찾을 수 없었던 것은 UI hiding이나 Vercel deployment problem이 아니라 미구현 상태였다.

2026-07-16 implementation update:

- Home은 LLM-style natural-language entry인 `Ask Regulatory Execution Hub`로 재설계되었다.
- 현재 질문 처리는 browser-only deterministic routing이다. External LLM call, answer generation, query storage는 없다.
- Top-level IA는 `Applications`, `Lifecycle Changes`, `Updates`, `CTD Workspace`, `Methodology`로 확장되었다. CTD는 전체 제품이 아니라 첫 live execution layer로 표시된다.
- Application과 lifecycle coverage landing은 추가되었지만 아직 source-backed guide record는 없다.
- Available CTD/QOS/source/methodology page는 실제 link로 안내한다.
- FDA Initial IND, EMA Centralised MAA, lifecycle support query는 존재하지 않는 답이나 link를 만들지 않고 `Planned`로 표시한다. FDA/EMA Updates query는 `Available`이며 live snapshot으로 연결된다.
- FDA 4개와 EMA 4개의 source-checked record가 추가되었다. 각 record에는 official source status, document status, source date, last verification date, editorial status, applicability boundary가 있다.
- FDA draft guidance는 `Draft — not for implementation`과 comment deadline을 명시한다. EMA impact는 자동 분류하지 않고 `potentially_impacted` 또는 conditional boundary로 표현한다.
- Canonical metadata, `robots.txt`, `sitemap.xml`, web manifest, WebSite JSON-LD가 local branch에 구현되었다. Source content가 없는 lifecycle route만 `noindex`이며 Updates index/detail route는 sitemap에 포함된다.
- Continuous monitoring, RSS, filter/search, digest, automated diff, qualified regulatory review는 아직 backlog다. 그러므로 현재 Updates는 실시간 news service가 아니라 `2026-07-16`에 검증한 manual snapshot이다.

### 8.2 Project sequencing의 이유

Canonical `blueprint_v0.2.md`는 원래 다음 순서를 정의했다.

```text
Phase 0 — Foundation and Scope Lock
Phase 1 — Public Content MVP
Phase 2 — CTD Authoring Foundation
Phase 3 — Change Impact Navigator MVP
Phase 4 — Inspection Readiness MVP
Phase 5 — Labeling & e-Labeling
Phase 6 — Submission Navigator Expansion
Phase 7 — Accounts and Commercial Validation
```

Phase 1 deliverable에는 Home, FDA Updates, EMA Updates, guide pages, Methodology, MDX, filters, citations, sitemap, RSS, analytics, Vercel, custom domain이 포함되어 있었다.

그러나 actual implementation prompt인 `codex_master_build_prompt.md`는 전체 blueprint를 구현하지 말고 `CTD Authoring & Dossier Builder — Module 3 Drug Product Foundation` 한 vertical slice만 만들라고 명시했다. 그 결과 foundation과 CTD architecture가 먼저 구현되었고 Phase 1 content/update acquisition layer는 아직 시작되지 않았다.

### 8.3 이것이 제품 문제인가?

Engineering 관점에서는 reusable regulatory schema, deterministic rules, testing discipline을 먼저 증명했다는 장점이 있다. 그러나 public product 관점에서는 다음 문제가 있다.

- 첫 방문자가 FDA/EMA update platform이라는 전체 vision을 알기 어렵다.
- Home이 CTD-only product처럼 보인다.
- Fresh content가 없어 repeat visit 이유가 약하다.
- Search/SEO acquisition surface가 거의 없다.
- Update → impact → navigator로 이어지는 funnel이 없다.
- Blueprint의 가장 대중적인 value proposition이 화면에 나타나지 않는다.

Home redesign으로 전체 vision과 missing coverage visibility는 일부 개선되었다. 그러나 fresh source-verified content와 update → impact → navigator funnel은 아직 없으므로, 다음 implementation slice는 Phase 3로 바로 넘어가기보다 **Phase 1 Regulatory Updates MVP와 Application Preparation source foundation을 복구하는 것**이 합리적이다.

---

## 9. FDA/EMA Regulatory Updates MVP 제안

### 9.1 제품 원칙

Generic news feed를 만들지 않는다. FDA와 EMA가 이미 많은 news와 update를 게시하므로 단순 headline 복제는 차별성이 약하다. 우리의 value는 각 official update를 실제 regulatory execution으로 변환하는 것이다.

각 published update는 최소한 다음 질문에 답해야 한다.

1. `What changed?`
2. `What did not change?`
3. `Why does it matter?`
4. `Who may be affected?`
5. 어떤 submission/CTD/QMS/labeling workflow가 potentially impacted인가?
6. 어떤 action을 지금, 나중에, 또는 사실 확인 후 해야 하는가?
7. Effective date, comment deadline, transition은 무엇인가?
8. Official controlling source는 무엇인가?
9. 어떤 assumption과 uncertainty가 남아 있는가?

### 9.2 제안 route

```text
/regulatory-updates
/regulatory-updates/fda
/regulatory-updates/ema
/regulatory-updates/[agency]/[slug]
/guides
/guides/[slug]
/templates
/methodology/sources
/methodology/editorial-review
/methodology/corrections
/rss.xml
/sitemap.xml
```

European Commission 소유 update는 EMA로 오표기하지 않아야 한다. UI top-level은 user-friendly하게 `EU/EMA`로 묶을 수 있지만 record의 `sourceOwner`는 `EMA` 또는 `European Commission`으로 정확히 구분해야 한다.

### 9.3 Official source foundation

#### FDA

| Source                                                                                                                                 | 권장 용도                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [FDA Guidance Search](https://www.fda.gov/regulatory-information/search-fda-guidance-documents)                                        | Draft/final guidance metadata, publication/comment dates, topic filtering |
| [FDA Guidance explanation](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidances)                         | Guidance의 legal/status context 확인                                      |
| [What’s New Related to Drugs](https://www.fda.gov/drugs/news-events-human-drugs/whats-new-related-drugs)                               | Drug-related broad update discovery                                       |
| [FDA RSS subscriptions](https://www.fda.gov/about-fda/contact-fda/subscribe-podcasts-and-news-feeds)                                   | RSS-first scheduled discovery                                             |
| [Newly Added Guidance Documents](https://www.fda.gov/drugs/guidances-drugs/newly-added-guidance-documents)                             | 새 guidance 목록 및 status/date 확인                                      |
| [Pharmaceutical Quality Documents](https://www.fda.gov/drugs/pharmaceutical-quality-resources/search-pharmaceutical-quality-documents) | Guidance, MAPP, compliance program 등 quality-specific discovery          |
| [FDA Federal Register page](https://www.federalregister.gov/agencies/food-and-drug-administration)                                     | Proposed/final rule, notice, hearing, comment deadline discovery          |
| [Federal Register API](https://www.federalregister.gov/developers/documentation/api/v1)                                                | Agency/date/type filter 기반 metadata ingestion                           |
| [Regulations.gov API](https://open.gsa.gov/api/regulationsgov/)                                                                        | Docket/document/comment metadata 검색                                     |

중요한 법적 표시: FederalRegister.gov는 discovery와 machine-readable access에는 유용하지만 자체 설명상 official legal edition을 대체하지 않는다. 중요한 legal claim은 linked official PDF/govinfo 또는 controlling text로 다시 확인해야 한다.

#### EMA 및 European Commission

| Source                                                                                                                                                                      | 권장 용도                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [EMA RSS feeds](https://www.ema.europa.eu/en/news-events/rss-feeds)                                                                                                         | Public consultation, regulatory/procedural guideline, scientific guideline, inspection 등 분류별 discovery |
| [EMA What’s New](https://www.ema.europa.eu/en/news-events/whats-new)                                                                                                        | Broad discovery; high-volume이므로 dedup/filter 필요                                                       |
| [EMA Human Regulatory Overview](https://www.ema.europa.eu/en/human-regulatory-overview)                                                                                     | Procedure/topic source map                                                                                 |
| [EMA Scientific Guidelines](https://www.ema.europa.eu/en/human-regulatory-overview/research-development/scientific-guidelines)                                              | Scientific guideline discovery/status 확인                                                                 |
| [EMA Post-authorisation](https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation)                                                                         | Lifecycle procedural Q&A 및 tracked-change update 확인                                                     |
| [EMA Marketing Authorisation Guidance Documents](https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/marketing-authorisation-guidance-documents) | Pre/post-authorisation procedural document discovery                                                       |
| [European Commission EudraLex](https://health.ec.europa.eu/medicinal-products/eudralex_en)                                                                                  | EU pharmaceutical rules 및 legal-source hierarchy                                                          |
| [EudraLex Volume 4](https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-4_en)                                                                           | EU GMP guideline source                                                                                    |

EMA `What’s New`는 medicine page, document, news, procedural item 등 다양한 유형을 많이 포함한다. 따라서 page timestamp만 보고 “regulatory requirement changed”라고 게시해서는 안 된다.

### 9.4 Update record schema

제안하는 최소 record:

```yaml
id: fda-2026-example-slug
agency: FDA
jurisdiction: United States
sourceOwner: FDA
title: ""
sourceType: guidance
sourceStatus: draft | final | proposed_rule | final_rule | procedural_update | technical_standard
topicTags:
  - CMC
  - labeling
publishedDate: YYYY-MM-DD
effectiveDate: YYYY-MM-DD | null
commentDeadline: YYYY-MM-DD | null
detectedDate: YYYY-MM-DD
lastVerifiedDate: YYYY-MM-DD
officialUrl: ""
officialDocumentId: ""
supersedes: []
supersededBy: null
affectedFunctions: []
affectedProcedures: []
impactLevel: low | medium | high | critical
impactApprovalStatus: pending | approved
reviewStatus: detected | triaged | drafted | reviewed | published | superseded
reviewer: null
contentVersion: "1.0.0"
sourceHash: "sha256:..."
```

`sourceStatus`, `reviewStatus`, `lastVerifiedDate`를 혼합하지 않는 것이 중요하다. Official document가 `final`이어도 우리 analysis는 `drafted`일 수 있다.

### 9.5 Update article template

모든 detail page가 같은 구조를 가져야 한다.

1. One-sentence summary
2. What changed
3. What did not change
4. Why it matters
5. Who may be affected
6. Potential submission impact
7. Potential quality-system impact
8. Potential labeling/e-labeling impact
9. Recommended next actions
10. Questions to confirm internally
11. Effective date, deadline, transition
12. Official sources
13. Assumptions and limitations
14. Version history and correction history

### 9.6 Safe ingestion workflow

```text
Scheduled RSS/API/official-page check
    ↓
Normalize canonical URL and document identifier
    ↓
Record source metadata and calculate content hash
    ↓
Deduplicate and detect new/changed source
    ↓
Classify change event: content / document / metadata / link / formatting
    ↓
Generate machine-assisted diff and candidate tags
    ↓
Human triage
    ↓
Draft impact analysis with citations
    ↓
Qualified or appropriately scoped human review
    ↓
Publish with version and last-verification metadata
```

자동화가 담당할 수 있는 것:

- Discovery
- URL normalization
- Hashing
- Candidate duplicate detection
- Diff generation
- Candidate topic/function tags
- Draft summary

자동화가 단독으로 결정해서는 안 되는 것:

- New legal/regulatory requirement 여부
- Applicability
- `impactLevel`
- Product-specific conclusion
- Effective implementation action
- Final publication

### 9.7 “Updated”와 “substantively changed” 구분

Monitor는 최소한 다음 event를 구분해야 한다.

- Meaningful text change
- Entire document replacement
- New revision 또는 tracked-change file
- Metadata-only change
- Formatting-only change
- Broken-link correction
- Page navigation change
- Supersession/withdrawal
- Genuinely new requirement 또는 recommendation

이 구분이 없으면 false alert가 쌓이고 사용자가 feed를 신뢰하지 않게 된다.

### 9.8 초기 implementation architecture

처음에는 database보다 Git-reviewed static content가 안전하다.

```text
src/lib/updates/schema.ts
src/lib/updates/integrity.ts
src/lib/updates/presentation.ts
src/data/updates/*.ts or content/updates/*.mdx
src/app/regulatory-updates/page.tsx
src/app/regulatory-updates/fda/page.tsx
src/app/regulatory-updates/ema/page.tsx
src/app/regulatory-updates/[agency]/[slug]/page.tsx
src/app/rss.xml/route.ts
src/app/sitemap.ts
```

권장 content pattern:

- Typed metadata: Zod-validated TypeScript/YAML/JSON
- Long-form analysis: MDX
- CI gate: required metadata, citations, dates, reviewer state, broken link, schema, build, accessibility
- Scheduled monitor: GitHub Action 또는 Vercel Cron
- Monitor output: unpublished artifact 또는 review queue
- Publication: human-reviewed pull request merge

직접 auto-publish보다 PR-based review가 현재 solo MVP governance와 더 잘 맞는다.

### 9.9 Initial flagship content

Canonical blueprint가 제안한 첫 8개 content:

1. How to assess an FDA regulatory update
2. How to assess an EMA procedural update
3. FDA post-approval change framework
4. EMA variations framework
5. FDA SPL vs EMA ePI
6. FDA PAI application-to-site traceability
7. Regulatory Impact Assessment template
8. Dossier-to-Site Traceability Matrix template

이 중 1–2번은 update methodology의 trust foundation이고, 3–8번은 search acquisition과 future navigator로 연결된다.

---

## 10. 제품 개선 우선순위

### P0 — 제품 정체성과 public usefulness 복구

1. Home을 전체 vision에 맞게 재구성한다. — first guided-search slice implemented locally on 2026-07-16
2. `Regulatory Updates` navigation과 FDA/EMA landing page를 만든다.
3. 최소 4개의 reviewed 또는 명확히 draft-labeled flagship page를 먼저 공개한다.
4. Update/article schema, citation gate, review/version metadata를 구현한다.
5. Sitemap, RSS, metadata, Article/Breadcrumb structured data를 추가한다.
6. Correction/contact path를 만든다.
7. PR #2를 review/merge하고 expanded CTD를 production에서 재검증한다.

Home에 필요한 section:

- Hero: submission, change, inspection, labeling support를 10초 안에 설명
- Critical/Recent Updates
- Start by Task
- Featured Guides
- CTD Builder entry
- Trust panel
- Visible last-verification date
- Clear editorial/GxP limitation

### P0 — Regulatory governance 완성

1. 실제 qualified reviewer 후보와 review scope를 정의한다.
2. Content author와 reviewer role을 구분하여 기록한다.
3. Review interval과 stale threshold를 topic/source type별로 정한다.
4. Correction SLA와 material correction log를 정의한다.
5. `human_reviewed`를 reviewer record 없이 절대 표시하지 않는다.
6. EC-owned source를 EMA requirement로 잘못 attribution하지 않는다.

### P1 — Discovery와 repeat use

- Agency/topic/source status/impact/date filter
- Keyword search
- Saved filter는 local browser state부터 시작
- Weekly RSS/digest
- Source freshness dashboard
- Related update → guide → navigator links
- Deadline calendar export는 정확한 date governance가 준비된 후 추가
- Zero-result search logging
- Privacy-conscious analytics

### P1 — CTD product depth

- `3.2.P.4 Control of Excipients`
- `3.2.P.6 Reference Standards or Materials`
- Claim-to-Evidence Matrix
- More detailed late-change impact map
- Current vs superseded source comparison
- Reviewer-readiness report export
- Separate FDA/EMA Module 1 readiness

### P2 — Workflow expansion

- Change Impact Navigator
- Inspection Readiness
- Labeling & e-Labeling
- Application Planner
- Accounts/alerts only after repeat-use evidence

### 지금 추가하지 말아야 할 것

- Unconstrained chatbot that gives final answers
- Confidential document upload
- Product-specific classification without validated evidence/rules
- Automatic publication of AI-generated interpretation
- Enterprise multi-tenant database before demand validation
- Payment before useful repeat workflow가 확인되기 전

---

## 11. UX 및 information architecture 개선안

### 11.1 현재 UX 문제

- Home이 전체 product보다 first CTD slice만 설명한다.
- FDA/EMA update path가 없다.
- User intent별 entry point가 부족하다.
- “무엇이 live이고 무엇이 planned인지”를 일반 사용자가 알기 어렵다.
- Trust와 limitation은 잘 표현되지만 professional profile과 correction path가 없다.

### 11.2 제안 top navigation

```text
Updates
Submission Navigator
Change Impact
Inspection Readiness
Labeling & e-Labeling
Templates
Methodology
```

아직 미구현인 area는 empty marketing page보다 `Planned` label과 bounded explanation을 제공하거나 navigation에서 숨기는 편이 낫다. 기능이 있는 것처럼 보이게 해서는 안 된다.

### 11.3 Update card design

각 card에 노출할 최소 정보:

- Agency/source owner
- Source type/status
- Title
- One-sentence practical impact
- Published/effective/comment date
- Topic tags
- `impactLevel`
- `reviewStatus`
- `lastVerifiedDate`
- Official source link

### 11.4 Trust design

Badge가 과도하게 늘어나지 않도록 3개의 축만 일관되게 표시한다.

1. `sourceStatus`
2. `reviewStatus`
3. `lastVerifiedDate`

Applicability와 impact는 별도 explanation panel에서 reason과 missing facts를 함께 보여준다.

### 11.5 Accessibility

현재 axe/keyboard baseline을 유지하면서 다음을 추가한다.

- Filter state와 result count의 screen-reader announcement
- Date/impact를 color 외 text로도 표현
- Table의 mobile alternative
- Diff viewer의 added/removed text semantic labeling
- Skip links와 visible focus
- RSS/search/correction form의 keyboard testing

---

## 12. Content, SEO 및 distribution 개선안

### 12.1 Search strategy

Broad “FDA news” 경쟁보다 high-intent query를 겨냥한다.

- FDA guidance change impact
- EMA procedural update practical impact
- FDA post-approval manufacturing change checklist
- EMA variation supporting documents
- CTD `3.2.P.5` source documents
- FDA PAI dossier-to-site traceability
- FDA SPL vs EMA ePI

### 12.2 Technical SEO

- Unique title/description
- Canonical URL
- XML sitemap
- RSS feed
- Article structured data
- Breadcrumb structured data
- Visible author/reviewer/updated date
- Internal related-content link
- `robots.txt`
- Search Console submission
- Core Web Vitals monitoring

### 12.3 Distribution loop

```text
Official update detected
    ↓
Reviewed practical analysis published
    ↓
RSS / weekly brief / LinkedIn summary
    ↓
Guide or navigator entry
    ↓
User feedback and correction
    ↓
Content/rule improvement
```

Newsletter는 content quality와 review capacity가 안정된 후 시작한다. 빈도를 약속하고 지키지 못하는 것보다 curated weekly/biweekly brief가 낫다.

---

## 13. Engineering 및 data architecture 개선안

### 13.1 현재 architecture의 강점

- Business data/rules와 UI separation
- Strict schema validation
- Deterministic readiness
- Versioned content/source model
- Strong test baseline
- Static/public design으로 security surface가 작음

### 13.2 가까운 개선

- Update domain을 `ctd`와 독립된 `src/lib/updates/`로 구성
- Shared `OfficialSource`, `ReviewRecord`, `VersionHistory` primitives 추출
- Build-time content integrity check
- Link-health job은 transient error tolerance와 retry 포함
- Date parsing/timezone test
- URL normalization/dedup test
- RSS parser fixtures
- Source hash/diff fixtures
- Publication state transition test
- Sitemap/RSS E2E test

### 13.3 Database 도입 시점

초기 public update pages는 Git-based static content로 충분하다. 다음 요구가 실제로 발생할 때 database를 검토한다.

- Saved assessments
- Personalized alerts
- User-specific source watchlist
- Team assignments
- Review queue with multiple editors
- Audit/history querying

그 전에는 database가 governance보다 complexity를 먼저 늘릴 가능성이 높다.

### 13.4 Monitoring reliability

Source monitor에 필요한 observability:

- Last successful check
- HTTP status/error
- Parsed item count
- New/change/duplicate count
- Hash change reason
- Retry count
- Stale source alert
- Manual override 기록

Source failure는 “no updates”로 처리하지 말고 `monitor_failed` 또는 `verification_due`로 visible하게 구분해야 한다.

---

## 14. Security, privacy, quality boundary

현재는 public source와 non-confidential demonstration data만 사용하므로 위험이 제한적이다. 다음 원칙을 계속 유지해야 한다.

- Secrets를 code, content, issue, screenshot에 넣지 않음
- Confidential product/patient/dossier input을 받지 않음
- User-uploaded evidence를 현재 scope에 추가하지 않음
- Official agency logo를 site branding으로 사용하지 않음
- Long official documents를 그대로 복제하지 않고 요약/citation 중심으로 사용
- Human review 없이 final regulatory interpretation으로 publish하지 않음
- Public tool을 regulated decision의 sole system of record로 표현하지 않음

Current branch에서 global response header를 추가했다.

- CSP는 default/network/image/font/manifest/object/script/style/worker source를 제한하고 framing과 object embedding을 차단한다.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS, COOP를 적용한다.
- Home query는 browser-side deterministic router이며 query text를 URL에 넣거나 external LLM에 보내지 않는다.
- 이 header들은 local production server에서 검증됐지만 public production response에서는 deployment 후 재검증해야 한다.

향후 private workspace를 만들기 전에는 authentication, authorization, encryption, backup/recovery, audit log, retention, incident response, privacy/terms, vendor assessment, security testing, validation assessment가 먼저 필요하다.

---

## 15. 제안 phased roadmap

아래 순서는 original blueprint를 현재 구현 상태에 맞게 재정렬한 권고안이다. 기간은 team capacity와 reviewer availability에 따라 달라지며 commitment가 아니다.

### Stage A — 현재 branch release와 product truth 정리

목표:

- PR #2 code review
- Merge 후 production deployment
- Expanded route/security/social/governance/update `88/88` equivalent production test
- README/status/documentation update
- Production과 planned feature의 명확한 구분
- Domain과 hosting plan을 non-commercial prototype 또는 commercial launch 용도에 맞게 결정

Exit criteria:

- Latest hardening이 public production에 있음
- 모든 production route가 success
- Accessibility/export/print/filter가 public URL에서 재검증됨
- Human review 미완료 상태가 그대로 visible함
- `/about`, `/editorial-policy`, `/privacy`, `/corrections`와 security headers가 public production에서 확인됨
- Social preview, canonical, robots, sitemap, noindex boundary가 production에서 확인됨

### Stage B — Regulatory Updates foundation

2026-07-16 implementation status:

- Zod-validated update schema와 FDA/EMA official-host restriction 구현
- FDA 4개와 EMA 4개의 `source_checked` record 구현
- `/regulatory-updates` index와 8개 static detail page 구현
- Home query와 product area에서 Updates를 `Available`로 연결
- Draft/final/effective/updated status, comment deadline, source/editorial/date/applicability metadata 표시
- Sitemap, route, mobile/desktop, axe WCAG A/AA validation 구현
- Qualified review, recurring monitoring, RSS, filter/search, structured data는 pending

목표:

- Update schema와 integrity rules
- FDA/EMA/EU source registry
- `/regulatory-updates` route set
- Filter/search baseline
- Update detail template
- Sitemap/RSS/structured data
- Correction path

Exit criteria:

- 최소 4개 high-quality update/guide page
- 모든 material claim에 official citation
- Source/review/version/date metadata complete
- Draft content가 published/reviewed처럼 보이지 않음
- No critical broken links

### Stage C — Public Content MVP 완성

목표:

- 8개 flagship content
- Home redesign
- Source freshness dashboard
- Basic privacy-conscious analytics
- Search Console
- Weekly/biweekly digest pilot

Exit criteria:

- 8개 page 모두 review state 명확
- User가 2 clicks 내 practical task 시작 가능
- Search와 filters가 mobile/keyboard에서도 작동
- Content correction/version workflow가 실제로 한번 검증됨

### Stage D — Phase 2 regulatory review closure

목표:

- Qualified reviewer가 현재 CTD source/content set review
- Actual `ReviewRecord` 생성
- Reviewer comment 반영과 new content version 기록
- 필요하면 re-review

Exit criteria:

- Review record가 current version/hash와 일치
- Human-reviewed label이 evidence로 방어 가능
- 모든 Phase 2 exit criteria 충족

### Stage E — Change Impact Navigator MVP

초기 coverage:

- Agency: FDA, EMA/EU
- Application: NDA/ANDA, centralised MAA
- Change types: manufacturing site, process, specification, analytical method, container closure, labeling

필수 output:

- Preliminary pathway
- Confidence/uncertainty
- Missing facts
- Affected CTD sections
- External/internal document impact
- Function/owner/action map
- Source/reason explanation
- Printable/exportable result

Exit criteria:

- Approved deterministic rules와 official sources에 연결
- Missing data는 safe `undetermined`/blocked result
- AI-only runtime classification 없음
- Change category별 10개 이상 scenario tests

### Stage F — Inspection Readiness

- FDA PAI four-objective structure
- Dossier-to-site traceability matrix
- Document-room checklist
- Gap tracker
- FDA GMP overview
- EMA GMP/GCP/GVP landing pages

### Stage G — Labeling & e-Labeling

- FDA SPL hub
- EMA ePI hub
- Labeling Change Navigator
- e-Labeling readiness assessment
- Structured-content glossary/workflow diagrams

### Stage H — Accounts/commercial validation

Public repeat-use evidence가 확인된 후에만:

- Authentication
- Saved workspaces
- Personalized alerts
- Private notes
- Team pilot
- Export packages
- Terms/privacy/security controls
- Payment experiment

---

## 16. 30/60/90-day 권고 계획

이는 calendar promise가 아니라 우선순위 framework다.

### First 30 days

- PR #2 review/merge/production verification
- Home/IA redesign spec
- Update schema와 source registry
- FDA/EMA update list/detail prototype
- 2개 methodology guide 작성
- Sitemap/RSS/correction baseline
- Qualified reviewer outreach 시작

### By 60 days

- 8개 flagship content 중 최소 6개
- RSS/API monitor candidate pipeline
- Human triage queue
- Filter/search
- Source freshness dashboard
- Privacy-conscious analytics/Search Console
- 5–10명의 RA/QA/labeling user feedback session

### By 90 days

- 8개 flagship content 완료
- Update publication/correction cycle 실제 검증
- Phase 2 qualified review 또는 documented blocker
- Manufacturing-site Change Impact Navigator의 source package/rule prototype
- Usage/feedback evidence로 다음 investment 결정

---

## 17. 성공 지표

### Trust metrics

- Material claim citation coverage
- Current verification interval 내 page 비율
- Stale content count
- Source monitor success rate
- Correction count와 resolution time
- Published page 중 valid reviewer metadata 비율

### Product metrics

- Update detail view → guide/navigator click-through
- Filter/search use
- Checklist/authoring packet export
- Navigator start/completion
- Repeat visitor
- RSS/newsletter subscriber
- Zero-result search
- User-reported usefulness

### Quality metrics

- Broken critical link
- Missing required metadata
- False-positive source-change event
- Duplicate alert rate
- Content correction severity
- Accessibility critical issue
- Rule test coverage와 safe-failure rate

Vanity traffic보다 professional repeat use와 correction transparency가 중요하다.

---

## 18. 주요 위험과 mitigation

| 위험                      | 현재/향후 mitigation                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Regulatory inaccuracy     | Primary sources, review record, classification discipline, uncertainty, correction history |
| Stale content             | Scheduled monitoring, last verification, freshness queue, supersession logic               |
| Alert noise               | Hash/diff classification, deduplication, human triage                                      |
| AI hallucination          | No autonomous publishing, deterministic rules, citation/integrity gates                    |
| Scope explosion           | FDA/EMA/EU human medicines 중심, staged roadmap                                            |
| False product expectation | Live/planned status, no GxP/final determination claims                                     |
| Weak public value         | Updates/content layer, task-based Home, practical templates                                |
| No demand                 | Public alpha, interviews, usage evidence before accounts/payment                           |
| Reviewer bottleneck       | Narrow review scope, topic-specific reviewers, transparent draft status                    |
| Copyright/improper reuse  | Summarize/cite, limited excerpts, official links, no agency-logo branding                  |

---

## 19. 외부 ChatGPT/LLM reviewer에게 요청할 평가

다른 LLM의 review는 유용하다. 다만 LLM의 제안을 regulatory truth나 market validation으로 받아들이지 말고 hypothesis/backlog candidate로 취급해야 한다. Official source verification, qualified human review, 실제 사용자 인터뷰가 여전히 필요하다.

다음 질문을 중심으로 review를 요청하는 것이 좋다.

1. 이 제품의 target user와 core job-to-be-done이 충분히 명확한가?
2. Regulatory Updates, CTD Builder, Change Impact, Inspection, Labeling 간 연결이 자연스러운가?
3. Home에서 10초 내 value proposition을 이해할 수 있는가?
4. Update record/article schema에 빠진 regulatory governance field가 있는가?
5. Source hierarchy와 EMA/EC ownership 구분이 충분한가?
6. Human review와 versioning workflow에 취약점이 있는가?
7. 어떤 기능이 실제 RA/QA 사용자의 repeat use를 가장 크게 만들 것인가?
8. 어떤 기능은 과도한 scope거나 위험해서 뒤로 미뤄야 하는가?
9. FDA/EMA update feed를 generic aggregator와 차별화할 수 있는가?
10. Search/SEO와 professional distribution을 어떻게 강화할 수 있는가?
11. 어떤 user research 질문과 usability task를 먼저 테스트해야 하는가?
12. Commercialization 전에 어떤 evidence가 필요한가?

---

## 20. Copy/paste용 external review prompt

아래 prompt와 이 report 전체를 다른 ChatGPT/LLM에 전달할 수 있다.

```text
첨부된 보고서의 public FDA/EMA regulatory execution-support product를 검토하라. Repository 또는 desktop에는 접근할 수 없으므로 첨부 보고서를 현재 제품의 완전한 snapshot으로 취급하라.

회의적인 product strategist, senior Regulatory Affairs/Quality workflow designer, information architect, UX reviewer, content-governance reviewer, software architecture reviewer의 관점에서 평가하라. Official primary source 없이 규제 요건을 만들거나 어떤 제안이 법적으로 필수라고 주장하지 말라.

다음을 제공하라.

1. 이 제품이 실제적이고 일관된 user problem을 해결하는지에 대한 간결한 평가
2. 가장 중요한 누락 capability 10개를 user value, regulatory risk reduction, effort, dependency 기준으로 정렬한 결과
3. Source ownership, change detection, review, applicability, dates, supersession, correction workflow를 포함한 FDA/EMA Regulatory Updates model 비판
4. 필요할 경우 더 나은 information architecture와 Home page content hierarchy
5. Updates, CTD completion, Change Impact Navigator, Inspection Readiness, Labeling/e-Labeling 중 다음 우선순위와 근거
6. 명시적인 exit criteria와 아직 만들지 말아야 할 기능을 포함한 3-release MVP plan
7. RA, QA, CMC, Regulatory Operations, Labeling 사용자를 위한 user-research interview와 구체적인 usability test
8. Trust, quality, safety, privacy, security gap
9. Generic news가 되지 않으면서 professional user를 유입할 구체적인 SEO/content opportunity
10. 실제 professional usefulness와 vanity traffic을 구분하는 metric
11. 보고서의 모순, 근거 없는 assumption, scope risk, 혼란스러운 status 설명
12. 최종 KEEP / CHANGE / REMOVE / ADD table

required, conditional, recommended, potentially impacted, best practice, undetermined를 명확히 분리하라. 이 제품을 final regulatory 또는 legal determination이 아니라 educational decision support로 취급하라.
```

---

## 21. 최종 권고

현재 project는 “아무것도 없는 prototype”이 아니다. CTD authoring-support architecture, deterministic readiness, source/version integrity, review gate, linked Module 2.3 traceability, export, accessibility, CI, public deployment가 실제로 존재한다. 특히 review evidence 없이 `human_reviewed`를 표시하지 않는 통제는 신뢰 가능한 규제 제품의 좋은 foundation이다.

하지만 외부 사용자의 관점에서는 제품의 전체 promise가 아직 화면에 나타나지 않는다. 지금 가장 높은 가치의 다음 단계는 더 많은 CTD section을 무한히 늘리는 것이 아니라 다음 세 가지를 연결하는 것이다.

```text
Official FDA/EMA/EU update
    ↓
Reviewed practical impact explanation
    ↓
Relevant guide, CTD map, or future navigator action
```

따라서 권장 순서는 다음과 같다.

1. PR #2를 review/merge하고 latest CTD hardening을 production에 반영한다.
2. Phase 1 Regulatory Updates/content foundation을 P0로 구현한다.
3. Home을 전체 task-based product vision에 맞게 재설계한다.
4. Qualified review와 correction/freshness governance를 실제 운영한다.
5. 5–10명의 target professional에게 사용성/가치 검증을 받는다.
6. 그 evidence를 바탕으로 Change Impact Navigator를 다음 interactive workflow로 만든다.

이 순서라면 website는 단순 CTD demo나 generic news feed가 아니라, official source에서 practical execution까지 연결하는 독자적인 professional resource로 발전할 수 있다.
