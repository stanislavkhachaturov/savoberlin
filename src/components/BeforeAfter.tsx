"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { beforeAfter } from "@/lib/site";
import { images } from "@/lib/images.generated";
import { Reveal } from "./ui/Reveal";

export function BeforeAfter() {
  const box = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(2, Math.min(98, next)));
  }, []);

  return (
    <section className="section">
      <div className="shell">
        <Reveal className="sec-head">
          <span className="eyebrow">{beforeAfter.eyebrow}</span>
          <h2>{beforeAfter.title}</h2>
          <p>{beforeAfter.lead}</p>
        </Reveal>

        <Reveal className="ba">
          <div
            ref={box}
            style={{ position: "absolute", inset: 0, "--pos": `${position}%` } as React.CSSProperties}
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
              src={images.vorher.src}
              alt={`${beforeAfter.labelBefore}: vollgestellte Altbauwohnung vor der Räumung`}
              width={images.vorher.width}
              height={images.vorher.height}
              placeholder="blur"
              blurDataURL={images.vorher.blurDataURL}
              sizes="(max-width: 1240px) 100vw, 1240px"
            />
            <Image
              className="after"
              src={images.nachher.src}
              alt={`${beforeAfter.labelAfter}: dieselbe Wohnung geräumt und besenrein übergeben`}
              width={images.nachher.width}
              height={images.nachher.height}
              placeholder="blur"
              blurDataURL={images.nachher.blurDataURL}
              sizes="(max-width: 1240px) 100vw, 1240px"
            />
            <span className="ba-label l">{beforeAfter.labelBefore}</span>
            <span className="ba-label r">{beforeAfter.labelAfter}</span>
            <div
              className="ba-handle"
              role="slider"
              tabIndex={0}
              aria-label="Vergleich zwischen Vorher und Nachher"
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
        </Reveal>
      </div>
    </section>
  );
}
