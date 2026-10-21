'use client';

import { useGetAcademyEnrollmentsQuery } from '@/lib/api/enrollments';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Users } from 'lucide-react';
import { formatRelative, initials } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';

export function EnrollmentTable({ courseId }: { courseId: number }) {
  const { data: enrollments, isLoading } = useGetAcademyEnrollmentsQuery({ courseId });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No students yet."
        description="When students enroll in this course, they will appear here."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-canvas/50 font-mono text-[10px] uppercase tracking-widest text-muted">
          <tr>
            <th className="px-5 py-3 font-normal">Student</th>
            <th className="px-5 py-3 font-normal">Status</th>
            <th className="px-5 py-3 font-normal">Progress</th>
            <th className="px-5 py-3 font-normal">Enrolled</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {enrollments.map((e) => (
            <tr key={e.enrollmentId} className="transition-colors hover:bg-canvas/50">
              <td className="flex items-center gap-3 px-5 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-canvas">
                  {initials(e.student.fullName)}
                </div>
                <div>
                  <p className="font-medium text-ink">{e.student.fullName}</p>
                  <p className="font-mono text-[10px] text-muted">{e.student.email}</p>
                </div>
              </td>
              <td className="px-5 py-4">
                <Badge status={e.status === 'ACTIVE' ? 'PUBLISHED' : 'DRAFT'}>
                  {e.status}
                </Badge>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-border">
                    <div className="h-full bg-accent" style={{ width: `${e.progressPercentage}%` }} />
                  </div>
                  <span className="font-mono text-[10px] text-muted">{Math.round(e.progressPercentage)}%</span>
                </div>
              </td>
              <td className="px-5 py-4 font-mono text-[10px] text-muted">
                {formatRelative(e.enrolledAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}