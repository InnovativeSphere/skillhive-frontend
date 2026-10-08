import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { CommandProvider } from '@/components/command/CommandPalette';
import { CommandTrigger } from '@/components/command/CommandTrigger';
import { SkipLink } from '@/components/layout/SkipLink';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://skillhive.app',
  ),
  title: {
    default: 'SkillHive — Start an academy. Teach anything.',
    template: '%s · SkillHive',
  },
  description:
    'A multi-tenant platform for skill-based education. Start an academy, sell courses, reach students anywhere.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
    <body>
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <CommandProvider>
      <Providers>
        <SkipLink />
        {children}
        <CommandTrigger />
      </Providers>
    </CommandProvider>
  </ThemeProvider>
</body>
    </html>
  );
}