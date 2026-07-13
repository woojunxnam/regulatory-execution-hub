# Regulatory Execution Hub — Product & Build Blueprint

**Document:** `blueprint.md`  
**Version:** 0.1  
**Status:** Initial product blueprint  
**Verified source landscape:** 2026-07-13  
**Primary scope:** FDA and EMA regulation for human medicinal products  
**Working title:** Regulatory Execution Hub  
**Tagline:** **From regulation to execution.**

---

## 1. Executive Summary

Regulatory Execution Hub will be a public, evidence-linked regulatory intelligence and execution-support platform focused on FDA and EMA work for human medicinal products.

The platform will not merely report that a regulation, guidance, procedure, template, or technical standard changed. It will help Regulatory Affairs, Quality Assurance, CMC, Regulatory Operations, Labeling, Pharmacovigilance, and inspection-readiness professionals answer five practical questions:

1. **What changed?**
2. **Why does it matter?**
3. **Does it apply to my product, procedure, or change?**
4. **What documents, CTD sections, systems, and functions may be affected?**
5. **What should we do next, and what evidence should demonstrate completion?**

The product will begin as a career-building public resource and validation platform. It may later become a paid workflow product for individual professionals, consultants, and small life-sciences teams.

The platform must be built around **official sources, transparent reasoning, human review, version control, and clear limits**. It must not represent preliminary AI output as a final regulatory determination.

---

## 2. Product Vision

### 2.1 North Star

Build the most practically useful public FDA/EMA regulatory execution resource for professionals who need to convert regulatory requirements into:

- submission-readiness activities;
- post-approval change assessments;
- inspection-readiness evidence;
- labeling and e-labeling workflows;
- traceable checklists;
- cross-functional action plans.

### 2.2 Core Value Proposition

> **Know which official source applies, what it means, what documents may be required, what functions are affected, and what to do next.**

### 2.3 Primary Differentiation

The platform should not compete by publishing the largest volume of regulatory news. It should compete by providing the best **execution layer** between official guidance and practical work.

Each important page should connect:

```text
Official source
    ↓
Applicable requirement or recommendation
    ↓
Regulatory interpretation with stated confidence
    ↓
Affected submission / CTD section / internal document
    ↓
Responsible function and dependencies
    ↓
Evidence of completion
    ↓
Version history and last verification
```

### 2.4 Initial Scope Decision

The initial product will focus on:

- FDA;
- EMA and the EU centralised procedure;
- human medicinal products;
- drug and biological product regulatory work;
- submissions, post-approval changes, inspections, labeling, and e-labeling.

The initial product will **not** cover:

- pharmacist licensure or pharmacy-practice regulation;
- medical devices;
- veterinary products;
- food, cosmetics, or dietary supplements;
- every national competent authority in the EU;
- country-specific pricing and reimbursement;
- legal advice;
- final product-specific regulatory strategy without qualified review.

These subjects may be considered after the core FDA/EMA product demonstrates demand and editorial reliability.

---

## 3. Intended Users

### 3.1 Primary Users

- Regulatory Affairs associates, managers, and strategists
- Regulatory CMC professionals
- Regulatory Operations and publishing professionals
- Quality Assurance professionals
- Labeling and artwork professionals
- e-labeling and structured-content professionals
- Inspection-readiness teams
- Small biotechnology and virtual pharmaceutical companies
- Regulatory consultants
- Professionals transitioning from another regulatory market into FDA/EMA work

### 3.2 Secondary Users

- Manufacturing and process-validation teams
- Quality Control and analytical-development teams
- Pharmacovigilance teams
- Clinical Operations teams preparing for GCP inspections
- Supply Chain and change-control teams
- Graduate students and early-career RA professionals

### 3.3 Core User Problems

1. Official information is distributed across webpages, guidance documents, regulations, templates, Q&As, procedural advice, technical standards, and inspection programs.
2. Users often do not know which documents apply to a particular application or change.
3. Official checklists frequently state what to submit without explaining how to operationalize the requirement.
4. Product-specific facts can alter the regulatory pathway.
5. Teams may not consistently connect the approved dossier to site-level evidence.
6. Guidance and procedural pages can change without users understanding what changed.
7. AI-generated summaries can sound confident while omitting exceptions, legal hierarchy, or product-specific dependencies.
8. Individual professionals and small teams may not have access to expensive enterprise regulatory-intelligence systems.

---

## 4. Product Principles

### 4.1 Official Sources First

Every material regulatory statement must link to a primary source whenever available:

1. statute or regulation;
2. agency rule or legally effective text;
3. final guidance;
4. agency procedural advice;
5. agency Q&A, compliance program, template, or technical specification;
6. draft guidance or consultation;
7. authoritative supporting material.

Secondary articles may help discover issues but must not be the final authority for a requirement.

### 4.2 Separate Law, Requirement, Guidance, and Best Practice

Every checklist item must be classified as one of the following:

- **Legally required**
- **Agency procedural requirement**
- **Agency recommendation**
- **Conditional requirement**
- **Product-specific commitment**
- **Potentially impacted**
- **Industry best practice**
- **Insufficient information to determine**

The interface must never present a best practice as a legal requirement.

### 4.3 Human Review Before Publication

Automation may detect, classify, compare, and draft. A human reviewer must approve:

- the source selection;
- the description of what changed;
- applicability logic;
- change-classification logic;
- checklist wording;
- implementation timing;
- final publication.

### 4.4 Explain Uncertainty

Results should include:

- confidence level;
- missing facts;
- assumptions;
- source hierarchy;
- reasons supporting the result;
- alternative interpretations;
- items requiring product-specific or agency confirmation.

### 4.5 Version Everything

The system must retain:

- source version;
- publication and effective dates;
- draft/final status;
- last-verified date;
- analysis version;
- reviewer;
- change history;
- superseded content.

### 4.6 Build for Practical Completion

Every workflow should identify, where applicable:

- document or activity;
- why it matters;
- owner;
- contributors;
- dependency;
- evidence of completion;
- status;
- due date;
- source;
- reviewer;
- open question.

### 4.7 Public Decision Support, Not a GxP System of Record

The MVP must not store confidential product data or become the official system for regulated records. It is a public-source research and planning tool. Any future enterprise version requires separate controls, validation, security, and quality governance.

---

## 5. Information Architecture

```text
Home
│
├── Regulatory Updates
│   ├── FDA
│   ├── EMA
│   └── What Changed / Why It Matters / Action Required
│
├── Submission Navigator
│   ├── FDA NDA/BLA/ANDA/IND
│   └── EMA MAA/Variations/Renewals
│
├── Change Impact Navigator
│   ├── Manufacturing
│   ├── Specifications
│   ├── Analytical Methods
│   ├── Facilities
│   ├── Container Closure
│   └── Labeling
│
├── Inspection Readiness
│   ├── FDA PAI/PLI
│   ├── FDA GMP Inspection
│   ├── EMA GMP/GCP/GVP
│   └── Application-to-Site Traceability
│
├── Labeling & e-Labeling
│   ├── FDA SPL
│   ├── EMA ePI
│   └── Labeling Change Navigator
│
├── Practical Templates
│   ├── Submission Readiness Checklist
│   ├── Regulatory Impact Assessment
│   ├── Inspection Document Request List
│   ├── Dossier-to-Site Traceability Matrix
│   └── Change Classification Worksheet
│
└── Methodology
    ├── Sources
    ├── Version History
    ├── Human Review
    └── Disclaimer
```

---

# 6. Section-by-Section Product Plan

## 6.1 Home

### Purpose

Explain the platform within ten seconds and direct each user toward a practical task rather than a generic news feed.

### Required Components

1. **Hero**
   - “From regulation to execution.”
   - Short explanation of FDA/EMA submission, change, inspection, and labeling support.
   - Primary actions:
     - Review regulatory updates
     - Start a navigator
     - Download a practical template

2. **Critical Updates**
   - Highest-impact FDA and EMA changes
   - Impact tags
   - Effective dates and comment deadlines
   - “What action may be needed” preview

3. **Start by Task**
   - Prepare a submission
   - Assess a post-approval change
   - Prepare for an inspection
   - Assess a labeling change
   - Understand SPL or ePI

4. **Featured Practical Guides**
   - FDA post-approval change overview
   - EMA variations framework
   - FDA PAI traceability
   - FDA SPL vs EMA ePI

5. **Trust Panel**
   - Official sources
   - Human-reviewed
   - Version-controlled
   - Last verification dates
   - Transparent uncertainty

6. **Professional Profile**
   - Short editor biography
   - Relevant RA, lifecycle, labeling, e-labeling, and RIM experience
   - No exaggerated FDA/EMA submission claims

7. **Newsletter**
   - Weekly FDA/EMA execution brief
   - Clear description of frequency and content

### Home Page Success Criteria

- A first-time user understands the product within ten seconds.
- Users can begin a practical workflow within two clicks.
- The latest source-verification date is visible.
- The page contains no unsupported marketing claims.

---

## 6.2 Regulatory Updates

### Purpose

Detect meaningful FDA and EMA changes and translate them into practical impact assessments.

### Official Source Foundation

#### FDA sources

- What’s New Related to Drugs and its RSS feed
- FDA guidance search and newly added guidance pages
- Federal Register notices and rules
- eCTD standards and technical-conformance resources
- SPL resources and labeling pages
- compliance programs and inspection manuals
- product-specific or topic-specific guidance collections

#### EMA sources

- EMA What’s New
- EMA RSS feeds
- regulatory and procedural guidance
- scientific guidelines
- pre-authorisation and post-authorisation procedural advice
- tracked-change versions where available
- variation guidance and Q&As
- ePI, PLM, PMS, SPOR, and IRIS resources
- inspection guidance

### Update Record Schema

Every update should contain:

```yaml
id: fda-2026-example-slug
agency: FDA
jurisdiction: United States
title: ""
source_type: guidance
status: draft | final | proposed_rule | final_rule | procedural_update | technical_standard
topic_tags:
  - CMC
  - labeling
published_date: YYYY-MM-DD
effective_date: YYYY-MM-DD
comment_deadline: YYYY-MM-DD
detected_date: YYYY-MM-DD
last_verified_date: YYYY-MM-DD
official_url: ""
supersedes: []
superseded_by: null
affected_functions:
  - Regulatory Affairs
  - Quality Assurance
affected_procedures:
  - NDA
  - BLA
impact_level: low | medium | high | critical
review_status: detected | triaged | drafted | reviewed | published | superseded
reviewer: ""
```

### Update Article Template

Each update page must follow the same structure:

1. **One-sentence summary**
2. **What changed**
3. **What did not change**
4. **Why it matters**
5. **Who may be affected**
6. **Potential submission impact**
7. **Potential quality-system impact**
8. **Potential labeling/e-labeling impact**
9. **Recommended next actions**
10. **Questions to confirm internally**
11. **Effective date and transition details**
12. **Official sources**
13. **Assumptions and limitations**
14. **Version history**

### Impact Level Rules

- **Critical:** immediate compliance or submission consequence; imminent effective date; major safety or enforcement relevance.
- **High:** likely process, dossier, or system change for a meaningful user group.
- **Medium:** relevant operational update that requires assessment but not necessarily immediate action.
- **Low:** informational update, minor clarification, or narrow applicability.

Impact level must be human-approved.

### Automated Ingestion Workflow

```text
Scheduled source check
    ↓
Fetch metadata and content
    ↓
Normalize URL and document identifier
    ↓
Calculate content hash
    ↓
Detect new or changed source
    ↓
Create change event
    ↓
Generate machine-assisted diff and candidate tags
    ↓
Human triage
    ↓
Draft practical impact analysis
    ↓
Human review
    ↓
Publish
```

### Important Rule

A webpage “updated” date does not automatically mean a substantive regulatory change. The system must distinguish:

- meaningful text change;
- document replacement;
- formatting change;
- broken-link correction;
- metadata-only change;
- new tracked-change document;
- genuinely new requirement.

---

## 6.3 Submission Navigator

### Purpose

Help users identify the categories of documents, evidence, procedural steps, and cross-functional readiness activities that may apply to a submission.

### Supported Submission Families

#### FDA

- IND
- NDA
- 505(b)(2) NDA
- BLA
- ANDA
- supplements and amendments
- annual reports
- meeting requests and briefing packages

#### EMA

- initial centralised MAA
- generic/hybrid application
- Type IA variation
- Type IB variation
- Type II variation
- extension
- renewal
- worksharing
- transfer of marketing authorisation
- Article 61(3) notification

### Product Boundary

The navigator is not a universal “generate my NDA” tool. Requirements depend on:

- application pathway;
- product type and modality;
- dosage form;
- indication;
- clinical program;
- manufacturing network;
- combination-product status;
- product-specific guidance;
- prior agency advice;
- waivers;
- commitments;
- approved or proposed control strategy.

The MVP therefore produces a **readiness map**, not a final dossier specification.

### User Flow

```text
Choose agency
    ↓
Choose submission type
    ↓
Select product characteristics
    ↓
Answer applicability questions
    ↓
Generate readiness map
    ↓
Review requirements, conditional items, and unknowns
    ↓
Export checklist
```

### Minimum Intake Questions

- Agency
- Submission type
- New application or lifecycle submission
- Small molecule or biological product
- Prescription or nonprescription
- Dosage form
- Sterile or nonsterile
- New active substance or known active
- New indication
- New manufacturing site
- Labeling included
- Clinical data included
- Nonclinical data included
- Device constituent or combination-product considerations
- Existing agency agreement, waiver, or commitment
- Target submission date

### Output Structure

#### A. Administrative and Procedural

- forms
- cover letter
- fees
- certifications
- declarations
- patent/exclusivity information where applicable
- environmental documentation
- facility identification
- cross-references and letters of authorization
- application identifiers
- procedural prerequisites

#### B. CTD Content Map

- Module 1
- Module 2
- Module 3
- Module 4
- Module 5

Each item must identify:

- applicable CTD location;
- required/conditional/potential status;
- responsible function;
- source;
- completion evidence;
- open dependency.

#### C. Labeling Package

- prescribing information or SmPC
- patient labeling or package leaflet
- carton/container labeling
- Instructions for Use, when applicable
- annotated and clean versions
- SPL/ePI implications
- linguistic or translation activity
- artwork implementation considerations

#### D. Publishing and Technical Readiness

- eCTD format and version
- lifecycle operation
- file naming and placement
- validation
- hyperlink and bookmark checks
- document version reconciliation
- structured data standards
- transmission readiness

#### E. Filing/Validation Risk

Potential issues should be presented as:

```yaml
risk_type: potential_filing_issue
severity: high
reason: "Required component appears missing or inconsistent."
evidence_needed: "Final document, approved waiver, or documented justification."
owner: "Regulatory Lead"
confidence: medium
```

### Initial MVP Coverage

Do not build every submission family simultaneously.

#### MVP 1A

- FDA original NDA high-level readiness
- FDA NDA labeling package
- FDA eCTD publishing readiness

#### MVP 1B

- EMA centralised MAA high-level readiness
- EMA pre-submission procedural readiness
- EMA product-information readiness

#### Later Expansion

- BLA
- ANDA
- IND
- 505(b)(2)
- renewal
- worksharing
- transfer
- specialized modalities

---

## 6.4 Change Impact Navigator

### Purpose

Convert a proposed product or process change into a transparent, preliminary map of:

- possible reporting pathway;
- affected CTD sections;
- supporting studies and documents;
- internal quality documents;
- functions and systems;
- timing and implementation dependencies;
- unresolved questions.

### Initial Change Categories

1. Manufacturing process
2. Manufacturing site or facility
3. Specification
4. Analytical method
5. Container-closure system
6. Labeling

### Later Change Categories

- components and composition;
- batch size;
- equipment;
- suppliers;
- testing laboratory;
- shelf life;
- storage condition;
- packaging site;
- multiple related changes;
- comparability protocol/PACMP-supported changes.

### User Intake

The decision tree must collect facts before producing a result.

#### Core Questions

- FDA or EMA?
- NDA, ANDA, BLA, or MAA?
- Approved or pre-approval product?
- Drug substance or drug product?
- Product type and dosage form?
- Sterile or nonsterile?
- What exactly is changing?
- Is the change described in the approved dossier?
- Does it alter an established condition?
- What is the potential effect on identity, strength, quality, purity, potency, safety, or efficacy?
- Is there an approved comparability protocol or PACMP?
- Are multiple changes related?
- Is labeling affected?
- Are specifications or methods affected?
- Is process validation required?
- Is stability support available?
- Must implementation occur before agency approval?
- Is there relevant agency correspondence or a product-specific commitment?

### Output

```text
Preliminary pathway
Confidence level
Why this pathway may apply
Facts supporting the result
Facts that could change the result
Alternative pathway
Applicable official sources
Affected CTD sections
Potential supporting data
Potential internal documents
Functions and systems affected
Implementation constraints
Questions requiring regulatory review
```

### Classification Safety Language

Every result must include:

> **Preliminary assessment — not a final regulatory determination. Confirm against the approved dossier, current regulation and guidance, product-specific commitments, agency correspondence, and qualified regulatory review.**

### Example Output Categories

#### FDA

- Prior Approval Supplement
- Changes Being Effected
- Changes Being Effected in 30 Days
- Annual Report
- Insufficient information to classify

#### EMA

- Type IA
- Type IAIN
- Type IB
- Type II
- Extension
- Article 61(3), where applicable
- Unforeseen variation
- Insufficient information to classify

### Document Impact Map

Each result should include two separate groups.

#### External Regulatory Documents

- application form;
- cover letter;
- updated CTD sections;
- comparison tables;
- declarations;
- validation or study reports;
- updated product information;
- implementation plan;
- facility documentation;
- stability data or commitment.

#### Internal Quality and Operational Documents

- change control;
- risk assessment;
- SOP;
- master batch record;
- validation protocol/report;
- specification;
- analytical procedure;
- quality agreement;
- supplier qualification;
- training;
- artwork;
- inventory implementation plan;
- RIM metadata;
- document-management records.

### Rule Architecture

The decision engine must use deterministic, source-linked rules.

```yaml
rule_id: fda-nda-site-change-example
agency: FDA
application_type: NDA
change_type: manufacturing_site
conditions:
  - field: sterile_product
    operator: equals
    value: true
  - field: operation
    operator: in
    value:
      - aseptic_processing
outcome:
  preliminary_pathway: PAS
  confidence: medium
sources:
  - source_document_id
review_required: true
```

AI may help propose rules, but it must not be the runtime authority for classification.

### MVP Priority

This should become the first significant interactive product because it:

- addresses recurring lifecycle work;
- connects RA and QA;
- fits the user’s existing lifecycle-management background;
- supports FDA/EMA comparison;
- can later support paid saved workspaces and exports.

---

## 6.5 Inspection Readiness

### Purpose

Help teams prepare evidence that demonstrates conformance between the submitted or approved application and actual regulated operations.

### Inspection Modules

#### FDA

- Pre-Approval Inspection
- Pre-License Inspection
- routine drug CGMP inspection
- post-approval inspection
- for-cause inspection
- remote regulatory assessment, where applicable

#### EMA-Coordinated

- GMP
- GCP
- GVP

### FDA PAI Foundation

The FDA’s current PAI compliance program identifies four primary inspection objectives:

1. readiness for commercial manufacturing;
2. conformance to the application;
3. data-integrity audit;
4. commitment to quality in pharmaceutical development.

The product should organize FDA PAI readiness around these objectives rather than around a generic document list.

### Application-to-Site Traceability

This is a flagship feature.

```text
Application claim
    ↓
CTD source location
    ↓
Site procedure or controlled document
    ↓
Executed evidence or raw data
    ↓
System of record
    ↓
Owner
    ↓
Readiness status
    ↓
Gap and remediation action
```

### Traceability Record Schema

```yaml
id: trace-001
application_claim: ""
ctd_section: 3.2.P.3.3
source_sequence: ""
site_document_type: master_batch_record
site_document_id: ""
executed_evidence: ""
system_of_record: ""
owner: Manufacturing
supporting_function:
  - Quality Assurance
inspection_objective:
  - conformance_to_application
status: not_started | in_progress | ready | gap | not_applicable
gap_description: ""
remediation_action: ""
due_date: YYYY-MM-DD
reviewer: ""
last_verified_date: YYYY-MM-DD
```

### FDA PAI Readiness Categories

- Commercial manufacturing readiness
- Process and control-strategy conformance
- Batch and raw-data traceability
- Analytical method readiness
- Stability-data traceability
- Data integrity
- Facility and equipment readiness
- Process validation lifecycle
- Regulatory commitments
- Changes after submission
- Inspection logistics and document-room readiness

### FDA GMP Inspection Module

- quality system;
- production system;
- facilities and equipment;
- laboratory controls;
- materials system;
- packaging and labeling;
- data integrity;
- deviations, investigations, CAPA;
- complaints and recalls;
- supplier oversight;
- management review.

### EMA GMP/GCP/GVP Modules

The platform should provide separate modules because required evidence differs substantially.

#### EMA GMP

- IRIS communication readiness;
- facility and authorization information;
- quality system;
- dossier/site consistency;
- manufacturing and testing evidence;
- subcontractor oversight;
- inspection logistics.

#### EMA GCP

- trial and site lists;
- protocol and amendments;
- informed-consent versions;
- monitoring strategy;
- SOP versions;
- vendor and CRO oversight;
- TMF accessibility;
- data-flow diagrams;
- computerized-system inventory and validation status;
- audit trails;
- protocol deviations;
- risk-based quality management.

#### EMA GVP

- pharmacovigilance system;
- PSMF-related readiness;
- QPPV oversight;
- vendor agreements;
- safety database;
- case processing;
- signal management;
- aggregate reports;
- quality-system documentation;
- inspection communication through IRIS.

### Inspection Document Request List

The product must distinguish:

- standard readiness document;
- inspection-type-specific document;
- product-specific document;
- item requested only after inspector coordination;
- raw data that should not be transmitted before format and scope are agreed.

### Inspection Readiness Status

- Ready
- Ready with observation
- In progress
- Gap
- Blocked
- Not applicable
- Requires inspector clarification

---

## 6.6 Labeling & e-Labeling

### Purpose

Create a specialized hub that connects regulatory labeling changes to structured content, submission procedure, artwork, local implementation, and data systems.

### FDA SPL Module

Content should explain and operationalize:

- SPL purpose and structure;
- FDA labeling resources;
- relationship among prescribing information, patient labeling, carton/container labeling, and SPL;
- document identifiers and versioning;
- validation;
- lifecycle considerations;
- common content consistency checks;
- labeling databases such as FDALabel;
- submission and implementation workflow.

### EMA ePI Module

Content should explain and operationalize:

- authorized product information in electronic form;
- SmPC, package leaflet, and labeling;
- PLM Portal authoring/upload process;
- relationship to PMS and SPOR;
- staged implementation;
- variation lifecycle;
- multilingual transition;
- coexistence with current Word/PDF processes during initial implementation;
- readiness activities for MAHs.

### Labeling Change Navigator

#### User Intake

- Agency
- Application type
- Change driver
- Safety, efficacy, dosage, storage, manufacturing, administrative, or quality change
- PI/SmPC section affected
- Patient labeling/package leaflet affected
- Carton/container labeling affected
- IFU affected
- Artwork affected
- Language or market impact
- Immediate implementation needed
- Structured content already available
- Associated CMC or safety submission

#### Output

- preliminary procedure;
- affected labeling documents;
- clean and annotated version needs;
- SPL/ePI implications;
- artwork and inventory considerations;
- local implementation;
- affected systems;
- owner and reviewers;
- implementation evidence;
- open regulatory questions.

### e-Labeling Readiness Assessment

The readiness tool should assess:

- governance;
- source-of-truth content;
- structured authoring;
- terminology and master data;
- RIM integration;
- artwork integration;
- change control;
- version control;
- multilingual content;
- validation;
- publishing;
- audit trail;
- operating model;
- vendor readiness;
- training;
- business continuity.

### Strategic Position

This hub should be a visible specialty area because it aligns strongly with the editor’s prior e-labeling and lifecycle experience.

---

## 6.7 Practical Templates

### General Requirements

Templates must be:

- created independently;
- free of former-employer confidential information;
- editable;
- version-controlled;
- accompanied by instructions;
- linked to official sources;
- clearly marked as educational starting points.

### Templates

#### A. Submission Readiness Checklist

Fields:

- submission type;
- requirement;
- status;
- CTD section;
- owner;
- contributor;
- dependency;
- source;
- evidence;
- due date;
- comment.

#### B. Regulatory Impact Assessment

Fields:

- change description;
- reason;
- products/markets;
- approved dossier impact;
- regulatory pathway;
- supporting evidence;
- labeling impact;
- quality-system impact;
- implementation timing;
- risk;
- reviewer;
- decision.

#### C. Inspection Document Request List

Fields:

- inspection type;
- document category;
- document title;
- version;
- period covered;
- owner;
- system;
- readiness;
- confidentiality;
- inspector-request status;
- comments.

#### D. Dossier-to-Site Traceability Matrix

Fields:

- dossier claim;
- CTD section;
- site procedure;
- executed evidence;
- raw-data location;
- system owner;
- inspection objective;
- gap;
- remediation.

#### E. Change Classification Worksheet

Fields:

- agency;
- application;
- product type;
- proposed change;
- approved condition;
- risk assessment;
- potential reporting category;
- supporting source;
- alternative category;
- implementation restriction;
- reviewer;
- final internal decision.

### File Formats

MVP:

- `.xlsx`
- `.docx` or `.md`
- printable PDF where useful

Later:

- saved online workspace;
- CSV import/export;
- JSON export;
- integration-ready API.

---

## 6.8 Methodology

### Sources Page

Explain:

- source hierarchy;
- how sources are monitored;
- how webpage and document changes are detected;
- how citations are stored;
- how source status is determined;
- how superseded content is handled.

### Version History Page

Show:

- content version;
- source version;
- publication date;
- last verification date;
- reviewer;
- summary of changes;
- superseded versions.

### Human Review Page

Describe:

- reviewer qualifications;
- review checklist;
- use and limits of AI;
- correction process;
- escalation for uncertain interpretations.

### Disclaimer Page

Required concepts:

- independent educational and regulatory-intelligence resource;
- not affiliated with FDA, EMA, or the European Commission;
- not legal or regulatory advice;
- official source documents control;
- product-specific facts may change the outcome;
- users should obtain qualified review before acting;
- no warranty of completeness;
- correction contact.

---

# 7. Content and Evidence Model

## 7.1 Core Entities

### Agency

```ts
type Agency = "FDA" | "EMA";
```

### SourceDocument

```ts
interface SourceDocument {
  id: string;
  agency: Agency;
  title: string;
  officialUrl: string;
  sourceType:
    | "regulation"
    | "rule"
    | "guidance"
    | "procedural_advice"
    | "qa"
    | "template"
    | "technical_standard"
    | "compliance_program"
    | "news"
    | "consultation";
  status: "draft" | "final" | "effective" | "superseded" | "withdrawn";
  publicationDate?: string;
  effectiveDate?: string;
  lastAgencyUpdate?: string;
  detectedAt: string;
  lastVerifiedAt: string;
  contentHash?: string;
  supersedes: string[];
  supersededBy?: string;
}
```

### SourceCitation

```ts
interface SourceCitation {
  sourceDocumentId: string;
  section?: string;
  page?: number;
  paragraph?: string;
  quotedText?: string;
  interpretationNote?: string;
}
```

### Requirement

```ts
interface Requirement {
  id: string;
  title: string;
  classification:
    | "legal_requirement"
    | "procedural_requirement"
    | "agency_recommendation"
    | "conditional_requirement"
    | "product_commitment"
    | "potential_impact"
    | "best_practice"
    | "undetermined";
  description: string;
  rationale: string;
  applicabilityRuleIds: string[];
  citations: SourceCitation[];
  affectedCtdSections: string[];
  affectedFunctions: string[];
  evidenceExamples: string[];
  lastReviewedAt: string;
}
```

### ApplicabilityRule

```ts
interface ApplicabilityRule {
  id: string;
  inputFields: string[];
  conditions: RuleCondition[];
  result: RuleResult;
  sourceCitations: SourceCitation[];
  reviewer: string;
  status: "draft" | "approved" | "retired";
  version: string;
}
```

### ChecklistTemplate

```ts
interface ChecklistTemplate {
  id: string;
  title: string;
  agency: Agency;
  procedure: string;
  version: string;
  checklistItemIds: string[];
  status: "draft" | "reviewed" | "published" | "superseded";
  reviewedAt: string;
}
```

### ReviewRecord

```ts
interface ReviewRecord {
  id: string;
  entityType: string;
  entityId: string;
  reviewer: string;
  reviewDate: string;
  result: "approved" | "changes_required" | "rejected";
  notes: string;
  sourceSetHash: string;
}
```

## 7.2 Source Authority Score

Use a score only to support editorial review, not to replace legal judgment.

| Score | Source                                                |
| ----- | ----------------------------------------------------- |
| 100   | Regulation, legally effective rule                    |
| 90    | Final agency guidance                                 |
| 85    | Official procedural advice or technical specification |
| 80    | Official agency Q&A or compliance program             |
| 75    | Official template/checklist                           |
| 60    | Draft guidance or consultation                        |
| 40    | Official news announcement                            |
| 20    | Secondary professional source                         |
| 0     | Unverified source                                     |

When sources conflict, the page must show the conflict and request human resolution.

---

# 8. Editorial Workflow

## 8.1 Status Pipeline

```text
Detected
→ Triaged
→ Source package assembled
→ Drafted
→ Regulatory review
→ Editorial QA
→ Published
→ Periodic verification
→ Superseded or archived
```

## 8.2 Review Checklist

Before publication, confirm:

- [ ] Correct agency and jurisdiction
- [ ] Correct source status: draft/final/effective/superseded
- [ ] Publication and effective dates verified
- [ ] Requirement separated from recommendation
- [ ] Applicability stated
- [ ] Exceptions and missing facts identified
- [ ] No unsupported final classification
- [ ] CTD references checked
- [ ] FDA and EMA terminology not mixed
- [ ] Action items are practical and not overstated
- [ ] Source links work
- [ ] Material statements include citations
- [ ] Last-reviewed date added
- [ ] Disclaimer displayed
- [ ] Change log created

## 8.3 Correction Policy

- Provide a visible “Report an issue” link.
- Record reported issue, date, reviewer, disposition, and correction.
- Correct material errors promptly.
- Preserve previous version in the internal history.
- Display a correction notice when a published conclusion materially changes.

---

# 9. AI Use Policy

## 9.1 Permitted AI Uses

- classify documents by topic;
- detect possible duplicates;
- generate candidate summaries;
- compare source versions;
- extract candidate dates, deadlines, and sections;
- propose checklist items;
- suggest affected functions or CTD sections;
- translate technical language into a first draft;
- generate test cases;
- assist code development.

## 9.2 Prohibited Autonomous Uses

AI must not independently:

- make a final regulatory classification;
- publish content;
- declare a submission complete;
- declare a facility inspection-ready;
- decide that a requirement does not apply;
- invent a source;
- summarize a source that was not retrieved;
- create product-specific legal advice;
- silently replace human-reviewed rules.

## 9.3 Grounding Requirements

Every AI-generated regulatory statement must be traceable to:

- a retrieved official source;
- a specific source version;
- a relevant section or page where practicable;
- a human review record.

## 9.4 Safe Failure

When evidence is insufficient, the system should return:

> **Insufficient information to determine. Additional product, dossier, procedural, or agency-specific facts are required.**

A refusal to classify is better than a confident unsupported answer.

---

# 10. Technical Architecture

## 10.1 Recommended Stack

### Front End

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- accessible component primitives
- MDX for reviewed editorial content

### Hosting

- GitHub for source control
- Vercel for deployments and preview environments
- custom domain
- production and preview branches

### MVP Content Storage

- MDX for articles and methodology pages
- YAML or JSON for structured rules and checklists
- Git-based review through pull requests

### Phase 2 Data Layer

- PostgreSQL
- Supabase or another managed PostgreSQL provider
- row-level access controls for saved user workspaces
- object storage only when user-uploaded evidence is introduced

### Search

MVP:

- static site search such as Pagefind, Orama, or a lightweight indexed search

Later:

- server-side indexed search;
- semantic search restricted to verified content;
- filters for agency, procedure, topic, status, effective date, and impact.

### Automation

- GitHub Actions scheduled workflows
- source fetchers
- hashing and diffing
- validation tests
- issue or pull-request creation for detected updates
- deployment after approved merge

## 10.2 Why This Stack

- Next.js supports Markdown/MDX content and interactive React components.
- Static generation supports fast public pages and strong crawlability.
- Vercel can automatically deploy commits and pull requests from a connected Git repository.
- GitHub Actions can run scheduled monitoring workflows.
- The architecture can begin as a low-cost content product and later add authenticated workflows.

## 10.3 Repository Structure

```text
regulatory-execution-hub/
├── app/
│   ├── page.tsx
│   ├── updates/
│   ├── submission-navigator/
│   ├── change-impact/
│   ├── inspection-readiness/
│   ├── labeling/
│   ├── templates/
│   ├── methodology/
│   └── api/
├── components/
│   ├── navigation/
│   ├── regulatory/
│   ├── checklist/
│   ├── citations/
│   ├── decision-tree/
│   └── layout/
├── content/
│   ├── updates/
│   │   ├── fda/
│   │   └── ema/
│   ├── guides/
│   ├── labeling/
│   └── methodology/
├── data/
│   ├── agencies/
│   ├── sources/
│   ├── rules/
│   ├── checklists/
│   ├── ctd/
│   └── taxonomies/
├── scripts/
│   ├── fetch-fda.ts
│   ├── fetch-ema.ts
│   ├── normalize-source.ts
│   ├── hash-content.ts
│   ├── diff-source.ts
│   ├── generate-update-candidate.ts
│   └── validate-citations.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── content/
│   ├── rules/
│   └── e2e/
├── public/
│   ├── downloads/
│   └── images/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── source-monitor.yml
│       └── link-check.yml
├── schemas/
│   ├── source-document.schema.json
│   ├── requirement.schema.json
│   ├── checklist.schema.json
│   └── rule.schema.json
├── blueprint.md
├── CONTRIBUTING.md
├── EDITORIAL_POLICY.md
├── AI_USE_POLICY.md
└── README.md
```

## 10.4 Route Design

```text
/
 /updates
 /updates/fda
 /updates/ema
 /updates/[agency]/[slug]

 /submission-navigator
 /submission-navigator/fda
 /submission-navigator/fda/nda
 /submission-navigator/ema
 /submission-navigator/ema/maa

 /change-impact
 /change-impact/manufacturing
 /change-impact/specifications
 /change-impact/analytical-methods
 /change-impact/facilities
 /change-impact/container-closure
 /change-impact/labeling

 /inspection-readiness
 /inspection-readiness/fda/pai
 /inspection-readiness/fda/gmp
 /inspection-readiness/ema/gmp
 /inspection-readiness/ema/gcp
 /inspection-readiness/ema/gvp
 /inspection-readiness/traceability

 /labeling
 /labeling/fda-spl
 /labeling/ema-epi
 /labeling/change-navigator

 /templates
 /methodology/sources
 /methodology/version-history
 /methodology/human-review
 /methodology/disclaimer
```

---

# 11. Source Monitoring and Change Detection

## 11.1 Monitoring Frequency

### Daily

- FDA What’s New
- newly added FDA guidance
- FDA labeling and technical-standard pages
- EMA What’s New
- EMA regulatory/procedural RSS
- EMA product-information and variation pages

### Weekly

- compliance programs
- technical conformance guides
- inspection guidance
- major source-page inventories
- broken-link and supersession checks

### Monthly

- full source-catalog reconciliation
- stale-page review
- all published checklist verification queue
- citation health report

## 11.2 Detection Logic

Store:

- canonical URL;
- agency document identifier;
- title;
- publication date;
- last agency update;
- downloaded file checksum;
- extracted-text checksum;
- prior version;
- retrieval timestamp.

Create an update candidate when:

- a new source appears;
- content hash changes;
- linked PDF changes;
- draft becomes final;
- effective date changes;
- document is withdrawn or superseded;
- tracked-change version appears;
- procedural Q&A adds a new or revised item.

## 11.3 Diff Types

- metadata diff;
- textual diff;
- table diff;
- date/deadline diff;
- link-target diff;
- PDF version diff;
- status diff;
- document-attachment diff.

## 11.4 Review Queue

Automation should open a structured GitHub issue or pull request:

```yaml
title: "[EMA UPDATE] Type-II variations Q&A changed"
detected_at: "2026-07-13"
source_url: ""
previous_hash: ""
new_hash: ""
candidate_topics:
  - variations
  - post-authorisation
candidate_impact: high
requires_human_review: true
```

---

# 12. User Experience Standards

## 12.1 Regulatory Status Badges

- Final
- Draft
- Effective
- Proposed
- Superseded
- Withdrawn
- Under consultation
- Human reviewed
- Verification due

## 12.2 Requirement Badges

- Required
- Conditional
- Recommended
- Potential impact
- Best practice
- Not applicable
- Undetermined

## 12.3 Confidence Badges

- High confidence
- Medium confidence
- Low confidence
- Insufficient information

Confidence must reflect evidence completeness, not stylistic certainty.

## 12.4 Citation Component

Every citation should show:

- source title;
- agency;
- source status;
- publication/effective date;
- specific section or page;
- official link;
- last verified date.

## 12.5 Checklist Interaction

Users should be able to:

- filter;
- mark status locally;
- add notes;
- print;
- export;
- copy citation;
- view why an item applies;
- view what facts could change applicability.

The public MVP may store checklist status in the browser without creating an account.

## 12.6 Accessibility

- keyboard navigation;
- visible focus;
- semantic headings;
- sufficient contrast;
- screen-reader labels;
- text alternatives;
- no critical information conveyed by color alone;
- printable checklist design.

---

# 13. SEO and Distribution

## 13.1 Search Strategy

Do not target broad terms such as “FDA news.” Target practical intent:

- FDA NDA submission readiness checklist
- FDA PAI application-to-site traceability
- FDA manufacturing site change reporting category
- EMA Type II variation supporting documents
- FDA SPL vs EMA ePI
- EMA ePI readiness assessment
- post-approval change impact assessment template
- FDA inspection document request list

## 13.2 Technical SEO

- custom domain;
- server-rendered or statically generated public pages;
- unique title and description;
- canonical URLs;
- XML sitemap;
- RSS feed;
- Article structured data for update and guide pages;
- Organization/ProfilePage structured data where appropriate;
- breadcrumb structured data;
- internal related-content links;
- meaningful updated dates;
- robots and indexing checks;
- fast Core Web Vitals;
- accessible HTML.

A sitemap helps search engines discover important and recently updated pages, but it does not guarantee indexing. Article structured data can help search engines understand article titles, dates, images, and authors.

## 13.3 Editorial Distribution

### Weekly LinkedIn Format

- one major FDA change;
- one major EMA change;
- practical impact;
- one checklist or tool;
- link to full analysis.

### Newsletter Format

```text
FDA & EMA Regulatory Execution Brief
1. What changed
2. Why it matters
3. Who should assess it
4. Immediate action
5. Upcoming deadline
6. e-Labeling watch
7. New practical tool
```

### Community Validation

Seek feedback from:

- former RA colleagues;
- QA professionals;
- labeling professionals;
- small biotech professionals;
- RAPS or DIA communities;
- regulatory consultants;
- hiring managers and recruiters.

Do not present endorsements without permission.

---

# 14. Career Strategy

## 14.1 Career Objective

Use the platform to demonstrate:

- FDA/EMA regulatory research;
- structured interpretation;
- lifecycle and change-management thinking;
- inspection-readiness understanding;
- labeling/e-labeling specialization;
- regulatory operations;
- digital product ownership;
- responsible AI use;
- cross-functional workflow design.

## 14.2 Resume Language

Accurate example:

> Developed an independent FDA/EMA regulatory intelligence and execution-support platform that maps official requirements to submission-readiness, post-approval change, inspection, and labeling workflows.

Do not claim direct leadership of FDA or EMA submissions that did not occur.

## 14.3 Portfolio Evidence

The public portfolio should contain:

- five flagship guides;
- one working navigator;
- one inspection traceability demo;
- one e-labeling readiness tool;
- methodology and AI-use policy;
- change logs;
- GitHub history;
- user feedback;
- usage metrics;
- examples of corrections and continuous improvement.

## 14.4 Recruiter Journey

A recruiter should be able to:

1. understand the product;
2. see the editor’s experience;
3. open a practical tool;
4. inspect the official sources;
5. view the reasoning and limitations;
6. review the GitHub project;
7. contact the editor.

---

# 15. Business Model

## 15.1 Stage 1 — Career-First Public Resource

Free:

- regulatory updates;
- guides;
- public checklists;
- one or two interactive navigators;
- newsletter;
- downloadable templates.

Objectives:

- build credibility;
- gain users;
- test demand;
- learn which workflows are repeated;
- support job search and professional networking.

## 15.2 Stage 2 — Individual Pro

Potential paid features:

- saved assessments;
- product profiles;
- personalized FDA/EMA alerts;
- source-version comparisons;
- export to Excel/PDF;
- private notes;
- rule explanation;
- saved checklist history;
- verification reminders.

Pricing must be validated through interviews and paid pilots rather than assumed.

## 15.3 Stage 3 — Small-Team Workspace

Potential features:

- shared workspaces;
- owner assignment;
- due dates;
- evidence attachments;
- review and approval;
- source audit trail;
- product applicability;
- change history;
- role-based access;
- exports for RIM or quality systems.

## 15.4 Stage 4 — Productized Services

Possible services within demonstrated competence:

- regulatory-intelligence workflow setup;
- checklist configuration;
- e-labeling readiness assessment;
- public-source change-impact research;
- inspection traceability template setup;
- regulatory operations and RIM process mapping.

Do not offer product-specific legal conclusions or senior regulatory strategy beyond verified qualifications.

---

# 16. Security, Privacy, and Compliance Boundaries

## 16.1 MVP Data Policy

Do not collect:

- confidential dossier content;
- patient data;
- clinical subject data;
- proprietary manufacturing information;
- regulated electronic signatures;
- official approval records;
- sensitive company documents.

## 16.2 Future Authenticated Product

Before storing company data, implement:

- authentication;
- authorization;
- encryption;
- backup and recovery;
- audit logs;
- data retention;
- incident response;
- vendor assessment;
- privacy policy;
- security testing;
- contractual terms;
- validation assessment.

## 16.3 GxP Warning

The public and early paid product must state that it is not a validated GxP system and must not be used as the sole system of record for regulated decisions or evidence.

---

# 17. Testing Strategy

## 17.1 Unit Tests

- schema validation;
- rule-condition evaluation;
- status transitions;
- date logic;
- source hierarchy;
- badge mapping;
- CTD-section formatting;
- URL normalization.

## 17.2 Source Monitoring Tests

- RSS parser;
- HTML fetcher;
- PDF download;
- duplicate detection;
- hash change;
- supersession detection;
- tracked-change detection;
- failed-source retry;
- rate limiting.

## 17.3 Content Tests

- every material claim has a citation;
- official URL present;
- last-reviewed date present;
- no published draft without status;
- no superseded source presented as current;
- no final classification without disclaimer;
- no orphan checklist items;
- no broken internal links.

## 17.4 Decision-Rule Tests

For each rule:

- positive case;
- negative case;
- boundary case;
- missing-information case;
- conflicting-source case;
- superseded-rule case.

## 17.5 End-to-End Tests

- browse an update;
- start a navigator;
- answer questions;
- receive result;
- inspect source explanation;
- export checklist;
- print page;
- submit correction;
- open related content.

## 17.6 Quality Gates

Production deploy should fail if:

- schema validation fails;
- citations are missing;
- links fail beyond defined tolerance;
- rule tests fail;
- accessibility critical errors occur;
- build fails;
- published content lacks reviewer and verification date.

---

# 18. Metrics

## 18.1 Trust Metrics

- percentage of pages with paragraph/page-level citations;
- percentage verified within required interval;
- number of corrections;
- correction resolution time;
- stale-content count;
- source-monitoring success rate.

## 18.2 Product Metrics

- navigator starts;
- navigator completion rate;
- checklist exports;
- repeat visitors;
- newsletter subscribers;
- searches with no result;
- most-used change categories;
- user-reported usefulness.

## 18.3 Career Metrics

- recruiter visits;
- portfolio link clicks;
- interview mentions;
- professional feedback;
- invitations to collaborate;
- relevant job interviews.

## 18.4 Business Validation Metrics

- requests for saved workspaces;
- willingness-to-pay interviews;
- pilot requests;
- paid conversions;
- team usage;
- monthly retention.

Vanity traffic alone is not sufficient. Repeated professional use is the more important signal.

---

# 19. Phased Build Roadmap

## Phase 0 — Foundation and Scope Lock

**Duration:** approximately 1–2 weeks

Deliverables:

- project name placeholder;
- domain shortlist;
- repository;
- design tokens;
- information architecture;
- source hierarchy;
- editorial policy;
- AI-use policy;
- disclaimer;
- core schemas;
- source catalog;
- initial wireframes.

Exit criteria:

- FDA/EMA human-medicines scope is locked;
- pharmacist regulation is excluded;
- no feature requires confidential data;
- source and review standards are approved.

## Phase 1 — Public Content MVP

**Duration:** approximately 3–5 weeks

Deliverables:

- Home;
- FDA Updates;
- EMA Updates;
- guide pages;
- Methodology;
- MDX content system;
- filters;
- citations;
- sitemap;
- RSS;
- analytics;
- Vercel deployment;
- custom domain.

Initial flagship content:

1. How to assess an FDA regulatory update
2. How to assess an EMA procedural update
3. FDA post-approval change framework
4. EMA variations framework
5. FDA SPL vs EMA ePI
6. FDA PAI application-to-site traceability
7. Regulatory Impact Assessment template
8. Dossier-to-Site Traceability Matrix template

Exit criteria:

- at least eight high-quality pages;
- all material claims sourced;
- update/version fields functioning;
- no broken critical links;
- Search Console submitted.

## Phase 2 — Change Impact Navigator MVP

**Duration:** approximately 4–6 weeks

Coverage:

- agency: FDA and EMA;
- application types: NDA/ANDA and centralised MAA;
- change types:
  - manufacturing site;
  - manufacturing process;
  - specification;
  - analytical method;
  - container closure;
  - labeling.

Deliverables:

- guided intake;
- deterministic rule engine;
- preliminary pathway;
- affected CTD sections;
- document impact;
- internal action map;
- uncertainty output;
- printable/exportable result;
- rule tests.

Exit criteria:

- every outcome links to approved rules and sources;
- missing information produces a safe outcome;
- no AI-only runtime classification;
- ten or more scenario test cases per change category.

## Phase 3 — Inspection Readiness MVP

**Duration:** approximately 4–6 weeks

Deliverables:

- FDA PAI module;
- FDA PAI four-objective structure;
- traceability matrix;
- document-room checklist;
- gap tracker;
- FDA GMP overview;
- EMA GMP/GCP/GVP landing pages.

Exit criteria:

- dossier-to-site evidence mapping works;
- users can export the matrix;
- inspection-type-specific documents are separated;
- inspector-clarification items are clearly marked.

## Phase 4 — Labeling & e-Labeling

**Duration:** approximately 3–5 weeks

Deliverables:

- FDA SPL hub;
- EMA ePI hub;
- labeling change navigator;
- e-labeling readiness assessment;
- workflow diagrams;
- structured-content glossary.

Exit criteria:

- SPL and ePI are accurately distinguished;
- content reflects current ePI implementation status;
- labeling change outputs identify procedure, document, artwork, and system impact.

## Phase 5 — Submission Navigator Expansion

**Duration:** iterative

Expand:

- FDA BLA;
- FDA IND;
- FDA ANDA;
- 505(b)(2);
- EMA renewal;
- worksharing;
- transfer;
- Article 61(3);
- specialized product pathways.

## Phase 6 — User Accounts and Commercial Validation

Only after public usage demonstrates demand.

Deliverables:

- authentication;
- saved workspaces;
- alerts;
- exports;
- team pilot;
- terms/privacy/security documentation;
- payment experiment.

---

# 20. MVP Backlog Priority

## Must Have

- [ ] Home page
- [ ] FDA/EMA update content model
- [ ] Source citations
- [ ] Review and version fields
- [ ] Regulatory update list and filters
- [ ] Eight flagship guides
- [ ] Methodology pages
- [ ] Downloadable templates
- [ ] Change Impact Navigator for one change type
- [ ] Static export or server-rendered deployment
- [ ] Sitemap and structured data
- [ ] Analytics
- [ ] Correction form

## Should Have

- [ ] All six initial change categories
- [ ] PDF/text diff viewer
- [ ] source freshness dashboard
- [ ] checklist browser persistence
- [ ] RSS/newsletter workflow
- [ ] PAI traceability demo
- [ ] labeling/e-labeling glossary

## Could Have

- [ ] accounts;
- [ ] personalized alerts;
- [ ] semantic search;
- [ ] user-uploaded evidence;
- [ ] RIM export;
- [ ] team workflow;
- [ ] API.

## Not Yet

- [ ] automatic final regulatory advice;
- [ ] confidential dossier storage;
- [ ] validated GxP recordkeeping;
- [ ] all global agencies;
- [ ] pharmacist regulation;
- [ ] medical-device regulation;
- [ ] enterprise RIM replacement.

---

# 21. First Build Slice

The first coding milestone should be intentionally narrow.

## Feature

**FDA/EMA Manufacturing-Site Change Impact Prototype**

### Intake

- FDA or EMA
- application type
- drug substance or drug product
- sterile/nonsterile
- operation performed at site
- replacement/addition/relocation
- approved dossier status
- validation availability
- stability impact
- labeling impact
- implementation timing

### Output

- preliminary pathway;
- confidence;
- reasoning;
- facts that could change result;
- affected CTD sections;
- external documents;
- internal documents;
- functions;
- evidence;
- sources;
- disclaimer.

### Why Start Here

- recurring practical use;
- clear relationship between RA and QA;
- meaningful FDA/EMA comparison;
- sufficient complexity to test the architecture;
- narrow enough to validate without pretending to cover all NDA/MAA requirements.

---

# 22. Definition of Done

A feature is complete only when:

- [ ] user problem is defined;
- [ ] official source set is documented;
- [ ] data schema is validated;
- [ ] applicability logic is transparent;
- [ ] uncertainty behavior is implemented;
- [ ] human reviewer is identified;
- [ ] citations are visible;
- [ ] source and analysis versions are stored;
- [ ] tests pass;
- [ ] accessibility review passes;
- [ ] page metadata and structured data are present;
- [ ] disclaimer is visible;
- [ ] correction path exists;
- [ ] content owner and verification interval are assigned.

---

# 23. Major Risks and Mitigations

## Risk 1 — Regulatory Inaccuracy

**Mitigation**

- primary sources;
- deterministic rules;
- human approval;
- uncertainty output;
- versioning;
- correction workflow;
- no final product-specific determination.

## Risk 2 — Scope Explosion

**Mitigation**

- FDA/EMA only;
- human medicinal products only;
- six initial change categories;
- staged submission expansion;
- no pharmacist regulation in this product.

## Risk 3 — Stale Content

**Mitigation**

- scheduled monitoring;
- verification dates;
- freshness dashboard;
- supersession logic;
- periodic review queues;
- visible “verification due” status.

## Risk 4 — AI Hallucination

**Mitigation**

- source retrieval required;
- no autonomous publishing;
- no AI-only rule execution;
- citation validation;
- safe failure.

## Risk 5 — Weak Career Value

**Mitigation**

- build working tools, not only blog posts;
- show methodology and GitHub history;
- collect professional feedback;
- publish case studies;
- connect prior e-labeling and lifecycle experience accurately.

## Risk 6 — No Business Demand

**Mitigation**

- free public validation;
- user interviews;
- track repeated use;
- test one paid feature;
- avoid heavy enterprise infrastructure before demand.

## Risk 7 — Copyright or Improper Reuse

**Mitigation**

- summarize rather than reproduce;
- use limited excerpts;
- attribute official sources;
- follow agency reuse terms;
- do not use agency logos as branding.

---

# 24. Governance

## 24.1 Roles During Solo MVP

The founder may hold multiple roles, but each review must record the role performed.

- Product owner
- Regulatory researcher
- Content author
- Reviewer
- Developer
- Release manager

When the same person authors and reviews content, perform the review in a separate session and record that limitation.

## 24.2 External Review

Recruit volunteer or paid reviewers for:

- FDA CMC;
- EMA lifecycle;
- QA and inspection;
- GCP;
- GVP;
- labeling/SPL;
- ePI/SPOR.

Reviewer comments should be documented. Do not imply agency endorsement.

---

# 25. Immediate Next Actions

1. Approve this blueprint and lock the FDA/EMA-only scope.
2. Select a working project name and domain shortlist.
3. Create the GitHub repository.
4. Create `EDITORIAL_POLICY.md`, `AI_USE_POLICY.md`, and `SOURCE_CATALOG.md`.
5. Define JSON schemas for source documents, requirements, rules, and checklists.
6. Build low-fidelity wireframes for:
   - Home;
   - Update detail;
   - Change Impact Navigator;
   - Traceability Matrix.
7. Create the first verified source package for manufacturing-site changes.
8. Build the first deterministic rule prototype.
9. Publish the first five guides before public promotion.
10. Launch a private alpha with five to ten RA/QA professionals.
11. Record feedback and revise the model.
12. Only then expand to additional change categories and submission types.

---

# 26. Official Source and Technology References

The following official resources informed this blueprint and should be included in the initial source catalog.

## FDA

1. FDA, **What’s New Related to Drugs**  
   https://www.fda.gov/drugs/news-events-human-drugs/whats-new-related-drugs

2. FDA, **Search for FDA Guidance Documents**  
   https://www.fda.gov/regulatory-information/search-fda-guidance-documents

3. FDA, **Electronic Common Technical Document (eCTD)**  
   https://www.fda.gov/drugs/electronic-regulatory-submission-and-review/electronic-common-technical-document-ectd

4. FDA, **Structured Product Labeling Resources**  
   https://www.fda.gov/industry/fda-data-standards-advisory-board/structured-product-labeling-resources

5. FDA, **Changes to an Approved NDA or ANDA**  
   https://www.fda.gov/regulatory-information/search-fda-guidance-documents/changes-approved-nda-or-anda

6. FDA, **Compliance Program 7346.832 — Preapproval Inspections**, issued 2026-06-29  
   https://www.fda.gov/media/193382/download

## EMA

7. EMA, **RSS Feeds**  
   https://www.ema.europa.eu/en/news-events/rss-feeds

8. EMA, **What’s New**  
   https://www.ema.europa.eu/en/news-events/whats-new

9. EMA, **Guidance on the Application of the Revised Variations Framework**  
   https://www.ema.europa.eu/en/guidance-application-revised-variations-framework

10. EMA, **Electronic Product Information (ePI)**  
    https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/product-information-requirements/electronic-product-information-epi

11. EMA, **Electronic Product Information Roadmap**, published 2026-03-20  
    https://www.ema.europa.eu/en/documents/other/electronic-product-information-epi-roadmap_en.pdf

12. EMA, **Good Manufacturing Practice**  
    https://www.ema.europa.eu/en/human-regulatory-overview/research-development/compliance-research-development/good-manufacturing-practice

13. EMA, **Guidance for Applicants/MAHs Involved in GMP, GCP and GVP Inspections Coordinated by EMA**  
    https://www.ema.europa.eu/en/documents/regulatory-procedural-guideline/guidance-applicantsmahs-involved-gmp-gcp-and-gvp-inspections-coordinated-ema_en.pdf

## Technology and Search

14. Next.js, **MDX Guide**  
    https://nextjs.org/docs/pages/guides/mdx

15. Vercel, **Deployments**  
    https://vercel.com/docs/deployments

16. GitHub, **Events that Trigger Workflows**  
    https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows

17. Google Search Central, **Article Structured Data**  
    https://developers.google.com/search/docs/appearance/structured-data/article

18. Google Search Central, **Sitemaps Overview**  
    https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview

---

# 27. Final Product Statement

Regulatory Execution Hub should be built as a trustworthy, versioned, evidence-linked bridge between official FDA/EMA information and the practical work required to prepare submissions, assess post-approval changes, support inspections, and implement labeling and e-labeling changes.

The product succeeds when a professional can move from:

> “I found the regulation, but I am not sure what I need to prepare.”

to:

> “I understand which sources apply, what is required or conditional, what documents and functions may be affected, what evidence is needed, what remains uncertain, and what I should do next.”
