import { reviews, site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, StarIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading } from "../section-heading";

function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  );
}

function ReviewCard({ r, hidden = false }: { r: (typeof reviews)[number]; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[300px] shrink-0 flex-col rounded-3xl bg-white p-7 ring-1 ring-ink/5 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgb(11_31_77/0.2)] sm:w-[380px]"
    >
      <Stars />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/75">“{r.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-brand-950 text-sm font-bold text-white">
          {r.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <span className="text-sm leading-tight">
          <span className="block font-bold">{r.name}</span>
          <span className="text-ink/45">
            {r.meta} · {r.when}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="overflow-hidden bg-brand-50/50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Reviews" title="Trusted by locals and travelers alike">
            From balikbayans to first-time visitors, here’s what our clients say.
          </SectionHeading>
          <div className="flex shrink-0 items-center gap-4 rounded-2xl bg-white p-4 pr-6 ring-1 ring-ink/5">
            <span className="text-4xl font-extrabold tracking-tight">{site.rating.value}</span>
            <span>
              <Stars />
              <span className="mt-1 block text-sm font-medium text-ink/50">{site.rating.count} Google reviews</span>
            </span>
          </div>
        </Reveal>
      </div>

      {/* Two identical tracks loop seamlessly; hovering pauses the motion. */}
      <Reveal delay={0.1} className="group mt-14 flex overflow-hidden">
        {[false, true].map((copy) => (
          <div
            key={String(copy)}
            className="flex shrink-0 animate-[marquee_45s_linear_infinite] gap-5 pr-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          >
            {reviews.map((r) => (
              <ReviewCard key={r.name} r={r} hidden={copy} />
            ))}
          </div>
        ))}
      </Reveal>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
          <StaggerItem>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-3xl bg-[#1877F2] p-6 text-white transition-transform duration-300 hover:-translate-y-1"
            >
              <FacebookIcon className="size-10 shrink-0 transition-transform duration-500 group-hover:rotate-[-8deg]" />
              <span className="flex-1">
                <span className="block font-bold">{site.name}</span>
                <span className="text-sm text-white/75">{site.facebookFollowers} followers · Verified page</span>
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold transition-colors group-hover:bg-white group-hover:text-[#1877F2]">
                Follow
              </span>
            </a>
          </StaggerItem>
          <StaggerItem>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-3xl bg-[#E1306C] p-6 text-white transition-transform duration-300 hover:-translate-y-1"
            >
              <InstagramIcon className="size-10 shrink-0 transition-transform duration-500 group-hover:rotate-[-8deg]" />
              <span className="flex-1">
                <span className="block font-bold">@jjrentacarbutuan</span>
                <span className="text-sm text-white/80">Latest updates, promos &amp; trips</span>
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold transition-colors group-hover:bg-white group-hover:text-[#E1306C]">
                Follow
              </span>
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
