export const hero = {
  eyebrow: 'Skill-based education, on your terms',
  headline: 'Anyone can start an academy. Anyone can learn.',
  subline:
    'Build courses, assess students, issue certificates, get paid. SkillHive handles the platform so you can focus on the teaching.',
  primaryCta: { label: 'Start your academy', href: '/register/academy' },
  secondaryCta: { label: 'Explore courses', href: '/courses' },
} as const;

export const atAGlance = [
  'Built for academies of any size',
  'Courses, quizzes, and certificates',
  'Every payment handled',
  'One platform, many academies',
] as const;

export const thesis = {
  headline: 'Most platforms make you join. SkillHive lets you build.',
  body: "An academy on SkillHive is yours. Your name, your courses, your students, your revenue. Students aren't locked inside one academy either — they enroll wherever the teaching is good. The platform exists to serve the teaching, not to own it.",
} as const;

export const features = [
  {
    id: 'courses',
    label: 'Courses',
    headline: 'Courses that hold weight',
    body: 'Lessons, materials, videos, ordering. Every part of a course is editable, previewable, and reviewed before it goes live.',
  },
  {
    id: 'quizzes',
    label: 'Quizzes',
    headline: 'Assess what was actually learned',
    body: 'Timed quizzes with attempt limits and cooldowns. Passing scores enforced. Nothing slips through quietly.',
  },
  {
    id: 'certificates',
    label: 'Certificates',
    headline: 'Certificates anyone can verify',
    body: 'Every certificate carries a verification code and a public link. No phone calls, no emails, no doubt.',
  },
  {
    id: 'payments',
    label: 'Payments',
    headline: 'Payments that just work',
    body: 'Subscriptions and course purchases handled through Paystack. Every transaction logged. Every invoice clear.',
  },
] as const;

export const multiTenant = {
  headline: 'One platform. Many academies. Zero compromise.',
  body: "Your academy has its own address, its own instructors, its own students, its own revenue. It runs on the same foundation as every other academy on SkillHive — but nothing about it is shared. That's the difference between infrastructure and a marketplace.",
} as const;

export const howItWorks = {
  headline: 'From idea to enrollment, in four steps.',
  steps: [
    {
      step: '01',
      title: 'Register your academy',
      body: "Pick a name, an address, an owner. You're live in minutes.",
    },
    {
      step: '02',
      title: 'Build your first course',
      body: 'Lessons, materials, quizzes. Draft it, review it, publish it.',
    },
    {
      step: '03',
      title: 'Open enrollment',
      body: 'Students enroll from anywhere. Payments handled, access granted.',
    },
    {
      step: '04',
      title: 'Get paid',
      body: 'Every purchase, every subscription. Clear numbers, on time.',
    },
  ],
} as const;

export const roles = {
  headline: 'Built for everyone in the room.',
  items: [
    {
      role: 'Academy owners',
      body: 'Run the business. Manage staff, courses, revenue — all from one place.',
    },
    {
      role: 'Instructors',
      body: "Build courses, teach students, see what's working and what isn't.",
    },
    {
      role: 'Moderators',
      body: "Keep discussions clean. Handle reviews. Hide what shouldn't be there.",
    },
    {
      role: 'Students',
      body: 'Enroll anywhere, learn at your pace, prove it with a certificate.',
    },
  ],
} as const;

export const capability = {
  headline: 'How this was built',
  body: 'SkillHive was designed before it was written. The API contract was documented before the first endpoint. The type layer was defined before the first component. The states — loading, empty, error — were considered before the happy path. Every screen you see is the end of a decision, not the beginning of one.',
} as const;

export const pricing = {
  headline: 'Pricing that scales with the teaching.',
  subline: 'Start free. Pay when your academy is ready to grow.',
  // TODO: confirm tier names and prices against backend subscription plans
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      cadence: '',
      description: 'For individuals testing the waters.',
      features: [
        '1 course',
        'Up to 25 students per course',
        'Standard branding',
        'Community support',
      ],
      cta: { label: 'Start free', href: '/register/academy' },
      featured: false,
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 'NGN 20,000',
      cadence: 'per month',
      description: 'For academies running their first real courses.',
      features: [
        'Unlimited courses',
        'Custom branding',
        'Certificates on every course',
        'Quizzes with attempt limits',
        'Priority email support',
      ],
      cta: { label: 'Start with Growth', href: '/register/academy' },
      featured: true,
    },
    {
      id: 'scale',
      name: 'Scale',
      price: 'Custom',
      cadence: '',
      description: 'For academies with real volume and real demands.',
      features: [
        'Everything in Growth',
        'Unlimited staff and students',
        'Dedicated account manager',
        'Custom SLA',
        'Direct line to engineering',
      ],
      cta: { label: 'Talk to us', href: '/contact' },
      featured: false,
    },
  ],
} as const;

export const faq = {
  headline: 'Questions worth asking.',
  items: [
    {
      q: 'What is SkillHive?',
      a: 'A platform for skill-based education. Anyone can start an academy, sell courses, and reach students anywhere.',
    },
    {
      q: 'Can I run my own academy?',
      a: 'Yes. Register an academy, invite instructors, and start publishing. Your academy lives at its own address and operates independently.',
    },
    {
      q: 'How do students find my courses?',
      a: 'Students browse across all academies on SkillHive. If your course is good, it gets found. You can also share direct links from anywhere.',
    },
    {
      q: 'What does it cost?',
      a: 'SkillHive offers a free tier for individuals and paid plans for academies that want more. Course sales and subscriptions are handled through Paystack.',
    },
    {
      q: 'Can I use my own branding?',
      a: 'On paid plans, yes. Your logo, your colors, your banner. Students see your academy, not ours.',
    },
    {
      q: 'Who built this?',
      a: "SkillHive was built by Salim Sambo, a full-stack developer based in Nigeria. It's both a working platform and a demonstration of what careful systems design looks like.",
    },
  ],
} as const;

export const contact = {
  headline: 'Talk to us.',
  body: 'Questions, partnerships, feedback — reach the person who built it.',
  email: 'hello@skillhive.app', // TODO: confirm real address before launch
  cta: { label: 'Send a message', href: 'mailto:hello@skillhive.app' },
} as const;

export const finalCta = {
  headline: "The academy you've been meaning to start.",
  subline: 'SkillHive is ready for it.',
  primaryCta: { label: 'Start your academy', href: '/register/academy' },
  secondaryCta: { label: 'Talk to us', href: '/contact' },
} as const;

export const footer = {
  tagline: 'Skill-based education, built to last.',
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'Courses', href: '/courses' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/InnovativeSphere' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/salimsambo' }, // TODO: confirm
  ],
  legal: '© 2026 SkillHive. All rights reserved.',
} as const;