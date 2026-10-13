"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fleet, site } from "@/lib/site";
import { ArrowRightIcon, BadgeIcon, PlaneIcon, ShieldIcon, StarIcon } from "../icons";
import { CountUp, ease } from "../motion";

const lowestRate = Math.min(...fleet.map((v) => v.rates.butuan));
const destinations = ["Butuan", "CARAGA", "CDO", "Davao", "Bukidnon"];

function RotatingDestination() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % destinations.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Widest word reserves the space so the line never jumps. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        Bukidnon
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={destinations[index]}
          className="col-start-1 row-start-1 text-brand-600"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {destinations[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-50/60 pt-20 pb-20 sm:pt-28 sm:pb-24">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
      >
        <motion.a
          variants={item}
          href="#reviews"
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white py-1.5 pr-4 pl-1.5 text-sm font-semibold text-ink/70 transition-[border-color,box-shadow] duration-300 hover:border-ink/20 hover:shadow-md"
        >
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">
            <StarIcon className="size-3.5 text-amber-500" /> {site.rating.value}
          </span>
          Loved by travelers in Butuan
        </motion.a>

        <motion.h1
          variants={item}
          className="mt-7 text-[2.6rem] leading-[1.1] font-extrabold tracking-[-0.035em] text-balance text-ink sm:text-6xl lg:text-7xl"
        >
          Self-drive rentals for every trip around <RotatingDestination />
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink/60 sm:text-xl">
          Clean, insured cars from city hatchbacks to 8-seater SUVs. Airport pick-up, card and e-wallet
          payments, and a team that replies fast.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            className="group h-14 rounded-full px-8 text-[15px] font-bold shadow-lg shadow-brand-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-700/25"
          >
            <a href="#book">
              Book your ride
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-14 rounded-full border-ink/10 px-8 text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white hover:shadow-md"
          >
            <a href="#fleet">View fleet &amp; rates</a>
          </Button>
        </motion.div>

        <motion.ul
          variants={item}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-ink/60"
        >
          <li className="flex items-center gap-2">
            <ShieldIcon className="size-4 text-brand-600" /> Comprehensive insurance
          </li>
          <li className="flex items-center gap-2">
            <PlaneIcon className="size-4 text-brand-600" /> Airport pick-up
          </li>
          <li className="flex items-center gap-2">
            <BadgeIcon className="size-4 text-brand-600" /> PhilGEPS registered
          </li>
        </motion.ul>

        <motion.dl
          variants={item}
          className="mt-16 grid w-full grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink/5 ring-1 ring-ink/5 sm:grid-cols-4"
        >
          {[
            { node: <CountUp value={lowestRate} prefix="₱" />, label: "Daily rates from" },
            { node: <CountUp value={site.rating.value} decimals={1} suffix="★" />, label: `${site.rating.count} Google reviews` },
            { node: <CountUp value={44} suffix="K+" />, label: "Facebook followers" },
            { node: <CountUp value={fleet.length} />, label: "Vehicle types" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1 bg-white px-4 py-6">
              <dt className="text-sm font-medium text-ink/50">{s.label}</dt>
              <dd className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{s.node}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
