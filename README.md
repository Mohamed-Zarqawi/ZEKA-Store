# 🛒 ZEKA Store - Full-Stack E-Commerce Platform

A modern, high-performance, and feature-rich e-commerce web application built for sports gear and equipment shopping. Designed with a seamless user experience, lightning-fast performance, and robust state management.

![ZEKA Store Banner](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components & UI:** [shadcn/ui](https://ui.shadcn.com/), [Animate UI](https://animate-ui.com/)
- **Icons:** [Lucide Icons](https://lucide.dev/), [Tabler Icons](https://tabler.io/icons)
- **State & Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage, RLS)

---

## ✨ Key Features

### 🛍️ Customer Experience

- **Authentication & Authorization:** Secure user sign-up, login, and session management via Supabase Auth.
- **Product Catalog & Advanced Filtering:** Browse sports equipment, filter by categories, search dynamically, and sort products effortlessly.
- **Interactive Shopping Cart & Favorites:** Seamlessly manage cart items, quantities, and save favorite products.
- **Checkout & Order Processing:** Complete checkout flow with real-time order generation and tracking.
- **User Profile Management:** Dedicated dashboard for users to manage personal info, addresses, and order history.

### 📊 Admin Dashboard

- **Product & Category Management:** Complete CRUD operations for products, stock, and categories.
- **Order Tracking & Management:** Monitor customer orders, update statuses, and oversee store analytics.
- **Secure Access Control:** Database-level Row Level Security (RLS) ensuring strict separation between standard users and administrators.

### ⚡ Performance & Architecture

- **Responsive UI:** Fully responsive design optimized for mobile, tablet, and desktop viewports.
- **Optimized Data Fetching:** Efficient server/client-side data synchronization using TanStack Query.
- **Secure Backend Integration:** Strict Row-Level Security (RLS) policies implemented on Supabase PostgreSQL tables and secure Storage buckets.

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
├── components/           # Reusable UI components (shadcn/ui & custom components)
├── hooks/                # Custom React hooks & TanStack Query integrations
├── lib/                  # Supabase client configuration & utilities
├── types/                # TypeScript interfaces and global types
└── public/               # Static assets (images, icons)
```
