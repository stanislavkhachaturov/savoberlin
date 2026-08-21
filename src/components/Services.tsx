import Image from "next/image";
import { services } from "@/lib/site";
import { images, type ImageName } from "@/lib/images.generated";
import { CheckIcon } from "./icons";
import { Reveal } from "./ui/Reveal";

export function Services() {
  return (
    <section className="section" id="leistungen">
      <div className="shell">
        <Reveal className="sec-head">
          <span className="eyebrow">Unsere Kernkompetenzen</span>
          <h2>
            Drei Bereiche.
            <br />
            Ein Ansprechpartner.
          </h2>
          <p>
            Sie müssen sich um nichts kümmern: Wir planen, koordinieren und führen aus — vom ersten
            Anruf bis zur besenreinen Übergabe.
          </p>
        </Reveal>

        <div className="services">
          {services.map((service) => {
            const photo = images[service.image as ImageName];
            return (
              <Reveal as="article" className="svc" key={service.id}>
                <div className="svc-body">
                  <span className="svc-num">
                    {service.number} — {service.kicker}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.lead}</p>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item.term}>
                        <CheckIcon />
                        <span>
                          <b>{item.term}</b> — {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="svc-media">
                  <span className="tag">{service.tag}</span>
                  <Image
                    src={photo.src}
                    alt={service.alt}
                    width={photo.width}
                    height={photo.height}
                    placeholder="blur"
                    blurDataURL={photo.blurDataURL}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
