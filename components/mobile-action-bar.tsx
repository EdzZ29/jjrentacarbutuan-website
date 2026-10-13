"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { MessengerIcon, PhoneIcon } from "./icons";
import { ease } from "./motion";

// Call / message buttons on small screens, revealed once the visitor scrolls past the hero.
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/5 bg-white/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
        >
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${site.phones[0].e164}`}
              className="flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white py-3 text-sm font-bold text-ink active:scale-[0.98]"
            >
              <PhoneIcon className="size-4" /> Call now
            </a>
            <a
              href={site.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-brand-950 py-3 text-sm font-bold text-white active:scale-[0.98]"
            >
              <MessengerIcon className="size-4" /> Message us
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
