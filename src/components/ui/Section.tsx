import { cn } from '@/lib/utils';

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  // Vertical rhythm. 'default' is our standard section padding.
  spacing?: 'tight' | 'default' | 'loose';
  as?: 'section' | 'div' | 'article';
};

const spacing = {
  tight: 'py-16 md:py-20',
  default: 'py-24 md:py-32',
  loose: 'py-32 md:py-40',
};

// scroll-mt-[88px] = header height (72px) + 16px breathing room.
// Without this, anchor links scroll the section under the fixed header.
export function Section({
  id,
  children,
  className,
  spacing: space = 'default',
  as: Tag = 'section',
}: Props) {
  return (
    <Tag id={id} className={cn('scroll-mt-[88px]', spacing[space], className)}>
      {children}
    </Tag>
  );
}