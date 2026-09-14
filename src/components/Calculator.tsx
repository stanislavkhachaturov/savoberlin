"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { calculator } from "@/lib/site";
import { ArrowIcon } from "./icons";
import { Reveal } from "./ui/Reveal";

const AREA_MIN = 10;
const AREA_MAX = 300;

/** Ориентировочная сумма всегда кратна 10 € (…0). */
const roundPrice = (value: number) => Math.max(0, Math.round(value / 10) * 10);

const de = (value: number) => roundPrice(value).toLocaleString("de-DE");

/** Плавный переход отображаемой суммы к новому значению. */
function useAnimatedRange(min: number, max: number) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState({ min, max });
  const from = useRef({ min, max });
  const frame = useRef(0);

  useEffect(() => {
    if (reduced) return;

    const start = performance.now();
    const origin = from.current;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / 450, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = {
        min: origin.min + (min - origin.min) * eased,
        max: origin.max + (max - origin.max) * eased,
      };
      setShown(next);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
      else from.current = { min, max };
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [min, max, reduced]);

  return reduced ? { min, max } : shown;
}

export function Calculator() {
  const [service, setService] = useState<string>(calculator.services[0].value);
  const [object, setObject] = useState<string>(calculator.objects[0].value);
  const [load, setLoad] = useState<string>(calculator.loads[1].value);
  const [area, setArea] = useState(60);

  const result = useMemo(() => {
    const rate = calculator.services.find((item) => item.value === service)?.rate ?? 26;
    const objectMult = calculator.objects.find((item) => item.value === object)?.mult ?? 1;
    const loadMult = calculator.loads.find((item) => item.value === load)?.mult ?? 1;

    const base = Math.max(290, area * rate * objectMult * loadMult);
    const days = Math.max(1, Math.round((area * loadMult) / 95));
    const team = Math.min(6, Math.max(2, Math.round((area * loadMult) / 55)));
    const volume = Math.max(2, Math.round(area * loadMult * 0.3));

    return { min: roundPrice(base * 0.9), max: roundPrice(base * 1.15), days, team, volume };
  }, [service, object, load, area]);

  const price = useAnimatedRange(result.min, result.max);
  const fill = ((area - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100;

  return (
    <section className="section" id="rechner">
      <div className="shell">
        <Reveal className="sec-head">
          <span className="eyebrow">{calculator.eyebrow}</span>
          <h2>{calculator.title}</h2>
          <p>{calculator.lead}</p>
        </Reveal>

        <div className="calc">
          <Reveal className="calc-panel" direction="right">
            <div className="cgroup">
              <label id="calc-service">{calculator.serviceLabel}</label>
              <div className="opts" role="group" aria-labelledby="calc-service">
                {calculator.services.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    aria-pressed={service === item.value}
                    onClick={() => setService(item.value)}
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>

            <div className="cgroup">
              <label id="calc-object">{calculator.objectLabel}</label>
              <div className="opts" role="group" aria-labelledby="calc-object">
                {calculator.objects.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    aria-pressed={object === item.value}
                    onClick={() => setObject(item.value)}
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>

            <div className="cgroup">
              <label htmlFor="calc-area">
                {calculator.areaLabel}
                <b>{area} m²</b>
              </label>
              <input
                className="range"
                id="calc-area"
                type="range"
                min={AREA_MIN}
                max={AREA_MAX}
                step={5}
                value={area}
                onChange={(event) => setArea(Number(event.target.value))}
                style={{ "--fill": `${fill}%` } as React.CSSProperties}
              />
              <div className="scale">
                <span>{AREA_MIN} m²</span>
                <span>{AREA_MAX} m²</span>
              </div>
            </div>

            <div className="cgroup">
              <label id="calc-load">{calculator.loadLabel}</label>
              <div className="opts" role="group" aria-labelledby="calc-load">
                {calculator.loads.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    aria-pressed={load === item.value}
                    onClick={() => setLoad(item.value)}
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="calc-out grain" direction="left" delay={0.08}>
            <div className="glow" />
            <span className="eyebrow" style={{ position: "relative" }}>
              {calculator.resultLabel}
            </span>
            <p className="calc-price" aria-live="polite">
              {de(price.min)} – {de(price.max)} <em>€</em>
              <small>{calculator.priceHint}</small>
            </p>
            <div className="calc-rows">
              <div>
                <span>{calculator.rows.duration}</span>
                <b>{result.days === 1 ? "1 Tag" : `${result.days} Tage`}</b>
              </div>
              <div>
                <span>{calculator.rows.team}</span>
                <b>{result.team} Fachkräfte</b>
              </div>
              <div>
                <span>{calculator.rows.volume}</span>
                <b>{result.volume} m³</b>
              </div>
              <div>
                <span>{calculator.rows.handover}</span>
                <b>{calculator.rows.handoverValue}</b>
              </div>
            </div>
            <a href="#kontakt" className="btn btn-gold">
              {calculator.cta} <ArrowIcon />
            </a>
            <p className="calc-note">{calculator.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
