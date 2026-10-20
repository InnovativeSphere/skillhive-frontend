import Link from 'next/link';
import { BookOpen, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/format';
import type { MyCourseListItem } from '@/types/api';

export function CourseCard({ course }: { course: MyCourseListItem }) {
  return (
    <Link
      href={`/dashboard/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-150 hover:border-border-strong hover:shadow-card"
    >
      {/* Cover Placeholder */}
      <div className="relative flex aspect-[16/9] items-center justify-center bg-ink">
        {course.coverImageUrl ? (
          <img
            src={course.coverImageUrl}
            alt={course.title}
            className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
        ) : (
          <BookOpen size={32} className="text-canvas/20" />
        )}
        <div className="absolute right-3 top-3">
          <Badge status={course.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {course.profession.name}
        </p>
        <h3 className="mt-2 font-serif text-lg font-medium tracking-tight text-ink group-hover:text-accent transition-colors">
          {course.title}
        </h3>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} />
                {course.totalLessons}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} />
                {course.totalEnrollments}
              </span>
            </div>
            <p className="font-serif text-sm font-medium text-ink">
              {course.isFree ? 'Free' : formatCurrency(course.price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}