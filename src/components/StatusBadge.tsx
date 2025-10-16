interface StatusBadgeProps {
  status: "available" | "booked" | "maintenance" | "cleaning" | "cleaned" | "pending" | "low" | "sufficient";
  children: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const variants = {
    available: "bg-success/10 text-success",
    booked: "bg-primary/10 text-primary",
    maintenance: "bg-warning/10 text-warning",
    cleaning: "bg-accent/10 text-accent",
    cleaned: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    low: "bg-destructive/10 text-destructive",
    sufficient: "bg-success/10 text-success",
  };

  return (
    <span className={`status-badge ${variants[status]}`}>
      {children}
    </span>
  );
}
