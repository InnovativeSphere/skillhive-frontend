'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { useGetCoursesQuery } from '@/lib/api/courses';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency } from '@/lib/format';

export function PublicCourseGrid() {
  const { data, isLoading } = useGetCoursesQuery({});

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-xl border border-border p-5">
            <Skeleton variant="rect" className="aspect-[16/9]" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const courses = data?.items || [];

  if (courses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-strong bg-surface/30 py-20 text-center">
        <BookOpen size={32} className="mx-auto text-muted/50" />
        <p className="mt-4 text-muted">No courses published yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Link
          key={course.courseId}
          href={`/courses/${course.slug}`}
          className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-150 hover:border-border-strong hover:shadow-card"
        >
          <div className="relative flex aspect-[16/9] items-center justify-center bg-ink">
             {course.coverImageUrl ? (
              <img
                src={course.coverImageUrl}
                alt={course.title}
                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
              />
            ) : (
              <BookOpen size={32} className="text-canvas/20" />
            )}
            <span className="absolute bottom-3 left-3 rounded-full bg-canvas/90 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink">
              {course.level}
            </span>
          </div>
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {course.academy.name}
            </p>
            <h2 className="mt-2 font-serif text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
              {course.title}
            </h2>
            <div className="mt-4 h-px w-full bg-border-strong" aria-hidden />
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-xs text-muted">
                {course.instructor.fullName}
              </span>
              <span className="font-serif text-sm font-medium text-ink">
                {course.isFree ? 'Free' : formatCurrency(course.price)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}