import Image from "next/image";
import { stats } from "@/lib/site";
import { images } from "@/lib/images.generated";
import { Counter } from "./ui/Counter";
import { Reveal } from "./ui/Reveal";

export function Stats() {
  return (
    <section className="numbers">
      <Image
        src={images.roofs.src}
        alt=""
        width={images.roofs.width}
        height={images.roofs.height}
        placeholder="blur"
        blurDataURL={images.roofs.blurDataURL}
        sizes="100vw"
      />
      <div className="shell nums">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.08}>
            <b>
              <Counter value={stat.value} />
              <em>{stat.suffix}</em>
            </b>
            <span>{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
