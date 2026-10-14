import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-canvas">
      <header className="px-6 py-6">
        <Logo />
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </main>

      <footer className="px-6 py-6 text-center">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-ink"
        >
          ← Back to home
        </Link>
      </footer>
    </div>
  );
}