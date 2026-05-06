import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "gbt_age_verified_v1";

const AgeGate = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY) !== "1") setOpen(true);
  }, []);

  const confirm = () => {
    localStorage.setItem(KEY, "1");
    setOpen(false);
  };

  const reject = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 22 }}
            className="glass relative w-full max-w-md rounded-3xl p-8 text-center shadow-glow"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
              <ShieldCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 id="age-gate-title" className="mb-2 text-3xl">
              Are you <span className="text-gradient">21+</span>?
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Geekbartech sells nicotine vapor products. By entering, you confirm you are of legal
              age (21+ or the legal age in your jurisdiction). Underage sales are strictly prohibited.
            </p>
            <div className="flex flex-col gap-3">
              <Button size="lg" onClick={confirm} className="w-full bg-gradient-primary hover:opacity-90">
                Yes, I'm 21 or older
              </Button>
              <Button size="lg" variant="ghost" onClick={reject} className="w-full">
                No, exit site
              </Button>
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
              WARNING: This product contains nicotine. Nicotine is an addictive chemical.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeGate;
