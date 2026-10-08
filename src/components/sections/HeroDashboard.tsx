'use client';

import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Users, DollarSign, Star,
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, ResponsiveContainer,
} from 'recharts';
import { CountUp } from '@/components/ui/CountUp';
import { fadeUp, stagger } from '@/lib/motion';
import { cn } from '@/lib/utils';

type ViewId = 'overview' | 'courses' | 'students' | 'revenue' | 'reviews';

const sidebar: { id: ViewId; icon: typeof LayoutDashboard; label: string }[] = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'courses', icon: BookOpen, label: 'Courses' },
  { id: 'students', icon: Users, label: 'Students' },
  { id: 'revenue', icon: DollarSign, label: 'Revenue' },
  { id: 'reviews', icon: Star, label: 'Reviews' },
];

const viewTitles: Record<ViewId, string> = {
  overview: 'Overview',
  courses: 'Courses',
  students: 'Students',
  revenue: 'Revenue',
  reviews: 'Reviews',
};

export function HeroDashboard() {
  const [active, setActive] = useState<ViewId>('overview');

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.08)}
        className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated"
      >
        {/* Chrome bar with live indicator */}
        <div className="flex items-center gap-2 border-b border-border bg-canvas/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(25,25,25,0.12)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(25,25,25,0.12)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(25,25,25,0.12)]" />
          <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-muted">
            academy / dashboard
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Live
            </span>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-[140px] shrink-0 flex-col gap-1 border-r border-border p-3 md:flex">
            {sidebar.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <motion.button
                  key={item.id}
                  variants={fadeUp}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={cn(
                    'group relative flex items-center gap-2 rounded-md px-2 py-2 text-xs transition-colors duration-150',
                    isActive
                      ? 'bg-canvas text-ink'
                      : 'text-muted hover:bg-canvas/60 hover:text-ink',
                  )}
                >
                  <Icon
                    size={14}
                    className={cn(
                      'transition-colors duration-150',
                      isActive ? 'text-accent' : 'group-hover:text-ink',
                    )}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-underline"
                      className="absolute -bottom-0.5 left-2 h-[2px] w-[60%] rounded-full bg-accent/60"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </aside>

          {/* Main area */}
          <div className="flex-1 p-4 md:p-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="font-serif text-lg font-medium tracking-tight text-ink"
              >
                {viewTitles[active]}
              </motion.p>
            </AnimatePresence>

            {/* min-height keeps the panel from collapsing between views */}
            <div className="mt-4 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  variants={stagger(0.06)}
                >
                  {active === 'overview' && <OverviewView />}
                  {active === 'courses' && <CoursesView />}
                  {active === 'students' && <StudentsView />}
                  {active === 'revenue' && <RevenueView />}
                  {active === 'reviews' && <ReviewsView />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

/* ----------------------------- VIEWS ----------------------------- */

const stats = [
  { label: 'Courses', to: 12, format: 'plain' as const },
  { label: 'Students', to: 340, format: 'plain' as const },
  { label: 'Revenue', to: 480000, format: 'currencyCompact' as const },
  { label: 'Rating', to: 48, format: 'plain' as const, suffix: '/50' },
];

const trendData = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 48 },
  { month: 'Apr', value: 72 },
  { month: 'May', value: 68 },
  { month: 'Jun', value: 89 },
  { month: 'Jul', value: 96 },
];

function OverviewView() {
  return (
    <>
      <motion.div
        variants={stagger(0.06, 0.1)}
        className="grid grid-cols-2 gap-2.5 md:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="rounded-lg border border-border bg-canvas/50 px-3 py-2.5 transition-colors duration-150 hover:border-accent/40"
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted">
              {s.label}
            </p>
            <p className="mt-1 font-serif text-base font-medium tracking-tight text-ink">
              <CountUp to={s.to} format={s.format} duration={1.4} />
              {s.suffix}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-5">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted">
          Enrollment trend
        </p>
        <div className="mt-2 h-[80px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trendData}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-accent)"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-accent)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-accent)"
                strokeWidth={2}
                fill="url(#trendFill)"
                isAnimationActive
                animationDuration={1600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-5 flex items-center gap-3 rounded-lg border border-border bg-canvas/50 p-3 transition-colors duration-150 hover:border-accent/40"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-medium text-white">
          YA
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-sm font-medium text-ink">
            Introduction to React
          </p>
          <p className="font-mono text-[10px] text-muted">
            Yusuf Ali · 24 lessons
          </p>
        </div>
        <p className="font-serif text-sm font-medium text-ink">₦12,000</p>
      </motion.div>
    </>
  );
}

function CoursesView() {
  const rows = [
    { title: 'Introduction to React', lessons: 24, status: 'Published' },
    { title: 'Advanced TypeScript', lessons: 18, status: 'Published' },
    { title: 'Design Systems 101', lessons: 12, status: 'Draft' },
  ];
  return (
    <motion.div variants={stagger(0.08)} className="space-y-2">
      {rows.map((r) => (
        <motion.div
          key={r.title}
          variants={fadeUp}
          className="flex items-center justify-between rounded-lg border border-border bg-canvas/50 px-3 py-3 transition-colors duration-150 hover:border-accent/40"
        >
          <div>
            <p className="font-serif text-sm font-medium text-ink">{r.title}</p>
            <p className="font-mono text-[10px] text-muted">{r.lessons} lessons</p>
          </div>
          <span
            className={cn(
              'font-mono text-[10px] uppercase tracking-widest',
              r.status === 'Published' ? 'text-accent' : 'text-muted',
            )}
          >
            {r.status}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function StudentsView() {
  const rows = [
    { name: 'Aisha Bello', monogram: 'AB', courses: 3 },
    { name: 'Ibrahim Musa', monogram: 'IM', courses: 1 },
    { name: 'Fatima Yusuf', monogram: 'FY', courses: 5 },
    { name: 'Umar Sani', monogram: 'US', courses: 2 },
  ];
  return (
    <motion.div variants={stagger(0.06)} className="space-y-2">
      {rows.map((r) => (
        <motion.div
          key={r.name}
          variants={fadeUp}
          className="flex items-center gap-3 rounded-lg border border-border bg-canvas/50 px-3 py-3 transition-colors duration-150 hover:border-accent/40"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-canvas">
            {r.monogram}
          </div>
          <p className="flex-1 font-serif text-sm font-medium text-ink">{r.name}</p>
          <p className="font-mono text-[10px] text-muted">{r.courses} courses</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

const revenueData = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 62 },
  { day: 'Wed', value: 48 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 68 },
  { day: 'Sat', value: 92 },
  { day: 'Sun', value: 76 },
];

function RevenueView() {
  return (
    <motion.div variants={fadeUp}>
      <p className="font-mono text-[9px] uppercase tracking-widest text-muted">
        This month
      </p>
      <p className="mt-1 font-serif text-3xl font-medium tracking-tight text-ink">
        <CountUp to={480000} format="currency" duration={1.4} />
      </p>

      <div className="mt-5 h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueData}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <Bar
              dataKey="value"
              fill="var(--color-accent)"
              fillOpacity={0.7}
              radius={[4, 4, 0, 0]}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function ReviewsView() {
  const rows = [
    { initials: 'AB', name: 'Aisha Bello', rating: 5, body: 'Clear and practical.' },
    { initials: 'IM', name: 'Ibrahim Musa', rating: 4, body: 'Good pace. Loved the quizzes.' },
    { initials: 'FY', name: 'Fatima Yusuf', rating: 5, body: 'The best course on React I have taken.' },
  ];
  return (
    <motion.div variants={stagger(0.08)} className="space-y-2">
      {rows.map((r) => (
        <motion.div
          key={r.name}
          variants={fadeUp}
          className="rounded-lg border border-border bg-canvas/50 p-3 transition-colors duration-150 hover:border-accent/40"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[9px] font-medium text-canvas">
              {r.initials}
            </div>
            <span className="font-mono text-[10px] text-muted">{r.name}</span>
            <div className="ml-auto flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1 w-3 rounded-full',
                    i < r.rating ? 'bg-accent' : 'bg-border-strong',
                  )}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-xs italic text-muted">{r.body}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}