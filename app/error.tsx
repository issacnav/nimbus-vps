"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--page-bg)] px-6 text-[var(--foreground)]">
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-center text-sm opacity-80">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-[#111] px-5 py-2 text-sm font-medium text-white dark:bg-slate-200 dark:text-slate-900"
      >
        Try again
      </button>
    </div>
  );
}
