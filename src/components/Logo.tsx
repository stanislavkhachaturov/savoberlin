import { site } from "@/lib/site";
import { LogoMark } from "./icons";

export function Logo({ href = "/#top" }: { href?: string }) {
  return (
    <a href={href} className="logo" aria-label={`${site.name} — Startseite`}>
      <LogoMark />
      <span>
        <b>{site.name}</b>
        <span>Berlin &amp; Brandenburg</span>
      </span>
    </a>
  );
}
