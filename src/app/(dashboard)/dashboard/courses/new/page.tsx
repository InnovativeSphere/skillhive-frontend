import { CourseForm } from '@/components/dashboard/CourseForm';
import { RouteGuard } from '@/components/auth/RouteGuard';

export default function NewCoursePage() {
  return (
    <RouteGuard allowedRoles={['ACADEMY_OWNER', 'INSTRUCTOR']}>
      <div className="max-w-4xl">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Courses
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
            Create a new course
          </h1>
        </div>
        <CourseForm />
      </div>
    </RouteGuard>
  );
}