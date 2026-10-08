export type CommandKind = 'navigate' | 'scroll' | 'action';
export type CommandGroup = 'Navigation' | 'Sections' | 'Actions';

export type Command = {
  id: string;
  label: string;
  hint?: string;
  group: CommandGroup;
  kind: CommandKind;
  // navigate → route path; scroll → section id; action → action key
  target: string;
  keywords?: string[];
};

export const commands: Command[] = [
  { id: 'home', label: 'Home', group: 'Navigation', kind: 'navigate', target: '/', keywords: ['landing'] },
  { id: 'courses', label: 'Browse courses', group: 'Navigation', kind: 'navigate', target: '/courses', keywords: ['catalog', 'explore'] },
  { id: 'signin', label: 'Sign in', group: 'Navigation', kind: 'navigate', target: '/login', keywords: ['login'] },
  { id: 'signup-academy', label: 'Start an academy', group: 'Navigation', kind: 'navigate', target: '/register/academy', keywords: ['register', 'signup'] },
  { id: 'signup-student', label: 'Join as a student', group: 'Navigation', kind: 'navigate', target: '/register/student', keywords: ['register', 'signup'] },

  { id: 's-product', label: 'Product', group: 'Sections', kind: 'scroll', target: 'product' },
  { id: 's-how', label: 'How it works', group: 'Sections', kind: 'scroll', target: 'how-it-works' },
  { id: 's-multi', label: 'Multi-tenant', group: 'Sections', kind: 'scroll', target: 'multi-tenant' },
  { id: 's-pricing', label: 'Pricing', group: 'Sections', kind: 'scroll', target: 'pricing' },
  { id: 's-faq', label: 'FAQ', group: 'Sections', kind: 'scroll', target: 'faq' },
  { id: 's-contact', label: 'Contact', group: 'Sections', kind: 'scroll', target: 'contact' },

  { id: 'a-theme', label: 'Toggle theme', group: 'Actions', kind: 'action', target: 'toggle-theme', keywords: ['dark', 'light'] },
  { id: 'a-github', label: 'View on GitHub', group: 'Actions', kind: 'action', target: 'open-github', keywords: ['source', 'code'] },
];