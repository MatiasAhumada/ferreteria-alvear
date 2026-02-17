import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cursor-pointer bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-hover hover:to-secondary-hover",
        destructive: "cursor-pointer bg-error text-white hover:bg-error/90",
        outline: "cursor-pointer border border-border bg-background hover:bg-background-secondary",
        secondary: "cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "cursor-pointer hover:bg-accent hover:text-accent-foreground",
        link: "cursor-pointer text-primary underline-offset-4 hover:underline",
        success: "cursor-pointer bg-success text-white hover:bg-success/90",
        cancel: "cursor-pointer bg-background-secondary text-text hover:bg-background-tertiary border border-border",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
