'use client';

import { RouteGuard } from '@/components/auth/RouteGuard';
import { useAuth } from '@/components/auth/AuthProvider';
import { OwnerDashboard } from '@/components/dashboard/OwnerDashboard';
import { InstructorDashboard } from '@/components/dashboard/InstructorDashboard';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { ModeratorDashboard } from '@/components/dashboard/ModeratorDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

function RoleDashboard() {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case 'SUPER_ADMIN':
      return <AdminDashboard />;
    case 'ACADEMY_OWNER':
      return <OwnerDashboard />;
    case 'INSTRUCTOR':
      return <InstructorDashboard />;
    case 'MODERATOR':
      return <ModeratorDashboard />;
    case 'STUDENT':
      return <StudentDashboard />;
    default:
      return null;
  }
}

export default function DashboardPage() {
  return (
    <RouteGuard>
      <RoleDashboard />
    </RouteGuard>
  );
}