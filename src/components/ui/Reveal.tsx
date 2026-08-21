"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: "div" | "section" | "li" | "article" | "header" | "form";
};

/** Мягкое появление блока при попадании во вьюпорт — один раз, без «прыжков» назад. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = reduced ? OFFSET.none : OFFSET[direction];
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.61, 0.24, 1] }}
    >
      {children}
    </Component>
  );
}
