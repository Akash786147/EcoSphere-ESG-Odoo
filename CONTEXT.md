# EcoSphere ESG Platform

A standalone ESG (Environmental, Social, Governance) management platform: organizations record operational activity, the platform derives carbon emissions, tracks social participation and governance compliance, and gamifies sustainability — all rolled up into department and organization ESG scores.

## Language

### Actors & Tenancy

**Organization**:
A tenant. Owns one Postgres schema holding all its ESG data; registered via signup, which also creates its first Admin.
_Avoid_: Company, tenant (in user-facing language)

**Admin**:
A user who configures the organization: master data, settings, users, departments.

**Manager**:
A user who heads a Department: approves participations for their department, owns compliance issues, sees department dashboards.
_Avoid_: Department head, approver

**Employee**:
A user who participates in CSR activities and challenges, acknowledges policies, and redeems rewards.

### Social

**CSR Activity**:
A social initiative organized by the company (category-tagged; Training is a category). Carries the Points value earned by an approved participation.

**Participation**:
One employee's involvement in one CSR Activity or Challenge: submitted with optional proof, then approved or rejected by the employee's department Manager (Admin as fallback; nobody self-approves). Approval credits XP and Points, snapshotting the values at that moment.
_Avoid_: Enrollment, submission

### Gamification

**Challenge**:
A sustainability challenge employees join for XP. Lifecycle: Draft → Active → Under Review (deadline passed, submissions awaiting approval) → Completed, or Archived at any point. May define an optional quantitative target (value + unit); without one it is a simple join-and-submit challenge.

**XP**:
An employee's lifetime achievement score. Only ever increases; drives badge unlocks and leaderboards.
_Avoid_: Score, points (for achievement)

**Points**:
An employee's spendable balance, earned alongside XP and deducted when redeeming a Reward. Never affects leaderboards or badges.
_Avoid_: XP, credits

**Ledger**:
The append-only record of every XP and Points movement (award on approval, deduction on redemption), each entry tied to its source. Balances and leaderboards are sums over it.
_Avoid_: Balance table, points history

### Scoring

**Pillar Score**:
A 0–100 score for one ESG pillar (Environmental, Social, or Governance) of one Department in a period, produced by that pillar's Scorer.

**Score Snapshot**:
A stored Department Score (three Pillar Scores + weighted total) captured for a period, so dashboards can chart trends.
_Avoid_: Department score record

### Environmental

**Operation**:
A single record of business activity that can produce emissions — a purchase, a manufacturing run, an expense, or a fleet usage entry. Entered manually or via CSV import; the platform's only source of operational data.
_Avoid_: ERP record, business transaction

**Product**:
A master-data record with a per-unit carbon footprint (its ESG Profile). A purchase-type Operation may reference one, using its footprint as the emission factor.

**Emission Factor**:
A master-data value that converts an Operation's quantity into CO₂-equivalent emissions.

**Carbon Transaction**:
The calculated emission result derived from one Operation via an Emission Factor. Never entered directly; immutable — it snapshots the factor value used, so later factor edits never rewrite history.
_Avoid_: Emission entry, carbon record
