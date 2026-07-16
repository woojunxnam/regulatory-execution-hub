# External GPT Review — Decision Log

**Review date:** 2026-07-16  
**Source:** User-provided `pasted-text.txt` attachment  
**Decision owner:** Regulatory Execution Hub product planning  
**Status:** Reviewed and incorporated selectively

## 1. Review summary

외부 report의 핵심 주장은 현재 project direction과 대체로 일치한다.

- Generic regulatory-news site만으로는 차별화가 약하다.
- 가장 큰 pain은 applicability, content judgment, source-to-section mapping, consistency, inspection/change traceability다.
- CTD section은 document folder가 아니라 structured knowledge object여야 한다.
- Deterministic rules, official citations, versioning, human review가 핵심이다.
- RAG/LLM은 판단 엔진보다 retrieval/phrasing 보조로 제한해야 한다.
- Practitioner interview가 다음 product priority를 결정해야 한다.

현재 implementation은 이미 다음 제안을 부분적으로 증명한다.

- CTD section model
- Source-to-CTD Matrix
- Linked Module 2.3
- Deterministic readiness
- Cross-module consistency
- Review-record gate
- Source/content version history
- Export and accessibility

## 2. Evidence-quality assessment

### 강한 부분

- Official-source-first product principle
- ICH CTD structure와 product boundary 구분
- FDA/EMA lifecycle/change/inspection의 workflow relevance
- Deterministic/human-review architecture recommendation
- Market positioning을 execution layer로 좁힌 점

### 제한

- Attachment의 citation token은 원본 browser session 밖에서 직접 열 수 없다.
- Practitioner evidence는 anonymous forum signal이며 representative market evidence가 아니다.
- Competitor descriptions는 각 company의 self-description일 수 있다.
- Pricing은 stated hypothesis이며 willingness-to-pay evidence가 아니다.
- Infrastructure limits/pricing은 시점에 따라 변하므로 별도 current verification이 필요하다.
- Exact regulatory statistics/timelines는 public product claim 전에 official source와 exact location을 재확인해야 한다.

## 3. Decision matrix

| External recommendation                | Decision                           | Reason                                                                |
| -------------------------------------- | ---------------------------------- | --------------------------------------------------------------------- |
| Execution-first, not news-only         | `ADOPT`                            | North Star와 current CTD architecture에 일치                          |
| CTD Builder + Source Matrix as core    | `ADOPT_ALREADY_IN_PROGRESS`        | Current implementation의 중심                                         |
| Application preparation checklists     | `ADOPT`                            | CTD 위의 missing workflow layer이며 user request와 일치               |
| CTD section as knowledge object        | `ADOPT_ALREADY_IMPLEMENTED`        | `CtdSection` schema를 확장하여 재사용 가능                            |
| Cross-module Consistency Checker       | `ADOPT_EXPAND`                     | Structured checks는 구현됨; broader fields/QC는 확대 필요             |
| Reviewer Lens                          | `ADOPT_WITH_REVIEW_BOUNDARY`       | Common-risk support는 가능하나 agency prediction처럼 표현 금지        |
| Authoring Packet Generator             | `ADOPT_ALREADY_IMPLEMENTED_EXPAND` | Text export 존재; application-specific packet으로 확대                |
| Change Impact Navigator                | `ADOPT_LATER_RELEASE`              | High value지만 source/rule package와 scenario tests가 선행            |
| Inspection Readiness                   | `ADOPT_LATER_RELEASE`              | Strong workflow fit; current Phase 2와 Application Hub 뒤             |
| Public Updates를 마지막으로 이동       | `MODIFY`                           | 주력은 아니지만 freshness/SEO/discovery를 위해 early curated MVP 필요 |
| RAG assistant가 반드시 필요            | `DEFER`                            | User demand와 citation/refusal evaluation 전에는 불필요               |
| Private RAG/document workspace         | `DEFER`                            | Security, privacy, validation, demand evidence가 없음                 |
| Cloudflare stack 도입                  | `DEFER_NOT_SELECTED`               | Current Vercel/GitHub architecture로 public MVP 충분                  |
| 12–20명 interview 즉시 수행            | `MODIFY`                           | 5–10명으로 시작하고 signal 확인 후 확대                               |
| 50% time reduction pilot               | `ADOPT_AS_HYPOTHESIS`              | Measurement target이지 public claim이 아님                            |
| Proposed pricing bands                 | `DEFER_UNVALIDATED`                | Interview/paid pilot 전에는 roadmap fact가 아님                       |
| Reddit quotes를 pain evidence로 사용   | `MODIFY`                           | Discovery hypothesis로만 사용; representative claim 금지              |
| Competitor gap을 confirmed fact로 사용 | `DEFER_VERIFY`                     | Independent workflow comparison과 user evidence 필요                  |

## 4. 핵심 disagreement와 조정

### 4.1 Updates priority

외부 report는 Public Regulatory Updates를 낮은 우선순위로 두고 discovery layer를 마지막에 제안한다. 이 판단은 differentiation 측면에서는 타당하지만 product launch 측면에서는 완전히 따르지 않는다.

Current decision:

- Full automated monitoring/news platform: defer
- Curated update landing/detail pages: early Release 1
- Update value: headline 수집이 아니라 application/checklist/CTD impact 연결
- Automated ingestion/diff: Release 3

### 4.2 RAG/private workspace

외부 report의 public/private architecture는 장기 원칙으로 유용하다. 그러나 current MVP에 vector store, private document ingestion, query log, team workspace를 넣으면 security와 scope가 급격히 커진다.

Current decision:

- Architecture principle: preserve
- Implementation: defer
- Entry gate: user demand, security plan, qualified review capacity, measurable non-confidential value

### 4.3 Commercial model

가격 범위와 paid tier는 useful hypothesis이지만 근거가 부족하다.

Current decision:

- No pricing in product roadmap
- First measure repeated task value
- Conduct interviews and non-confidential pilot
- Payment experiment only after clear willingness-to-pay signal

### 4.4 Practitioner evidence

Forum comments는 pain discovery에 유용하지만 sample bias가 크다.

Current decision:

- Use quotes to design interview questions
- Do not use anonymous comments as proof of market size
- Replace inference with structured interviews and usability observations

## 5. New plan elements created from the review

1. `Application & Lifecycle Preparation Hub`를 first-class product area로 추가
2. FDA Initial IND와 EMA Centralised MAA를 reference application guides로 선정
3. Item-level official-source-backed checklist schema 추가
4. Curated Updates와 application/CTD 연결을 Release 1에 포함
5. Source monitoring automation을 Release 3으로 분리
6. Golden questions/golden packets를 deterministic QC strategy에 추가
7. Practitioner interview를 parallel product track으로 추가
8. RAG/private workspace/pricing을 explicit deferred backlog로 이동
9. External statistical/competitor/infrastructure claims를 verification queue에 등록

## 6. Resulting product sequence

```text
Release current Phase 2 hardening
    ↓
Execution Hub foundation
    ├─ Curated Regulatory Updates
    ├─ FDA IND preparation
    ├─ EMA Centralised MAA preparation
    └─ Existing CTD Builder connection
    ↓
Application library expansion
    ↓
Source monitoring + deterministic QC
    ↓
Change Impact Navigator
    ↓
Inspection Readiness
    ↓
Labeling & e-Labeling
    ↓
RAG/accounts/private workspace only after evidence
```

Current execution details and exit criteria are maintained in `docs/PRODUCT_PLAN.md`.

## 7. Safety Intelligence review — 2026-07-16

| Proposal                               | Decision                        | Reason                                                                 |
| -------------------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Add adverse-event news                 | `MODIFY`                        | News framing can overstate causality and collapse signal/action states |
| Use `Safety Intelligence`              | `ADOPT`                         | Fits official signal → action → implementation workflow                |
| Add as top-level navigation            | `DEFER`                         | Validate first as a `Regulatory Updates` category/filter               |
| FDA AEMS potential signals             | `ADOPT_WITH_CAUSALITY_BOUNDARY` | Official source explicitly says listing does not establish causality   |
| FDA Drug Safety Communications         | `ADOPT`                         | Official communication source with clearer action context              |
| FDA SrLC and REMS actions              | `ADOPT`                         | Direct connection to labeling and risk-management execution            |
| EMA PRAC and product wording           | `ADOPT`                         | Official monthly signal/action and multilingual wording source         |
| Raw AEMS/FAERS ingestion and ranking   | `REJECT_CURRENT_SCOPE`          | Duplicate/incomplete/unverified data and no incidence inference        |
| Automatic causality/action publication | `REJECT_CURRENT_SCOPE`          | Requires official outcome and qualified review                         |
| First 4–6 curated records              | `ADOPT_AFTER_SCHEMA`            | Bounded test of filter, detail template, and review contract           |

Detailed source, schema, publication, and exclusion decisions are maintained in `docs/SAFETY_INTELLIGENCE_PLAN.md`.
