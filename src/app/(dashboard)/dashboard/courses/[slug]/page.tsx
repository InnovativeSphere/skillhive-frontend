'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetCourseBySlugQuery, useSubmitCourseMutation, useArchiveCourseMutation } from '@/lib/api/courses';
import { CourseForm } from '@/components/dashboard/CourseForm';
import { LessonList } from '@/components/dashboard/LessonList';
import { AddLessonForm } from '@/components/dashboard/AddLessonForm';
import { EnrollmentTable } from '@/components/dashboard/EnrollmentTable'; // <-- Import this
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function EditCoursePage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const { data: course, isLoading } = useGetCourseBySlugQuery(slug, { skip: !slug });
  const [submitCourse, { isLoading: isSubmitting }] = useSubmitCourseMutation();
  const [archiveCourse, { isLoading: isArchiving }] = useArchiveCourseMutation();

  // Add 'students' to the tab state
  const [activeTab, setActiveTab] = useState<'details' | 'lessons' | 'students'>('details');

  if (isLoading) {
    return (
      <div className="max-w-4xl space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton variant="rect" className="h-64" />
      </div>
    );
  }

  if (!course) {
    return <div className="text-muted">Course not found.</div>;
  }

  async function handleSubmit() {
    if (!course) return;
    try {
      await submitCourse(course.courseId).unwrap();
    } catch (e) { console.error(e); }
  }

  async function handleArchive() {
    if (!course) return;
    try {
      await archiveCourse(course.courseId).unwrap();
    } catch (e) { console.error(e); }
  }

  return (
    <div className="max-w-4xl pb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Edit Course
          </p>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
              {course.title}
            </h1>
            <Badge status={course.status} />
          </div>
        </div>

        {/* Lifecycle Actions */}
        <div className="flex items-center gap-2">
          {course.status === 'DRAFT' && (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit for Review'}
            </Button>
          )}
          {course.status === 'PUBLISHED' && (
            <Button variant="secondary" onClick={handleArchive} disabled={isArchiving}>
              {isArchiving ? 'Archiving…' : 'Archive Course'}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8">
        <button
          onClick={() => setActiveTab('details')}
          className={cn(
            'border-b-2 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'details'
              ? 'border-accent text-ink'
              : 'border-transparent text-muted hover:text-ink',
          )}
        >
          Course Details
        </button>
        <button
          onClick={() => setActiveTab('lessons')}
          className={cn(
            'border-b-2 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'lessons'
              ? 'border-accent text-ink'
              : 'border-transparent text-muted hover:text-ink',
          )}
        >
          Lessons ({course.totalLessons})
        </button>
        {/* NEW TAB */}
        <button
          onClick={() => setActiveTab('students')}
          className={cn(
            'border-b-2 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === 'students'
              ? 'border-accent text-ink'
              : 'border-transparent text-muted hover:text-ink',
          )}
        >
          Students ({course.totalEnrollments})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'details' && <CourseForm initialData={course} />}
      
      {activeTab === 'lessons' && (
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div>
            <LessonList courseSlug={course.slug} />
          </div>
          <div>
            <AddLessonForm courseId={course.courseId} />
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <EnrollmentTable courseId={course.courseId} />
      )}
    </div>
  );
}