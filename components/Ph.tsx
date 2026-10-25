import { SHOW_PLACEHOLDERS } from "@/lib/site";

/**
 * Renders `value` when it's filled in. Otherwise shows lorem text with a pink note
 * describing what goes there — or nothing at all when placeholders are hidden.
 */
export default function Ph({
  value,
  note,
  lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}: {
  value?: string | null;
  note: string;
  lorem?: string;
}) {
  if (value) return <>{value}</>;
  if (!SHOW_PLACEHOLDERS) return null;
  return (
    <>
      {lorem} <span className="ph">({note})</span>
    </>
  );
}

/** Just the pink note (no lorem), hidden when placeholders are off. */
export function Note({ children }: { children: React.ReactNode }) {
  if (!SHOW_PLACEHOLDERS) return null;
  return <span className="ph">({children})</span>;
}
