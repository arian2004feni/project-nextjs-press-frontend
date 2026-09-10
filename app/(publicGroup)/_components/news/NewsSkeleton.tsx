export function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 w-96 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  );
}
