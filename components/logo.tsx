import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src={site.logoMark}
        alt=""
        width={598}
        height={381}
        priority
        className={`h-9 w-auto ${inverted ? "rounded-md bg-white p-1" : ""}`}
      />
      <span className="leading-none">
        <span
          className={`block text-[15px] font-extrabold tracking-tight ${inverted ? "text-white" : "text-ink"}`}
        >
          JJ Rent a Car
        </span>
        <span
          className={`mt-1 block text-[10.5px] font-bold uppercase tracking-[0.22em] ${
            inverted ? "text-brand-300" : "text-brand-600"
          }`}
        >
          Butuan City
        </span>
      </span>
    </span>
  );
}
