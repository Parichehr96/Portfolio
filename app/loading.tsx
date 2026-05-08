/* Default loading state shown while a server-rendered route segment
   is streaming. Intentionally minimal — the page-mount animations
   (anim-bubbly-grow, View Transitions) handle the visible entrance
   once the route renders. */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="fixed inset-0 bg-white"
    />
  );
}
