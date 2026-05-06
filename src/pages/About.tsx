import Seo from "@/components/Seo";
import { motion } from "framer-motion";

const About = () => (
  <>
    <Seo
      title="About Geekbartech | Premium Vape Tech Retail"
      description="Geekbartech curates the full Geek Bar lineup with fast, discreet shipping and authentic, verified products. Adults 21+ only."
    />
    <section className="bg-hero border-b border-border">
      <div className="container py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm uppercase tracking-widest text-primary mb-2">About</p>
          <h1 className="text-4xl sm:text-6xl">A higher bar for vape retail.</h1>
        </motion.div>
      </div>
    </section>

    <section className="container py-16 grid gap-10 md:grid-cols-2">
      <p className="text-lg text-muted-foreground leading-relaxed">
        Geekbartech is the elevated retail home for the Geek Bar lineup. We obsess over authenticity, freshness, and
        the experience of unboxing a brand-new device — fast, discreet, and exactly as it should be.
      </p>
      <p className="text-lg text-muted-foreground leading-relaxed">
        Every product on this site is sourced through verified channels. Pulse, Pulse X, Skyview, Digiflavor and
        every other Geek Bar series is shipped from real, fresh stock.
      </p>
    </section>

    <section className="container pb-20">
      <div className="rounded-3xl border border-border bg-gradient-card p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl mb-3">Adults 21+ only.</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          WARNING: This product contains nicotine. Nicotine is an addictive chemical. Sales are restricted to
          adults of legal age (21+ in the United States, or the legal age in your jurisdiction). Underage sales
          are strictly prohibited.
        </p>
      </div>
    </section>
  </>
);

export default About;
