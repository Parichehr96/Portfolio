"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

/* === Font-size scale system ===
   Three discrete scales:
     - "1" = base sizes from Figma (no offset)
     - "2" = every font-size +1 px
     - "3" = every font-size +2 px
   The chosen value persists in localStorage and is mirrored to
   `<html data-scale>` so a single CSS variable `--fs-offset` flows
   into every fontSize wrapped with the `fs()` helper from
   _lib/typography.ts (`calc(<base>px + var(--fs-offset))`).

   A pre-hydration inline script (SCALE_INIT_SCRIPT, injected by the
   root layout) reads localStorage *before* React mounts so the very
   first paint already has the right offset — no flash of the wrong
   size on a hard reload. */

export type Scale = "1" | "2" | "3";

const STORAGE_KEY = "portfolio:scale";

type ScaleContextValue = {
  scale: Scale;
  setScale: (next: Scale) => void;
};

const ScaleContext = createContext<ScaleContextValue | null>(null);

export const SCALE_INIT_SCRIPT = `(() => {
  try {
    const stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    const scale = stored === "2" || stored === "3" ? stored : "1";
    document.documentElement.dataset.scale = scale;
  } catch {
    document.documentElement.dataset.scale = "1";
  }
})();`;

const scaleListeners = new Set<() => void>();
let scaleObserver: MutationObserver | null = null;

function readDOMScale(): Scale {
  if (typeof document === "undefined") return "1";
  const attr = document.documentElement.dataset.scale;
  if (attr === "2" || attr === "3") return attr;
  return "1";
}

function subscribe(listener: () => void): () => void {
  scaleListeners.add(listener);
  if (typeof document !== "undefined" && !scaleObserver) {
    scaleObserver = new MutationObserver(() => {
      scaleListeners.forEach((l) => l());
    });
    scaleObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-scale"],
    });
  }
  return () => {
    scaleListeners.delete(listener);
  };
}

function getServerSnapshot(): Scale {
  return "1";
}

export function ScaleProvider({ children }: { children: React.ReactNode }) {
  const scale = useSyncExternalStore(
    subscribe,
    readDOMScale,
    getServerSnapshot,
  );

  const setScale = useCallback((next: Scale) => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.scale = next;
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage failures (privacy mode, etc.) */
    }
  }, []);

  return (
    <ScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </ScaleContext.Provider>
  );
}

export function useScale(): ScaleContextValue {
  const ctx = useContext(ScaleContext);
  if (!ctx) {
    throw new Error("useScale must be used inside <ScaleProvider>");
  }
  return ctx;
}
