// All business content lives here so rates, contacts and copy can be
// updated without touching any layout code.

export const site = {
  name: "JJ Rent a Car Butuan",
  shortName: "JJ Rent a Car",
  tagline: "Drive your adventure. Rent your ride today.",
  description:
    "Affordable, well-maintained self-drive car rentals in Butuan City. Hatchbacks, sedans, MPVs, SUVs and pick-ups with airport pick-up, insurance and flexible payments.",
  url: "https://jjrentacarbutuan.com",
  logo: "/jjrentacar/logo.png", // full logo with wordmark (800x505)
  logoMark: "/jjrentacar/logo-mark.png", // eye mark only (598x381), used in the header

  email: "jjrentacarbutuan@gmail.com",
  phones: [
    {
      label: "Smart / TNT",
      note: "Viber · WhatsApp",
      display: "0947 504 5495",
      e164: "+639475045495",
    },
    {
      label: "Globe / TM",
      note: "Call · Text",
      display: "0945 561 8367",
      e164: "+639455618367",
    },
  ],
  // Verify these handles match your Facebook page and Instagram account.
  messenger: "https://m.me/jjrentacarbutuan",
  facebook: "https://www.facebook.com/jjrentacarbutuan",
  instagram: "https://www.instagram.com/jjrentacarbutuan",

  address: {
    lines: [
      "Door 3, G/F Green Unit, Tricolor Bldg.",
      "Tamarind Road, Brgy. Dagohoy",
      "Butuan City, Agusan del Norte 8600",
    ],
    street: "Door 3 G/F Green Unit, Tricolor Bldg., Tamarind Road, Brgy. Dagohoy",
    city: "Butuan City",
    region: "Agusan del Norte",
    postalCode: "8600",
    mapQuery:
      "JJ Rent a Car Butuan, Tamarind Rd, Barangay Dagohoy, Butuan City, Agusan del Norte",
  },

  rating: { value: 4.6, count: 36 },
  facebookFollowers: "44K+",
};

export type Area = "butuan" | "caraga" | "mindanao";

export const areas: { id: Area; label: string; short: string }[] = [
  { id: "butuan", label: "Within Butuan City", short: "Butuan" },
  { id: "caraga", label: "Within CARAGA Region", short: "CARAGA" },
  { id: "mindanao", label: "CDO / Davao / Bukidnon", short: "CDO · Davao · Bukidnon" },
];

export type BodyType = "hatchback" | "sedan" | "mpv" | "suv" | "pickup";

export type Vehicle = {
  id: string;
  category: string;
  models: string;
  body: BodyType;
  seats: string;
  rates: Record<Area, number>;
  extensionPerHour: number;
  // Set to false to show "Fully booked" on the card.
  available: boolean;
  // Optional specs: each one shows on the card once filled in.
  transmission?: "Automatic" | "Manual" | "Automatic / Manual";
  fuel?: "Gasoline" | "Diesel";
  bags?: number;
  // Shown in the "View details" popup.
  description: string;
  // Optional photo in /public, e.g. "/fleet/vios.png". Falls back to an illustration.
  image?: string;
};

export const fleet: Vehicle[] = [
  {
    id: "hatchback",
    category: "Hatchback",
    models: "Toyota Wigo / Suzuki Swift",
    body: "hatchback",
    seats: "4-5",
    available: true,
    rates: { butuan: 1100, caraga: 1600, mindanao: 2100 },
    extensionPerHour: 100,
    fuel: "Gasoline",
    description:
      "Compact, easy to park and light on fuel. A smart pick for city errands, solo travelers and couples.",
    image: "/fleet/swift.png",
  },
  {
    id: "sedan",
    category: "Sedan",
    models: "Toyota Vios",
    body: "sedan",
    seats: "4-5",
    available: true,
    rates: { butuan: 1300, caraga: 1800, mindanao: 2300 },
    extensionPerHour: 150,
    fuel: "Gasoline",
    description:
      "Comfortable and reliable with a roomy trunk. Great for business trips, airport runs and small families.",
    image: "/fleet/vios.png",
  },
  {
    id: "xpander",
    category: "MPV",
    models: "Mitsubishi Xpander",
    body: "mpv",
    seats: "7-8",
    available: true,
    rates: { butuan: 1800, caraga: 2300, mindanao: 2800 },
    extensionPerHour: 200,
    fuel: "Gasoline",
    description:
      "A spacious 7-seater with flexible seating. Ideal for family outings and group trips around CARAGA.",
    image: "/fleet/xpander.png",
  },
  {
    id: "suv",
    category: "SUV",
    models: "Toyota Fortuner / Isuzu mu-X",
    body: "suv",
    seats: "7-8",
    available: true,
    rates: { butuan: 2500, caraga: 3000, mindanao: 3500 },
    extensionPerHour: 250,
    fuel: "Diesel",
    description:
      "High ground clearance and a powerful ride for long drives to CDO, Davao and Bukidnon.",
    image: "/fleet/fortuner.png",
  },
  {
    id: "strada",
    category: "Pick-up",
    models: "Mitsubishi Strada",
    body: "pickup",
    seats: "4-5",
    available: true,
    rates: { butuan: 2300, caraga: 2800, mindanao: 3300 },
    extensionPerHour: 230,
    fuel: "Diesel",
    description:
      "A tough double-cab pick-up with a cargo bed. Built for rough roads, gear and heavy loads.",
    image: "/fleet/strada.png",
  },
];

export const deliveryFees = [
  { label: "Airport pick-up / drop-off", amount: 200 },
  { label: "City proper pick-up / drop-off", amount: 150 },
];

export const requirements = [
  "Valid driver’s license",
  "1 valid government-issued ID",
  "Active contact number",
  "50% downpayment to confirm your reservation",
  "Full payment upon vehicle release",
];

export const paymentMethods = [
  "Cash",
  "GCash / GCredit",
  "Online bank transfer",
  "Credit card",
  "Debit card",
  "ShopeePay · GrabPay",
  "Alipay · QR Ph",
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What do I need to rent a self-drive car?",
    a: "A valid driver’s license, one valid government-issued ID and an active contact number. A 50% downpayment confirms your reservation, and the balance is paid upon release of the vehicle.",
  },
  {
    q: "Do you offer airport or hotel pick-up and drop-off?",
    a: "Yes. Airport pick-up or drop-off is ₱200 and city proper pick-up or drop-off is ₱150.",
  },
  {
    q: "How much is the per-hour extension fee?",
    a: "Hatchback ₱100/hr, Sedan ₱150/hr, Xpander ₱200/hr, Strada ₱230/hr and SUV ₱250/hr.",
  },
  {
    q: "Are your vehicles insured?",
    a: "Yes. Our vehicles have comprehensive insurance, subject to the approval of the insurance provider. Minor incidents or damages shall be charged to the lessee.",
  },
  {
    q: "What are the modes of payment?",
    a: "Cash, GCash/GCredit, online bank transfer, credit card and debit card. We also accept major e-wallets including ShopeePay, GrabPay, Alipay and QR Ph.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made more than 24 hours before the rental are refundable. Cancellations within 24 hours of the rental are non-refundable.",
  },
  {
    q: "Can I rebook my reservation?",
    a: "Rebooking is allowed once, with prior notice before the rental date, subject to vehicle availability.",
  },
  {
    q: "What happens if I don’t show up?",
    a: "No-shows without prior notice will result in forfeiture of the downpayment.",
  },
  {
    q: "Are you PhilGEPS registered?",
    a: "Yes. We are PhilGEPS registered for self-drive rentals, so government offices and agencies can book with us.",
  },
  {
    q: "Do you offer discounts for longer rentals?",
    a: "Yes. Rentals of 2 days or more qualify for discounted rates. Send us your dates and we’ll give you the best price.",
  },
];

export const reviews = [
  {
    name: "Parnell Dobbins",
    meta: "10 reviews",
    when: "3 months ago",
    text: "First time using rental car in Philippines. JJ made it very simple and customer service was excellent. Highly recommend.",
  },
  {
    name: "Jim Cornish",
    meta: "Local Guide · 13 reviews",
    when: "2 months ago",
    text: "We visit the Butuan area every other year, for the past several years we have rented JJ Rental Cars. These guys are great! Easy, accommodating, meets us at airport back and forth. Any problems with the vehicle is quickly resolved, without inconvenience. Reasonable fees.",
  },
  {
    name: "Zondra Angela",
    meta: "7 reviews",
    when: "8 months ago",
    text: "Fast transaction, easy to reach out in terms of communication, and no issues to the car that we rent. I recommend JJ Car Rental to my family and friends.",
  },
  {
    name: "Claudio Pedrocchi",
    meta: "Local Guide · 363 reviews",
    when: "4 months ago",
    text: "Great staff, great experience. Highly recommended if you need to rent a car in Butuan.",
  },
];

export const navLinks = [
  { href: "#fleet", label: "Fleet & Rates" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function peso(n: number) {
  return "₱" + n.toLocaleString("en-US");
}

export function pesoExact(n: number) {
  return "₱" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function mapsEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;
}

export function mapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.mapQuery)}`;
}
