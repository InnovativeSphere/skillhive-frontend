'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { DotMatrix } from '@/components/ui/DotMatrix';
import { ContactModal } from '@/components/sections/ContactModal';
import { contact } from '@/data/landing';

export default function ContactPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Section spacing="loose" className="relative overflow-hidden pt-16 md:pt-24">
        <DotMatrix
          cols={10}
          rows={12}
          spacing={22}
          className="left-0 top-1/2 -translate-x-1/3 -translate-y-1/2 opacity-70"
        />
        <DotMatrix
          cols={10}
          rows={12}
          spacing={22}
          className="right-0 top-1/2 translate-x-1/3 -translate-y-1/2 opacity-70"
        />

        <Container size="narrow" className="relative text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface">
            <Mail size={22} className="text-accent" aria-hidden />
          </div>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
            Contact
          </p>

          <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
            {contact.headline}
          </h1>

          <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted md:text-lg">
            {contact.body}
          </p>

          <div className="mt-10">
            <Button onClick={() => setOpen(true)} size="lg">
              {contact.cta.label}
            </Button>
          </div>

          <p className="mt-6 font-mono text-xs text-muted">
            Replies usually within a day.
          </p>
        </Container>
      </Section>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}