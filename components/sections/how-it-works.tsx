import { deliveryFees, fleet, peso, requirements } from "@/lib/site";
import { CheckIcon } from "../icons";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { SectionHeading } from "../section-heading";

const steps = [
  {
    title: "Send an inquiry",
    text: "Tell us your dates, destination and preferred car via Messenger, call or text.",
  },
  {
    title: "Confirm with 50% down",
    text: "We check availability, then a 50% downpayment secures your reservation.",
  },
  {
    title: "Pick up & drive",
    text: "Show your license and a valid ID, settle the balance, and hit the road.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="How it works" title="On the road in three easy steps">
          Booking takes minutes. Here’s everything you need to know before you go.
        </SectionHeading>

        <Stagger as="ol" gap={0.15} className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <StaggerItem as="li" key={step.title} className="group relative rounded-3xl border border-ink/5 bg-white p-7 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgb(11_31_77/0.2)]">
              <span className="grid size-10 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white transition-transform duration-500 group-hover:scale-110">
                {i + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/55">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-ink p-7 text-white sm:p-9">
            <h3 className="text-lg font-semibold">What to bring</h3>
            <ul className="mt-6 space-y-3.5">
              {requirements.map((r) => (
                <li key={r} className="flex gap-3 text-white/80">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500">
                    <CheckIcon className="size-3 text-white" strokeWidth={3} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-brand-50/70 p-7">
              <h3 className="text-lg font-semibold">Pick-up &amp; drop-off</h3>
              <dl className="mt-6 space-y-4">
                {deliveryFees.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm text-ink/55">{f.label}</dt>
                    <dd className="mt-0.5 text-2xl font-extrabold tracking-tight">{peso(f.amount)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl bg-brand-50/70 p-7">
              <h3 className="text-lg font-semibold">Extension per hour</h3>
              <dl className="mt-6 space-y-2.5 text-sm">
                {[...fleet]
                  .sort((a, b) => a.extensionPerHour - b.extensionPerHour)
                  .map((v) => (
                    <div key={v.id} className="flex justify-between gap-3">
                      <dt className="text-ink/55">{v.category}</dt>
                      <dd className="font-semibold tabular-nums">{peso(v.extensionPerHour)}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
