"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `<html class="dark">` after mount only.
 * We intentionally do NOT read `document` during the first render so SSR + first
 * client paint match (avoids hydration errors when the inline theme script adds
 * `dark` before React hydrates).
 */
export function useDarkClass() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    function sync() {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return isDark;
}
