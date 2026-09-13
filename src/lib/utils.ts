export function cn(...values: Array<string | false | null | undefined>) { return values.filter(Boolean).join(" "); }
export function formatDate(value: Date | string) { return new Intl.DateTimeFormat("id-ID", { month: "short", year: "numeric" }).format(new Date(value)); }
export function readingTime(content: string) { return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)); }
