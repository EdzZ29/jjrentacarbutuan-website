import { navLinks, site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, MessengerIcon } from "../icons";
import { Logo } from "../logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pt-14 pb-28 text-white md:pb-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo inverted />
            <p className="mt-4 text-sm leading-relaxed text-white/50">{site.tagline}</p>
            <div className="mt-6 flex gap-2">
              {[
                { href: site.facebook, label: "Facebook", Icon: FacebookIcon },
                { href: site.instagram, label: "Instagram", Icon: InstagramIcon },
                { href: site.messenger, label: "Messenger", Icon: MessengerIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-20">
            <div>
              <p className="text-sm font-semibold">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/50">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/50">
                {site.phones.map((p) => (
                  <li key={p.e164}>
                    <a href={`tel:${p.e164}`} className="transition-colors hover:text-white">
                      {p.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                    {site.email}
                  </a>
                </li>
                <li>{site.address.city}</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-xs text-white/40">
          © {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
