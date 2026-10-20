'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCategoriesQuery, useGetProfessionsQuery } from '@/lib/api/categories';
import { useCreateCourseMutation, useUpdateCourseMutation } from '@/lib/api/courses';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormError } from '@/components/ui/FormError';
import { Button } from '@/components/ui/Button';
import type { CreateCourseDto, UpdateCourseDto, CourseDetail } from '@/types/api';

type Props = {
  initialData?: CourseDetail;
};

export function CourseForm({ initialData }: Props) {
  const router = useRouter();
  const isEditing = Boolean(initialData);

  const { data: categories } = useGetCategoriesQuery();
  const { data: professions } = useGetProfessionsQuery({});
  
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const isLoading = isCreating || isUpdating;

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [longDescription, setLongDescription] = useState(initialData?.longDescription ?? '');
  const [professionId, setProfessionId] = useState<number | ''>(initialData?.profession.professionId ?? '');
  const [level, setLevel] = useState(initialData?.level ?? 'BEGINNER');
  const [isFree, setIsFree] = useState(initialData?.isFree ?? false);
  const [price, setPrice] = useState<number | ''>(initialData?.price ?? '');
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl ?? '');

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) return setError('Title is required.');
    if (!professionId) return setError('Please select a profession.');
    if (!isFree && (!price || Number(price) <= 0)) return setError('Please enter a valid price.');

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      longDescription: longDescription.trim() || null,
      professionId: Number(professionId),
      level: level as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
      isFree,
      price: isFree ? null : Number(price),
      coverImageUrl: coverImageUrl.trim() || null,
    };

    try {
      if (isEditing && initialData) {
        await updateCourse({ id: initialData.courseId, body: payload as UpdateCourseDto }).unwrap();
      } else {
        await createCourse(payload as CreateCourseDto).unwrap();
      }
      router.push('/dashboard/courses');
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? 'Something went wrong.';
      setError(message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        {/* Main Column */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Course title</Label>
            <div className="mt-2">
              <Input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to React"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Short description</Label>
            <div className="mt-2">
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief summary (max 500 chars)"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="longDescription">Long description</Label>
            <div className="mt-2">
              <textarea
                id="longDescription"
                rows={6}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className="w-full resize-none rounded-lg border border-border-strong bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="What will students learn?"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="profession">Profession</Label>
            <div className="mt-2">
              <Select
                id="profession"
                value={professionId}
                onChange={(e) => setProfessionId(e.target.value ? Number(e.target.value) : '')}
              >
                <option value="">Select a profession...</option>
                {professions?.map((p) => (
                  <option key={p.professionId} value={p.professionId}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="level">Level</Label>
            <div className="mt-2">
              <Select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="coverImageUrl">Cover Image URL</Label>
            <div className="mt-2">
              <Input
                id="coverImageUrl"
                value={coverImageUrl || ''}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <Label>Free Course</Label>
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
            </div>
            
            {!isFree && (
              <div className="mt-4">
                <Label htmlFor="price">Price (NGN)</Label>
                <div className="mt-2">
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 15000"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && <FormError>{error}</FormError>}

      <div className="flex justify-end gap-3 border-t border-border pt-6">
       <Button href="/dashboard/courses" variant="ghost">
  Cancel
</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving…' : isEditing ? 'Save changes' : 'Create course'}
        </Button>
      </div>
    </form>
  );
}