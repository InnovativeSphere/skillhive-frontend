import { BookOpen, Award, TrendingUp } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { useAuth } from '@/components/auth/AuthProvider';

const stats = [
  { label: 'Enrolled', to: 0, icon: BookOpen },
  { label: 'Certificates', to: 0, icon: Award },
  { label: 'Progress', to: 0, icon: TrendingUp, suffix: '%' },
];

export function StudentDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Student
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl">
        Welcome, {user?.fullName.split(' ')[0]}.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Pick up where you left off. Or explore something new.
      </p>
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-surface p-5 transition-all duration-150 hover:border-border-strong hover:shadow-card">
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-accent" />
                <span aria-hidden className="h-px flex-1 bg-border-strong" />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">{s.label}</p>
              <p className="mt-1 font-serif text-2xl font-medium tracking-tight text-ink">
                <CountUp to={s.to} />
                {s.suffix}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-10 rounded-xl border border-dashed border-border-strong bg-surface/50 p-8 text-center">
        <p className="text-sm text-muted">Course enrollment opens soon.</p>
      </div>
    </div>
  );
}