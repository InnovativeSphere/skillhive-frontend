# SkillHive — Multi-Tenant SaaS for Skill-Based Education

SkillHive is a premium, multi-tenant platform where anyone can start an academy, build courses, and reach students globally. 

This repository contains the **Next.js (App Router) Frontend**. The C# / .NET backend is fully operational and handles multi-tenancy, role-based access control, enrollments, and certificate generation.

## 🚀 Live Demo & Architecture
*Note: The frontend is currently running locally against a local .NET backend. For a live walkthrough or code review, please contact Salim.*

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit (RTK Query for server state, Redux slices for client state)
- **Styling:** Tailwind CSS (v4) + Custom Design Tokens
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Data Fetching:** RTK Query (Envelope unwrapping, Tag-based cache invalidation)
- **Theme:** `next-themes` (Light/Dark mode with system preference detection)

## 🏗 System Design & Architecture Highlights
- **Content Architecture:** All copy and static data are separated from components (`src/data`) to allow for easy content edits.
- **Design System:** A strict, token-based design system (`src/lib/design/tokens.ts` and `globals.css`). Restrained color palette (Accent, Ink, Surface, Canvas) with tailored typography (Fraunces for headings, Inter for body, JetBrains Mono for technical labels).
- **Role-Based Access Control (RBAC):** Middleware and Client-side RouteGuards work together to protect routes and render role-specific dashboards (Academy Owner, Student, Instructor, Moderator, Super Admin).
- **State Management:** Server state (Courses, Enrollments) is managed via RTK Query. Client state (Auth, UI toggles) is managed via Redux.
- **Command Palette:** A global `Cmd+K` / `Ctrl+K` interface for rapid navigation, built with Framer Motion.

## 📦 MVP Scope
SkillHive was built as a production-ready MVP. The following modules are fully functional:
- **Auth:** Login, Registration (Academy & Student), OTP Verification, Forgot/Reset Password.
- **Courses:** CRUD operations for Academy Owners, lifecycle management (Draft → Publish → Archive), Lesson management.
- **Enrollments:** Public catalog, secure enrollment mutation, academy-side student tracking.
- **Classroom:** Video/Content player with interactive curriculum sidebar and progress tracking.

### Deferred to Phase 2 (Backend is ready, Frontend is pending):
- Payments & Subscriptions (Paystack)
- Advanced Analytics Dashboards
- Audit Logs & System Admin UI
- Quizzes & Certificates UI

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
3. Set up environment variables (.env.local):

env
NEXT_PUBLIC_API_URL=http://localhost:5167/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
Run the development server:

bash
npm run dev
🎨 Design Philosophy
"Restraint is the luxury. Motion is information. Content architecture before code."
Every pixel, animation, and component was built with intention. No bloated UI libraries, just clean, accessible, and semantic HTML/CSS powered by Tailwind.

Built by Salim Sambo

text


