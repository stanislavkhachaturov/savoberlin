"use client";

import { useEffect, useState } from "react";
import { contacts, nav } from "@/lib/site";
import { PhoneIcon } from "./icons";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <a href="#inhalt" className="skip">
        Zum Inhalt springen
      </a>
      <header className="header" data-scrolled={scrolled}>
        <div className="shell hbar">
          <Logo />
          <nav className="hnav" aria-label="Hauptnavigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href={`tel:${contacts.phoneHref}`} className="hcall">
            <b>{contacts.phoneLabel}</b>
            <span>Mo–Sa 7–20 Uhr</span>
          </a>
          <a href="#kontakt" className="btn btn-gold">
            Kostenloses Angebot
          </a>
          <button
            type="button"
            className="burger"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobmenu"
            onClick={() => setOpen((value) => !value)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className="mobmenu" id="mobmenu" data-open={open}>
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="#kontakt" className="btn btn-gold" onClick={() => setOpen(false)}>
          Kostenloses Angebot
        </a>
        <a href={`tel:${contacts.phoneHref}`} className="mobcall" onClick={() => setOpen(false)}>
          <PhoneIcon />
          <span>
            <b>{contacts.phoneLabel}</b>
            <em>Mo–Sa 7–20 Uhr</em>
          </span>
        </a>
      </div>
    </>
  );
}
