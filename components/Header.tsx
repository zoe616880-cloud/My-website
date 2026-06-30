"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  X,
} from "./icons";
import { megaMenus } from "@/data/site-data";

type MegaMenuKey = keyof typeof megaMenus;

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey | null>(null);
  const menu = activeMenu ? megaMenus[activeMenu] : null;

  return (
    <header className="site-header" onMouseLeave={() => setActiveMenu(null)}>
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="utility-facts">
            <span>Industrial weighing manufacturer since 2006</span>
            <span><MapPin size={13} /> Changzhou, Jiangsu, China</span>
          </div>
          <a href="https://wa.me/8613775237471">
            <MessageCircle size={14} /> WhatsApp: +86 137 7523 7471
          </a>
        </div>
      </div>
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Asia Weighing home" style={{ display: 'block', width: '176px', height: '48px' }}>
          <Image 
            src="/logo.png" 
            alt="Asia Weighing" 
            width={176} 
            height={48} 
            priority 
            style={{ width: '176px', height: '48px', objectFit: 'contain' }}
          />
        </Link>
        <div className="nav-stage">
          <nav className="desktop-nav" aria-label="Main navigation" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {(["products", "solutions"] as const).map((key) => (
              <button
                className={activeMenu === key ? "active" : ""}
                key={key}
                type="button"
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                aria-expanded={activeMenu === key}
                aria-controls="desktop-mega-menu"
                onFocus={() => setActiveMenu(key)}
                onMouseEnter={() => setActiveMenu(key)}
              >
                {megaMenus[key].label}
                <span className="nav-caret" aria-hidden="true" />
              </button>
            ))}
            <Link href="/oem-odm" onClick={() => setActiveMenu(null)} style={{ fontWeight: 'bold' }}>OEM/ODM</Link>
            <Link href="/about" onClick={() => setActiveMenu(null)} style={{ fontWeight: 'bold' }}>About</Link>
            <Link href="/resources" onClick={() => setActiveMenu(null)} style={{ fontWeight: 'bold' }}>Resources</Link>
          </nav>

          {menu ? (
            <div
              className="mega-menu"
              id="desktop-mega-menu"
              onMouseEnter={() => setActiveMenu(activeMenu)}
            >
              <div className="mega-intro">
                <span>{menu.eyebrow}</span>
                <h2>{menu.title}</h2>
                <Link href={activeMenu === "products" ? "/products" : "/solutions"}>
                  Explore all {menu.label.toLowerCase()} <ArrowRight size={17} />
                </Link>
              </div>
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
          <Link className="button button-small" href="/request-a-quote">
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
        <nav className="mobile-nav" aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '15px', background: 'white', borderTop: '1px solid #eee' }}>
          <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/solutions" onClick={() => setOpen(false)}>Solutions</Link>
          <Link href="/oem-odm" onClick={() => setOpen(false)}>OEM/ODM</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
          <Link href="/resources" onClick={() => setOpen(false)}>Resources</Link>
          <a href="mailto:ida@asiaweigh.com">ida@asiaweigh.com</a>
        </nav>
      ) : null}
    </header>
  );
}
