import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-soft-pulse rounded-2xl bg-gradient-to-r from-muted/55 via-accent/50 to-muted/55", className)}
      {...props}
    />
  )
}

export { Skeleton }
