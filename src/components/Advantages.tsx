import { advantages, priceCard } from "@/lib/site";
import { advantageIcons, ArrowIcon } from "./icons";
import { Reveal } from "./ui/Reveal";

export function Advantages() {
  return (
    <section className="section why" id="warum">
      <div className="shell why-grid">
        <Reveal>
          <span className="eyebrow">Warum SAVO</span>
          <h2>Das macht uns unschlagbar</h2>
          <p>
            Während andere noch reden, packen wir an — zu Konditionen, bei denen die Konkurrenz
            einpacken kann.
          </p>
          <ul className="adv">
            {advantages.map((item) => {
              const Icon = advantageIcons[item.icon];
              return (
                <li key={item.title}>
                  <i>
                    <Icon />
                  </i>
                  <div>
                    <b>{item.title}</b>
                    <p>{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal className="pricecard grain" direction="left" delay={0.1}>
          <div className="glow" />
          <span className="eyebrow">{priceCard.eyebrow}</span>
          <b>
            {priceCard.title[0]}
            <br />
            <em>{priceCard.title[1]}</em>
          </b>
          <p>{priceCard.text}</p>
          <a href="#kontakt" className="btn btn-gold">
            {priceCard.cta} <ArrowIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
