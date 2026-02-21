"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-gray-600",
          actionButton:
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-900",
          success:
            "!bg-green-500 !text-white !border-green-600",
          error:
            "!bg-red-500 !text-white !border-red-600",
          warning:
            "!bg-amber-500 !text-white !border-amber-600",
          info:
            "!bg-blue-500 !text-white !border-blue-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
