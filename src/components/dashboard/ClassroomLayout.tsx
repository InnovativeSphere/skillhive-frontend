'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Props = {
  courseTitle: string;
  courseSlug: string;
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export function ClassroomLayout({ courseTitle, courseSlug, children, sidebar }: Props) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-canvas md:flex-row">
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-4 md:px-6">
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          <div className="flex-1 text-center px-4">
            <p className="truncate font-serif text-sm font-medium text-ink max-w-md mx-auto">
              {courseTitle}
            </p>
          </div>
          <div className="w-[100px] hidden sm:block" /> {/* Spacer for flex balance */}
        </header>

        {/* Lesson Player Area */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>

      {/* Sidebar (Curriculum) */}
      <div className="h-[40vh] md:h-full shrink-0 border-t md:border-t-0 md:border-l border-border">
        {sidebar}
      </div>

    </div>
  );
}