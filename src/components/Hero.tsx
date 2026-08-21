"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { contacts, hero } from "@/lib/site";
import { images } from "@/lib/images.generated";
import { ArrowIcon, PhoneIcon } from "./icons";

export function Hero() {
  const bg = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const node = bg.current;
    if (!node) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = Math.min(window.scrollY, 900);
        node.style.transform = `translate3d(0,${y * 0.28}px,0) scale(${1 + y * 0.00012})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section className="hero grain" id="top">
      <div className="hero-bg" ref={bg}>
        <Image
          src={images.hero.src}
          alt="Berlin im Morgenlicht"
          width={images.hero.width}
          height={images.hero.height}
          placeholder="blur"
          blurDataURL={images.hero.blurDataURL}
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-veil" />
      <div className="hero-grid" />
      <div
        className="glow"
        style={{ width: 520, height: 520, background: "rgba(221,200,42,.13)", top: "14%", left: "-12%" }}
      />

      <div className="shell">
        <span className="pill">
          <span className="dot" />
          {hero.badge}
        </span>

        <h1>
          {hero.headline.map((line, index) => (
            <span className="hero-line" key={line}>
              <span style={{ animationDelay: `${0.12 + index * 0.1}s` }}>{line}</span>
            </span>
          ))}
          <span className="hero-line">
            <span className="goldtext" style={{ animationDelay: "0.34s" }}>
              {hero.headlineAccent}
            </span>
          </span>
        </h1>

        <p className="hero-lead">
          {hero.lead.before}
          <strong>{hero.lead.highlight}</strong>
          {hero.lead.after}
        </p>

        <div className="hero-cta">
          <a href="#rechner" className="btn btn-gold">
            Preis berechnen <ArrowIcon />
          </a>
          <a href={`tel:${contacts.phoneHref}`} className="btn btn-ghost">
            <PhoneIcon /> {contacts.phoneLabel}
          </a>
        </div>

        <div className="hero-stats">
          <ul>
            {hero.stats.map((stat) => (
              <li key={stat.label}>
                <b>
                  {stat.value}
                  <em>{stat.suffix}</em>
                </b>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
