import { faq } from "@/lib/site";
import { Reveal } from "./ui/Reveal";

export function Faq() {
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="shell">
        <Reveal className="sec-head">
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2>{faq.title}</h2>
        </Reveal>

        <div className="faq">
          {faq.items.map((item, index) => (
            <Reveal key={item.q} delay={index * 0.05}>
              <details name="faq">
                <summary>
                  {item.q}
                  <i aria-hidden />
                </summary>
                <p>{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
