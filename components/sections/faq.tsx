import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs, site } from "@/lib/site";
import { MessengerIcon, PlusIcon } from "../icons";
import { Reveal } from "../motion";
import { SectionHeading } from "../section-heading";

export function Faq() {
  return (
    <section id="faq" className="bg-brand-50/50 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title="Questions? We’ve got answers">
            Everything you need to know for a smooth, hassle-free rental.
          </SectionHeading>
          <Button
            asChild
            variant="outline"
            className="mt-8 h-12 rounded-full border-ink/10 bg-white px-6 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-md"
          >
            <a href={site.messenger} target="_blank" rel="noopener noreferrer">
              <MessengerIcon className="size-4 text-brand-600" /> Ask us on Messenger
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="gap-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="rounded-2xl border border-ink/5 bg-white px-5 transition-shadow duration-300 not-last:border-b data-open:shadow-[0_12px_40px_-16px_rgb(11_31_77/0.18)] sm:px-6"
              >
                <AccordionTrigger className="items-center gap-6 py-5 text-[16px] font-bold hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-[transform,background-color,color] duration-300 group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:bg-brand-950 group-aria-expanded/accordion-trigger:text-white">
                    <PlusIcon className="size-4" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-12 pb-5 text-[15px] leading-relaxed text-ink/60">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
