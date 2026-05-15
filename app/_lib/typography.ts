/* === fs(): scale-aware font-size helper ===
   Returns a `calc()` expression that adds the live `--fs-offset` CSS
   variable to the supplied base px value. The variable is driven by
   ScaleProvider via `<html data-scale="1|2|3">`:
     scale=1 → +0 px
     scale=2 → +1 px
     scale=3 → +2 px

   Use everywhere an inline `fontSize: <px>` previously appeared:
     fontSize: fs(16)
     fontSize: fs(selected ? 22 : 14)

   String result is safe in React style objects (browser treats it as
   a font-size value once the calc resolves). */
export function fs(base: number): string {
  return `calc(${base}px + var(--fs-offset, 0px))`;
}
