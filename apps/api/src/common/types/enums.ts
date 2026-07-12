// ─── Role ────────────────────────────────────────────────────────────────────
export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  ESG_OFFICER: 'ESG_OFFICER',
  DEPT_HEAD: 'DEPT_HEAD',
  EMPLOYEE: 'EMPLOYEE',
  AUDITOR: 'AUDITOR',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

// ─── Status ───────────────────────────────────────────────────────────────────
export const OrgStatus = { ACTIVE: 'ACTIVE', SUSPENDED: 'SUSPENDED' } as const;
export type OrgStatus = (typeof OrgStatus)[keyof typeof OrgStatus];

export const EmployeeStatus = { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', ON_LEAVE: 'ON_LEAVE' } as const;
export type EmployeeStatus = (typeof EmployeeStatus)[keyof typeof EmployeeStatus];

export const DeptStatus = { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE' } as const;
export type DeptStatus = (typeof DeptStatus)[keyof typeof DeptStatus];

// ─── Environmental ────────────────────────────────────────────────────────────
export const Scope = {
  SCOPE_1: 'SCOPE_1',
  SCOPE_2: 'SCOPE_2',
  SCOPE_3: 'SCOPE_3',
} as const;
export type Scope = (typeof Scope)[keyof typeof Scope];

export const EmissionSource = { DEFRA: 'DEFRA', EPA: 'EPA', IPCC: 'IPCC', CUSTOM: 'CUSTOM' } as const;
export type EmissionSource = (typeof EmissionSource)[keyof typeof EmissionSource];

export const DataQuality = { MEASURED: 'MEASURED', CALCULATED: 'CALCULATED', ESTIMATED: 'ESTIMATED' } as const;
export type DataQuality = (typeof DataQuality)[keyof typeof DataQuality];

export const EntryMode = { AUTO: 'AUTO', MANUAL: 'MANUAL' } as const;
export type EntryMode = (typeof EntryMode)[keyof typeof EntryMode];

export const ErpOperationType = {
  PURCHASE: 'PURCHASE',
  MANUFACTURING: 'MANUFACTURING',
  EXPENSE: 'EXPENSE',
  FLEET: 'FLEET',
} as const;
export type ErpOperationType = (typeof ErpOperationType)[keyof typeof ErpOperationType];

export const GoalMetric = {
  CO2E_TONNES: 'CO2E_TONNES',
  ENERGY_KWH: 'ENERGY_KWH',
  WATER_M3: 'WATER_M3',
  WASTE_KG: 'WASTE_KG',
  RENEWABLE_PCT: 'RENEWABLE_PCT',
} as const;
export type GoalMetric = (typeof GoalMetric)[keyof typeof GoalMetric];

// ─── Social ───────────────────────────────────────────────────────────────────
export const CategoryType = {
  CSR_ACTIVITY: 'CSR_ACTIVITY',
  CHALLENGE: 'CHALLENGE',
  TRAINING: 'TRAINING',
} as const;
export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];

export const CsrActivityStatus = {
  PLANNED: 'PLANNED',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
} as const;
export type CsrActivityStatus = (typeof CsrActivityStatus)[keyof typeof CsrActivityStatus];

export const ParticipationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type ParticipationStatus = (typeof ParticipationStatus)[keyof typeof ParticipationStatus];

export const TrainingType = { MANDATORY: 'MANDATORY', OPTIONAL: 'OPTIONAL' } as const;
export type TrainingType = (typeof TrainingType)[keyof typeof TrainingType];

export const TrainingStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  RETIRED: 'RETIRED',
} as const;
export type TrainingStatus = (typeof TrainingStatus)[keyof typeof TrainingStatus];

export const CompletionStatus = {
  ENROLLED: 'ENROLLED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
} as const;
export type CompletionStatus = (typeof CompletionStatus)[keyof typeof CompletionStatus];

// ─── Governance ───────────────────────────────────────────────────────────────
export const PolicyStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  RETIRED: 'RETIRED',
} as const;
export type PolicyStatus = (typeof PolicyStatus)[keyof typeof PolicyStatus];

export const AuditType = { INTERNAL: 'INTERNAL', EXTERNAL: 'EXTERNAL' } as const;
export type AuditType = (typeof AuditType)[keyof typeof AuditType];

export const AuditStatus = {
  PLANNED: 'PLANNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;
export type AuditStatus = (typeof AuditStatus)[keyof typeof AuditStatus];

export const IssueSeverity = { LOW: 'LOW', MEDIUM: 'MEDIUM', HIGH: 'HIGH', CRITICAL: 'CRITICAL' } as const;
export type IssueSeverity = (typeof IssueSeverity)[keyof typeof IssueSeverity];

export const IssueStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
} as const;
export type IssueStatus = (typeof IssueStatus)[keyof typeof IssueStatus];

export const Framework = { BRSR: 'BRSR', GRI: 'GRI', CSRD: 'CSRD', TCFD: 'TCFD' } as const;
export type Framework = (typeof Framework)[keyof typeof Framework];

// ─── Gamification ─────────────────────────────────────────────────────────────
export const ChallengeStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  UNDER_REVIEW: 'UNDER_REVIEW',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type ChallengeStatus = (typeof ChallengeStatus)[keyof typeof ChallengeStatus];

export const ChallengeDifficulty = { EASY: 'EASY', MEDIUM: 'MEDIUM', HARD: 'HARD' } as const;
export type ChallengeDifficulty = (typeof ChallengeDifficulty)[keyof typeof ChallengeDifficulty];

export const ChallengeType = { INDIVIDUAL: 'INDIVIDUAL', TEAM: 'TEAM' } as const;
export type ChallengeType = (typeof ChallengeType)[keyof typeof ChallengeType];

export const AwardMode = { AUTO: 'AUTO', MANUAL: 'MANUAL' } as const;
export type AwardMode = (typeof AwardMode)[keyof typeof AwardMode];

export const RewardStatus = { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', OUT_OF_STOCK: 'OUT_OF_STOCK' } as const;
export type RewardStatus = (typeof RewardStatus)[keyof typeof RewardStatus];

export const RedemptionStatus = {
  REQUESTED: 'REQUESTED',
  FULFILLED: 'FULFILLED',
  CANCELLED: 'CANCELLED',
} as const;
export type RedemptionStatus = (typeof RedemptionStatus)[keyof typeof RedemptionStatus];

export const PointsEntryType = {
  EARN: 'EARN',
  REDEEM: 'REDEEM',
  ADJUST: 'ADJUST',
  EXPIRE: 'EXPIRE',
} as const;
export type PointsEntryType = (typeof PointsEntryType)[keyof typeof PointsEntryType];

export const PointsSource = {
  CSR: 'CSR',
  CHALLENGE: 'CHALLENGE',
  TRAINING: 'TRAINING',
  STREAK_BONUS: 'STREAK_BONUS',
  REDEMPTION: 'REDEMPTION',
  MANUAL: 'MANUAL',
} as const;
export type PointsSource = (typeof PointsSource)[keyof typeof PointsSource];

// ─── Notifications ────────────────────────────────────────────────────────────
export const NotificationType = {
  COMPLIANCE_ISSUE: 'COMPLIANCE_ISSUE',
  APPROVAL_DECISION: 'APPROVAL_DECISION',
  POLICY_ACK_REMINDER: 'POLICY_ACK_REMINDER',
  BADGE_UNLOCK: 'BADGE_UNLOCK',
  CHALLENGE_LIFECYCLE: 'CHALLENGE_LIFECYCLE',
  OVERDUE_ISSUE: 'OVERDUE_ISSUE',
  GENERAL: 'GENERAL',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationChannel = { IN_APP: 'IN_APP', EMAIL: 'EMAIL', PUSH: 'PUSH' } as const;
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];

export const NotificationQueueStatus = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  FAILED: 'FAILED',
} as const;
export type NotificationQueueStatus = (typeof NotificationQueueStatus)[keyof typeof NotificationQueueStatus];

// ─── Files ────────────────────────────────────────────────────────────────────
export const FilePurpose = {
  PROOF: 'PROOF',
  ATTACHMENT: 'ATTACHMENT',
  AVATAR: 'AVATAR',
  CERTIFICATE: 'CERTIFICATE',
  FINDINGS: 'FINDINGS',
} as const;
export type FilePurpose = (typeof FilePurpose)[keyof typeof FilePurpose];

// ─── Activity Log ─────────────────────────────────────────────────────────────
export const ActivityAction = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
  PUBLISH: 'PUBLISH',
  RETIRE: 'RETIRE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
} as const;
export type ActivityAction = (typeof ActivityAction)[keyof typeof ActivityAction];

// ─── Analytics ────────────────────────────────────────────────────────────────
export const PeriodType = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY',
} as const;
export type PeriodType = (typeof PeriodType)[keyof typeof PeriodType];

export const TrendDirection = { UP: 'UP', DOWN: 'DOWN', FLAT: 'FLAT' } as const;
export type TrendDirection = (typeof TrendDirection)[keyof typeof TrendDirection];

export const RiskLevel = { LOW: 'LOW', MEDIUM: 'MEDIUM', HIGH: 'HIGH' } as const;
export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];
