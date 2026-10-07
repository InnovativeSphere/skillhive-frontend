import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
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
  openGraph: {
    title: 'SkillHive',
    description: 'Start an academy. Teach anything. Reach students anywhere.',
    type: 'website',
    siteName: 'SkillHive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillHive',
    description: 'Start an academy. Teach anything.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}