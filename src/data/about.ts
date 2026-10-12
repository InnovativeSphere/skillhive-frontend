export const about = {
  eyebrow: 'About',
  headline: 'Two stories.',
  subline: 'Choose the lens you want to look through.',
  tabs: [
    { id: 'platform', label: 'The Platform' },
    { id: 'builder', label: 'The Builder' },
  ],
} as const;

export const aboutPlatform = {
  intro:
    'SkillHive is a multi-tenant platform for skill-based education. Anyone can start an academy. Anyone can enroll. The platform handles the machinery so the teaching can happen.',
  sections: [
    {
      title: 'What it is',
      body: 'A place where an academy owner registers, builds courses, invites instructors, sets prices, and reaches students — all under their own identity. Students browse across every academy on the platform, not one walled garden. The name on the door is theirs. The infrastructure underneath is shared.',
    },
    {
      title: 'Why multi-tenant',
      body: 'Most learning platforms make you choose: join a marketplace where you are one of thousands of sellers, or stand up your own system and rebuild everything from scratch. SkillHive refuses that choice. Every academy runs on the same hardened foundation — payments, certificates, quizzes, analytics — but appears entirely as itself. That is the difference between infrastructure and a marketplace.',
    },
    {
      title: 'What it handles',
      body: 'Courses and lessons. Quizzes with attempt limits and cooldowns. Certificates with public verification links. Subscriptions, invoices, and course purchases through Paystack. Reviews, discussions, notifications, audit trails. The full lifecycle of an academy, from the first course draft to the last certificate issued.',
    },
    {
      title: 'How it was built',
      body: 'The API contract was documented before the first endpoint was written. The type layer was defined before the first component. Loading, empty, and error states were considered before the happy path. Every screen is the end of a decision, not the beginning of one.',
    },
  ],
} as const;

export const aboutBuilder = {
  intro: "I'm Salim Sambo. I'm 22, and I build software.",
  paragraphs: [
    "I was born and raised in Nigeria, and I taught myself to build because I couldn't afford to wait for permission. No bootcamp, no mentor, no shortcuts — just a laptop, a family that needed me to figure things out, and a refusal to stay still.",
    "My father passed when I was young. I don't remember much — only the shape of a home he provided and a family he left behind. We walk different paths, he and I. But I think he'd recognize the way I work: quietly, deliberately, with a focus on what lasts.",
    "I build toward biomedical software engineering. Specifically, OpenCV-driven medical diagnostics — TB detection, fracture identification, burn classification. Systems that save lives when they work and stay invisible when they don't. Everything I do now — the full-stack work, the design systems, the platforms — is a step on that path.",
    'SkillHive is one of those steps. It is a real platform with a real purpose, but it is also a demonstration — proof that careful systems thinking, restrained design, and honest engineering are things I can do. Built the way I build everything: designed before written, tested before shipped, intended to outlast the week it was made in.',
    "I'm not the loudest person in the room. I'd rather the work be.",
  ],
  closing: 'Still building. Still learning. Still here.',
} as const;