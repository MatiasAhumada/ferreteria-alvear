"use client";

import { Button } from "@/components/ui/button";
import { ViewIcon, PencilEdit02Icon, Delete02Icon, MoreVerticalIcon } from "hugeicons-react";
import { useState } from "react";

interface Action {
  label: string;
  icon: "view" | "edit" | "delete";
  onClick: () => void;
  variant?: "default" | "destructive";
}

interface TableActionsProps {
  actions: Action[];
}

const ICONS = {
  view: ViewIcon,
  edit: PencilEdit02Icon,
  delete: Delete02Icon,
};

export function TableActions({ actions }: TableActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex gap-2">
        {actions.map((action, index) => {
          const Icon = ICONS[action.icon];
          return (
            <Button
              key={index}
              variant={action.variant || "ghost"}
              size="icon"
              onClick={action.onClick}
              title={action.label}
            >
              <Icon size={18} />
            </Button>
          );
        })}
      </div>

      <div className="md:hidden relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreVerticalIcon size={18} />
        </Button>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-lg py-1 z-20 min-w-[150px]">
              {actions.map((action, index) => {
                const Icon = ICONS[action.icon];
                return (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-background-secondary text-text text-sm"
                  >
                    <Icon size={16} />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
