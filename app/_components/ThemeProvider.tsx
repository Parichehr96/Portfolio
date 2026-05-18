"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

/* === Theme system ===
   Two themes: "dark" (default) and "light". The user's choice persists
   in localStorage under STORAGE_KEY and is applied by writing the
   chosen value to `document.documentElement.dataset.theme`. CSS picks
   it up via `[data-theme="dark"]` selectors in globals.css.

   A pre-hydration inline script (THEME_INIT_SCRIPT, injected by the
   root layout) reads localStorage *before* React mounts so the very
   first paint already has the right theme — no flash of the wrong
   colors. The provider then mirrors the same value into React state
   for components that need to react to the choice. */

export type Theme = "light" | "dark";

// Bumped from "portfolio:theme" → "portfolio:theme:v2" on the
// 2026-05 dark-default flip so any stale "light" value persisted
// under the old key (from earlier visits when light was the
// default) is silently dropped — returning users get the new dark
// default on next load, and only an explicit toggle persists to the
// new key.
const STORAGE_KEY = "portfolio:theme:v2";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Inline script body for the <head>. Runs synchronously before paint
 *  so the html element already has the right `data-theme` attribute by
 *  the time CSS resolves. Uses a try/catch because localStorage can
 *  throw under some privacy modes / iframes. */
export const THEME_INIT_SCRIPT = `(() => {
  try {
    const stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    const theme = stored === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
})();`;

// External "store" — the live value lives on the document element's
// `data-theme` attribute, written by the inline init script, by the
// `setTheme` callback below, and (in the future) by anything else that
// wants to flip themes. `useSyncExternalStore` reads from it, sets up
// a MutationObserver to detect changes, and integrates cleanly with
// SSR via the server snapshot.
const themeListeners = new Set<() => void>();
let attrObserver: MutationObserver | null = null;

function readDOMTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.dataset.theme;
  return attr === "light" ? "light" : "dark";
}

function subscribe(listener: () => void): () => void {
  themeListeners.add(listener);
  if (typeof document !== "undefined" && !attrObserver) {
    // One observer per process is enough — every listener fires when
    // the attribute mutates. We never disconnect because the observer
    // lives for the lifetime of the page.
    attrObserver = new MutationObserver(() => {
      themeListeners.forEach((l) => l());
    });
    attrObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
  return () => {
    themeListeners.delete(listener);
  };
}

function getServerSnapshot(): Theme {
  // SSR always renders the dark variant — the inline init script
  // overrides this to "light" before paint for users who've explicitly
  // chosen light mode, and the client snapshot takes over on
  // hydration.
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readDOMTheme, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    if (typeof document !== "undefined") {
      // Mutating the DOM attribute kicks the MutationObserver, which
      // fires the listeners registered by useSyncExternalStore — so
      // every consumer re-renders without a separate setState call.
      document.documentElement.dataset.theme = next;
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage failures (privacy mode, etc.) */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}
