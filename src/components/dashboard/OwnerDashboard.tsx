'use client';

import { BookOpen, Users, TrendingUp, Star } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { useAuth } from '@/components/auth/AuthProvider';
import { useGetMyCoursesQuery } from '@/lib/api/courses';
import { Skeleton } from '@/components/ui/Skeleton';

export function OwnerDashboard() {
  const { user } = useAuth();
  const { data: courses, isLoading } = useGetMyCoursesQuery();

  // Calculate real stats
  const totalCourses = courses?.length ?? 0;
  const publishedCourses = courses?.filter((c) => c.status === 'PUBLISHED').length ?? 0;
  const totalStudents = courses?.reduce((sum, c) => sum + c.totalEnrollments, 0) ?? 0;
  
  // Calculate average rating across all courses
  const totalReviews = courses?.reduce((sum, c) => sum + c.totalReviews, 0) ?? 0;
  const weightedRating = courses?.reduce((sum, c) => sum + (c.averageRating * c.totalReviews), 0) ?? 0;
  const avgRating = totalReviews > 0 ? Math.round((weightedRating / totalReviews) * 10) : 0;

  const stats = [
    { label: 'Total Courses', to: totalCourses, icon: BookOpen },
    { label: 'Students', to: totalStudents, icon: Users },
    { label: 'Published', to: publishedCourses, icon: TrendingUp },
    { label: 'Avg Rating', to: avgRating / 10, icon: Star }, // Assuming rating out of 5.0
  ];

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Academy owner
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl">
        Welcome, {user?.fullName.split(' ')[0]}.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        This is where your academy lives. Publish courses, manage instructors,
        track students, and see how your teaching is landing.
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
        ) : (
          stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-surface p-5 transition-all duration-150 hover:border-border-strong hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className="text-accent" />
                  <span aria-hidden className="h-px flex-1 bg-border-strong" />
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {s.label}
                </p>
                <p className="mt-1 font-serif text-2xl font-medium tracking-tight text-ink">
                  {/* We use a custom formatting check for the rating */}
                  {s.label === 'Avg Rating' ? (
                    s.to > 0 ? `${(s.to).toFixed(1)} / 5.0` : 'No reviews'
                  ) : (
                    <CountUp to={s.to} />
                  )}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-10 rounded-xl border border-dashed border-border-strong bg-surface/50 p-8 text-center">
        <p className="text-sm text-muted">
          Full analytics module coming soon in Phase 2.
        </p>
      </div>
    </div>
  );
}