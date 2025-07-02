import * as React from "react";
import { cn } from "@/lib/utils";

export function Alert({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg border border-border/30 bg-muted/30 p-4 flex items-start gap-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("font-semibold text-base mb-1", className)} {...props}>
      {children}
    </div>
  );
}

export function AlertDescription({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
} 