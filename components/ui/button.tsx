import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonProps = {
  pendingText?: string;
  isPending?: boolean;
};

const buttonVariants = cva(
  "group/button inline-flex justify-center items-center bg-clip-padding disabled:opacity-50 border border-transparent aria-invalid:border-destructive focus-visible:border-ring dark:aria-invalid:border-destructive/50 rounded-md outline-none aria-invalid:ring-2 aria-invalid:ring-destructive/20 focus-visible:ring-2 focus-visible:ring-ring/30 dark:aria-invalid:ring-destructive/40 font-medium leading-none whitespace-nowrap transition-all active:not-aria-[haspopup]:translate-y-px disabled:hover:cursor-not-allowed [&_svg]:pointer-events-none select-none shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:cursor-pointer hover:bg-secondary",
        outline:
          "border-primary hover:cursor-pointer hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground disabled:hover:text-primary dark:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:cursor-pointer hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:cursor-pointer hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 hover:cursor-pointer text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "hover:text-primary underline-offset-4 hover:cursor-pointer hover:underline",
        none: "",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-2.5",
        sm: "h-8 gap-1.5 px-3 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-6 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-11 [&_svg:not([class*='size-'])]:size-5",
        "rounded-xs":
          "size-6 rounded-full p-1 [&_svg:not([class*='size-'])]:size-3",
        "rounded-sm":
          "size-8 rounded-full p-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        "rounded-lg":
          "size-10 rounded-full p-2 [&_svg:not([class*='size-'])]:size-5",
        "rounded-icon-xs":
          "size-6 rounded-full p-1 [&_svg:not([class*='size-'])]:size-3",
        "rounded-icon-sm":
          "size-8 rounded-full p-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        "rounded-icon-lg":
          "size-10 rounded-full p-2 [&_svg:not([class*='size-'])]:size-5",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  isPending,
  pendingText,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={isPending || props.disabled} // تعطيل الزر أثناء التحميل
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingText ? <span className="ml-1">{pendingText}</span> : null}
        </>
      ) : (
        props.children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
