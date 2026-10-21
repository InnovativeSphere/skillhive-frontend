'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Clock, BarChart, PlayCircle, Lock, CheckCircle2 } from 'lucide-react';
import { useGetCourseBySlugQuery } from '@/lib/api/courses';
import { useEnrollInCourseMutation, useGetMyEnrollmentsQuery } from '@/lib/api/enrollments';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDuration } from '@/lib/format';

export function CourseDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  const { data: course, isLoading, isError } = useGetCourseBySlugQuery(slug);
  
  // Only fetch enrollments if the user is a student
  const { data: myEnrollments } = useGetMyEnrollmentsQuery(undefined, {
    skip: !isAuthenticated || user?.role !== 'STUDENT',
  });

  const [enroll, { isLoading: isEnrolling }] = useEnrollInCourseMutation();
  const [enrollError, setEnrollError] = useState<string | null>(null);

  if (isLoading) return <div className="py-20 text-center text-muted">Loading course...</div>;
  if (isError || !course) return <div className="py-20 text-center text-muted">Course not found.</div>;

  // Check if the current student is already enrolled
  const isEnrolled = myEnrollments?.some((e) => e.course.courseId === course.courseId);

  async function handleEnroll() {
    if (!isAuthenticated) {
      router.push(`/login?next=/courses/${slug}`);
      return;
    }

    setEnrollError(null);
    try {
      await enroll({ courseId: course!.courseId }).unwrap();
      // Redirect to the classroom immediately after enrolling
      router.push(`/dashboard/courses/${slug}/learn`);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? 'Failed to enroll.';
      setEnrollError(message);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      {/* Left Column: Course Info */}
      <div>
        <div className="flex items-center gap-3">
          <Badge status={course.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT'} />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {course.level}
          </span>
        </div>
        
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">
          {course.title}
        </h1>
        
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {course.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4 font-mono text-xs text-muted">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-accent" />
            {course.totalLessons} Lessons
          </div>
          {course.estimatedDurationMinutes && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              {formatDuration(course.estimatedDurationMinutes)}
            </div>
          )}
          <div className="flex items-center gap-2">
            <BarChart size={16} className="text-accent" />
            {course.totalEnrollments} Enrolled
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-serif text-2xl font-medium text-ink">About this course</h2>
          <div className="prose prose-sm mt-4 max-w-none text-muted prose-p:leading-relaxed">
            {course.longDescription ? (
              <p className="whitespace-pre-wrap">{course.longDescription}</p>
            ) : (
              <p>{course.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Pricing & Enroll */}
      <div>
        <div className="sticky top-24 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          <div className="flex aspect-video items-center justify-center bg-ink">
            {course.coverImageUrl ? (
              <img src={course.coverImageUrl} alt={course.title} className="h-full w-full object-cover" />
            ) : (
              <BookOpen size={48} className="text-canvas/20" />
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-medium tracking-tight text-ink">
                {course.isFree ? 'Free' : formatCurrency(course.price)}
              </span>
              {!course.isFree && course.discountPrice && (
                <span className="text-sm text-muted line-through">
                  {formatCurrency(course.price)}
                </span>
              )}
            </div>

            <div className="mt-6">
              {isEnrolled ? (
                <Button href={`/dashboard/courses/${slug}/learn`} className="w-full justify-center" size="lg">
                  <PlayCircle size={18} className="mr-2" />
                  Go to Classroom
                </Button>
              ) : user?.role === 'STUDENT' ? (
                <Button onClick={handleEnroll} disabled={isEnrolling} className="w-full justify-center" size="lg">
                  {isEnrolling ? 'Enrolling…' : 'Enroll Now'}
                </Button>
              ) : isAuthenticated ? (
                <div className="rounded-lg border border-border bg-canvas p-3 text-center text-sm text-muted">
                  Only students can enroll in courses.
                </div>
              ) : (
                <Button onClick={() => router.push(`/login?next=/courses/${slug}`)} className="w-full justify-center" size="lg">
                  Sign in to enroll
                </Button>
              )}
            </div>
            
            {enrollError && <p className="mt-3 text-center text-xs text-red-500">{enrollError}</p>}

            <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                Full lifetime access
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                Certificate of completion
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                Access on mobile and desktop
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}