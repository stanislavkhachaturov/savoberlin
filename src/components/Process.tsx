import { process } from "@/lib/site";
import { Reveal } from "./ui/Reveal";

export function Process() {
  return (
    <section className="section" id="ablauf" style={{ paddingTop: 0 }}>
      <div className="shell">
        <Reveal className="sec-head">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2>{process.title}</h2>
        </Reveal>

        <div className="steps">
          {process.steps.map((step, index) => (
            <Reveal className="step" key={step.number} delay={index * 0.1}>
              <em>{step.number}</em>
              <b>{step.title}</b>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
