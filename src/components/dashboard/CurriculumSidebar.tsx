'use client';

import { PlayCircle, CheckCircle2 } from 'lucide-react';
import type { Lesson } from '@/types/api';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/lib/format';

type Props = {
  lessons: Lesson[];
  activeLessonId: number | null;
  completedLessons: Set<number>;
  progressPercentage: number;
  onSelectLesson: (id: number) => void;
};

export function CurriculumSidebar({
  lessons,
  activeLessonId,
  completedLessons,
  progressPercentage,
  onSelectLesson,
}: Props) {
  return (
    <div className="flex h-full flex-col bg-surface border-l border-border w-full md:w-[350px] shrink-0">
      <div className="border-b border-border p-5 bg-canvas">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
          Your Progress
        </p>
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
            <div 
              className="h-full bg-accent transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="font-mono text-xs font-medium text-ink">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="p-5 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          Course Content
        </p>
        <div className="space-y-1 p-3">
          {lessons.map((lesson, index) => {
            const isActive = activeLessonId === lesson.lessonId;
            const isCompleted = completedLessons.has(lesson.lessonId);

            return (
              <button
                key={lesson.lessonId}
                onClick={() => onSelectLesson(lesson.lessonId)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors duration-150',
                  isActive
                    ? 'bg-canvas text-ink shadow-sm border border-border'
                    : 'text-muted hover:bg-canvas/50 hover:text-ink border border-transparent',
                )}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface border border-border">
                  {isCompleted ? (
                    <CheckCircle2 size={16} className="text-accent" />
                  ) : (
                    <span className="font-mono text-xs">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('truncate text-sm font-medium', isActive && 'text-ink')}>
                    {lesson.title}
                  </p>
                  {lesson.durationMinutes && (
                    <p className="font-mono text-[10px] text-muted mt-0.5">
                      {formatDuration(lesson.durationMinutes)}
                    </p>
                  )}
                </div>
                {isActive && <PlayCircle size={14} className="text-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}