# Codex Master Build Prompt

## Regulatory Execution Hub — CTD Authoring Foundation

You are the senior full-stack engineer, product architect, test engineer, accessibility reviewer, and implementation custodian for an existing GitHub repository.

Your task is to inspect the repository, preserve its existing working architecture, and implement the first vertical slice from `blueprint_v0.2.md`.

Do not rebuild the project from scratch unless the repository is genuinely empty. Do not discard existing work, rename major structures unnecessarily, or replace established dependencies merely because you prefer another stack.

---

# 1. Operating Mode

Execute autonomously. Stop only for a true hard blocker such as:

- the selected repository is empty when the user clearly expected an existing project;
- repository permissions prevent all edits or pull-request creation;
- the application cannot build because required secrets or proprietary dependencies are unavailable and no safe mock or fallback exists;
- two existing project instructions directly conflict and cannot be reconciled.

For non-blocking ambiguity:

1. inspect the repository;
2. infer the existing convention;
3. choose the smallest compatible implementation;
4. document the assumption;
5. continue.

Do not ask the user to repeat information already available in the repository, this prompt, or `blueprint_v0.2.md`.

---

# 2. Git and GitHub Rules

1. Read the repository’s existing instructions first:
   - `AGENTS.md`
   - `AGENTS.override.md`
   - `README.md`
   - contributing guides
   - package manifests
   - CI workflows
   - architecture documentation
   - current issues or implementation-status documents, if available.

2. Work from the repository’s current default branch or the branch selected by the user.

3. Create a feature branch using the repository’s convention. If none exists, use:

```text
codex/ctd-authoring-foundation
```

4. Do not push directly to a protected default branch.

5. Keep commits focused and reviewable.

6. At completion:
   - run all relevant tests and builds;
   - commit the changes;
   - push the branch when permissions allow;
   - open a pull request;
   - include a useful PR description, screenshots, test results, assumptions, and follow-up work.

7. If the current Codex surface cannot push or open a PR, leave the repository in a clean, committed state where possible and provide the exact remaining Git commands. Do not pretend that a PR was created.

---

# 3. Phase 0 — Repository Discovery

Before changing code, inspect and document:

- framework and version;
- router and route conventions;
- language;
- package manager;
- styling system;
- component library;
- content system;
- data-validation approach;
- testing frameworks;
- linting and formatting;
- existing navigation;
- existing Regulatory Updates, Submission Navigator, or CTD work;
- deployment configuration;
- analytics;
- accessibility conventions;
- current errors, warnings, or failing tests.

Create or update:

```text
docs/REPO_DISCOVERY.md
docs/IMPLEMENTATION_STATUS.md
```

`REPO_DISCOVERY.md` must summarize what exists and the implementation approach chosen.

`IMPLEMENTATION_STATUS.md` must contain:

- completed features;
- current task;
- decisions;
- assumptions;
- known limitations;
- test commands;
- ordered next steps.

Do not create duplicate documentation if the repository already has equivalent files. Update the existing canonical documents instead.

---

# 4. Persistent Codex Guidance

If the repository already contains `AGENTS.md`, obey it and make only minimal additions if a recurring project rule is missing.

If no `AGENTS.md` exists, create a concise repository-level file containing only durable instructions, including:

- preserve the existing stack and conventions;
- run the repository’s lint, type-check, test, and build commands before a PR;
- do not invent regulatory requirements or citations;
- distinguish required, conditional, recommended, potential impact, and undetermined;
- use structured data rather than embedding regulatory logic only in UI components;
- every published regulatory record needs source status and last verification;
- never expose secrets or put API keys in client code;
- do not collect confidential product or patient information;
- keep the product an educational decision-support tool, not a final regulatory determination.

Keep `AGENTS.md` short. Put detailed product requirements in the blueprint and implementation documents.

---

# 5. Product Context

The product is a public, evidence-linked FDA and EMA regulatory execution platform for human medicinal products.

Its purpose is to help professionals move from:

> “I found the regulation, but I do not know what to prepare.”

to:

> “I understand which sources apply, what information belongs in the CTD section, which source evidence is missing, which facts are inconsistent, and what remains subject to qualified regulatory review.”

The product must not be a generic project tracker or an unconstrained LLM chatbot.

Core principles:

- official sources first;
- requirement versus recommendation must be separated;
- deterministic rules for readiness and applicability;
- human review before regulatory interpretation is published;
- versioned sources and content;
- visible uncertainty;
- no fabricated technical data;
- no confidential dossier storage in this MVP;
- accessible and printable workflows.

---

# 6. Scope of This Pull Request

Implement one complete vertical slice:

# CTD Authoring & Dossier Builder — Module 3 Drug Product Foundation

Do not implement the entire blueprint in this PR.

The vertical slice must establish reusable architecture for later CTD sections.

---

# 7. Required Pages and Navigation

Adapt route names to the repository’s existing framework. Do not force Next.js paths onto a different framework.

Create or integrate:

1. **CTD Authoring & Dossier Builder landing page**
2. **Module 3 landing page**
3. **Drug Product section index**
4. **Reference section page: 3.2.P.5 — Control of Drug Product**
5. **Source-to-CTD Matrix prototype**
6. **Methodology and limitations panel**

Add the CTD area under the existing Submission Navigator navigation.

Preferred conceptual routes when compatible:

```text
/submission-navigator/ctd
/submission-navigator/ctd/module-3
/submission-navigator/ctd/module-3/drug-product
/submission-navigator/ctd/module-3/drug-product/3-2-p-5
/submission-navigator/ctd/source-matrix
```

Do not break existing URLs.

---

# 8. CTD Landing Page Requirements

The landing page should explain:

- what the CTD Builder does;
- what it does not do;
- the five CTD modules;
- that Module 1 differs between FDA and EMA;
- that CTD structure identifies where information is organized but does not independently define every product-specific evidence requirement;
- the five-layer evidence model:

```text
ICH CTD structure
→ scientific and technical guidelines
→ FDA or EMA regional requirements
→ product-specific requirements
→ program-specific advice, waivers, commitments, and correspondence
```

Provide clear entry cards for Modules 1–5. Only Module 3 needs to be active in this PR; other modules may show an honest “planned” state rather than fake pages.

Do not use fake completion percentages or unsupported claims.

---

# 9. Module 3 and Drug Product Index Requirements

Display the Module 3 structure, including:

```text
3.2.S Drug Substance
3.2.P Drug Product
3.2.A Appendices
3.2.R Regional Information
```

For Drug Product, show:

- 3.2.P.1 Description and Composition
- 3.2.P.2 Pharmaceutical Development
- 3.2.P.3 Manufacture
- 3.2.P.4 Control of Excipients
- 3.2.P.5 Control of Drug Product
- 3.2.P.6 Reference Standards or Materials
- 3.2.P.7 Container-Closure System
- 3.2.P.8 Stability

Only 3.2.P.5 must be fully implemented in this PR. Other section cards should indicate planned status and use the same future-compatible data model.

---

# 10. Typed Data Model

Create a typed and validated CTD section model using the repository’s existing schema technology. If none exists, use the smallest appropriate solution and justify any new dependency.

The model must support at least:

```ts
interface CtdSection {
  sectionId: string;
  slug: string;
  title: string;
  module: number;
  category: "drug_substance" | "drug_product" | "appendix" | "regional";

  regulatoryPurpose: string;
  include: string[];
  normallyExclude: string[];

  informationExpected: CtdExpectation[];
  conditionalInformation: CtdExpectation[];

  sourceDocuments: SourceDocumentRequirement[];
  sourceData: SourceDataRequirement[];

  primaryOwner: string;
  contributors: string[];
  approvers: string[];

  dependencies: string[];
  crossReferences: string[];
  downstreamOutputs: string[];

  authoringQuestions: string[];
  smeQuestions: string[];
  expectedTables: string[];
  expectedFigures: string[];

  consistencyChecks: ConsistencyCheck[];
  reviewerQuestions: string[];
  commonDeficiencies: string[];
  inspectionRelevance: string[];

  officialSources: RegulatoryCitation[];
  sourceStatus: "draft" | "final" | "effective" | "superseded";
  lastVerifiedDate: string;
  contentVersion: string;
  reviewer?: string;
}
```

Adapt naming to repository conventions, but preserve the semantics.

Regulatory business data must live in structured files or a data layer, not be hard-coded throughout visual components.

---

# 11. 3.2.P.5 Reference Page

Build a polished, practical reference page for:

```text
3.2.P.5 — Control of Drug Product
```

The page must contain clearly separated sections:

1. Regulatory purpose
2. What belongs here
3. What normally belongs elsewhere
4. Expected information
5. Conditional information
6. Source documents
7. Source data
8. Owners and contributors
9. Dependencies
10. Authoring questions
11. SME questions
12. Expected tables and figures
13. Cross-references
14. Consistency checks
15. Common deficiencies
16. Reviewer lens
17. Inspection relevance
18. Readiness assessment
19. Official sources and verification metadata
20. Educational-use limitation

Use progressive disclosure so the page is detailed without being visually overwhelming.

Provide print styling.

Do not generate or imply actual proprietary technical values.

If content is not yet verified against an official source package, label it as:

```text
Editorial draft — source verification required
```

Do not label it “Human reviewed” without an actual review record.

---

# 12. Source Document Readiness

Create a reusable source-document status model.

Minimum statuses:

- missing;
- draft;
- under review;
- approved;
- superseded;
- not applicable.

The page must show:

- source-document name;
- type;
- owner;
- version;
- approval status;
- sections supported;
- notes or unresolved issue;
- whether the document blocks final authoring.

Use non-confidential demonstration data only.

---

# 13. Deterministic Authoring-Readiness Evaluator

Implement a pure, testable evaluator. Do not use an LLM.

Required states:

```text
not_ready
ready_for_initial_drafting
ready_for_final_authoring
reviewer_ready
```

Minimum logic:

## not_ready

Use when a critical source is missing, a blocking strategy question is unresolved, or critical source versions conflict.

## ready_for_initial_drafting

Use when core evidence exists, known gaps are documented, owners are assigned, and initial drafting can begin.

## ready_for_final_authoring

Use when critical sources are approved, key decisions are stable, and required dependencies are resolved.

## reviewer_ready

Use only when:

- final-authoring conditions pass;
- required citations exist;
- consistency checks have no unresolved critical discrepancies;
- review comments are represented as closed in demonstration data;
- verification metadata exists.

The evaluator must return:

```ts
{
  (state, reasons, blockers, warnings, nextActions);
}
```

The UI must explain why a state was assigned.

---

# 14. Source-to-CTD Matrix Prototype

Create an interactive matrix using safe sample data.

Minimum columns:

- source document;
- source type;
- version;
- approval status;
- owner;
- supported CTD sections;
- information used;
- review status;
- change impact.

Features:

- filter by approval status;
- filter by CTD section;
- identify missing and superseded sources;
- print or export using an existing project pattern;
- accessible table behavior;
- responsive design.

Do not add a heavy table dependency unless the repository already uses one or the benefit is clearly justified.

---

# 15. Citation and Trust Components

Reuse existing citation components when available. Otherwise create reusable components for:

- agency or source owner;
- source title;
- source status;
- publication/effective date when known;
- section/page field;
- official URL;
- last verified date;
- editorial review status.

The page must distinguish:

- official source status;
- website editorial review status;
- content version.

Do not use FDA or EMA logos as site branding.

---

# 16. Content Rules

1. Do not invent official requirements.
2. Do not copy large portions of agency or ICH documents.
3. Summarize and cite.
4. Distinguish:
   - required;
   - conditional;
   - recommended;
   - potentially impacted;
   - best practice;
   - undetermined.
5. A section heading alone is not proof that a specific study or document is required.
6. Product-specific guidance, agency advice, waivers, commitments, and correspondence may change the result.
7. Use “preliminary,” “educational,” or “source verification required” where appropriate.
8. Do not present a sample readiness result as an agency completeness decision.

---

# 17. Design Requirements

Follow the existing visual system.

The experience should feel:

- professional;
- calm;
- evidence-focused;
- readable;
- suitable for RA and QA professionals;
- not like a consumer AI chat app;
- not like a dense legal database.

Required UX:

- clear hierarchy;
- breadcrumb navigation;
- section identifiers visible;
- status badges with text, not color alone;
- source metadata visible;
- responsive desktop and mobile layouts;
- keyboard navigation;
- visible focus;
- semantic HTML;
- sufficient contrast;
- print-friendly output;
- empty and error states.

Avoid decorative animations that reduce readability.

---

# 18. Testing and Validation

Use the repository’s existing commands and testing frameworks.

At minimum add tests for:

1. CTD section schema accepts valid data.
2. CTD section schema rejects missing required metadata.
3. Critical missing source produces `not_ready`.
4. Draft core sources do not produce `ready_for_final_authoring`.
5. Approved sources with unresolved critical consistency issue do not produce `reviewer_ready`.
6. Complete demonstration case produces `reviewer_ready`.
7. Missing official sources prevents reviewer-ready state.
8. CTD routes render.
9. Main interactive controls are keyboard accessible.
10. Production build succeeds.

Run:

- formatting;
- lint;
- type check;
- unit tests;
- integration/component tests;
- production build.

Also run any existing repository-specific tests.

Do not silence errors by weakening lint or TypeScript settings.

---

# 19. Browser Review

If the environment supports browser automation:

1. run the application;
2. inspect each new route;
3. test desktop and mobile widths;
4. verify keyboard flow;
5. verify no console errors;
6. test print view;
7. capture screenshots.

Attach useful screenshots to the Codex task or PR when supported.

---

# 20. Documentation Deliverables

Update:

- main README or appropriate feature documentation;
- route/content authoring instructions;
- `docs/IMPLEMENTATION_STATUS.md`;
- changelog if one exists;
- blueprint implementation status without rewriting the product strategy.

Document:

- where CTD section data lives;
- how to add another section;
- how readiness is calculated;
- how citations are entered;
- which sample content still requires regulatory review;
- exact test commands.

---

# 21. Security and Privacy

- No secrets in source code.
- No API keys in browser bundles.
- No confidential product inputs.
- No patient data.
- No file-upload feature in this PR.
- No authentication or payment implementation in this PR.
- No external LLM call in this PR.
- Do not log user-entered sensitive content.
- Use dependency versions compatible with the existing project.

---

# 22. Acceptance Criteria

The PR is acceptable only when:

- existing pages still work;
- CTD navigation is integrated;
- the five required new page types exist;
- 3.2.P.5 is a complete reference implementation;
- data is structured and validated;
- readiness logic is deterministic and tested;
- source-to-CTD matrix works;
- sources and verification status are visible;
- unreviewed content is honestly labeled;
- no fabricated regulatory determination is presented;
- accessibility basics pass;
- lint, type check, tests, and build pass;
- documentation and implementation status are updated;
- the PR is focused and reviewable.

---

# 23. Out of Scope for This PR

Do not implement:

- a complete NDA, BLA, ANDA, IND, or MAA generator;
- Modules 1, 2, 4, or 5 beyond honest navigation placeholders;
- production LLM or RAG;
- user accounts;
- payment;
- confidential dossier uploads;
- a validated GxP system;
- final FDA supplement or EMA variation classification;
- all Module 3 sections;
- automatic publication of regulatory interpretations;
- broad redesign of unrelated existing pages.

---

# 24. Final Response Format

When finished, report:

## Repository discovery

- stack;
- existing relevant work;
- conventions followed.

## Implemented

- routes;
- components;
- data models;
- logic;
- tests;
- documentation.

## Validation

- commands run;
- results;
- screenshots;
- remaining warnings.

## Regulatory-content status

- verified content;
- editorial draft content;
- items requiring expert review.

## Git status

- branch;
- commits;
- pull-request URL, if created.

## Next recommended slice

Provide the next five implementation tasks in dependency order.

Do not claim success for tests, pushes, or pull requests that were not actually completed.
