'use client';

import { useState } from 'react';
import { useCreateLessonMutation } from '@/lib/api/courses';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export function AddLessonForm({ courseId }: { courseId: number }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState<number | ''>('');
  
  const [createLesson, { isLoading }] = useCreateLessonMutation();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createLesson({
        courseId,
        body: {
          title: title.trim(),
          videoUrl: videoUrl.trim() || null,
          durationMinutes: duration ? Number(duration) : null,
          isPreview: false,
        },
      }).unwrap();
      
      // Reset
      setTitle('');
      setVideoUrl('');
      setDuration('');
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} variant="secondary" className="w-full justify-center border-dashed">
        <Plus size={16} className="mr-2" />
        Add Lesson
      </Button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-border bg-surface p-5">
      <h3 className="font-serif text-lg font-medium text-ink">New Lesson</h3>
      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="lesson-title">Title</Label>
          <div className="mt-1">
            <Input
              id="lesson-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 1. Introduction to the course"
              autoFocus
            />
          </div>
        </div>
        <div>
          <Label htmlFor="lesson-video">Video URL (optional)</Label>
          <div className="mt-1">
            <Input
              id="lesson-video"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
        <div>
          <Label htmlFor="lesson-duration">Duration (minutes)</Label>
          <div className="mt-1">
            <Input
              id="lesson-duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : '')}
              placeholder="e.g. 15"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !title.trim()}>
          {isLoading ? 'Saving...' : 'Save Lesson'}
        </Button>
      </div>
    </form>
  );
}