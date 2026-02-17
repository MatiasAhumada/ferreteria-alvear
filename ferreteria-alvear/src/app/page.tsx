"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      <Dashboard role={user.role} />
    </DashboardLayout>
  );
}
