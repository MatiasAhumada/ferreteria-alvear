"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTES_BY_ROLE } from "@/constants/permissions.constant";
import { Role } from "@prisma/client";
import { Cancel01Icon } from "hugeicons-react";
import * as HugeIcons from "hugeicons-react";

interface SidebarProps {
  userRole: Role;
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ userRole, username, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const routes = ROUTES_BY_ROLE[userRole];

  const getIcon = (iconName: string) => {
    const Icon = (HugeIcons as Record<string, React.ComponentType<{ size: number }>>)[iconName];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-text/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "w-64 h-screen bg-gradient-to-b from-primary to-primary-dark text-text-inverse flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300",
          !isOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-primary-light/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">FA</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Ferretería Alvear</h1>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 flex items-center justify-center hover:bg-primary-light/20 rounded-lg transition-colors"
            >
              <Cancel01Icon size={20} />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {routes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive ? "bg-accent text-text-inverse shadow-lg" : "hover:bg-primary-light/20"
                )}
              >
                {getIcon(route.icon)}
                <span className="font-medium">{route.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-light/20">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <span className="font-bold">{username.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium">{username}</p>
              <p className="text-xs text-text-inverse/70">{userRole}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
