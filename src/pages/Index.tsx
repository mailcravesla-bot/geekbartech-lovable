import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Sparkles, Zap, Star, Award, Cpu, Battery } from "lucide-react";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products, getFeatured, HERO_VIDEO, HERO_POSTER } from "@/data/products";

const Index = () => {
  const featured = getFeatured();
  const hero = featured[0];
  const bento = featured.slice(0, 4);

  return (
    <>
      <Seo
        title="Geekbartech — Premium Vape Tech & Geek Bar Disposables"
        description="Shop the official Geekbartech lineup — Geek Bar Pulse X, Pulse, Skyview, Digiflavor and more. Premium disposable vape tech with fast, discreet shipping."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Geekbartech",
          url: "https://geekbartech.com/",
        }}
      />

      {/* Hero — full bleed cinematic */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Premium Geek Bar disposable vape with neon smoke"
            className="h-full w-full object-cover opacity-80"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="absolute inset-0 -z-10 grid-noise opacity-30" />

        <div className="container relative grid min-h-[88vh] items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl space-y-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs font-medium font-mono uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              New · Pulse X 25,000
            </span>
            <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95]">
              Vape tech, <br />
              <span className="text-gradient">redefined.</span>
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              The complete Geek Bar lineup — Pulse X, Skyview, Digiflavor — engineered for flavor,
              built for the next 25,000 puffs. Curated, authenticated, shipped fast.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow h-12 px-7 text-base">
                <Link to="/shop">
                  Shop the lineup <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base backdrop-blur-md bg-background/30">
                <Link to={`/product/${hero?.slug}`}>Meet the Pulse X</Link>
              </Button>
            </div>
            <div className="flex items-center gap-5 pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />)}
                <span className="ml-1.5 font-semibold text-foreground">4.9</span>
                <span>· 2,847 reviews</span>
              </div>
              <span className="hidden h-3 w-px bg-border sm:inline-block" />
              <span className="hidden sm:inline">Free shipping over $50</span>
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative border-y border-border/60 bg-background/60 backdrop-blur-md py-4 overflow-hidden">
          <div className="flex marquee whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-10 px-5 text-sm font-mono uppercase tracking-widest text-muted-foreground">
                {["Authentic Geek Bar", "★ 25,000 Puffs", "Free U.S. Shipping $50+", "Discreet Packaging", "Authorized Retailer", "★ Adults 21+", "Same-Day Dispatch"].map((t) => (
                  <span key={t} className="flex items-center gap-10">
                    <span>{t}</span>
                    <span className="text-primary">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-border/60 bg-surface-1">
        <div className="container grid gap-6 py-12 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Same-day shipping", text: "Order by 3pm ET, ships today" },
            { icon: ShieldCheck, title: "100% authentic", text: "Sourced from authorized supply" },
            { icon: Award, title: "30-day support", text: "Real humans, real fast" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="rounded-2xl bg-gradient-primary/15 p-3 ring-1 ring-primary/20">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bento */}
      <section className="container py-24">
        <div className="mb-12 flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">// The Lineup</p>
          <h2 className="text-4xl sm:text-5xl max-w-2xl">Flagships, in the spotlight.</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:[&>*]:min-h-[280px]">
          {bento[0] && (
            <BentoCard product={bento[0]} className="md:col-span-2 md:row-span-2 md:min-h-[600px]" featured />
          )}
          {bento[1] && <BentoCard product={bento[1]} className="md:col-span-2" />}
          {bento[2] && <BentoCard product={bento[2]} />}
          {bento[3] && <BentoCard product={bento[3]} />}
        </div>
      </section>

      {/* Tech section */}
      <section className="border-y border-border/60 bg-surface-1 relative overflow-hidden">
        <div className="absolute inset-0 grid-noise opacity-20" />
        <div className="container relative py-24 grid gap-16 md:grid-cols-2 md:items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">// Engineered</p>
            <h2 className="text-4xl sm:text-5xl mb-5">The tech inside every puff.</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Dual mesh coils. Smart power management. OLED displays calibrated for clarity.
              Every Geek Bar in our catalog is built on hardware that delivers consistent flavor
              from puff one to puff twenty-five-thousand.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Cpu, label: "Dual mesh coil", val: "1.0 / 1.2 Ω" },
                { icon: Battery, label: "Battery", val: "820 mAh USB-C" },
                { icon: Zap, label: "Puff capacity", val: "Up to 25,000" },
                { icon: Sparkles, label: "E-liquid", val: "20 mL prefilled" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="rounded-2xl border border-border bg-card/40 p-4">
                  <Icon className="h-4 w-4 text-primary mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{label}</p>
                  <p className="font-semibold mt-0.5">{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[2rem] overflow-hidden border border-border bg-gradient-card shadow-card"
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-20 mix-blend-screen" />
            <img src={featured[0]?.image} alt="Pulse X close up" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* All products */}
      <section className="container py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-2">// Catalog</p>
            <h2 className="text-4xl sm:text-5xl">Shop all Geek Bar.</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/shop">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-border/60 bg-surface-1">
        <div className="container py-24">
          <div className="mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-2">// Real talk</p>
            <h2 className="text-4xl sm:text-5xl">Trusted by 50,000+ vapers.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { name: "Jordan M.", text: "The Pulse X arrived next day in plain packaging. Flavor is unreal — best disposable I've tried hands down.", rating: 5 },
              { name: "Sasha K.", text: "Skyview screen is wild in person. Geekbartech is now my only stop. Great prices, faster than the big sites.", rating: 5 },
              { name: "Marcus R.", text: "Authentic, no question. Tracking was instant and support actually answered me. Already ordered three more.", rating: 5 },
            ].map((r) => (
              <div key={r.name} className="rounded-3xl border border-border bg-card/60 p-7 backdrop-blur">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-5">"{r.text}"</p>
                <p className="text-sm font-semibold">{r.name} <span className="font-normal text-muted-foreground">· Verified buyer</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-2">// FAQ</p>
            <h2 className="text-4xl sm:text-5xl">Quick answers.</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Are these authentic Geek Bar products?", a: "100%. We source directly through authorized supply chains. Every device is verifiable on Geek Bar's official site." },
              { q: "How fast is shipping?", a: "Orders placed before 3pm ET ship the same day. Most U.S. orders arrive in 2–4 business days. Free shipping on orders over $50." },
              { q: "Is packaging discreet?", a: "Yes. All orders ship in plain, unbranded boxes with no exterior product references." },
              { q: "Do I need to be 21+?", a: "Yes. Geekbartech only sells to adults 21 and older. Age verification is required at checkout and on delivery." },
              { q: "What's your return policy?", a: "Defective devices are replaced within 30 days. Contact sales@geekbartech.com with your order ID." },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:bg-card/70">
                <summary className="flex cursor-pointer items-center justify-between font-semibold list-none">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-card p-10 sm:p-16 text-center shadow-card">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="absolute -top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl mb-4">Ready when you are.</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Free U.S. shipping over $50. Same-day dispatch. Authentic guaranteed.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow h-12 px-8 text-base">
              <Link to="/shop">Shop the lineup <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

const BentoCard = ({
  product,
  className = "",
  featured = false,
}: {
  product: ReturnType<typeof getFeatured>[number];
  className?: string;
  featured?: boolean;
}) => {
  const accent = product.flavors[0]?.color ?? "320 95% 60%";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-3xl border border-border bg-gradient-card p-6 transition-all hover:shadow-glow hover:border-primary/40"
      >
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: `radial-gradient(circle at 70% 30%, hsl(${accent} / 0.7), transparent 60%)` }}
        />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-1">{product.series}</p>
          <h3 className={featured ? "text-3xl sm:text-4xl mb-2" : "text-xl sm:text-2xl mb-1"}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.tagline}</p>
          {featured && (
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Discover <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default Index;
