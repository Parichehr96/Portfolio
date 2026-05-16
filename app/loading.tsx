/* Default loading state shown while a server-rendered route segment
   is streaming. We deliberately render NOTHING visible — the previous
   route's snapshot stays on screen via the View Transitions API
   while the next route's chunk compiles, and the persistent
   overlays in ScaledShell (FloatingNav + TopRightButtons) carry on
   undisturbed.

   The earlier `fixed inset-0 bg-white` panel was painting a full-
   viewport white card during dev-mode chunk compilation, which the
   browser then captured into the View Transition's "new" snapshot —
   the result was a brief white flash that wiped out the nav and
   the secondary buttons on every Link click. Production never
   showed this because pre-built chunks are immediately available so
   this loading fallback never had time to render. `hidden` keeps the
   element in the accessibility tree for the aria-live announcement
   without painting any pixels. */
export default function Loading() {
  return <div aria-busy="true" aria-live="polite" hidden />;
}
