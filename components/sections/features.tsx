import { Stagger, StaggerItem } from "../motion";
import { BadgeIcon, CardIcon, KeyIcon, PlaneIcon, ShieldIcon } from "../icons";

const features = [
  {
    icon: KeyIcon,
    title: "Self-drive freedom",
    text: "Explore Butuan, CARAGA and as far as CDO, Davao and Bukidnon on your own schedule.",
  },
  {
    icon: PlaneIcon,
    title: "Airport & city delivery",
    text: "We’ll meet you at the airport or bring the car to you in the city proper.",
  },
  {
    icon: ShieldIcon,
    title: "Insured vehicles",
    text: "Every car is covered by comprehensive insurance for extra peace of mind.",
  },
  {
    icon: CardIcon,
    title: "Pay your way",
    text: "Cash, GCash, bank transfer, credit and debit cards, and major e-wallets.",
  },
  {
    icon: BadgeIcon,
    title: "PhilGEPS registered",
    text: "Government offices and agencies can book self-drive rentals with us.",
  },
];

export function Features() {
  return (
    <section aria-label="Why rent with us" className="border-y border-ink/5 bg-white">
      <Stagger className="mx-auto grid max-w-6xl gap-x-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
        {features.map(({ icon: Icon, title, text }) => (
          <StaggerItem key={title} className="group py-8">
            <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-[background-color,color,transform] duration-500 group-hover:-translate-y-1 group-hover:bg-brand-950 group-hover:text-white">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-bold tracking-tight">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
