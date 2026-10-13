import { paymentMethods } from "@/lib/site";
import { BookingForm } from "../booking-form";
import { Reveal } from "../motion";
import { SectionHeading } from "../section-heading";

export function Book() {
  return (
    <section id="book" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
        <SectionHeading eyebrow="Book now" title="Get your quote in under a minute">
          Fill in your trip details, see your estimated total instantly, and send it straight to us.
        </SectionHeading>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-[2rem] border border-ink/5 bg-white p-5 shadow-2xl shadow-brand-900/5 sm:p-8">
          <BookingForm />
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-ink/50">We accept</span>
          {paymentMethods.map((m) => (
            <span key={m} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800">
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
