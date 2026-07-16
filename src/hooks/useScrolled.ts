"use client";

import { useEffect, useState } from "react";

/** Returns true once the page has scrolled past `thresholdPx`. */
export function useScrolled(thresholdPx = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > thresholdPx);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [thresholdPx]);

  return scrolled;
}
