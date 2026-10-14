import { Building2, Users, TrendingUp, CreditCard } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { useAuth } from '@/components/auth/AuthProvider';

const stats = [
  { label: 'Academies', to: 0, icon: Building2 },
  { label: 'Users', to: 0, icon: Users },
  { label: 'MRR', to: 0, format: 'currencyCompact' as const, icon: TrendingUp },
  { label: 'Subscriptions', to: 0, icon: CreditCard },
];

export function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Platform admin
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl">
        Welcome, {user?.fullName.split(' ')[0]}.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        The full picture. Every academy, every subscription, every transaction.
      </p>
      <div className="mt-10 grid gap-3 md:grid-cols-4">
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
                <CountUp to={s.to} format={s.format ?? 'plain'} />
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-10 rounded-xl border border-dashed border-border-strong bg-surface/50 p-8 text-center">
        <p className="text-sm text-muted">Platform tools coming soon.</p>
      </div>
    </div>
  );
}