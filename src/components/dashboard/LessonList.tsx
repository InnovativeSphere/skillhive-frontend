'use client';

import { useState } from 'react';
import { PlayCircle, Trash2, Clock } from 'lucide-react';
import { useGetLessonsQuery, useDeleteLessonMutation } from '@/lib/api/courses';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDuration } from '@/lib/format';

export function LessonList({ courseSlug }: { courseSlug: string }) {
  const { data: lessons, isLoading } = useGetLessonsQuery(courseSlug);
  const [deleteLesson, { isLoading: isDeleting }] = useDeleteLessonMutation();
  const [lessonToDelete, setLessonToDelete] = useState<number | null>(null);

  async function handleDelete() {
    if (!lessonToDelete) return;
    try {
      await deleteLesson(lessonToDelete).unwrap();
      setLessonToDelete(null);
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  if (!lessons || lessons.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-strong bg-surface/30 py-12 text-center">
        <PlayCircle size={32} className="mx-auto text-muted/50" />
        <p className="mt-3 text-sm text-muted">No lessons added yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.lessonId}
            className="group flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-all hover:border-border-strong"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas border border-border text-muted">
                <PlayCircle size={18} />
              </div>
              <div>
                <p className="font-medium text-ink text-sm">{lesson.title}</p>
                <div className="mt-1 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                  <span>Order: {lesson.order}</span>
                  {lesson.durationMinutes && (
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> {formatDuration(lesson.durationMinutes)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setLessonToDelete(lesson.lessonId)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted opacity-0 transition-colors hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={!!lessonToDelete}
        onClose={() => setLessonToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Lesson"
        description="Are you sure you want to delete this lesson? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}