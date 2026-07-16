# Regulatory Execution Hub — Production Readiness Checklist

Last updated: `2026-07-16`

이 문서는 “웹에서 열리는가”와 “production-ready인가”를 구분한다. 현재 public production은 기존 CTD baseline이고, 아래 hardening은 `codex/deployment-phase2-hardening` branch의 local 변경이다. Merge와 production deployment 전에는 새 Home, broader IA, trust page, security header가 public URL에 반영되지 않는다.

## 1. Domain 및 hosting 결정

### 권고안

- Non-commercial public beta: 기존 `https://regulatory-execution-hub.vercel.app` 유지
- Commercial/business launch: 소유권이 있는 custom domain 구매 후 canonical URL로 전환하고, Vercel plan도 intended use에 맞게 재검토
- 무료 external subdomain을 primary brand로 쓰지 않음

### 근거

- Vercel은 deployment에 `<project>.vercel.app` URL을 자동 부여하며 production deployment는 기본적으로 public이다.
- Vercel Hobby는 현재 `$0`이지만 official pricing/terms상 personal, non-commercial 용도다. Business 또는 commercial use 전에는 적절한 plan을 선택해야 한다.
- Custom domain은 Vercel에 연결할 수 있지만 domain 자체는 먼저 소유해야 한다.
- EU.org는 무료 subdomain 선택지이지만 human validation, 제한된 지원, namespace ownership/control 한계가 있어 regulatory-facing primary brand로 권고하지 않는다.

Official references:

- [Vercel — Working with domains](https://vercel.com/docs/domains/working-with-domains)
- [Vercel — Generated deployment URLs](https://vercel.com/docs/deployments/generated-urls)
- [Vercel — Pricing](https://vercel.com/pricing)
- [Vercel — Terms](https://vercel.com/legal/terms)
- [Vercel — Add a custom domain](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project)
- [EU.org — Free domain names](https://nic.eu.org/index.html)
- [EU.org — Registration policy/process](https://nic.eu.org/register.html)

## 2. Current production truth

| Area                                       | Current state                                                       | Public production? |
| ------------------------------------------ | ------------------------------------------------------------------- | -----------------: |
| Existing CTD baseline                      | Deployed and previously verified                                    |                Yes |
| LLM-style deterministic Home               | Implemented locally                                                 |                 No |
| Applications/Lifecycle IA                  | Implemented locally; thin planned lifecycle route remains `noindex` |                 No |
| Regulatory Updates MVP                     | 8 source-checked FDA/EMA records and detail routes                  |                 No |
| Canonical, robots, sitemap, manifest       | Implemented locally                                                 |                 No |
| About/Editorial Policy/Privacy/Corrections | Implemented locally                                                 |                 No |
| Security headers                           | Implemented locally                                                 |                 No |
| Social preview image                       | Implemented locally                                                 |                 No |
| Qualified regulatory `ReviewRecord`        | Missing                                                             |                 No |
| Continuous FDA/EMA monitoring              | Not implemented                                                     |                 No |
| Source-backed IND/MAA checklists           | Not implemented                                                     |                 No |

## 3. Implemented hardening in this branch

- Global `Content-Security-Policy`
- Clickjacking protection via `frame-ancestors 'none'` and `X-Frame-Options: DENY`
- `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS, COOP
- Public scope and limitation page at `/about`
- Source hierarchy, classification, review, AI, versioning, and correction policy at `/editorial-policy`
- Current browser-only query and no-upload boundary at `/privacy`
- Public correction/feedback workflow at `/corrections`
- Footer-wide trust navigation and release metadata
- Open Graph social preview image and large-image Twitter card metadata
- Sitemap inclusion for substantive trust pages
- Unit and route-level tests for security, policy routes, sitemap, social image, and footer links
- Eight source-checked FDA/EMA update records with validated official hosts, document status, editorial status, dates, applicability boundaries, and static detail routes

## 4. Required before branch release

- [ ] Review all local changes and PR diff
- [ ] Ensure `handoff_passon_prompt.md` and unrelated user files are not staged
- [ ] Run `format:check`
- [ ] Run `lint`
- [ ] Run `typecheck`
- [ ] Run unit tests
- [ ] Run production build
- [ ] Run desktop and mobile E2E
- [ ] Run browser console and accessibility checks
- [ ] Confirm Open Graph image renders without CSP violation
- [ ] Review policy copy for accuracy and consistency
- [ ] Commit intentionally, push branch, and update draft PR

## 5. Required immediately after deployment

- [ ] Verify production deployment commit matches the reviewed commit
- [ ] Verify `/`, `/applications`, `/about`, `/editorial-policy`, `/privacy`, `/corrections`
- [ ] Verify `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`
- [ ] Verify `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy`
- [ ] Verify Home query works on desktop and mobile
- [ ] Verify all official-source external links
- [ ] Verify social preview image response
- [ ] Re-run E2E against production with `PLAYWRIGHT_BASE_URL`
- [ ] Confirm thin planned routes still emit `noindex, follow`
- [ ] Confirm no false `human_reviewed` or final regulatory claim

## 6. Required before search launch

- [ ] Decide canonical domain
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the canonical origin before the production build
- [ ] Add and verify Google Search Console property
- [ ] Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` when using meta verification
- [ ] Submit the canonical `/sitemap.xml`
- [ ] Inspect Home, Applications, Methodology, and flagship CTD URLs
- [ ] Keep planned/thin routes out of the sitemap until source-backed content is published
- [ ] Add meaningful internal links from source-backed application/update content as it is released

Google indexing is not guaranteed merely because a site is public. Search launch needs crawlable, original, useful content plus Search Console verification and monitoring.

## 7. Regulatory governance gate

Public beta can honestly remain an editorial prototype, but these items block a stronger production claim:

- [ ] Named content owner and correction owner
- [ ] Qualified reviewer criteria
- [ ] Actual qualified `ReviewRecord` for any content called human-reviewed
- [ ] Official-source verification cadence and escalation rule
- [ ] Superseded/withdrawn source handling
- [ ] Material correction/version history
- [ ] Checklist acceptance criteria for FDA Initial IND and EMA Centralised MAA
- [x] Update-record acceptance criteria implemented for the first manual FDA/EMA snapshot
- [ ] Qualified review and recurring verification cadence for published update records

The absence of a qualified review record must remain visible until evidence exists.

## 8. Privacy, security, and legal gate before new features

Before enabling accounts, analytics, saved workspaces, email subscriptions, uploads, payments, or external AI:

- [ ] Define data purpose, fields, retention, deletion, access, and export
- [ ] Review hosting and third-party data-processing terms
- [ ] Add authentication, authorization, audit, backup, incident, and secret-management controls as applicable
- [ ] Update privacy notice and obtain legal review appropriate to launch geography and business model
- [ ] Add Terms of Use before offering an account-based or commercial service
- [ ] Add cookie/consent handling only if the implemented technologies and applicable rules require it
- [ ] Establish a private security/contact channel before accepting sensitive incident reports
- [ ] Prohibit confidential product, patient, and dossier data until controls are intentionally designed and validated

## 9. Production-ready definition by stage

### Stage A — Public non-commercial prototype

Acceptable when technical checks pass, policies are public, limitations are visible, no confidential data is collected, and the `.vercel.app` URL is used within Hobby terms.

### Stage B — Trusted regulatory public beta

Requires Stage A plus qualified content ownership/review, source maintenance, correction operation, initial source-backed application guides, and real update records.

### Stage C — Commercial workspace

Requires Stage B plus owned domain, intended-use hosting plan, legal/privacy/security review, account/data governance, monitoring, support, and a clear boundary between educational support and regulated systems of record.

Current honest target: **Stage A technical readiness**, while the qualified regulatory review gate remains open.
