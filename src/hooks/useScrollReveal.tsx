import { useEffect } from "react";

/**
 * Observes `.reveal` elements and toggles `.in-view` when they enter the viewport.
 * Also watches DOM mutations so newly mounted sections animate on route changes.
 */
export const useScrollReveal = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) =>
        el.classList.add("in-view")
      );
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const observeAll = () =>
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.in-view)")
        .forEach((el) => io.observe(el));

    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
};
