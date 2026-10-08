import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Skeleton } from '@/components/ui/Skeleton';

// Route-level loading state. Matches the landing page's vertical rhythm
// so there's no layout shift when the real content streams in.
export default function Loading() {
  return (
    <>
      <Section>
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-4/5" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-3 pt-4">
                <Skeleton className="h-12 w-40 rounded-full" />
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
            <Skeleton variant="rect" className="aspect-[4/3] w-full" />
          </div>
        </Container>
      </Section>

      <Section spacing="tight" className="bg-surface">
        <Container>
          <div className="grid gap-8 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}