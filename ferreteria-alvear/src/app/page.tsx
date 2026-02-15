"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { VendedorDashboard } from "@/components/dashboard/VendedorDashboard";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@prisma/client";

export default function HomePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      {user.role === Role.ADMIN ? <AdminDashboard /> : <VendedorDashboard />}
    </DashboardLayout>
  );
}
