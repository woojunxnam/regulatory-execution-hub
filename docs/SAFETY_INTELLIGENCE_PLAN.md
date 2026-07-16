# Safety Intelligence — Product and Source Plan

Last source check: `2026-07-16`

## Decision

`ADOPT_WITH_STRICT_BOUNDARIES`

`Drug Adverse Event News`라는 이름은 사용하지 않는다. 첫 release name은 **Safety Intelligence**로 하고 `Regulatory Updates` 안의 category/filter로 검증한다. 별도 top-level navigation은 source-backed record와 반복 사용 evidence가 생기기 전까지 추가하지 않는다.

이 기능의 목적은 adverse-event headline을 수집하는 것이 아니라 다음 연결을 제공하는 것이다.

```text
Official signal or safety action
    → regulatory assessment stage
    → official recommendation or action
    → potentially affected labeling / risk-management artifacts
    → questions for RA, PV, Labeling, and Operations
```

## Why the boundary matters

- FDA는 AEMS quarterly report에 제품이 나타나도 causality 또는 risk가 확정된 것이 아니며 FDA가 signal을 평가 중이라는 의미라고 설명한다.
- FDA AEMS public data에는 duplicate/incomplete/unverified report가 있을 수 있고 incidence calculation에 사용할 수 없다.
- EMA도 safety signal이 medicine과 adverse event의 causality를 직접 의미하지 않는다고 설명한다.
- 따라서 signal, assessment, regulatory action, implementation을 한 개의 `Safety alert` status로 합치지 않는다.

## Information architecture

```text
Regulatory Updates
├─ Guidance & Procedures
├─ CMC & Quality
├─ Submission Standards
├─ Labeling & e-Labeling
└─ Safety Intelligence
   ├─ FDA Potential Signals
   ├─ FDA Drug Safety Communications
   ├─ FDA SrLC / Labeling Actions
   ├─ FDA REMS Actions
   ├─ EMA PRAC Signals
   ├─ EMA Product-Information Wording
   ├─ EMA DHPC
   └─ EMA Referrals / Urgent Restrictions
```

## Official source families

### FDA

- [Postmarket Drug Safety Information](https://www.fda.gov/drugs/drug-safety-and-availability/postmarket-drug-safety-information-patients-and-providers)
- [AEMS potential signals and new safety information](https://www.fda.gov/drugs/fda-adverse-event-monitoring-system-aems/new-safety-information-or-potential-signals-serious-risks-identified-fda-adverse-event-monitoring)
- [Drug Safety Communications](https://www.fda.gov/drugs/drug-safety-and-availability/drug-safety-communications)
- [Drug Safety-related Labeling Changes database overview](https://www.fda.gov/drugs/drug-safety-and-availability/drug-safety-related-labeling-changes-srlc-database-overview-updates-safety-information-fda-approved)
- [REMS@FDA](https://www.accessdata.fda.gov/scripts/cder/rems/index.cfm)

### EMA

- [Signal management](https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/pharmacovigilance-post-authorisation/signal-management)
- [PRAC recommendations on safety signals](https://www.ema.europa.eu/en/human-regulatory-overview/post-authorisation/pharmacovigilance-post-authorisation/signal-management/prac-recommendations-safety-signals)

DHPC, referral, urgent restriction, and product-information wording records require their exact official EMA or European Commission source URL before publication.

## Data model direction

Signal stage와 regulatory/implementation outcome은 반드시 분리한다. 모든 source가 아래 단계를 선형으로 통과하는 것은 아니다.

```yaml
category: drug_safety
agency: FDA | EMA
jurisdiction: US | EU
source_type: potential_signal | safety_communication | labeling_change | rems_action | prac_recommendation | product_information_wording | dhpc | referral | urgent_restriction

product_names: []
active_substances: []
safety_topic: ""

safety_stage: potential_signal | under_assessment | assessment_completed | undetermined
causality_status: not_established | under_evaluation | supported | not_supported | undetermined
regulatory_outcome: additional_data_requested | action_recommended | labeling_change | risk_management_change | communication_issued | no_action | undetermined
implementation_status: not_applicable | assessment_needed | planned | in_progress | completed | undetermined

affected_documents: []
potentially_affected_functions: []

official_source_status: official
editorial_review_status: source_checked | source_verification_required | human_reviewed
source_date: YYYY-MM-DD
effective_date: YYYY-MM-DD | null
implementation_deadline: YYYY-MM-DD | null
last_verified_date: YYYY-MM-DD
qualified_review_record: null
```

## Publication acceptance criteria

각 record는 다음을 모두 충족해야 한다.

1. Exact official source URL, owner, title, source type, source date, exact location이 있다.
2. `official_source_status`, `editorial_review_status`, `last_verified_date`가 있다.
3. Signal과 completed regulatory action을 구분한다.
4. Causality를 official source보다 강하게 표현하지 않는다.
5. Deadline/effective date는 official source에 명시된 경우에만 기록한다.
6. Product scope와 jurisdiction boundary를 표시한다.
7. Affected submission/document는 `required`, `conditional`, `potentially_impacted`, `undetermined` 중 하나로 분류한다.
8. `human_reviewed`는 qualified review record가 있을 때만 허용한다.
9. Patient treatment advice 또는 stop/start recommendation을 생성하지 않는다.
10. Superseded, withdrawn, archived, or completed state를 추적할 version history가 있다.

## First curated slice — production verified

6개의 official-source record로 filter와 detail template을 검증했다. 모든 record는 `last_verified_date: 2026-07-16`, `editorial_review_status: source_checked`, `qualified_review_record: null`을 유지한다.

- FDA AEMS: corticotropin product의 drug-hypersensitivity potential signal
- FDA Drug Safety Communication: alli (orlistat) kidney-risk labeling action
- EMA PRAC meeting highlights: desogestrel/etonogestrel meningioma risk-minimisation action
- EMA PRAC recommendation: darolutamide angioedema product-information update
- EMA product-information wording: gemcitabine DRESS wording
- EMA DHPC: Savene limited-batch quality-defect communication

FDA SrLC, REMS, EMA referral, urgent restriction는 source type 확장 후보이며 이번 bounded slice에는 포함하지 않는다.

## Explicit exclusions

- Raw AEMS/FAERS ingestion 또는 report-count ranking
- Disproportionality analysis
- Automatic causality determination
- “Most dangerous drug” ranking
- Patient-specific advice
- Machine-generated impact interpretation의 automatic publication
- Official source에 없는 submission type 또는 implementation deadline 추론

## Delivery sequence

1. [x] Shared `OfficialSource`와 update/checklist review primitives를 확정한다.
2. [x] Safety-specific schema와 validation tests를 추가한다.
3. [x] 6개 source package를 freeze하고 publication acceptance criteria를 코드와 test로 검증한다.
4. [x] `Regulatory Updates` filter와 detail template을 구현한다.
5. [ ] Labeling/lifecycle route와 `potentially_impacted` 관계를 연결한다.
6. [ ] Qualified reviewer feedback과 user testing 후 recurring source-check cadence를 정한다.
7. [ ] Monitoring automation은 detection/diff candidate까지만 허용하고 publication은 review gate를 유지한다.
