// Header navigation and auth routing.

export const nav = {
  // Primary links — mix of in-page anchors and real routes.
  primary: [
    { label: 'Product', href: '/#product' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Courses', href: '/courses' },
  ],
  // Shorter list for tight viewports — anchors only, plus Courses.
  compact: [
    { label: 'Pricing', href: '/#pricing' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Courses', href: '/courses' },
  ],
  auth: {
    signin: { label: 'Sign in', href: '/login' },
    signup: {
      label: 'Get started',
      href: '/register',
      // Two doors — academy owner or student. The /register page presents both.
      options: [
        {
          label: 'Start an academy',
          description: 'Run courses, sell them, get paid.',
          href: '/register/academy',
        },
        {
          label: 'Join as a student',
          description: 'Enroll in courses from any academy.',
          href: '/register/student',
        },
      ],
    },
  },
} as const;

// Section IDs the header anchors point to. Components use these as `id` props
// so anchors and sections can never drift apart.
export const sectionIds = {
  hero: 'hero',
  thesis: 'thesis',
  features: 'product',
  multiTenant: 'multi-tenant',
  howItWorks: 'how-it-works',
  roles: 'roles',
  capability: 'capability',
  pricing: 'pricing',
  faq: 'faq',
  contact: 'contact',
  finalCta: 'get-started',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];