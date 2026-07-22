"use client";

import { useEffect } from "react";

const SECTION_SELECTOR = ".home-editable-section";
const INTERACTIVE_SELECTOR = [
  ".button",
  ".quality-guide",
  ".services-guide",
  ".product-portfolio-button",
  ".selector-grid > a",
  ".quality-photo-strip",
  ".advantage-grid article",
  ".resource-featured-card",
  ".resource-mini-card",
  ".product-carousel-card",
].join(",");
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_MOTION_QUERY = "(max-width: 760px)";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HomeScrollMotion() {
  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobileMotionQuery = window.matchMedia(MOBILE_MOTION_QUERY);
    const root = document.documentElement;
    let observer: IntersectionObserver | null = null;
    let frame = 0;
    let sections: HTMLElement[] = [];
    let interactiveElements: HTMLElement[] = [];

    const updateSectionProgress = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const progress = clamp((viewportHeight / 2 - midpoint) / viewportHeight, -1, 1);
        const scroll = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
        const depth = scroll - 0.5;

        section.style.setProperty("--section-progress", progress.toFixed(3));
        section.style.setProperty("--section-scroll", scroll.toFixed(3));
        section.style.setProperty("--motion-title-y", `${clamp(depth * -300, -152, 152).toFixed(1)}px`);
        section.style.setProperty("--motion-title-x", `${clamp(depth * -74, -42, 42).toFixed(1)}px`);
        section.style.setProperty("--motion-media-y", `${clamp(depth * -178, -104, 104).toFixed(1)}px`);
        section.style.setProperty("--motion-copy-y", `${clamp(depth * -96, -58, 58).toFixed(1)}px`);
        section.style.setProperty("--motion-bg-y", `${clamp(depth * -260, -138, 138).toFixed(1)}px`);
      });
    };

    const requestProgressUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateSectionProgress);
    };

    const enableMotion = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
      interactiveElements = Array.from(document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR));
      root.classList.add("home-motion-ready");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("home-motion-in");
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
      );

      sections.forEach((section, index) => {
        section.style.setProperty("--section-index", String(index));
        observer?.observe(section);
      });

      updateSectionProgress();
      interactiveElements.forEach((element) => {
        element.addEventListener("pointermove", updatePointerPosition);
        element.addEventListener("pointerleave", resetPointerPosition);
      });
      window.addEventListener("scroll", requestProgressUpdate, { passive: true });
      window.addEventListener("resize", requestProgressUpdate);
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

    const disableMotion = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }

      observer?.disconnect();
      observer = null;
      root.classList.remove("home-motion-ready");
      interactiveElements.forEach((element) => {
        element.removeEventListener("pointermove", updatePointerPosition);
        element.removeEventListener("pointerleave", resetPointerPosition);
        element.style.removeProperty("--pointer-x");
        element.style.removeProperty("--pointer-y");
      });
      interactiveElements = [];
      sections.forEach((section) => {
        section.classList.remove("home-motion-in");
        section.style.removeProperty("--section-progress");
        section.style.removeProperty("--section-scroll");
        section.style.removeProperty("--motion-title-y");
        section.style.removeProperty("--motion-title-x");
        section.style.removeProperty("--motion-media-y");
        section.style.removeProperty("--motion-copy-y");
        section.style.removeProperty("--motion-bg-y");
        section.style.removeProperty("--section-index");
      });
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
    };

    if (!mediaQuery.matches && !mobileMotionQuery.matches) {
      enableMotion();
    }

    const handlePreferenceChange = () => {
      disableMotion();
      if (!mediaQuery.matches && !mobileMotionQuery.matches) {
        enableMotion();
      }
    };

    mediaQuery.addEventListener("change", handlePreferenceChange);
    mobileMotionQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      mediaQuery.removeEventListener("change", handlePreferenceChange);
      mobileMotionQuery.removeEventListener("change", handlePreferenceChange);
      disableMotion();
    };
  }, []);

  return null;
}
