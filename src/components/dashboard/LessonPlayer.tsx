'use client';

import { CheckCircle2, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Lesson } from '@/types/api';

type Props = {
  lesson: Lesson;
  isCompleted: boolean;
  isMarking: boolean;
  onMarkComplete: () => void;
};

// Determines if we should use an <iframe> (YouTube/Vimeo) or a <video> tag (direct .mp4)
function getVideoSource(url: string | null) {
  if (!url) return null;
  
  const lowerUrl = url.toLowerCase().split('?')[0]; // Remove query params for extension check

  // Direct video files
  if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.ogg')) {
    return { type: 'html5' as const, url };
  }

  // YouTube
  if (url.includes('youtube.com/watch?v=')) {
    return { type: 'iframe' as const, url: url.replace('watch?v=', 'embed/') };
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return { type: 'iframe' as const, url: `https://www.youtube.com/embed/${id}` };
  }

  // Vimeo
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1].split('?')[0];
    return { type: 'iframe' as const, url: `https://player.vimeo.com/video/${id}` };
  }

  // Fallback for any other link (might work in an iframe, might be blocked)
  return { type: 'iframe' as const, url };
}

export function LessonPlayer({ lesson, isCompleted, isMarking, onMarkComplete }: Props) {
  const video = getVideoSource(lesson.videoUrl);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Video Area */}
      <div className="relative aspect-video w-full shrink-0 bg-ink flex items-center justify-center">
        {!video ? (
          <div className="flex flex-col items-center justify-center text-canvas/50">
            <PlayCircle size={48} className="mb-4" />
            <p className="font-mono text-sm uppercase tracking-widest">No video for this lesson</p>
          </div>
        ) : video.type === 'html5' ? (
          <video 
            src={video.url} 
            controls 
            className="absolute inset-0 h-full w-full"
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            src={video.url}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6 md:p-10 max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
              Lesson {lesson.order}
            </p>
            <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
              {lesson.title}
            </h1>
          </div>
          
          <Button
            onClick={onMarkComplete}
            disabled={isCompleted || isMarking}
            variant={isCompleted ? 'secondary' : 'primary'}
            className="shrink-0 mt-4 sm:mt-0"
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={16} className="mr-2" />
                Completed
              </>
            ) : isMarking ? (
              'Saving…'
            ) : (
              'Mark as complete'
            )}
          </Button>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          {lesson.description || lesson.content ? (
            <div className="prose prose-sm max-w-none text-muted prose-p:leading-relaxed">
              <p className="whitespace-pre-wrap">{lesson.content || lesson.description}</p>
            </div>
          ) : (
            <p className="text-sm italic text-muted/60">No notes provided for this lesson.</p>
          )}
        </div>
      </div>
    </div>
  );
}