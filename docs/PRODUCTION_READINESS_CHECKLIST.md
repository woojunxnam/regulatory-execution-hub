# Regulatory Execution Hub — Production Readiness Checklist

Last updated: `2026-07-16`

## 1. Current production truth

| Area                                | State                                           | Public production |
| ----------------------------------- | ----------------------------------------------- | ----------------: |
| CTD Quality foundation              | Implemented and verified                        |               Yes |
| Regulatory Updates MVP              | 8 source-checked FDA/EMA records                |               Yes |
| Trust/policy/security/SEO layer     | Implemented and verified                        |               Yes |
| Home V2 live-task redesign          | Release candidate on `codex/home-v2-production` |           Not yet |
| Qualified regulatory `ReviewRecord` | Missing                                         |                No |
| Continuous FDA/EMA monitoring       | Not implemented                                 |                No |
| Source-backed IND/MAA checklists    | Not implemented                                 |                No |

Production URL: `https://regulatory-execution-hub.vercel.app`  
Current verified production commit: `d1895476d5c607c6f7962dc2a278a6543fb57831`

## 2. Home V2 release gate

- [x] Live routes only in primary navigation
- [x] Planned coverage kept compact and visibly labelled
- [x] Deterministic page finder does not claim generated regulatory advice
- [x] Search text is not persisted or sent externally
- [x] Latest source-checked updates visible on Home
- [x] `Verified` wording replaced with `Official source checked`
- [x] Mobile menu and mobile-first query ordering
- [x] `handoff_passon_prompt.md` excluded from release scope
- [x] Formatting, lint, type-check, unit, production build
- [x] Desktop/mobile E2E `88/88`
- [x] Home and critical-route accessibility/console checks
- [ ] Commit and push reviewed diff
- [ ] Create PR and confirm GitHub/Vercel checks
- [ ] Merge to `main`
- [ ] Confirm Vercel production commit
- [ ] Re-run `88/88` against public production

## 3. Required immediately after deployment

- [ ] Verify `/`, `/regulatory-updates`, `/submission-navigator/ctd`, `/methodology`, `/about`
- [ ] Verify Home query and mobile menu
- [ ] Verify `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, social preview
- [ ] Verify `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`
- [ ] Confirm thin planned routes still return `noindex, follow`
- [ ] Confirm no false `human_reviewed`, `reviewer_ready`, or final regulatory claim
- [ ] Confirm representative official-source URLs return HTTP `200`

## 4. Regulatory governance gate

다음 항목은 stronger trusted beta claim 전에 필요합니다.

- [ ] Named content owner and correction owner
- [ ] Qualified reviewer criteria
- [ ] Actual qualified `ReviewRecord`
- [ ] Official-source verification cadence and escalation rule
- [ ] Superseded/withdrawn source handling
- [ ] Material correction/version history operation
- [ ] FDA Initial IND checklist acceptance criteria
- [ ] EMA Centralised MAA checklist acceptance criteria
- [x] Update-record acceptance criteria for first manual snapshot
- [ ] Qualified review and recurring verification cadence for update records

`Official source checked`는 qualified regulatory review와 동일하지 않습니다. Review evidence가 없으면 상태를 상향하지 않습니다.

## 5. Search launch gate

- [ ] Decide and own canonical custom domain
- [ ] Set `NEXT_PUBLIC_SITE_URL` before custom-domain build
- [ ] Add and verify Google Search Console property
- [ ] Submit canonical `/sitemap.xml`
- [ ] Inspect Home, Updates, Methodology, CTD flagship URLs
- [ ] Keep planned thin routes out of sitemap until source-backed
- [ ] Monitor indexing, crawl errors, structured metadata, and content freshness

Public URL만으로 Google indexing이 보장되지는 않습니다. Original source-backed content, crawlability, Search Console verification, 지속적인 monitoring이 필요합니다.

## 6. Privacy, security, and legal gate before new features

Accounts, analytics, saved workspaces, subscriptions, uploads, payments, external AI를 활성화하기 전에 다음을 완료합니다.

- [ ] Define purpose, fields, retention, deletion, access, export
- [ ] Review hosting and third-party processing terms
- [ ] Add authentication, authorization, audit, backup, incident, secret controls
- [ ] Update privacy notice and obtain appropriate legal review
- [ ] Add Terms of Use for account-based or commercial service
- [ ] Establish private security/contact channel
- [ ] Continue prohibiting confidential product, patient, and dossier data until controls are validated

## 7. Hosting and domain decision

- Non-commercial prototype: current `.vercel.app` URL can remain the public beta URL subject to current Vercel terms.
- Commercial launch: use an owned custom domain and re-evaluate the hosting plan for intended use.
- Free external subdomains are not recommended as the primary regulatory-facing brand.

Before spending money or commercial launch, recheck current official Vercel pricing and terms because they can change.

## 8. Readiness stages

- Stage A — public non-commercial prototype: technical checks pass, policies public, no confidential collection, limitations visible.
- Stage B — trusted regulatory beta: Stage A plus qualified ownership/review, maintenance cadence, corrections operation, source-backed application guides.
- Stage C — commercial workspace: Stage B plus owned domain, suitable hosting plan, legal/privacy/security review, account/data governance, monitoring and support.

Current honest target: **Home V2를 포함한 Stage A technical readiness**. Regulatory governance gate는 계속 open 상태입니다.
