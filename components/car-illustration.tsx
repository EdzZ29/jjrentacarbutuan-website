import type { BodyType } from "@/lib/site";

// Minimal side-profile silhouettes, used until real vehicle photos are added.
const bodies: Record<BodyType, { body: string; glass: string; wheels: [number, number] }> = {
  hatchback: {
    body: "M22 64 V52 Q24 45 36 43 L64 39 L84 24 Q90 20 100 20 H156 Q166 20 172 30 L182 46 Q186 50 186 56 V64 Z",
    glass: "M72 40 L88 27 Q92 24 98 24 H124 V40 Z M128 24 H154 Q160 24 164 30 L170 40 H128 Z",
    wheels: [58, 154],
  },
  sedan: {
    body: "M10 64 V52 Q12 46 24 44 L62 40 L82 25 Q88 21 98 21 H132 Q142 21 150 29 L162 40 L186 44 Q194 46 194 54 V64 Z",
    glass: "M70 40 L86 28 Q90 25 96 25 H116 V40 Z M120 25 H132 Q140 25 146 31 L154 40 H120 Z",
    wheels: [50, 158],
  },
  mpv: {
    body: "M10 64 V50 Q12 43 24 41 L52 37 L72 18 Q76 14 86 14 H170 Q180 14 184 24 L190 44 Q192 50 192 64 Z",
    glass: "M60 37 L76 21 Q79 18 86 18 H112 V37 Z M116 18 H146 V37 H116 Z M150 18 H170 Q176 18 179 24 L183 37 H150 Z",
    wheels: [50, 160],
  },
  suv: {
    body: "M10 64 V48 Q12 41 22 39 L50 37 L66 16 Q69 12 78 12 H168 Q178 12 182 20 L190 38 Q194 42 194 50 V64 Z",
    glass: "M58 37 L70 20 Q73 16 80 16 H110 V37 Z M114 16 H146 V37 H114 Z M150 16 H168 Q174 16 177 22 L183 37 H150 Z",
    wheels: [50, 160],
  },
  pickup: {
    body: "M8 64 V48 Q10 41 20 39 L48 37 L64 16 Q67 12 76 12 H122 Q128 12 130 18 L134 38 H194 V64 Z",
    glass: "M56 37 L68 20 Q71 16 78 16 H98 V37 Z M102 16 H122 Q126 16 127 20 L130 37 H102 Z",
    wheels: [48, 164],
  },
};

export function CarIllustration({ body, className }: { body: BodyType; className?: string }) {
  const b = bodies[body];
  return (
    <svg viewBox="0 0 204 84" className={className} aria-hidden="true">
      <ellipse cx="102" cy="76" rx="92" ry="4" className="fill-ink/10" />
      <path d={b.body} className="fill-brand-950" />
      <path d={b.glass} className="fill-brand-300/70" />
      {b.wheels.map((x) => (
        <g key={x}>
          <circle cx={x} cy={64} r={13} className="fill-brand-950 stroke-brand-50" strokeWidth={3} />
          <circle cx={x} cy={64} r={5} className="fill-brand-200" />
        </g>
      ))}
    </svg>
  );
}
