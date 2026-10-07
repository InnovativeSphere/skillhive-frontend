export type UserRole =
  | 'SUPER_ADMIN'
  | 'ACADEMY_OWNER'
  | 'INSTRUCTOR'
  | 'MODERATOR'
  | 'STUDENT';

export type UserStatus =
  | 'INVITED'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'LOCKED'
  | 'SUSPENDED';

export type CourseStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'ARCHIVED';

export type CourseVisibility = 'PUBLIC' | 'PRIVATE' | 'UNLISTED';

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type ReviewStatus = 'PUBLISHED' | 'HIDDEN' | 'FLAGGED';

export type CommentStatus = 'PUBLISHED' | 'HIDDEN' | 'FLAGGED' | 'DELETED';

export type CommentTargetType = 'COURSE' | 'LESSON';

export type FileType =
  | 'PDF' | 'DOCX' | 'PPTX' | 'EXCEL'
  | 'IMAGE' | 'VIDEO' | 'TEXT' | 'OTHER';

export type InvoiceStatus =
  | 'DRAFT' | 'UNPAID' | 'PAID' | 'PAST_DUE' | 'VOID' | 'REFUNDED';

export type EnrollmentStatus =
  | 'ACTIVE' | 'COMPLETED' | 'DROPPED' | 'EXPIRED';

export type CertificateStatus = 'ISSUED' | 'REVOKED' | 'REISSUED';

export type NotificationType =
  | 'WELCOME'
  | 'OTP_VERIFICATION'
  | 'EMAIL_VERIFICATION'
  | 'PASSWORD_RESET'
  | 'STAFF_INVITE'
  | 'COURSE_PUBLISHED'
  | 'COURSE_REJECTED'
  | 'ENROLLMENT_CONFIRMED'
  | 'CERTIFICATE_ISSUED'
  | 'CERTIFICATE_REISSUE_REQUEST'
  | 'CERTIFICATE_REISSUE_APPROVED'
  | 'PAYMENT_RECEIVED'
  | 'INVOICE_ISSUED'
  | 'INVOICE_OVERDUE'
  | 'SUBSCRIPTION_EXPIRING'
  | 'GENERAL';

export type VerificationTokenType =
  | 'OTP' | 'EMAIL_VERIFICATION' | 'PASSWORD_RESET' | 'INVITE';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export type PaymentPurpose = 'SUBSCRIPTION' | 'COURSE_PURCHASE';

export type PaymentProvider = 'PAYSTACK';

export type SubscriptionInterval = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

export type SubscriptionStatus =
  | 'TRIAL' | 'ACTIVE' | 'PAST_DUE' | 'GRACE'
  | 'EXPIRED' | 'CANCELLED' | 'SUSPENDED';

// -----------------------------------------------------------------------------
// ENVELOPE — every response from the backend is wrapped in this.
// The baseQuery unwraps it before it reaches components. Endpoint types below
// describe the `data` payload only.
// -----------------------------------------------------------------------------

export interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
}

// For client-side use — what the baseQuery throws on failure.
export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  data: null;
}

// -----------------------------------------------------------------------------
// PAGINATION — audit endpoints and list endpoints return this in `data.pagination`.
// -----------------------------------------------------------------------------

export interface Pagination {
  totalRecords: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface Paginated<T> {
  pagination: Pagination;
  items: T[];
}

// -----------------------------------------------------------------------------
// AUTH
// -----------------------------------------------------------------------------

export interface LoginDto {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterAcademyDto {
  academyName: string;
  academyDescription?: string | null;
  ownerFullName: string;
  ownerEmail: string;
  ownerUsername: string;
  ownerPhone?: string | null;
  password: string;
}

export interface RegisterStudentDto {
  fullName: string;
  username: string;
  email: string;
  phone?: string | null;
  password: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string; // 6 digits
}

export interface VerifyEmailDto {
  token: string;
}

export interface ResendVerificationDto {
  email: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string; // min 8
}

export interface AcceptInviteDto {
  token: string;
  password: string;
}

// The authenticated user object returned by login and /api/users/me.
export interface AuthUser {
  userId: number;
  fullName: string;
  username: string;
  email: string;
  phone: string | null;
  role: UserRole;
  academyId: number | null;
  status: UserStatus;
  emailVerified: boolean;
  lastLogin: string | null; // ISO
  createdAt: string; // ISO
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterAcademyResponse {
  userId: number;
  academyId: number;
  fullName: string;
  email: string;
  username: string;
  role: UserRole;
  emailVerified: false;
  message: string;
}

export interface RegisterStudentResponse {
  userId: number;
  fullName: string;
  email: string;
  username: string;
  role: UserRole;
  emailVerified: false;
  message: string;
}

export interface VerifyOtpResponse {
  userId: number;
  emailVerified: true;
  message: string;
}

export interface VerifyEmailResponse {
  userId: number;
  emailVerified: true;
  message: string;
}

export interface MessageResponse {
  message: string;
}

// Note: added by Salim 2026-10-06 — not in the OpenAPI spec yet.
export interface RefreshResponse {
  token: string;
  user: AuthUser;
}

// -----------------------------------------------------------------------------
// USERS / STAFF
// -----------------------------------------------------------------------------

export interface UpdateProfileDto {
  fullName?: string | null;
  phone?: string | null;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string; // min 8
}

export interface InviteStaffDto {
  fullName: string;
  email: string;
  phone?: string | null;
  role: UserRole;
}

export interface UpdateStaffDto {
  fullName?: string | null;
  phone?: string | null;
  role?: UserRole | null;
}

export interface StaffMember {
  userId: number;
  fullName: string;
  username: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  invitedByUserId: number | null;
  lastLogin: string | null;
  createdAt: string;
}

export interface InviteStaffResponse {
  userId: number;
  fullName: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  message: string;
}

export interface UpdateStaffResponse {
  userId: number;
  fullName: string;
  email: string;
  username: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  updatedAt: string;
}

export interface StaffStatusChangeResponse {
  userId: number;
  status: UserStatus;
  message: string;
}

// -----------------------------------------------------------------------------
// ACADEMY
// -----------------------------------------------------------------------------

export interface UpdateAcademyDto {
  name?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
}

// Public profile — what a visitor sees at /api/academies/{slug}
export interface PublicAcademy {
  academyId: number;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  isVerified: boolean;
  createdAt: string;
}

// Authenticated owner view — /api/academies/me
export interface AcademyProfile extends PublicAcademy {
  email: string | null;
  phone: string | null;
  address: string | null;
  ownerId: number;
  isActive: boolean;
  updatedAt: string;
}

// -----------------------------------------------------------------------------
// CATEGORIES / PROFESSIONS
// -----------------------------------------------------------------------------

export interface CreateCategoryDto {
  name: string;
  isGlobal?: boolean;
}

export interface UpdateCategoryDto {
  name?: string | null;
}

export interface CreateProfessionDto {
  name: string;
  categoryId: number;
  isGlobal?: boolean;
}

export interface UpdateProfessionDto {
  name?: string | null;
}

export interface Profession {
  professionId: number;
  name: string;
  slug: string;
  categoryId: number;
  isGlobal: boolean;
  academyId: number | null;
}

export interface Category {
  categoryId: number;
  name: string;
  slug: string;
  isGlobal: boolean;
  academyId: number | null;
  professions: Profession[];
}

export interface CreateCategoryResponse {
  categoryId: number;
  name: string;
  slug: string;
  isGlobal: boolean;
  academyId: number | null;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateCategoryResponse {
  categoryId: number;
  name: string;
  slug: string;
  isGlobal: boolean;
  academyId: number | null;
  previousNames: string | null;
  isActive: boolean;
}

export interface CreateProfessionResponse {
  professionId: number;
  name: string;
  slug: string;
  categoryId: number;
  isGlobal: boolean;
  academyId: number | null;
  isActive: boolean;
}

export interface UpdateProfessionResponse extends CreateProfessionResponse {
  previousNames: string | null;
}

export interface DeleteCategoryResponse {
  categoryId: number;
  isActive: false;
  message: string;
}

export interface DeleteProfessionResponse {
  professionId: number;
  isActive: false;
  message: string;
}

// -----------------------------------------------------------------------------
// COURSES
// -----------------------------------------------------------------------------

export interface CreateCourseDto {
  title: string;
  description?: string | null;
  longDescription?: string | null;
  professionId: number;
  isFree?: boolean;
  price?: number | null;
  discountPrice?: number | null;
  coverImageUrl?: string | null;
  promoVideoUrl?: string | null;
  level?: CourseLevel;
  language?: string;
  estimatedDurationMinutes?: number | null;
  prerequisites?: string | null;
}

export interface UpdateCourseDto {
  title?: string | null;
  description?: string | null;
  longDescription?: string | null;
  professionId?: number | null;
  isFree?: boolean | null;
  price?: number | null;
  discountPrice?: number | null;
  coverImageUrl?: string | null;
  promoVideoUrl?: string | null;
  level?: CourseLevel | null;
  language?: string | null;
  estimatedDurationMinutes?: number | null;
  prerequisites?: string | null;
  visibility?: CourseVisibility | null;
}

export interface RejectCourseDto {
  reason: string;
}

// Lightweight shape used by list endpoints.
export interface CourseListItem {
  courseId: number;
  title: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  isFree: boolean;
  price: number | null;
  discountPrice: number | null;
  currency: string;
  level: CourseLevel;
  language: string;
  totalLessons: number;
  totalEnrollments: number;
  averageRating: number;
  totalReviews: number;
  publishedAt: string | null;
  academy: AcademySummary;
  instructor: InstructorSummary;
  profession: ProfessionSummary;
}

// Full shape returned by /api/courses/{slug}
export interface CourseDetail extends CourseListItem {
  longDescription: string | null;
  promoVideoUrl: string | null;
  estimatedDurationMinutes: number | null;
  prerequisites: string | null;
  status: CourseStatus;
  visibility: CourseVisibility;
  createdAt: string;
  updatedAt: string;
}

// Academy owner's own course list — /api/courses/academy/mine
export interface MyCourseListItem {
  courseId: number;
  title: string;
  slug: string;
  status: CourseStatus;
  visibility: CourseVisibility;
  isFree: boolean;
  price: number | null;
  totalLessons: number;
  totalEnrollments: number;
  averageRating: number;
  totalReviews: number;
  publishedAt: string | null;
  updatedAt: string;
  instructor: InstructorSummary;
  profession: ProfessionSummary;
}

export interface CreateCourseResponse {
  courseId: number;
  title: string;
  slug: string;
  status: CourseStatus;
  visibility: CourseVisibility;
  isFree: boolean;
  price: number | null;
  createdAt: string;
}

export interface CourseActionResponse {
  // TODO: VERIFY — used by submit/approve/reject/archive. Assumed shape.
  courseId: number;
  status: CourseStatus;
  message: string;
}

// Embedded sub-objects
export interface AcademySummary {
  academyId: number;
  name: string;
  slug: string;
  logoUrl: string | null;
  isVerified: boolean;
}

export interface InstructorSummary {
  userId: number;
  fullName: string;
  username: string;
}

export interface ProfessionSummary {
  professionId: number;
  name: string;
  slug: string;
}

// -----------------------------------------------------------------------------
// LESSONS
// -----------------------------------------------------------------------------

export interface CreateLessonDto {
  title: string;
  description?: string | null;
  content?: string | null;
  videoUrl?: string | null;
  order?: number | null;
  durationMinutes?: number | null;
  isPreview?: boolean;
}

export interface UpdateLessonDto {
  title?: string | null;
  description?: string | null;
  content?: string | null;
  videoUrl?: string | null;
  durationMinutes?: number | null;
  isPreview?: boolean | null;
}

export interface ReorderLessonDto {
  newOrder: number; // 1–1000
}

export interface Lesson {
  lessonId: number;
  title: string;
  description: string | null;
  order: number;
  durationMinutes: number | null;
  isPreview: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------------------------
// MATERIALS
// -----------------------------------------------------------------------------

export interface CreateMaterialDto {
  title: string;
  fileUrl: string;
  fileType: string;
  fileSizeBytes?: number | null;
  order?: number | null;
}

export interface UpdateMaterialDto {
  title?: string | null;
  order?: number | null;
}

export interface MaterialUploadResponse {
  fileUrl: string;
  publicId: string;
  fileSizeBytes: number;
  fileType: FileType;
  originalFileName: string;
  formattedSize: string;
}

// -----------------------------------------------------------------------------
// ENROLLMENTS
// -----------------------------------------------------------------------------

export interface EnrollDto {
  courseId: number;
}

export interface MarkLessonCompleteDto {
  lessonId: number;
}

export interface UnfollowAcademyDto {
  academyId: number;
}

export interface Enrollment {
  enrollmentId: number;
  studentId: number;
  courseId: number;
  status: EnrollmentStatus;
  enrolledAt: string;
  progressPercentage: number;
}

export interface EnrollResponse {
  enrollmentId: number;
  studentId: number;
  courseId: number;
  status: EnrollmentStatus;
  enrolledAt: string;
  progressPercentage: number;
}

export interface MyEnrollment {
  enrollmentId: number;
  status: EnrollmentStatus;
  progressPercentage: number;
  enrolledAt: string;
  completedAt: string | null;
  lastAccessedAt: string | null;
  certificateIssuedAt: string | null;
  course: CourseListItem;
}

export interface AcademyEnrollment {
  enrollmentId: number;
  status: EnrollmentStatus;
  progressPercentage: number;
  enrolledAt: string;
  completedAt: string | null;
  student: StudentSummary;
  course: CourseSummary;
}

export interface LessonCompleteResponse {
  enrollmentId: number;
  lessonId: number;
  progressPercentage: number;
  status: EnrollmentStatus;
  completedAt: string | null;
}

export interface FollowedAcademy {
  academyId: number;
  name: string;
  slug: string;
  logoUrl: string | null;
  notifyOnNewCourse: boolean;
  followedAt: string;
}

export interface UnfollowAcademyResponse {
  academyId: number;
  message: string;
}

export interface StudentSummary {
  userId: number;
  fullName: string;
  username: string;
  email: string;
}

export interface CourseSummary {
  courseId: number;
  title: string;
  slug: string;
  coverImageUrl: string | null;
}

// -----------------------------------------------------------------------------
// QUIZZES
// -----------------------------------------------------------------------------

export interface CreateQuizDto {
  title: string;
  description?: string | null;
  courseId?: number | null;
  lessonId?: number | null;
  passingScore?: number; // 0–100
  timeLimitMinutes?: number | null; // 1–600
  maxAttempts?: number | null; // 1–100
  cooldownMinutes?: number | null; // 0–10080
}

export interface UpdateQuizDto {
  title?: string | null;
  description?: string | null;
  passingScore?: number | null;
  timeLimitMinutes?: number | null;
  maxAttempts?: number | null;
  cooldownMinutes?: number | null;
}

export interface CreateOptionDto {
  optionText: string;
  isCorrect: boolean;
  order?: number | null;
}

export interface CreateQuestionDto {
  questionText: string;
  points?: number; // 1–100
  order?: number | null;
  options: CreateOptionDto[]; // min 2
}

export interface UpdateQuestionDto {
  questionText?: string | null;
  points?: number | null;
  order?: number | null;
  options?: CreateOptionDto[] | null;
}

export interface SubmitAnswerDto {
  questionId: number;
  optionId?: number | null;
}

export interface SubmitQuizDto {
  answers: SubmitAnswerDto[];
}

export interface CreateQuizResponse {
  quizId: number;
  courseId: number | null;
  lessonId: number | null;
  title: string;
  passingScore: number;
  maxAttempts: number | null;
  cooldownMinutes: number | null;
  createdAt: string;
}

// TODO: VERIFY — full quiz shape used by GET /api/quizzes/{id}
export interface Quiz {
  quizId: number;
  courseId: number | null;
  lessonId: number | null;
  title: string;
  description: string | null;
  passingScore: number;
  timeLimitMinutes: number | null;
  maxAttempts: number | null;
  cooldownMinutes: number | null;
  createdAt: string;
}

// TODO: VERIFY — submit result shape
export interface QuizAttemptResult {
  attemptId: number;
  quizId: number;
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  submittedAt: string;
}

// -----------------------------------------------------------------------------
// REVIEWS
// -----------------------------------------------------------------------------

export interface CreateReviewDto {
  courseId: number;
  rating: number; // 1–5
  title?: string | null;
  body: string; // min 10
}

export interface UpdateReviewDto {
  rating?: number | null;
  title?: string | null;
  body?: string | null;
}

export interface HideReviewDto {
  reason: string;
}

export interface Review {
  reviewId: number;
  courseId: number;
  rating: number;
  title: string | null;
  body: string;
  isVerifiedPurchase: boolean;
  status: ReviewStatus;
  helpfulCount?: number;
  createdAt: string;
}

export interface AcademyReview extends Review {
  student: StudentSummary;
  course: CourseSummary;
}

export interface MyReview extends Review {
  updatedAt: string;
  course: CourseSummary;
}

// -----------------------------------------------------------------------------
// COMMENTS
// -----------------------------------------------------------------------------

export interface CreateCommentDto {
  targetType: CommentTargetType;
  targetId: number;
  body: string;
  parentCommentId?: number | null;
}

export interface UpdateCommentDto {
  body: string;
}

export interface HideCommentDto {
  reason: string;
}

export interface PinCommentDto {
  isPinned: boolean;
}

export interface Comment {
  commentId: number;
  body: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
  replies: Comment[];
}

export interface CommentAuthor {
  userId: number;
  fullName: string;
  username: string;
  role: UserRole;
}

export interface CreateCommentResponse {
  commentId: number;
  targetType: CommentTargetType;
  targetId: number;
  courseId: number;
  parentCommentId: number | null;
  body: string;
  status: CommentStatus;
  isPinned: boolean;
  createdAt: string;
}

// -----------------------------------------------------------------------------
// CERTIFICATES
// -----------------------------------------------------------------------------

export interface RevokeCertificateDto {
  reason: string;
}

export interface ReissueCertificateDto {
  reason?: string | null;
}

export interface Certificate {
  certificateId: number;
  verificationCode: string;
  status: CertificateStatus;
  issuedAt: string;
  pdfUrl?: string | null;
  course: CourseSummary;
  academy: AcademySummary;
}

export interface AcademyCertificate extends Certificate {
  revokedAt: string | null;
  student: StudentSummary;
}

export interface CertificateVerification {
  verified: boolean;
  status: CertificateStatus;
  verificationCode: string;
  studentName: string;
  courseTitle: string;
  academyName: string;
  issuedAt: string;
  revokedAt: string | null;
  revokedReason: string | null;
}

// -----------------------------------------------------------------------------
// SUBSCRIPTIONS
// -----------------------------------------------------------------------------

export interface CreatePlanDto {
  name: string;
  slug?: string | null;
  description?: string | null;
  price: number;
  currency?: string;
  interval: SubscriptionInterval;
  maxCourses?: number | null;
  maxStaff?: number | null;
  maxStudentsPerCourse?: number | null;
  canChargeCourses?: boolean;
  canUseCertificates?: boolean;
  canUseCustomBranding?: boolean;
  isActive?: boolean;
  isPublic?: boolean;
}

export interface UpdatePlanDto {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  currency?: string | null;
  interval?: SubscriptionInterval | null;
  maxCourses?: number | null;
  maxStaff?: number | null;
  maxStudentsPerCourse?: number | null;
  canChargeCourses?: boolean | null;
  canUseCertificates?: boolean | null;
  canUseCustomBranding?: boolean | null;
  isActive?: boolean | null;
  isPublic?: boolean | null;
}

export interface AssignSubscriptionDto {
  academyId: number;
  planId: number;
  startDate: string; // ISO
  endDate?: string | null;
  autoRenew?: boolean;
  graceUntil?: string | null;
}

export interface ChangePlanDto {
  newPlanId: number;
  reason?: string | null;
}

export interface CancelSubscriptionDto {
  reason: string;
}

export interface SuspendSubscriptionDto {
  reason: string;
}

export interface SubscriptionPlan {
  planId: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  interval: SubscriptionInterval;
  maxCourses: number | null;
  maxStaff: number | null;
  maxStudentsPerCourse: number | null;
  canChargeCourses: boolean;
  canUseCertificates: boolean;
  canUseCustomBranding: boolean;
  isActive: boolean;
  isPublic: boolean;
}

// TODO: VERIFY — full subscription shape
export interface Subscription {
  subscriptionId: number;
  academyId: number;
  planId: number;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string | null;
  autoRenew: boolean;
  graceUntil: string | null;
  plan: SubscriptionPlan;
}

// -----------------------------------------------------------------------------
// INVOICES
// -----------------------------------------------------------------------------

export interface CreateInvoiceDto {
  subscriptionId: number;
  amountDue: number;
  currency?: string;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
}

export interface MarkInvoicePaidDto {
  reference?: string | null;
  reason: string;
}

export interface VoidInvoiceDto {
  reason: string;
}

// TODO: VERIFY — full invoice shape
export interface Invoice {
  invoiceId: number;
  subscriptionId: number;
  amountDue: number;
  currency: string;
  status: InvoiceStatus;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  paidAt: string | null;
  createdAt: string;
}

// -----------------------------------------------------------------------------
// PAYMENTS
// -----------------------------------------------------------------------------

export interface InitializeCoursePaymentDto {
  courseId: number;
}

export interface InitializeSubscriptionPaymentDto {
  invoiceId: number;
}

export interface VerifyPaymentDto {
  reference: string;
}

export interface CoursePaymentInitResponse {
  authorizationUrl: string;
  purpose: 'COURSE_PURCHASE';
  courseId: number;
  courseTitle: string;
}

export interface SubscriptionPaymentInitResponse {
  authorizationUrl: string;
  purpose: 'SUBSCRIPTION';
  invoiceId: number;
}

// TODO: VERIFY — verify payment response shape
export interface PaymentVerifyResponse {
  status: PaymentStatus;
  reference: string;
  amount: number;
  purpose: PaymentPurpose;
  message: string;
}

export interface WebhookResponse {
  status: string;
  message: string;
}

// -----------------------------------------------------------------------------
// NOTIFICATIONS
// -----------------------------------------------------------------------------

// TODO: VERIFY — no response shape available yet
export interface Notification {
  notificationId: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface UnreadCountResponse {
  count: number;
}

// -----------------------------------------------------------------------------
// ANALYTICS
// -----------------------------------------------------------------------------

// Student
export interface StudentOverview {
  totalEnrollments: number;
  droppedEnrollments: number;
  // TODO: VERIFY — more fields likely (completed, inProgress, certificates)
}

export interface StudentEnrollmentsAnalytics {
  items: MyEnrollment[];
}

export interface StudentCertificatesAnalytics {
  total: number;
  issued: number;
  revoked: number;
  items: Certificate[];
}

// Academy
export interface AcademyOverview {
  period: { from: string; to: string };
  courses: { total: number; published: number; draft: number };
  students: { uniqueStudents: number };
  enrollments: { total: number; completed: number };
  revenue: { currency: string; total: number };
  ratings: { average: number; total: number };
}

export interface AcademyCourseAnalytics {
  revenueInRange: number;
  period: { from: string; to: string };
  total: number;
  items: AcademyCourseAnalyticsItem[];
}

export interface AcademyCourseAnalyticsItem {
  courseId: number;
  title: string;
  slug: string;
  status: CourseStatus;
  visibility: CourseVisibility;
  isFree: boolean;
  price: number | null;
  totalLessons: number;
  totalEnrollments: number;
  averageRating: number;
  totalReviews: number;
  publishedAt: string | null;
  updatedAt: string;
  revenue: number;
}

export interface AcademyEnrollmentAnalytics {
  period: { from: string; to: string };
  totalInRange: number;
  courseTitle: string;
  studentName: string;
  date: string;
  count: number;
  enrollmentId: number;
  enrolledAt: string;
  status: EnrollmentStatus;
  progressPercentage: number;
}

export interface AcademyRevenueAnalytics {
  period: { from: string; to: string };
  currency: string;
  totalInRange: number;
  transactionCount: number;
  date: string;
  revenue: number;
}

export interface AcademyTopCourse {
  courseId: number;
  title: string;
  slug: string;
  revenue: number;
  totalEnrollments: number;
  averageRating: number;
}

// Platform
export interface PlatformOverview {
  academies: { total: number; active: number };
  students: { total: number };
  courses: { published: number };
  enrollments: { total: number };
  certificates: { issued: number };
}

export interface PlatformRevenueAnalytics {
  period: { from: string; to: string };
  currency: string;
  transactionCount: number;
  mrr: number;
  activeSubscriptions: number;
  date: string;
  revenue: number;
}

export interface PlatformAcademiesAnalytics {
  byStatus: Array<{ status: string; count: number }>;
  planName: string;
  month: string;
  count: number;
}

export interface PlatformSignupsAnalytics {
  period: { from: string; to: string };
  totalNewAcademies: number;
  totalNewStudents: number;
  date: string;
  count: number;
}

export interface PlatformTopAcademy {
  academyId: number;
  name: string;
  slug: string;
  revenue: number;
  studentCount: number;
}

// -----------------------------------------------------------------------------
// AUDIT
// -----------------------------------------------------------------------------

export interface AuditLog {
  auditId: number;
  userId: number;
  userName: string;
  userEmail: string;
  academyId: number | null;
  academyName: string | null;
  action: string;
  targetType: string;
  targetId: number | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
}

export interface AuditListResponse {
  pagination: Pagination;
  items: AuditLog[];
}

// -----------------------------------------------------------------------------
// SYSTEM
// -----------------------------------------------------------------------------

export interface SystemHealth {
  status: 'ok' | 'error';
  uptime: number;
  timestamp: string;
}

export interface SystemInfo {
  appName: string;
  version: string;
  environment: string;
  framework: string;
  uptime: number;
  timestamp: string;
}