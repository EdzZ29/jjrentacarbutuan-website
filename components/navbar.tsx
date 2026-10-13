"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, site } from "@/lib/site";
import { ArrowRightIcon, MenuIcon, MessengerIcon, PhoneIcon } from "./icons";
import { Logo } from "./logo";
import { scrollToHash } from "./smooth-scroll";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // The drawer locks scrolling while open, so close it first and scroll once it has gone.
  function goFromMenu(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToHash(href), 320);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-[box-shadow,border-color] duration-500 ${
        scrolled ? "border-ink/5 shadow-[0_8px_30px_-12px_rgb(11_18_32/0.12)]" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label={`${site.name} home`} className="transition-opacity hover:opacity-80">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-brand-50"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={link.href}
                  className={`relative block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-brand-700" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phones[0].e164}`}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink/70 transition-colors hover:text-ink lg:flex"
          >
            <PhoneIcon className="size-4" />
            {site.phones[0].display}
          </a>
          <Button
            asChild
            className="group hidden h-10 rounded-full px-5 text-sm font-bold transition-all duration-300 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-700/25 sm:inline-flex"
          >
            <a href="#book">
              Book now
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="rounded-full md:hidden" aria-label="Open menu">
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] gap-0 p-0 duration-500 sm:max-w-sm">
              <SheetTitle className="border-b border-ink/5 px-6 py-5">
                <Logo />
              </SheetTitle>
              <ul className="flex flex-col px-3 py-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={open ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => goFromMenu(e, link.href)}
                      className="flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-brand-50"
                    >
                      {link.label}
                      <ArrowRightIcon className="size-4 text-ink/30" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 border-t border-ink/5 p-6">
                <Button asChild variant="outline" className="h-12 rounded-full text-sm font-bold">
                  <a href={`tel:${site.phones[0].e164}`}>
                    <PhoneIcon className="size-4" /> Call {site.phones[0].display}
                  </a>
                </Button>
                <Button asChild className="h-12 rounded-full text-sm font-bold">
                  <a href={site.messenger} target="_blank" rel="noopener noreferrer">
                    <MessengerIcon className="size-4" /> Message us
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
