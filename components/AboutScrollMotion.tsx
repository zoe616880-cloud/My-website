"use client";

import { useEffect } from "react";

const SECTION_SELECTOR = ".about-motion-section";
const INTERACTIVE_SELECTOR = [
  ".about-page .about-numbers div",
  ".about-business-list article",
  ".about-plant-card",
  ".about-cert-row img",
].join(",");
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function AboutScrollMotion() {
  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const root = document.documentElement;
    let observer: IntersectionObserver | null = null;
    let frame = 0;
    let hasScrolledDown = false;
    let lastScrollY = window.scrollY;
    let sections: HTMLElement[] = [];
    let interactiveElements: HTMLElement[] = [];

    const updateProgress = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const scroll = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
        const depth = scroll - 0.5;

        section.style.setProperty("--about-scroll", scroll.toFixed(3));
        section.style.setProperty("--about-depth-y", `${clamp(depth * -72, -36, 36).toFixed(1)}px`);
        section.style.setProperty("--about-depth-soft", `${clamp(depth * -28, -16, 16).toFixed(1)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    const updatePointerPosition = (event: Event) => {
      const pointerEvent = event as PointerEvent;
      const element = pointerEvent.currentTarget as HTMLElement | null;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = rect.width ? ((pointerEvent.clientX - rect.left) / rect.width) * 100 : 50;
      const y = rect.height ? ((pointerEvent.clientY - rect.top) / rect.height) * 100 : 50;

      element.style.setProperty("--pointer-x", `${clamp(x, 0, 100).toFixed(1)}%`);
      element.style.setProperty("--pointer-y", `${clamp(y, 0, 100).toFixed(1)}%`);
    };

    const resetPointerPosition = (event: Event) => {
      const element = event.currentTarget as HTMLElement | null;
      element?.style.removeProperty("--pointer-x");
      element?.style.removeProperty("--pointer-y");
    };

    const enableMotion = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
      interactiveElements = Array.from(document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR));
      root.classList.add("about-motion-ready");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && hasScrolledDown) {
              entry.target.classList.add("about-motion-in");
            }
          });
        },
        { rootMargin: "0px 0px -14% 0px", threshold: 0.16 },
      );

      sections.forEach((section, index) => {
        section.style.setProperty("--about-section-index", String(index));
        observer?.observe(section);
      });

      interactiveElements.forEach((element) => {
        element.addEventListener("pointermove", updatePointerPosition);
        element.addEventListener("pointerleave", resetPointerPosition);
      });

      updateProgress();
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", requestUpdate);
    };

    const revealVisibleSections = () => {
      const viewportHeight = window.innerHeight || 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.86 && rect.bottom > viewportHeight * 0.12) {
          section.classList.add("about-motion-in");
        }
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!hasScrolledDown && currentScrollY > lastScrollY + 2) {
        hasScrolledDown = true;
        revealVisibleSections();
      }

      lastScrollY = currentScrollY;
      requestUpdate();
    };

    const disableMotion = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }

      observer?.disconnect();
      observer = null;
      root.classList.remove("about-motion-ready");

      interactiveElements.forEach((element) => {
        element.removeEventListener("pointermove", updatePointerPosition);
        element.removeEventListener("pointerleave", resetPointerPosition);
        element.style.removeProperty("--pointer-x");
        element.style.removeProperty("--pointer-y");
      });
      interactiveElements = [];

      sections.forEach((section) => {
        section.classList.remove("about-motion-in");
        section.style.removeProperty("--about-scroll");
        section.style.removeProperty("--about-depth-y");
        section.style.removeProperty("--about-depth-soft");
        section.style.removeProperty("--about-section-index");
      });
      sections = [];

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestUpdate);
      hasScrolledDown = false;
      lastScrollY = window.scrollY;
    };

    if (!mediaQuery.matches) {
      enableMotion();
    }

    const handlePreferenceChange = () => {
      disableMotion();
      if (!mediaQuery.matches) {
        enableMotion();
      }
    };

    mediaQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handlePreferenceChange);
      disableMotion();
    };
  }, []);

  return null;
}
