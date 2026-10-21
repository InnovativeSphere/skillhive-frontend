'use client';

import { BookOpen, Plus } from 'lucide-react';
import { useGetMyCoursesQuery } from '@/lib/api/courses';
import { CourseCard } from '@/components/dashboard/CourseCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { NetworkError } from '@/components/ui/NetworkError';

export function OwnerCoursesList() {
  const { data: courses, isLoading, isError, refetch } = useGetMyCoursesQuery();

  if (isError) return <NetworkError onRetry={refetch} />;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Academy
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
            Courses
          </h1>
        </div>
        <Button href="/dashboard/courses/new" className="w-fit">
          <Plus size={16} className="mr-2" />
          Create course
        </Button>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4 rounded-xl border border-border p-5">
                <Skeleton variant="rect" className="aspect-[16/9]" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : !courses || courses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses yet."
            description="You haven't created any courses. Your first one is just a few clicks away."
            actionLabel="Create your first course"
            href="/dashboard/courses/new"
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.courseId} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}