# Regulatory Execution Hub — Living Product Plan

**Status:** Active planning document  
**Last updated:** 2026-07-16  
**Scope:** FDA/EMA/EU human medicinal products  
**Current branch:** `codex/home-v3-horizontal`

## 1. 문서 역할과 우선순위

이 문서는 현재 build 순서와 product decision을 관리하는 living plan이다.

- `blueprint_v0.2.md`: canonical long-range product blueprint
- `codex_master_build_prompt.md`: first CTD vertical slice의 authoritative implementation instruction
- `docs/FULL_PRODUCT_REPORT_AND_ROADMAP.md`: 2026-07-16 시점의 detailed product report
- `docs/EXTERNAL_REVIEW_DECISION_LOG.md`: 외부 GPT research report에 대한 수용·수정·유보 판단
- 이 문서: 지금부터 무엇을 어떤 순서로 구현할지 결정하는 current execution plan

Canonical blueprint의 regulatory/safety 원칙은 이 문서보다 우선한다. Build 순서가 다른 경우에는 이 문서의 current release sequence를 따른다.

## 2. Product positioning

> `Regulatory Execution Hub`는 FDA/EMA/EU official sources를 실무자가 submission, lifecycle change, CTD authoring, inspection 준비에 사용할 수 있는 cited checklist, source map, authoring packet으로 변환하는 public educational decision-support platform이다.

제품은 다음 세 가지를 연결해야 한다.

```text
Regulatory Updates
    ↓
Application & Lifecycle Preparation
    ↓
CTD Authoring, Consistency, and Reviewer Readiness
```

향후에는 이 foundation 위에 다음을 연결한다.

```text
Change Impact
    ↓
Inspection Readiness
    ↓
Labeling & e-Labeling
```

제품의 주력은 generic news aggregation이 아니라 `What do I prepare now?`에 답하는 execution layer다. 그러나 curated Updates는 freshness, discovery, SEO, source-change detection을 제공하므로 early product surface로 유지한다.

## 3. 고정된 product boundary

현재 제품은 다음이 아니다.

- Final regulatory determination
- Legal 또는 product-specific regulatory advice
- Unconstrained AI chatbot
- Confidential dossier repository
- Validated GxP system of record
- Enterprise RIM replacement
- Automatic regulatory publishing system

현재 phase에서는 다음을 수집하거나 저장하지 않는다.

- Confidential product 또는 manufacturing data
- Patient/clinical subject data
- Proprietary dossier documents
- Regulated electronic signatures
- Official approval records

## 4. Current verified state

### Production

- URL: `https://regulatory-execution-hub.vercel.app`
- Production branch: `main`
- Home V2 application commit: `ac6c3ad576edddf2e54819bc42477a540dfb9dd2`
- PR #2 and PR #3 merged; expanded CTD, Regulatory Updates, trust/policy/security/SEO layer, and Home V2 are public
- Latest verified production suite: desktop/mobile `88/88` pass

### Home V2 release record

- Historical branch: `codex/home-v2-production`
- Merged PR: `https://github.com/woojunxnam/regulatory-execution-hub/pull/3`
- State: Vercel production deployed and public-URL verified
- Local and production checks: format/lint/type-check, `11 files / 44 tests`, `35` routes, desktop/mobile `88/88` pass
- Qualified regulatory `ReviewRecord`: 없음
- Home V2 reduces the Home from about `652` to `330` words, from `5` to `3` top-level sections, and prioritizes live Updates/CTD tasks plus a deterministic page finder.
- Domain decision: use the existing `.vercel.app` URL only for a non-commercial public prototype; choose an owned custom domain and intended-use hosting plan before a commercial launch.

### Home V3 release candidate

- Current branch: `codex/home-v3-horizontal`
- State: local implementation and verification complete; review, merge, Vercel deployment, and public verification pending
- Layout: single vertical headline → task finder → compact live/planned coverage flow
- Density at `1280 × 720`: about `210 words`, `3` top-level sections, `1831px` page height
- Local checks: format/lint/type-check, `11 files / 44 tests`, `35` routes, desktop/mobile `88/88` pass
- Product boundary: deterministic page navigation only; no generated regulatory answer, persistence, external submission, or confidential-data intake

### Implemented core

- Six `Module 3 Drug Product` sections
- Linked `Module 2.3 Quality Overall Summary`
- Source-to-CTD Matrix
- Deterministic readiness
- Source/content version history
- Citation and source-set integrity
- Cross-module consistency rules
- Review-record gate
- Text/CSV export, print, accessibility, responsive behavior

## 5. Product area map

### 5.1 Regulatory Updates — discovery layer

목적:

- FDA/EMA/EC official change를 발견
- Substantive change와 metadata-only change를 구분
- 실무 영향과 관련 application/checklist/CTD section으로 연결

초기에는 manual/curated publication을 사용한다. Full automated ingestion, diff, tagging은 source/change schema가 검증된 뒤 추가한다.

### 5.2 Application & Lifecycle Preparation Hub — core execution layer

목적:

- RA가 준비 중인 submission/procedure를 선택
- Required, conditional, recommended, best practice, undetermined item을 분리
- Forms, source documents, CTD sections, owners, dependencies, completion evidence를 연결
- Checklist item별 official source를 제공

초기 coverage:

#### FDA

- Initial `IND`
- `NDA` / `505(b)(2)` readiness
- `ANDA` readiness
- `BLA` readiness
- IND amendments/reports
- NDA/ANDA post-approval changes
- BLA post-approval changes

#### EMA/EU

- Centralised `MAA`
- Generic/hybrid/biosimilar application context
- Type IA/IAIN/IB/II variations
- Extension, grouping, worksharing
- Renewal
- Transfer
- Article 61(3) notification
- PIP/waiver/compliance context
- CTIS CTA는 EMA marketing application과 구분하여 EU/Member State workflow로 표시

### 5.3 CTD Authoring & Dossier Builder — implemented core

각 CTD section을 file folder가 아니라 knowledge object로 관리한다.

- Purpose and boundary
- Expected/conditional information
- Source documents/data
- Owners and dependencies
- Authoring/SME questions
- Citation and version history
- Consistency and reviewer lens
- Readiness and review evidence

### 5.4 Consistency and Publishing QC

가까운 범위:

- Structured field consistency
- Citation/cross-reference integrity
- Source/content version mismatch
- Site/name/activity mismatch fixtures
- Golden questions and golden packets

현재 제외:

- Confidential PDF upload
- Production dossier parsing
- Automated final publishing QC claim

### 5.5 Change Impact Navigator

초기 change categories:

- Manufacturing site
- Manufacturing process
- Specification
- Analytical method
- Container closure
- Labeling

Output은 final classification이 아니라 source-backed preliminary pathway, missing facts, alternative possibilities, affected documents/CTD sections, required human review를 제공한다.

### 5.6 Inspection Readiness

- FDA PAI objective map
- Application-to-site traceability
- Document request list
- Dossier/site consistency
- Gap tracker
- EMA GMP/GCP/GVP landing coverage

### 5.7 Labeling & e-Labeling

- FDA SPL
- EMA ePI
- SmPC/PL/labeling relationship
- Labeling change navigator
- Structured-content readiness

### 5.8 Assistant, accounts, private workspace

RAG/assistant는 retrieval와 phrasing 보조 layer로만 검토한다. Deterministic rule 또는 human decision을 대체하지 않는다.

다음 evidence가 생기기 전에는 구현하지 않는다.

- Repeated public use
- Clear user demand
- Qualified review capacity
- Security/privacy architecture
- Private-data handling policy
- Measurable value from non-confidential workflows

## 6. Shared checklist and source model

Application checklist는 page-level bibliography가 아니라 item-level traceability를 사용한다.

```yaml
id: fda-ind-cover-sheet
agency: FDA
procedure: initial_ind
label: Include current Form FDA 1571
requirementClass: legally_required
applicability: initial_commercial_ind
sourceOwner: FDA
sourceType: regulation
sourceStatus: current
citation: 21 CFR 312.23(a)(1)
officialUrl: ""
sourceLocation: paragraph (a)(1)
lastVerifiedDate: YYYY-MM-DD
editorialReviewStatus: source_verification_required
owner: Regulatory Affairs
dependencies: []
affectedCtdSections: []
completionEvidence: []
version: "1.0.0"
```

필수 classification:

```text
legally_required
agency_procedural_requirement
conditional
agency_recommendation
potentially_impacted
best_practice
undetermined
```

Source status와 editorial review status는 별개 field로 유지한다.

## 7. Initial official source packages

### FDA reference package

- [`21 CFR 312.23`](https://www.ecfr.gov/current/title-21/part-312/section-312.23) — IND content and format
- [FDA IND Application resources](https://www.fda.gov/drugs/types-applications/investigational-new-drug-ind-application)
- [`21 CFR 314.50`](https://www.ecfr.gov/current/title-21/part-314/section-314.50) — NDA content and format
- [`21 CFR 314.54`](https://www.ecfr.gov/current/title-21/part-314/section-314.54) — `505(b)(2)` applications
- [`21 CFR 314.94`](https://www.ecfr.gov/current/title-21/part-314/section-314.94) — ANDA content and format
- [`21 CFR 314.70`](https://www.ecfr.gov/current/title-21/part-314/section-314.70) — Changes to approved NDA/ANDA
- [`21 CFR 601.2`](https://www.ecfr.gov/current/title-21/part-601/section-601.2) — BLA filing
- [`21 CFR 601.12`](https://www.ecfr.gov/current/title-21/part-601/section-601.12) — Changes to approved BLA
- [FDA Forms & Submission Requirements](https://www.fda.gov/drugs/development-approval-process-drugs/forms-submission-requirements)
- [FDA eCTD standards and Data Standards Catalog entrypoint](https://www.fda.gov/drugs/electronic-regulatory-submission-and-review/electronic-common-technical-document-ectd)
- [FDA ANDA Content and Format guidance](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/anda-submissions-content-and-format-abbreviated-new-drug-applications)
- [FDA Changes to an Approved NDA or ANDA guidance](https://www.fda.gov/files/drugs/published/Changes-to-an-Approved-NDA-or-ANDA.pdf)

### EMA/EU reference package

- [Regulation (EC) No 726/2004](https://eur-lex.europa.eu/eli/reg/2004/726/oj/eng)
- [Directive 2001/83/EC and Annex I](https://eur-lex.europa.eu/eli/dir/2001/83/oj/eng)
- [Commission Regulation (EC) No 1234/2008](https://eur-lex.europa.eu/eli/reg/2008/1234/oj/eng)
- [European Commission 2025 Variations Guideline](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ%3AC_202505045)
- [EudraLex Volume 2](https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-2_en)
- [EMA Pre-authorisation Guidance](https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/pre-authorisation-guidance)
- [EMA Post-authorisation Procedural Advice](https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation)
- [EMA Variations, grouping, worksharing, and extension entrypoint](https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/variations-including-extensions-marketing-authorisations)
- [EMA Renewal guidance](https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/renewal-annual-re-assessment-marketing-authorisation)
- [EMA Transfer guidance/templates](https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/transfer-marketing-authorisation-questions-answers)
- [EMA Article 61(3) guidance](https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/changing-labelling-package-leaflet-article-613-notifications)
- [EMA eSubmission/eCTD guidance](https://esubmission.ema.europa.eu/ectd/index.html)
- [EMA PIP/waiver/compliance guidance](https://www.ema.europa.eu/en/human-regulatory-overview/research-development/paediatric-medicines-research-development/paediatric-medicines-applications-procedures)
- [EU Clinical Trials Regulation/CTIS guidance](https://health.ec.europa.eu/medicinal-products/clinical-trials/clinical-trials-regulation-eu-no-5362014_en)

각 source는 publication 전에 current status, owner, official URL, exact location, last-verification date를 다시 확인한다.

## 8. Current release sequence

이 sequence는 canonical phase number를 다시 정의하지 않는다. 현재 실행 순서만 관리한다.

### Release 0 — Phase 2 hardening and public foundation

Deliverables:

- PR #2 review and merge — complete
- Vercel production deployment — complete
- Expanded route production verification — complete, `88/88`
- Current draft/human-review limitation 유지
- Public trust pages, correction path, privacy boundary, social preview, and response security headers
- Domain/plan decision appropriate to non-commercial versus commercial use

Exit criteria:

- Latest hardening이 production에 있음 — complete
- Route, mobile, keyboard, accessibility, export, print checks pass — complete
- No false `human_reviewed` 또는 `reviewer_ready` state
- Documentation reflects production commit — complete
- Security headers and social preview are verified from the production response — complete
- Public scope, editorial policy, privacy, and correction routes are reachable — complete

### Release 1 — Execution Hub foundation

Implementation note — Home V3, 2026-07-16:

- Home을 좌우 2분할에서 `short headline → full-width page finder → compact live workspaces`의 세로 flow로 단순화했다.
- Headline은 `What do you need to prepare?`로 축소하고 중복 hero CTA와 긴 설명을 제거했다.
- 질문은 browser 안에서만 deterministic keyword/intent matching으로 처리하며 저장하거나 external LLM에 전송하지 않는다.
- Primary navigation에는 현재 live인 `Regulatory Updates / CTD Builder / Trust & Sources / About`만 둔다.
- Available CTD/QOS/source/update route를 직접 연결하고, 미출시 application/lifecycle work는 compact `Coming next` 또는 planned search result로 표시한다.
- Home에 latest 3 source-checked update record를 직접 노출한다.
- `Safety Intelligence`를 `Regulatory Updates` 안의 P1 category로 채택했다. Raw adverse-event news와 automatic causality 판단은 제외한다.
- `/applications`, `/lifecycle-changes`, `/regulatory-updates` route를 추가했다. Source-backed guide가 없는 lifecycle route는 `noindex`이며 sitemap에서 제외한다. Updates route는 8개 source-checked record와 detail pages를 제공하므로 indexable하고 sitemap에 포함된다.
- Canonical metadata, `robots.txt`, `sitemap.xml`, web manifest, WebSite JSON-LD와 custom-domain-ready `NEXT_PUBLIC_SITE_URL`을 추가했다.
- 이는 navigation layer이지 regulatory answer generation이 아니다. Source-backed RAG/LLM answer는 source coverage, citation contract, evaluation set, qualified review gate가 준비될 때까지 deferred 상태다.
- Latest local verification: format, lint, type-check, 11 unit files/44 tests, production build 35 routes, desktop/mobile E2E 88/88 tests, Home, Updates, and 3.2.P.5 WCAG A/AA axe scans pass.
- Home V2 density measurement: about 330 words, 3 top-level sections, 2317px page height at 1280 × 720.
- Home V2는 PR #3 merge 후 Vercel production과 public `88/88` suite로 재검증했다.
- Home V3 production verification은 current release branch의 review/merge 후 기록한다.

Deliverables:

- Home을 `Updates → Application Preparation → CTD` task flow로 재구성 — first guided-search slice implemented locally
- Top-level information architecture와 navigation — implemented locally
- Shared `OfficialSource` / `ChecklistItem` / review/version primitives
- `Application & Lifecycle Preparation Hub` landing page — transparent coverage routes implemented; source-backed guides pending
- FDA Initial IND reference guide/checklist
- EMA Centralised MAA reference guide/checklist
- Curated Regulatory Updates landing page — 8 source-checked records implemented; indexable and in sitemap
- FDA/EMA update detail template — 4 FDA and 4 EMA static detail pages implemented
- Safety Intelligence schema/filter/detail slice — source and acceptance plan documented; 4–6 curated records pending
- Methodology source/review/correction explanation
- Sitemap, RSS baseline, metadata — sitemap/robots/canonical/manifest implemented; RSS pending

Exit criteria:

- 두 application guide의 모든 checklist item에 classification과 official-source link가 있음
- `sourceStatus`, `editorialReviewStatus`, `lastVerifiedDate`가 complete
- Missing facts는 `undetermined` 또는 conditional로 표현
- Update는 application/CTD page와 연결
- Draft FDA guidance는 `not for implementation`과 official comment deadline을 표시
- Qualified review record가 없으므로 모든 update editorial synthesis는 `source_checked` draft 상태 유지
- No invented requirement, date, form, deadline, or conclusion
- Format, lint, type-check, unit, route/accessibility, build pass

### Release 2 — Application library and public content MVP

Deliverables:

- FDA NDA/505(b)(2) readiness
- FDA ANDA readiness
- FDA BLA readiness
- FDA NDA/ANDA and BLA lifecycle-change overview
- EMA Variations guide
- EMA Renewal guide
- EMA Transfer and Article 61(3) guides
- Exportable preparation checklist and source register
- Agency, procedure, topic, status filters
- Eight flagship guides/templates completed or current scope re-approved

Exit criteria:

- Every material checklist item is source-linked
- Legal, procedural, recommendation, best-practice classifications are distinct
- Procedure-specific applicability questions are tested
- No checklist implies universal applicability
- Qualified review status is evidence-backed or clearly draft-labeled

### Release 3 — Source monitoring and deterministic QC

Deliverables:

- RSS/API/manual source registry checks
- URL/document identifier normalization
- Hash/diff candidate events
- Metadata-only vs substantive-change candidate classification
- Human triage queue
- Golden questions and golden packet fixtures
- Cross-reference/citation/source-version regression tests
- Affected checklist/CTD item re-verification queue

Exit criteria:

- No automatic publication
- Failed monitor state is distinct from no-change state
- Duplicate/noise rate is measured
- Source change identifies potentially impacted content
- Human approval remains mandatory for impact/publication

### Release 4 — Change Impact Navigator MVP

Deliverables:

- Guided intake
- Deterministic rule engine
- FDA/EMA preliminary pathway
- Missing facts and uncertainty
- Affected CTD/documents/functions
- Source/reason explanation
- Print/export

Exit criteria:

- Rule outcomes link to current approved source records
- Missing information fails safely
- No AI-only classification
- At least 10 scenario tests per included category

### Release 5 — Inspection Readiness MVP

Deliverables:

- FDA PAI structure
- Application-to-site traceability
- Non-confidential document-room checklist
- Gap tracker
- FDA GMP and EMA GMP/GCP/GVP public guidance

### Release 6 — Labeling & e-Labeling

Deliverables:

- FDA SPL hub
- EMA ePI hub
- SmPC/PL/SPL comparison
- Labeling Change Navigator
- e-Labeling readiness assessment

### Release 7 — Assistant, accounts, and commercial validation

Entry criteria:

- Repeated user demand
- Qualified review governance
- Security/privacy design
- Clear non-confidential-to-private product boundary
- Measured workflow benefit

Potential deliverables:

- Cited retrieval assistant
- Saved workspaces
- Personalized alerts
- Team review log
- Private notes
- Controlled export
- Pricing experiment

## 9. User research track

### Round 1 — Problem/priority validation

Target: 5–10 participants.

- CMC RA
- General/strategic RA
- Regulatory writer
- Regulatory Operations/publishing
- QA/inspection readiness
- Labeling/e-labeling

Core questions:

- 최근 가장 시간이 많이 든 submission/change/inspection task는 무엇이었는가?
- Official source를 찾은 뒤에도 사람에게 물어야 했던 질문은 무엇인가?
- Applicability, section placement, source readiness, consistency, publishing 중 가장 큰 pain은 무엇인가?
- AI가 해도 되는 작업과 맡기지 않을 작업은 무엇인가?
- Citation, version, review stamp가 실제 신뢰를 높이는가?
- 돈을 낼 수 있는 최소 반복 task는 무엇인가?

### Round 2 — Workflow validation

Round 1에서 signal이 일관되면 12–20명까지 확대한다.

Usability tasks:

1. FDA IND 또는 EMA MAA preparation page에서 applicable checklist 찾기
2. Checklist item의 official source와 exact location 확인
3. Missing/conditional item 구분
4. Relevant CTD section으로 이동
5. Export 결과가 실제 kickoff/review에 유용한지 평가

### Decision artifact

각 interview/test 후 다음을 기록한다.

```text
problem_frequency
current_workaround_cost
failure_risk
willingness_to_pay
deterministic_rule_feasibility
time_to_complete
critical_errors_or_missed_items
source_traceability_success
user_confidence
```

`50% time reduction`은 목표 가설일 뿐 marketing claim이 아니다. Baseline과 repeated task evidence가 생긴 뒤에만 결과를 보고한다.

## 10. External research claim verification queue

외부 GPT report의 citation token은 이 repository에서 재사용할 수 없다. 다음 claim은 official source URL과 exact location을 독립적으로 확인하기 전까지 `unverified_external_claim`이다.

- EMA initial MAA validation issue 비율
- FDA ANDA first-cycle quality deficiency 비율
- EMA pre-submission interaction timing
- EMA ePI FHIR/roadmap/go-live timing
- Current PAI program details와 issue date
- Competitor coverage counts와 feature claims
- GitHub Actions, Vercel Cron, Cloudflare limits/pricing
- Practitioner quote provenance와 context

이 claim들은 product hypothesis와 research backlog에는 사용할 수 있지만 public marketing claim, regulatory rule, roadmap exit criterion에는 직접 사용하지 않는다.

## 11. Explicit backlog decisions

### Adopt

- Execution-first positioning
- Application & Lifecycle Preparation Hub
- CTD section as a knowledge object
- Item-level source traceability
- Deterministic rules with human review
- Cross-module consistency and reviewer lens
- Golden questions/golden packets
- Staged practitioner interviews
- Public/private boundary as a future architecture principle

### Modify

- Regulatory Updates: 주력 제품이 아니라 early curated discovery layer로 유지
- Interview size: 12–20명을 즉시 모집하지 않고 5–10명으로 시작
- Publishing QC: sample/public structured data부터 시작하고 private PDF ingestion은 제외
- Pilot value: time-saving target은 hypothesis로 측정하고 claim하지 않음

### Defer

- RAG-backed assistant
- Private document store/vector database
- Customer uploads
- Accounts/team workspace
- Cloudflare Workers/Vectorize/D1 migration
- Paid tiers와 pricing
- Automated PDF dossier parser
- Full Module 4/5 authoring expansion

### Reject for current scope

- News-only product strategy
- Autonomous AI regulatory classification
- Automatic publication of machine-generated interpretation
- Confidential data collection before security/governance readiness
- Reviewer evidence 없는 `human_reviewed` claim
- Unverified competitor/practitioner/statistical claims as product facts

## 12. Immediate next actions

1. Preserve the qualified-human-review blocker as visible.
2. Review, merge, and production-verify Home V3.
3. Define shared `OfficialSource` and `ChecklistItem` schemas outside UI components.
4. Run two bounded Release 1 tracks: FDA Initial IND source package/checklist and Safety Intelligence schema plus 4–6 curated source packages.
5. Prepare EMA Centralised MAA and FDA/EMA post-approval change source packages.
6. Recruit first 5–10 CMC/RA target practitioners and run task-based usability tests.
7. Decide whether launch remains a non-commercial prototype or moves toward commercial use; plan an owned domain and appropriate hosting plan before the latter.
8. Add monitoring automation only after source cadence, editorial review, superseded handling, and correction ownership are defined.
