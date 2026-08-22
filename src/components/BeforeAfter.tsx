"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { beforeAfter } from "@/lib/site";
import { images, type ImageName } from "@/lib/images.generated";
import { Reveal } from "./ui/Reveal";

type Example = (typeof beforeAfter.examples)[number];

function BaSlider({ example }: { example: Example }) {
  const box = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const before = images[example.before as ImageName];
  const after = images[example.after as ImageName];

  const setFromClientX = useCallback((clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(2, Math.min(98, next)));
  }, []);

  return (
    <figure className="ba-card">
      <div
        className="ba"
        ref={box}
        style={{ "--pos": `${position}%` } as React.CSSProperties}
        onPointerDown={(event) => {
          dragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging.current) setFromClientX(event.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <Image
          src={before.src}
          alt={`${beforeAfter.labelBefore}: ${example.altBefore}`}
          width={before.width}
          height={before.height}
          placeholder="blur"
          blurDataURL={before.blurDataURL}
          sizes="(max-width: 900px) 90vw, 480px"
        />
        <Image
          className="after"
          src={after.src}
          alt={`${beforeAfter.labelAfter}: ${example.altAfter}`}
          width={after.width}
          height={after.height}
          placeholder="blur"
          blurDataURL={after.blurDataURL}
          sizes="(max-width: 900px) 90vw, 480px"
        />
        <span className="ba-label l">{beforeAfter.labelBefore}</span>
        <span className="ba-label r">{beforeAfter.labelAfter}</span>
        <div
          className="ba-handle"
          role="slider"
          tabIndex={0}
          aria-label={`${example.caption}: Vergleich zwischen Vorher und Nachher`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)} % Vorher sichtbar`}
          onKeyDown={(event) => {
            const step = event.shiftKey ? 10 : 4;
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setPosition((value) => Math.max(2, value - step));
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              setPosition((value) => Math.min(98, value + step));
            }
          }}
        />
      </div>
      <figcaption className="ba-cap">{example.caption}</figcaption>
    </figure>
  );
}

export function BeforeAfter() {
  return (
    <section className="section">
      <div className="shell">
        <Reveal className="sec-head">
          <span className="eyebrow">{beforeAfter.eyebrow}</span>
          <h2>{beforeAfter.title}</h2>
          <p>{beforeAfter.lead}</p>
        </Reveal>

        <div className="ba-grid">
          {beforeAfter.examples.map((example, index) => (
            <Reveal key={example.before} delay={index * 0.08}>
              <BaSlider example={example} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
