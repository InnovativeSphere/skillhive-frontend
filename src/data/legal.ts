export const legal = {
  lastUpdated: 'October 2026',
} as const;

export const privacy = {
  headline: 'Privacy Policy',
  intro:
    'SkillHive collects the minimum information needed to run the platform. This page explains what we collect, why, and how it is handled.',
  sections: [
    {
      title: 'What we collect',
      body: 'When you register, we collect your name, email address, username, and optionally a phone number. When you use the platform, we collect the actions you take — enrolling in a course, submitting a quiz, publishing a lesson — so we can show you your own history and let academy owners run their business.',
    },
    {
      title: 'What we do not collect',
      body: 'We do not use third-party tracking cookies. We do not sell, rent, or share your personal information with advertisers. We do not fingerprint your device or track you across other websites.',
    },
    {
      title: 'Payments',
      body: 'Payments are processed by Paystack. We do not store card numbers or bank details on our servers. Paystack handles that under their own privacy policy, which we recommend reading if you are making a payment.',
    },
    {
      title: 'Analytics',
      body: 'We use Vercel Analytics, which is cookie-free and does not collect personally identifiable information. It aggregates anonymous usage data — page views, referrers, approximate region — to help us understand what is working and what is not.',
    },
    {
      title: 'Your rights',
      body: 'You can request a copy of your data, ask us to correct it, or ask us to delete it. Reach out through the contact page and we will respond within a reasonable time.',
    },
    {
      title: 'Changes',
      body: 'If this policy changes in a meaningful way, we will update the date at the top and notify registered users by email.',
    },
  ],
} as const;

export const terms = {
  headline: 'Terms of Service',
  intro:
    'These are the terms for using SkillHive. By creating an account, you agree to them. If something here is unclear, ask — we would rather explain than surprise you.',
  sections: [
    {
      title: 'Your account',
      body: 'You are responsible for keeping your account credentials secure. You are responsible for the activity that happens under your account. If you believe your account has been compromised, contact us immediately.',
    },
    {
      title: 'Academies',
      body: 'If you register an academy, you are responsible for the content you publish, the staff you invite, the prices you set, and the obligations you take on toward your students. SkillHive provides the platform; the business is yours.',
    },
    {
      title: 'Content ownership',
      body: 'You own the content you create on SkillHive — your courses, lessons, materials, and images. We own the platform — the code, the design, the infrastructure. We claim no rights over your work beyond what is needed to display it to your students.',
    },
    {
      title: 'Acceptable use',
      body: 'Do not use SkillHive to publish illegal content, harass other users, or attempt to break the platform. Do not upload malicious files. Do not scrape other academies. Do not impersonate other users or academies. Accounts that violate this will be suspended or removed.',
    },
    {
      title: 'Payments and refunds',
      body: 'Payments are processed by Paystack. Refund policies for course purchases are set by the academy that sold the course. SkillHive subscription fees are billed in advance and are non-refundable for the current period.',
    },
    {
      title: 'Availability',
      body: 'We work to keep SkillHive online and reliable, but we do not guarantee uninterrupted service. We may pause the platform for maintenance, upgrades, or reasons outside our control.',
    },
    {
      title: 'Termination',
      body: 'You can close your account at any time. We can suspend or terminate accounts that violate these terms. If we terminate your account for a reason other than a violation, we will give you the opportunity to export your content first.',
    },
    {
      title: 'Changes to these terms',
      body: 'If these terms change in a meaningful way, we will update the date at the top and notify registered users by email. Continued use of SkillHive after a change means you accept the updated terms.',
    },
  ],
} as const;