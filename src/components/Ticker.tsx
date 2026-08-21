import { ticker } from "@/lib/site";

export function Ticker() {
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        {[...ticker, ...ticker].map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </div>
    </div>
  );
}
