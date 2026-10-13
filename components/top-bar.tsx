import { site } from "@/lib/site";
import { CarIcon, MailIcon, PhoneIcon } from "./icons";

export function TopBar() {
  return (
    <div className="bg-brand-900 text-white">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-center gap-6 px-5 text-[13px] font-medium sm:justify-between sm:px-8">
        <p className="hidden items-center gap-2 sm:flex">
          <CarIcon className="size-4 text-amber-400" />
          {site.name} - Self Drive
        </p>

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="hidden items-center gap-2 transition-colors hover:text-brand-200 md:flex"
          >
            <MailIcon className="size-4 text-amber-400" />
            {site.email}
          </a>
          <span aria-hidden="true" className="hidden h-4 w-px bg-white/20 md:block" />
          <p className="flex items-center gap-2">
            <PhoneIcon className="size-4 text-amber-400" />
            <span>
              Call:{" "}
              {site.phones.map((p, i) => (
                <span key={p.e164}>
                  {i > 0 && " / "}
                  <a href={`tel:${p.e164}`} className="transition-colors hover:text-brand-200">
                    {p.display.replace(/\s/g, "")}
                  </a>
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
