"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, type ComponentType, type SVGProps } from "react";
import { AnimatedTabs } from "@/components/rareui/AnimatedTab";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { areas, deliveryFees, fleet, peso, requirements, site, type Area, type Vehicle } from "@/lib/site";
import { SELECT_VEHICLE_EVENT, type SelectVehicleDetail } from "../booking-form";
import { CarIllustration } from "../car-illustration";
import {
  ArrowRightIcon,
  BagIcon,
  CheckIcon,
  ClockIcon,
  FuelIcon,
  GearIcon,
  MessengerIcon,
  ShieldIcon,
  UsersIcon,
} from "../icons";
import { ease, Reveal } from "../motion";
import { SectionHeading } from "../section-heading";
import { scrollToHash } from "../smooth-scroll";

type Spec = { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string; value: string };

// Optional specs only appear once they're filled in for the vehicle in lib/site.ts.
function specsFor(v: Vehicle): Spec[] {
  const specs: Spec[] = [{ icon: UsersIcon, label: "Seats", value: v.seats }];
  if (v.transmission) specs.push({ icon: GearIcon, label: "Transmission", value: v.transmission });
  if (v.fuel) specs.push({ icon: FuelIcon, label: "Fuel", value: v.fuel });
  if (v.bags) specs.push({ icon: BagIcon, label: "Bags", value: String(v.bags) });
  specs.push({ icon: ClockIcon, label: "Extension", value: `${peso(v.extensionPerHour)}/hr` });
  specs.push({ icon: ShieldIcon, label: "Insurance", value: "Comprehensive" });
  return specs;
}

const categoryTabs = [
  { id: "all", label: "All" },
  ...fleet.map((v) => ({ id: v.id, label: v.category })),
];
const areaTabs = areas.map((a) => ({ id: a.id, label: a.id === "mindanao" ? "CDO · Davao · Bukidnon" : a.short }));

function book(v: Vehicle, area: Area, delay = 0) {
  window.dispatchEvent(
    new CustomEvent<SelectVehicleDetail>(SELECT_VEHICLE_EVENT, { detail: { vehicleId: v.id, area } }),
  );
  setTimeout(() => scrollToHash("#book"), delay);
}

function VehiclePhoto({ v, sizes, className = "" }: { v: Vehicle; sizes: string; className?: string }) {
  return v.image ? (
    <Image src={v.image} alt={v.models} fill sizes={sizes} className={`object-contain ${className}`} />
  ) : (
    <div className={`absolute inset-0 grid place-items-center ${className}`}>
      <CarIllustration body={v.body} className="w-4/5" />
    </div>
  );
}

/** Price that rolls vertically whenever it changes. */
function RollingPrice({ value, className }: { value: number; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="tabular-nums"
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {peso(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Availability({ available }: { available: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-bold shadow-sm ${
        available ? "text-emerald-700" : "text-ink/50"
      }`}
    >
      <span className="relative flex size-2">
        {available && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span className={`relative size-2 rounded-full ${available ? "bg-emerald-500" : "bg-ink/30"}`} />
      </span>
      {available ? "Available" : "Fully booked"}
    </span>
  );
}

function VehicleDialog({
  v,
  area,
  open,
  onOpenChange,
}: {
  v: Vehicle;
  area: Area;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] max-w-[calc(100%-1.5rem)] gap-0 overflow-y-auto rounded-3xl p-0 duration-300 sm:max-w-2xl">
        <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-72">
          <span
            aria-hidden="true"
            className="absolute top-3 left-5 text-[5rem] leading-none font-black tracking-tighter text-white uppercase select-none sm:text-[7rem]"
          >
            {v.category}
          </span>
          <motion.div
            className="absolute inset-x-6 top-12 bottom-4"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <VehiclePhoto v={v} sizes="(min-width: 640px) 640px, 100vw" />
          </motion.div>
          <div className="absolute top-4 right-14">
            <Availability available={v.available} />
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:p-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand-700 uppercase">
              {v.category} · Self-drive
            </p>
            <DialogTitle className="mt-2 text-2xl font-extrabold tracking-tight">{v.models}</DialogTitle>
            <DialogDescription className="mt-3 text-[15px] leading-relaxed text-ink/65">
              {v.description}
            </DialogDescription>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {specsFor(v).map(({ icon: Icon, label, value }) => (
              <li key={label} className="rounded-2xl border border-ink/10 p-4">
                <Icon className="size-5 text-brand-600" />
                <p className="mt-3 text-xs font-semibold text-ink/45">{label}</p>
                <p className="text-sm font-bold">{value}</p>
              </li>
            ))}
          </ul>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold">Daily rates</p>
              <dl className="mt-3 space-y-1">
                {areas.map((a) => (
                  <div
                    key={a.id}
                    className={`flex items-baseline justify-between gap-3 rounded-lg px-2.5 py-1.5 text-sm ${
                      a.id === area ? "bg-white font-bold shadow-sm" : "text-ink/60"
                    }`}
                  >
                    <dt>{a.label}</dt>
                    <dd className="font-bold text-ink tabular-nums">{peso(v.rates[a.id])}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 px-2.5 text-xs font-semibold text-brand-700">Discounted for 2+ day rentals</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold">Add-ons &amp; fees</p>
              <dl className="mt-3 space-y-1 text-sm">
                {deliveryFees.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-3 px-2.5 py-1.5">
                    <dt className="text-ink/60">{f.label}</dt>
                    <dd className="font-bold tabular-nums">{peso(f.amount)}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-3 px-2.5 py-1.5">
                  <dt className="text-ink/60">Extension</dt>
                  <dd className="font-bold tabular-nums">{peso(v.extensionPerHour)}/hr</dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold">What to bring</p>
            <ul className="mt-3 grid gap-2 text-sm text-ink/70 sm:grid-cols-2">
              {requirements.map((r) => (
                <li key={r} className="flex gap-2">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={2.5} /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="text-3xl font-extrabold tracking-tight text-brand-950">{peso(v.rates[area])}</span>
              <span className="text-sm text-ink/45"> /day · {areas.find((a) => a.id === area)?.short}</span>
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="icon-lg" className="size-12 rounded-full">
                <a href={site.messenger} target="_blank" rel="noopener noreferrer" aria-label="Ask about this car on Messenger">
                  <MessengerIcon className="size-5 text-brand-600" />
                </a>
              </Button>
              <Button
                className="group h-12 flex-1 rounded-full px-7 text-sm font-bold transition-all duration-300 hover:bg-brand-700"
                onClick={() => {
                  onOpenChange(false);
                  book(v, area, 320);
                }}
              >
                Book this car
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FleetCard({ v, area }: { v: Vehicle; area: Area }) {
  const [open, setOpen] = useState(false);
  const specs = specsFor(v).filter((s) => ["Seats", "Fuel", "Extension"].includes(s.label));

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.5, ease }}
      whileHover={{ y: -8 }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgb(11_31_77/0.25)]"
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View details for ${v.models}`}
        className="relative h-52 overflow-hidden bg-slate-100 text-left outline-none"
      >
        <span
          aria-hidden="true"
          className="absolute top-3 left-5 text-[4.5rem] leading-none font-black tracking-tighter text-white uppercase transition-transform duration-700 select-none group-hover:-translate-x-2"
        >
          {v.category}
        </span>
        <span className="absolute top-4 right-4 z-10">
          <Availability available={v.available} />
        </span>
        <span className="absolute inset-x-5 top-12 bottom-3 transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:scale-[1.06]">
          <VehiclePhoto v={v} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold tracking-widest text-brand-700 uppercase">{v.category}</p>
        <h3 className="mt-1.5 text-xl font-extrabold tracking-tight">{v.models}</h3>

        <dl className="mt-5 grid grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/10 py-3">
          {specs.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-2 text-center">
              <Icon className="size-4 text-ink/40" />
              <dt className="sr-only">{label}</dt>
              <dd className="text-[13px] font-bold whitespace-nowrap">{label === "Seats" ? `${value} seats` : value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div>
            <p className="text-xs font-semibold text-ink/45">Per day</p>
            <p className="text-2xl font-extrabold tracking-tight text-brand-950">
              <RollingPrice value={v.rates[area]} />
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-11 rounded-full border-ink/10 px-5 text-sm font-bold transition-colors duration-300 hover:border-ink/25"
              onClick={() => setOpen(true)}
            >
              Details
            </Button>
            <Button
              size="icon-lg"
              aria-label={`Book the ${v.models}`}
              className="group/book size-11 rounded-full transition-colors duration-300 hover:bg-brand-700"
              onClick={() => book(v, area)}
            >
              <ArrowRightIcon className="size-4 -rotate-45 transition-transform duration-300 group-hover/book:rotate-0" />
            </Button>
          </div>
        </div>
      </div>

      <VehicleDialog v={v} area={area} open={open} onOpenChange={setOpen} />
    </motion.article>
  );
}

export function Fleet() {
  const [category, setCategory] = useState("all");
  const [area, setArea] = useState<Area>("butuan");
  const shown = category === "all" ? fleet : fleet.filter((v) => v.id === category);

  return (
    <section id="fleet" className="bg-brand-50/50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our fleet" title="Find the perfect vehicle">
            Simple daily rates, well-kept cars and no hidden charges. Rentals of 2+ days get a discount.
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
            <AnimatedTabs tabs={categoryTabs} activeTab={category} onChange={setCategory} className="w-max justify-start" />
          </div>
          <div className="-mx-5 flex items-center gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
            <span className="shrink-0 text-sm font-semibold text-ink/50">Rates for</span>
            <AnimatedTabs
              tabs={areaTabs}
              activeTab={area}
              onChange={(id) => setArea(id as Area)}
              className="w-max justify-start"
            />
          </div>
        </Reveal>

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((v) => (
              <FleetCard key={v.id} v={v} area={area} />
            ))}

            {category === "all" && (
              <motion.article
                key="promo"
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col justify-between rounded-[1.75rem] bg-brand-950 p-8 text-white"
              >
                <div>
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
                    <MessengerIcon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-balance">
                    Long trip or group booking?
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    Rentals of 2 days or more get discounted rates. Message us your dates and we&apos;ll send the
                    best price for your trip.
                  </p>
                </div>
                <Button
                  asChild
                  className="group mt-8 h-12 rounded-full bg-white text-sm font-bold text-brand-950 transition-colors duration-300 hover:bg-brand-100"
                >
                  <a href={site.messenger} target="_blank" rel="noopener noreferrer">
                    Get a custom quote
                    <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.article>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
