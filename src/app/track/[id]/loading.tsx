export default function Loading() {
  return (
    <div className="flex-1 flex flex-col bg-[var(--color-bg-primary)]">
      <header className="sticky top-0 z-40 flex items-center gap-4 px-8 border-b border-[var(--color-border)]" style={{ height: "var(--header-height)", background: "rgba(9, 9, 11, 0.8)", backdropFilter: "blur(12px)" }}>
        <div className="skeleton w-8 h-8 rounded-lg" />
        <div className="skeleton w-6 h-6 rounded-full" />
        <div className="skeleton w-48 h-6 rounded" />
      </header>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="skeleton h-24 w-full rounded-xl" />
          <div className="skeleton h-24 w-full rounded-xl" />
          <div className="skeleton h-24 w-full rounded-xl" />
          <div className="skeleton h-24 w-full rounded-xl" />
        </div>
        <div className="skeleton h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}
