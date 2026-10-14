import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  FolderTree,
  BookOpen,
  Star,
  MessageSquare,
  TrendingUp,
  CreditCard,
  Receipt,
  ScrollText,
  Server,
  Award,
  Compass,
  Bell,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import type { UserRole } from '@/types/api';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navConfig: Record<UserRole, NavItem[]> = {
  SUPER_ADMIN: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'academies', label: 'Academies', href: '/dashboard/academies', icon: Building2 },
    { id: 'users', label: 'Users', href: '/dashboard/users', icon: Users },
    { id: 'subscriptions', label: 'Subscriptions', href: '/dashboard/subscriptions', icon: CreditCard },
    { id: 'invoices', label: 'Invoices', href: '/dashboard/invoices', icon: Receipt },
    { id: 'analytics', label: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
    { id: 'audit', label: 'Audit log', href: '/dashboard/audit', icon: ScrollText },
    { id: 'system', label: 'System', href: '/dashboard/system', icon: Server },
  ],
  ACADEMY_OWNER: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', href: '/dashboard/courses', icon: BookOpen },
    { id: 'students', label: 'Students', href: '/dashboard/students', icon: Users },
    { id: 'instructors', label: 'Instructors', href: '/dashboard/instructors', icon: UserCog },
    { id: 'categories', label: 'Categories', href: '/dashboard/categories', icon: FolderTree },
    { id: 'reviews', label: 'Reviews', href: '/dashboard/reviews', icon: Star },
    { id: 'analytics', label: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
    { id: 'subscription', label: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
  ],
  INSTRUCTOR: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My courses', href: '/dashboard/courses', icon: BookOpen },
    { id: 'students', label: 'Students', href: '/dashboard/students', icon: Users },
    { id: 'reviews', label: 'Reviews', href: '/dashboard/reviews', icon: Star },
  ],
  MODERATOR: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'comments', label: 'Comments', href: '/dashboard/comments', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', href: '/dashboard/reviews', icon: Star },
    { id: 'users', label: 'Users', href: '/dashboard/users', icon: Users },
  ],
  STUDENT: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My learning', href: '/dashboard/courses', icon: BookOpen },
    { id: 'explore', label: 'Explore', href: '/dashboard/explore', icon: Compass },
    { id: 'certificates', label: 'Certificates', href: '/dashboard/certificates', icon: Award },
  ],
};

export const utilityNav: NavItem[] = [
  { id: 'notifications', label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: Settings },
];