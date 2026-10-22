import {
  LayoutDashboard, Building2, Users, UserCog, FolderTree,
  BookOpen, Star, MessageSquare, TrendingUp, CreditCard,
  Receipt, ScrollText, Server, Award, Compass, Bell, Settings,
  type LucideIcon,
} from 'lucide-react';
import type { UserRole } from '@/types/api';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  comingSoon?: boolean; // <-- Add this
};

export const navConfig: Record<UserRole, NavItem[]> = {
  SUPER_ADMIN: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'academies', label: 'Academies', href: '/dashboard/academies', icon: Building2, comingSoon: true },
    { id: 'users', label: 'Users', href: '/dashboard/users', icon: Users, comingSoon: true },
    { id: 'subscriptions', label: 'Subscriptions', href: '/dashboard/subscriptions', icon: CreditCard, comingSoon: true },
    { id: 'invoices', label: 'Invoices', href: '/dashboard/invoices', icon: Receipt, comingSoon: true },
    { id: 'analytics', label: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp, comingSoon: true },
    { id: 'audit', label: 'Audit log', href: '/dashboard/audit', icon: ScrollText, comingSoon: true },
    { id: 'system', label: 'System', href: '/dashboard/system', icon: Server, comingSoon: true },
  ],
  ACADEMY_OWNER: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', href: '/dashboard/courses', icon: BookOpen },
    { id: 'students', label: 'Students', href: '/dashboard/students', icon: Users, comingSoon: true },
    { id: 'instructors', label: 'Instructors', href: '/dashboard/instructors', icon: UserCog, comingSoon: true },
    { id: 'categories', label: 'Categories', href: '/dashboard/categories', icon: FolderTree, comingSoon: true },
    { id: 'reviews', label: 'Reviews', href: '/dashboard/reviews', icon: Star, comingSoon: true },
    { id: 'analytics', label: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp, comingSoon: true },
    { id: 'subscription', label: 'Subscription', href: '/dashboard/subscription', icon: CreditCard, comingSoon: true },
  ],
  INSTRUCTOR: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My courses', href: '/dashboard/courses', icon: BookOpen },
    { id: 'students', label: 'Students', href: '/dashboard/students', icon: Users, comingSoon: true },
    { id: 'reviews', label: 'Reviews', href: '/dashboard/reviews', icon: Star, comingSoon: true },
  ],
  MODERATOR: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'comments', label: 'Comments', href: '/dashboard/comments', icon: MessageSquare, comingSoon: true },
    { id: 'reviews', label: 'Reviews', href: '/dashboard/reviews', icon: Star, comingSoon: true },
    { id: 'users', label: 'Users', href: '/dashboard/users', icon: Users, comingSoon: true },
  ],
  STUDENT: [
    { id: 'overview', label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My learning', href: '/dashboard/courses', icon: BookOpen },
    { id: 'explore', label: 'Explore', href: '/courses', icon: Compass }, // Points to public catalog
    { id: 'certificates', label: 'Certificates', href: '/dashboard/certificates', icon: Award, comingSoon: true },
  ],
};

export const utilityNav: NavItem[] = [
  { id: 'notifications', label: 'Notifications', href: '/dashboard/notifications', icon: Bell, comingSoon: true },
  { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: Settings, comingSoon: true },
];