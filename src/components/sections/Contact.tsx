'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { DotMatrix } from '@/components/ui/DotMatrix';
import { ContactModal } from './ContactModal';
import { contact } from '@/data/landing';
import { sectionIds } from '@/data/nav';

export function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Section
        id={sectionIds.contact}
        spacing="default"
        className="relative overflow-hidden"
      >
        <DotMatrix
          cols={10}
          rows={10}
          spacing={22}
          className="left-0 top-1/2 -translate-x-1/3 -translate-y-1/2 opacity-70"
        />
        <DotMatrix
          cols={10}
          rows={10}
          spacing={22}
          className="right-0 top-1/2 translate-x-1/3 -translate-y-1/2 opacity-70"
        />

        <Container size="narrow" className="relative text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">
            <Mail size={18} className="text-accent" aria-hidden />
          </div>

          <h2 className="mt-8 font-serif text-3xl font-medium leading-[1.2] tracking-tight text-ink md:text-4xl">
            {contact.headline}
          </h2>

          <p className="mt-4 text-muted md:text-lg">{contact.body}</p>

          <div className="mt-8">
            <Button onClick={() => setOpen(true)} size="lg">
              {contact.cta.label}
            </Button>
          </div>
        </Container>
      </Section>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}