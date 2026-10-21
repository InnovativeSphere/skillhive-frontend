'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ClassroomPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="mx-auto max-w-4xl py-12 text-center">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
        Classroom Coming Soon
      </h1>
      <p className="mt-4 text-muted">
        We are building the lesson player for <strong>{slug}</strong> right now.
      </p>
      <div className="mt-8">
        <Link href="/dashboard/courses" className="text-accent hover:underline">
          ← Back to my courses
        </Link>
      </div>
    </div>
  );
}