'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetCourseBySlugQuery, useGetLessonsQuery, useGetLessonByIdQuery } from '@/lib/api/courses';
import { useGetMyEnrollmentsQuery, useMarkLessonCompleteMutation } from '@/lib/api/enrollments';
import { ClassroomLayout } from '@/components/dashboard/ClassroomLayout';
import { LessonPlayer } from '@/components/dashboard/LessonPlayer';
import { CurriculumSidebar } from '@/components/dashboard/CurriculumSidebar';

export default function ClassroomPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: course, isLoading: courseLoading } = useGetCourseBySlugQuery(slug, { skip: !slug });
  const { data: lessons, isLoading: lessonsLoading } = useGetLessonsQuery(slug, { skip: !slug });
  const { data: enrollments } = useGetMyEnrollmentsQuery();

  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  
  const { 
    data: activeLessonData, 
    isLoading: lessonLoading, 
    isError: lessonError, 
    error 
  } = useGetLessonByIdQuery(activeLessonId!, { skip: !activeLessonId });

  const [markComplete, { isLoading: isMarking }] = useMarkLessonCompleteMutation();

  const enrollment = enrollments?.find((e) => e.course.slug === slug);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (lessons && lessons.length > 0 && !activeLessonId) {
      setActiveLessonId(lessons[0].lessonId);
    }
  }, [lessons, activeLessonId]);

  if (courseLoading || lessonsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-canvas">
        <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
      </div>
    );
  }

  if (!course || !lessons || lessons.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-canvas flex-col">
        <p className="text-muted">No lessons available for this course yet.</p>
      </div>
    );
  }

  async function handleMarkComplete() {
    if (!activeLessonId) return;
    try {
      await markComplete({ lessonId: activeLessonId }).unwrap();
      setCompletedLessons((prev) => {
        const next = new Set(prev);
        next.add(activeLessonId);
        return next;
      });
    } catch (err) {
      console.error('Failed to mark complete', err);
    }
  }

  // Let's build a fallback for the player if the single lesson fetch fails
  const fallbackLesson = activeLessonId ? lessons.find(l => l.lessonId === activeLessonId) : null;

  return (
    <ClassroomLayout
      courseTitle={course.title}
      courseSlug={course.slug}
      sidebar={
        <CurriculumSidebar
          lessons={lessons}
          activeLessonId={activeLessonId}
          completedLessons={completedLessons}
          progressPercentage={enrollment?.progressPercentage ?? 0}
          onSelectLesson={setActiveLessonId}
        />
      }
    >
      <div className="flex h-full flex-col">
        {lessonError && (
          <div className="bg-red-500/10 border-b border-red-500/20 p-4 text-center text-sm text-red-600">
            <strong>API Error:</strong> Could not fetch video details. Check the console/network tab.
            <br />
            <span className="text-xs font-mono">{(error as any)?.data?.message || 'Unknown error'}</span>
          </div>
        )}
        
        {lessonLoading ? (
          <div className="flex flex-1 items-center justify-center bg-canvas">
            <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          </div>
        ) : activeLessonData ? (
          <LessonPlayer
            lesson={activeLessonData}
            isCompleted={completedLessons.has(activeLessonData.lessonId)}
            isMarking={isMarking}
            onMarkComplete={handleMarkComplete}
          />
        ) : fallbackLesson ? (
          // Fallback: If the detailed fetch fails, at least show the player with the limited data
          <LessonPlayer
            lesson={fallbackLesson}
            isCompleted={completedLessons.has(fallbackLesson.lessonId)}
            isMarking={isMarking}
            onMarkComplete={handleMarkComplete}
          />
        ) : null}
      </div>
    </ClassroomLayout>
  );
}