"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Mail,
  Menu,
  X,
} from "./icons";
import { megaMenus } from "@/data/site-data";

type MegaMenuKey = keyof typeof megaMenus;

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [routeSettled, setRouteSettled] = useState(false);
  const closeMenuTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const menu = activeMenu ? megaMenus[activeMenu] : null;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const scrolled = scrollProgress > 0.98;
  const headerStyle = isHome
    ? ({ "--header-progress": scrollProgress } as CSSProperties)
    : undefined;

  function cancelMenuClose() {
    if (closeMenuTimer.current) {
      window.clearTimeout(closeMenuTimer.current);
      closeMenuTimer.current = null;
    }
  }

  function openMegaMenu(key: MegaMenuKey) {
    cancelMenuClose();
    setActiveMenu(key);
  }

  function scheduleMenuClose() {
    cancelMenuClose();
    closeMenuTimer.current = window.setTimeout(() => {
      setActiveMenu(null);
      closeMenuTimer.current = null;
    }, 180);
  }

  useEffect(() => {
    setRouteSettled(false);
    let nextFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      nextFrame = window.requestAnimationFrame(() => setRouteSettled(true));
    });
    return () => {
      window.cancelAnimationFrame(frame);
      if (nextFrame) window.cancelAnimationFrame(nextFrame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrollProgress(0);
      return;
    }

    const updateProgress = () => {
      const progress = Math.min(Math.max(window.scrollY / 160, 0), 1);
      setScrollProgress(Number(progress.toFixed(3)));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [isHome]);

  useEffect(() => {
    return () => cancelMenuClose();
  }, []);

  if (isAdmin) return null;

  return (
    <header
      className={`site-header${isHome ? " site-header-home" : ""}${scrolled ? " site-header-scrolled" : ""}${routeSettled ? " site-header-route-settled" : " site-header-route-transition"}`}
      style={headerStyle}
      onMouseLeave={scheduleMenuClose}
      onMouseEnter={cancelMenuClose}
    >
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Asia Weighing home" style={{ display: 'block', width: '176px', height: '48px' }}>
          <Image 
            className="brand-logo brand-logo-default"
            src="/logo.png" 
            alt="Asia Weighing" 
            width={176} 
            height={48} 
            priority 
            style={{ width: '176px', height: '48px', objectFit: 'contain' }}
          />
          {isHome ? (
            <Image
              className="brand-logo brand-logo-white"
              src="/logo-white.png"
              alt=""
              width={176}
              height={48}
              priority
              aria-hidden="true"
              style={{ width: '176px', height: '48px', objectFit: 'contain' }}
            />
          ) : null}
        </Link>
        <div className="nav-stage">
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link className={isActive("/") ? "current" : ""} href="/" onClick={() => setActiveMenu(null)}>Home</Link>
            {(["products", "news"] as const).map((key) => (
              <Link
                className={`${activeMenu === key ? "active" : ""} ${isActive(key === "products" ? "/products" : "/news") ? "current" : ""}`.trim()}
                key={key}
                href={key === "products" ? "/products" : "/news"}
                aria-expanded={activeMenu === key}
                aria-controls="desktop-mega-menu"
                onFocus={() => openMegaMenu(key)}
                onMouseEnter={() => openMegaMenu(key)}
                onClick={() => setActiveMenu(null)}
              >
                {megaMenus[key].label}
                <span className="nav-caret" aria-hidden="true" />
              </Link>
            ))}
            <Link className={isActive("/about") ? "current" : ""} href="/about" onClick={() => setActiveMenu(null)}>About</Link>
            <Link className={isActive("/request-a-quote") ? "current" : ""} href="/request-a-quote" onClick={() => setActiveMenu(null)}>Contact</Link>
          </nav>

          {menu ? (
            <div
              className={`mega-menu mega-menu-${activeMenu}`}
              id="desktop-mega-menu"
              onMouseEnter={cancelMenuClose}
              onMouseLeave={scheduleMenuClose}
            >
              <div className="mega-links">
                {menu.items.map(({ icon: Icon, title, copy, href }) => (
                  <Link href={href} key={title} onClick={() => setActiveMenu(null)}>
                    <span className="mega-icon"><Icon size={21} /></span>
                    <span>
                      <strong>{title}</strong>
                      <small>{copy}</small>
                    </span>
                    <ArrowRight className="mega-arrow" size={16} />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="header-actions">
          <a className="header-email" href="mailto:ida@asiaweigh.com">
            <Mail size={16} aria-hidden="true" />
            ida@asiaweigh.com
          </a>
          <Link className="button button-small header-quote" href="/request-a-quote">
            Get a Quote
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/news" onClick={() => setOpen(false)}>News</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
          <Link href="/request-a-quote" onClick={() => setOpen(false)}>Contact</Link>
          <a href="mailto:ida@asiaweigh.com">ida@asiaweigh.com</a>
        </nav>
      ) : null}
    </header>
  );
}
