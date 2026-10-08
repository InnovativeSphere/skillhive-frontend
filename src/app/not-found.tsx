import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas">
      <Container size="narrow" className="text-center">
        <Logo size="sm" />

        <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted">
          404
        </p>

        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
          This page doesn&rsquo;t exist.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-muted">
          The link might be old, or the page may have moved. Head back to the
          landing page and pick up where you left off.
        </p>

        <div className="mt-10 flex justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/courses" variant="secondary">
            Browse courses
          </Button>
        </div>
      </Container>
    </main>
  );
}