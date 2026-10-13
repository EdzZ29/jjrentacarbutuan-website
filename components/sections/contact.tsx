import type { ComponentType, ReactNode, SVGProps } from "react";
import { mapsDirectionsUrl, mapsEmbedUrl, site } from "@/lib/site";
import { MailIcon, MapPinIcon, MessengerIcon, PhoneIcon } from "../icons";
import { Reveal } from "../motion";
import { SectionHeading } from "../section-heading";

type Action = { label: string; href: string; external?: boolean; primary?: boolean };

const actionBase = "inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-[13px] font-bold transition-colors";

function ContactRow({
  icon: Icon,
  label,
  children,
  actions,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  children: ReactNode;
  actions: Action[];
}) {
  return (
    <li className="group flex flex-wrap items-center gap-x-4 gap-y-3 p-5 transition-colors duration-300 hover:bg-slate-50/70 sm:p-6">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-[background-color,color] duration-300 group-hover:bg-brand-950 group-hover:text-white">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold tracking-wider text-ink/45 uppercase">{label}</p>
        <div className="mt-0.5 font-bold text-ink">{children}</div>
      </div>
      <div className="flex w-full gap-2 pl-15 sm:w-auto sm:pl-0">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`${actionBase} ${
              a.primary
                ? "bg-brand-950 text-white hover:bg-brand-700"
                : "border border-ink/10 text-ink/75 hover:border-ink/25 hover:text-ink"
            }`}
          >
            {a.label}
          </a>
        ))}
      </div>
    </li>
  );
}

export function Contact() {
  const [smart, globe] = site.phones;

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Contact & location" title="Visit us or reach out anytime">
          Call, text or message us. We usually reply within minutes.
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
          <ul className="divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-white">
            <ContactRow
              icon={PhoneIcon}
              label={smart.label}
              actions={[
                { label: "Call", href: `tel:${smart.e164}`, primary: true },
                { label: "Viber", href: `viber://chat?number=${encodeURIComponent(smart.e164)}` },
                { label: "WhatsApp", href: `https://wa.me/${smart.e164.replace("+", "")}`, external: true },
              ]}
            >
              <span className="text-lg tracking-tight">{smart.display}</span>
            </ContactRow>
            <ContactRow
              icon={PhoneIcon}
              label={globe.label}
              actions={[
                { label: "Call", href: `tel:${globe.e164}`, primary: true },
                { label: "Text", href: `sms:${globe.e164}` },
              ]}
            >
              <span className="text-lg tracking-tight">{globe.display}</span>
            </ContactRow>
            <ContactRow
              icon={MessengerIcon}
              label="Messenger"
              actions={[{ label: "Message", href: site.messenger, external: true, primary: true }]}
            >
              {site.name}
            </ContactRow>
            <ContactRow
              icon={MailIcon}
              label="Email"
              actions={[{ label: "Send email", href: `mailto:${site.email}` }]}
            >
              <span className="block truncate">{site.email}</span>
            </ContactRow>
            <ContactRow
              icon={MapPinIcon}
              label="Office"
              actions={[{ label: "Directions", href: mapsDirectionsUrl(), external: true }]}
            >
              <address className="text-sm leading-relaxed font-medium text-ink/70 not-italic">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </ContactRow>
          </ul>
          </Reveal>

          <Reveal delay={0.1} className="relative h-80 overflow-hidden rounded-3xl border border-ink/10 bg-slate-100 sm:h-96 lg:h-auto">
            <iframe
              title={`Map showing ${site.name}`}
              src={mapsEmbedUrl()}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
