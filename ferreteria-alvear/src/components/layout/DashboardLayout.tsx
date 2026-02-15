"use client";

import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "./Sidebar";
import { Notification01Icon, Search01Icon } from "hugeicons-react";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={user.role} username={user.username} />

      <div className="ml-64">
        <header className="h-16 bg-surface border-b border-border px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-text">Panel de Control</h2>

          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search01Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <Input placeholder="Buscar producto, cliente..." className="pl-10 bg-background border-border" />
            </div>
            <button className="w-10 h-10 rounded-lg bg-background hover:bg-background-secondary transition-colors flex items-center justify-center relative">
              <Notification01Icon size={20} className="text-text" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
