import { Reveal } from '@/components/layout/Reveal';
import { Hero } from '@/components/sections/Hero';
import { AtAGlance } from '@/components/sections/AtAGlance';
import { Thesis } from '@/components/sections/Thesis';
import { Features } from '@/components/sections/Features';
import { MultiTenant } from '@/components/sections/MultiTenant';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Roles } from '@/components/sections/Roles';
import { Capability } from '@/components/sections/Capability';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { FinalCta } from '@/components/sections/FinalCta';

export default function Page() {
  return (
    <>
      <Hero />
      <Reveal><AtAGlance /></Reveal>
      <Reveal><Thesis /></Reveal>
      <Reveal><Features /></Reveal>
      <Reveal><MultiTenant /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><Roles /></Reveal>
      <Reveal><Capability /></Reveal>
      <Reveal><Pricing /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><Contact /></Reveal>
      <Reveal><FinalCta /></Reveal>
    </>
  );
}