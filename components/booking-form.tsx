"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { areas, deliveryFees, fleet, peso, site, type Area } from "@/lib/site";
import { MailIcon, MessengerIcon, PhoneIcon } from "./icons";
import { ease } from "./motion";

export const SELECT_VEHICLE_EVENT = "jj:select-vehicle";
export type SelectVehicleDetail = { vehicleId: string; area?: Area };

const deliveryOptions = [
  { id: "none", label: "I’ll pick up at the office", amount: 0 },
  ...deliveryFees.map((f, i) => ({ id: i === 0 ? "airport" : "city", label: f.label, amount: f.amount })),
];

const fieldClass =
  "h-12 rounded-xl border-ink/10 bg-white px-4 text-[15px] shadow-none transition-[border-color,box-shadow] duration-300 focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/10";
const labelClass = "mb-2 text-xs font-bold tracking-wider text-ink/50 uppercase";

function AnimatedAmount({ value, className }: { value: number; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="tabular-nums"
          initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease }}
        >
          {peso(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [vehicleId, setVehicleId] = useState(fleet[0].id);
  const [area, setArea] = useState<Area>("butuan");
  const [days, setDays] = useState("1");
  const [delivery, setDelivery] = useState("none");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const { vehicleId, area } = (e as CustomEvent<SelectVehicleDetail>).detail;
      setVehicleId(vehicleId);
      if (area) setArea(area);
    };
    window.addEventListener(SELECT_VEHICLE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_VEHICLE_EVENT, onSelect);
  }, []);

  const vehicle = fleet.find((v) => v.id === vehicleId) ?? fleet[0];
  const deliveryOption = deliveryOptions.find((d) => d.id === delivery) ?? deliveryOptions[0];
  const parsedDays = parseInt(days, 10);
  const safeDays = Math.max(1, Math.min(60, Number.isFinite(parsedDays) ? parsedDays : 1));
  const rentalTotal = vehicle.rates[area] * safeDays;
  const total = rentalTotal + deliveryOption.amount;
  const areaLabel = areas.find((a) => a.id === area)?.label ?? "";

  const message = [
    `Hi ${site.name}! I'd like to request a quotation.`,
    "",
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Rental date: ${date || "Flexible"}`,
    `Vehicle: ${vehicle.category} (${vehicle.models})`,
    `Destination: ${areaLabel}`,
    `Days: ${safeDays}`,
    `Pick-up / drop-off: ${deliveryOption.label}`,
    `Estimated total: ${peso(total)}`,
    notes ? `Notes: ${notes}` : "",
  ]
    .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
    .join("\n")
    .trim();

  const validate = () => formRef.current?.reportValidity() ?? false;

  async function sendMessenger() {
    if (!validate()) return;
    let copied = false;
    try {
      await navigator.clipboard.writeText(message);
      copied = true;
    } catch {
      // Clipboard can be blocked; Messenger still opens.
    }
    setStatus(
      copied
        ? "Your booking details are copied. Just paste them in the Messenger chat."
        : "Messenger is opening. Tell us your dates and vehicle and we’ll reply right away.",
    );
    window.open(site.messenger, "_blank", "noopener,noreferrer");
  }

  function sendSms() {
    if (!validate()) return;
    window.location.href = `sms:${site.phones[0].e164}?body=${encodeURIComponent(message)}`;
  }

  function sendEmail() {
    if (!validate()) return;
    const subject = `Booking inquiry: ${vehicle.category}, ${safeDays} day${safeDays > 1 ? "s" : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        sendMessenger();
      }}
      className="grid gap-6 lg:grid-cols-[1fr_340px]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="bf-name" className={labelClass}>Full name</Label>
          <Input id="bf-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Dela Cruz" className={fieldClass} autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="bf-contact" className={labelClass}>Mobile or email</Label>
          <Input id="bf-contact" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="09XX XXX XXXX" className={fieldClass} autoComplete="tel" />
        </div>
        <div>
          <Label htmlFor="bf-vehicle" className={labelClass}>Vehicle</Label>
          <Select value={vehicleId} onValueChange={setVehicleId}>
            <SelectTrigger id="bf-vehicle" className={`${fieldClass} w-full data-[size=default]:h-12`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {fleet.map((v) => (
                <SelectItem key={v.id} value={v.id} className="rounded-lg py-2.5">
                  {v.category}: {v.models}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bf-area" className={labelClass}>Destination</Label>
          <Select value={area} onValueChange={(v) => setArea(v as Area)}>
            <SelectTrigger id="bf-area" className={`${fieldClass} w-full data-[size=default]:h-12`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {areas.map((a) => (
                <SelectItem key={a.id} value={a.id} className="rounded-lg py-2.5">
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bf-date" className={labelClass}>Rental date</Label>
          <Input id="bf-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="bf-days" className={labelClass}>Number of days</Label>
          <Input id="bf-days" type="number" min={1} max={60} value={days} onChange={(e) => setDays(e.target.value)} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="bf-delivery" className={labelClass}>Pick-up / drop-off</Label>
          <Select value={delivery} onValueChange={setDelivery}>
            <SelectTrigger id="bf-delivery" className={`${fieldClass} w-full data-[size=default]:h-12`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {deliveryOptions.map((d) => (
                <SelectItem key={d.id} value={d.id} className="rounded-lg py-2.5">
                  {d.label}{d.amount ? ` (+${peso(d.amount)})` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="bf-notes" className={labelClass}>Notes (optional)</Label>
          <Textarea id="bf-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Flight time, pick-up time, number of passengers…" className={`${fieldClass} h-auto min-h-24 resize-none py-3`} />
        </div>
      </div>

      <aside className="flex flex-col rounded-3xl bg-brand-950 p-7 text-white">
        <p className="text-xs font-bold tracking-wider text-white/50 uppercase">Estimated total</p>
        <p className="mt-2 text-4xl font-extrabold tracking-tight">
          <AnimatedAmount value={total} />
        </p>
        <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">{vehicle.category} × {safeDays} day{safeDays > 1 ? "s" : ""}</dt>
            <dd><AnimatedAmount value={rentalTotal} /></dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">Pick-up / drop-off</dt>
            <dd>{deliveryOption.amount ? <AnimatedAmount value={deliveryOption.amount} /> : "Free"}</dd>
          </div>
        </dl>
        <AnimatePresence>
          {safeDays >= 2 && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden rounded-xl bg-white/10 px-3.5 py-2.5 text-xs leading-relaxed text-brand-100"
            >
              Renting 2+ days qualifies for a discount. We’ll apply it when we confirm.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-auto space-y-2.5 pt-8">
          <Button type="submit" className="group h-12 w-full rounded-full bg-brand-500 text-sm font-bold text-white transition-colors duration-300 hover:bg-brand-400">
            <MessengerIcon className="size-4 transition-transform duration-300 group-hover:scale-110" /> Send via Messenger
          </Button>
          <div className="grid grid-cols-2 gap-2.5">
            <Button type="button" onClick={sendSms} className="h-11 rounded-full bg-white/10 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/20">
              <PhoneIcon className="size-4" /> Text
            </Button>
            <Button type="button" onClick={sendEmail} className="h-11 rounded-full bg-white/10 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/20">
              <MailIcon className="size-4" /> Email
            </Button>
          </div>
          <p className="min-h-10 pt-1 text-center text-xs leading-relaxed text-white/60" role="status" aria-live="polite">
            {status ?? "No payment needed yet. We’ll confirm availability first."}
          </p>
        </div>
      </aside>
    </form>
  );
}
