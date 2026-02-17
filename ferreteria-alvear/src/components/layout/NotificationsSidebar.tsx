"use client";

import { Cancel01Icon, Notification01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success";
}

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsSidebar({ isOpen, onClose }: NotificationsSidebarProps) {
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Stock Bajo",
      message: "Tornillos Phillips 2\" tiene stock crítico",
      time: "Hace 5 min",
      read: false,
      type: "warning",
    },
    {
      id: "2",
      title: "Nueva Venta",
      message: "Venta #1234 registrada por $12,500",
      time: "Hace 15 min",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Recordatorio",
      message: "Cierre de caja pendiente",
      time: "Hace 1 hora",
      read: true,
      type: "info",
    },
  ];

  const typeColors = {
    info: "bg-primary/10 text-primary",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-text/50 z-40"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "w-80 h-screen bg-surface border-l border-border flex flex-col fixed right-0 top-0 z-50 transition-transform duration-300",
          !isOpen && "translate-x-full"
        )}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-text">Notificaciones</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-background-secondary rounded-lg transition-colors"
          >
            <Cancel01Icon size={20} className="text-text" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "p-4 rounded-lg border transition-colors cursor-pointer",
                notification.read
                  ? "bg-background border-border"
                  : "bg-surface border-border shadow-sm"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", typeColors[notification.type])}>
                  <Notification01Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-text text-sm">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mb-2">{notification.message}</p>
                  <span className="text-text-tertiary text-xs">{notification.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <button className="w-full py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors font-medium">
            Marcar todas como leídas
          </button>
        </div>
      </aside>
    </>
  );
}
