'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { OwnerCoursesList } from '@/components/dashboard/OwnerCoursesList';
import { StudentCoursesList } from '@/components/dashboard/StudentCoursesList';

export default function CoursesPage() {
  const { user } = useAuth();

  // Instructors and Owners see the management view.
  // Students see their learning dashboard.
  if (user?.role === 'STUDENT') {
    return <StudentCoursesList />;
  }

  return <OwnerCoursesList />;
}