import { contacts } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/** Быстрые кнопки связи — показываются только на мобильных (см. globals.css). */
export function FloatingActions() {
  return (
    <div className="floating">
      <a
        href={`https://wa.me/${contacts.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Per WhatsApp schreiben"
      >
        <WhatsAppIcon />
      </a>
      <a href={`tel:${contacts.phoneHref}`} aria-label="Jetzt anrufen">
        <PhoneIcon />
      </a>
    </div>
  );
}
