'use client';

import Link from 'next/link';
import { BookOpen, PlayCircle } from 'lucide-react';
import { useGetMyEnrollmentsQuery } from '@/lib/api/enrollments';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { NetworkError } from '@/components/ui/NetworkError';

export function StudentCoursesList() {
  const { data: enrollments, isLoading, isError, refetch } = useGetMyEnrollmentsQuery();

  if (isError) return <NetworkError onRetry={refetch} />;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Learning
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
            My Courses
          </h1>
        </div>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4 rounded-xl border border-border p-5">
                <Skeleton variant="rect" className="aspect-[16/9]" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        ) : !enrollments || enrollments.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="You haven't enrolled yet."
            description="Explore the catalog to find courses from academies across SkillHive."
            actionLabel="Explore courses"
            href="/courses"
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((enrollment) => (
              <Link
                key={enrollment.enrollmentId}
                href={`/dashboard/courses/${enrollment.course.slug}/learn`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-150 hover:border-border-strong hover:shadow-card"
              >
                <div className="relative flex aspect-[16/9] items-center justify-center bg-ink">
                  {enrollment.course.coverImageUrl ? (
                    <img
                      src={enrollment.course.coverImageUrl}
                      alt={enrollment.course.title}
                      className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                    />
                  ) : (
                    <BookOpen size={32} className="text-canvas/20" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <PlayCircle size={48} className="text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg font-medium tracking-tight text-ink">
                    {enrollment.course.title}
                  </h3>
                  
                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between pb-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        Progress
                      </span>
                      <span className="font-mono text-[10px] font-medium text-accent">
                        {Math.round(enrollment.progressPercentage)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full bg-accent transition-all duration-500"
                        style={{ width: `${enrollment.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}