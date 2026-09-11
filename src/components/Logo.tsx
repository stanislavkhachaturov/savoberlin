import { site } from "@/lib/site";

export function Logo({ href = "/#top" }: { href?: string }) {
  return (
    <a href={href} className="logo" aria-label={`${site.name} — Startseite`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.png" alt="" width={88} height={70} aria-hidden />
      <span>
        <b>{site.name}</b>
        <span>Berlin &amp; Brandenburg</span>
      </span>
    </a>
  );
}
