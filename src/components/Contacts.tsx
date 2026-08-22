"use client";

import { useState } from "react";
import { contact, contacts } from "@/lib/site";
import { ArrowIcon, contactIcons } from "./icons";
import { Reveal } from "./ui/Reveal";

/**
 * Сайт статический, бэкенда нет: заявка собирается в текст и открывается
 * в WhatsApp. Ниже — ссылка на почту для тех, у кого WhatsApp не установлен.
 */
export function Contacts() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Neue Anfrage über savoberlin.de",
      "",
      `Name: ${data.get("name")}`,
      `Telefon: ${data.get("phone")}`,
      `Leistung: ${data.get("service")}`,
      `Vorhaben: ${data.get("message") || "—"}`,
    ].join("\n");

    window.open(
      `https://wa.me/${contacts.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  return (
    <section className="section" id="kontakt">
      <div className="shell contact-grid">
        <Reveal>
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2>{contact.title}</h2>
          <p>{contact.lead}</p>

          <div className="cinfo">
            {contact.rows.map((row) => {
              const Icon = contactIcons[row.icon];
              const content = (
                <>
                  <i>
                    <Icon />
                  </i>
                  <div>
                    <b>{row.title}</b>
                    <span>{row.text}</span>
                  </div>
                </>
              );

              return row.href ? (
                <a key={row.title} href={row.href}>
                  {content}
                </a>
              ) : (
                <div className="row" key={row.title}>
                  {content}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="left">
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="f-name">{contact.form.name.label}</label>
              <input
                id="f-name"
                name="name"
                placeholder={contact.form.name.placeholder}
                autoComplete="name"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="f-phone">{contact.form.phone.label}</label>
              <input
                id="f-phone"
                name="phone"
                type="tel"
                placeholder={contact.form.phone.placeholder}
                autoComplete="tel"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="f-service">{contact.form.service.label}</label>
              <select id="f-service" name="service" defaultValue={contact.form.serviceOptions[0]}>
                {contact.form.serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-message">{contact.form.message.label}</label>
              <textarea
                id="f-message"
                name="message"
                placeholder={contact.form.message.placeholder}
              />
            </div>
            <button className="btn btn-gold" type="submit">
              {sent ? contact.form.submitting : contact.form.submit} <ArrowIcon />
            </button>
            <p className="formnote">{contact.form.note}</p>
            <p className="formnote">
              {contact.form.privacy} {contact.form.fallback}{" "}
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
