import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products, getFeatured } from "@/data/products";

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

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="container relative grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> The new Pulse X is here
            </span>
            <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-6xl md:text-7xl">
              Vape tech, <br />
              <span className="text-gradient">redefined.</span>
            </h1>
            <p className="max-w-prose text-base text-muted-foreground sm:text-lg">
              The Geek Bar lineup, curated for you. Pulse, Skyview, Digiflavor — all the icons,
              shipped fast and discreet.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow">
                <Link to="/shop">
                  Shop the lineup <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={`/product/${hero?.slug}`}>Meet the Pulse X</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-card border border-border shadow-card"
          >
            {hero && (
              <>
                <div className="absolute inset-0 bg-gradient-primary opacity-20 mix-blend-screen" />
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-6">
                  <p className="text-xs uppercase tracking-widest text-primary">{hero.badge}</p>
                  <h2 className="mt-1 text-2xl font-bold">{hero.name}</h2>
                  <p className="text-sm text-muted-foreground">{hero.tagline}</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-border/60 bg-surface-1">
        <div className="container grid gap-6 py-10 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Fast & discreet shipping", text: "Plain packaging, quick dispatch" },
            { icon: ShieldCheck, title: "Authentic, verified", text: "Direct from authorized supply" },
            { icon: Zap, title: "Always the latest", text: "First with new Geek Bar drops" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="rounded-xl bg-muted p-2.5">
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
      <section className="container py-20">
        <div className="mb-10 flex flex-col gap-2">
          <p className="text-sm uppercase tracking-widest text-primary">The Lineup</p>
          <h2 className="text-3xl sm:text-4xl">Flagships, in the spotlight.</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:[&>*]:min-h-[280px]">
          {bento[0] && (
            <BentoCard product={bento[0]} className="md:col-span-2 md:row-span-2 md:min-h-[580px]" featured />
          )}
          {bento[1] && <BentoCard product={bento[1]} className="md:col-span-2" />}
          {bento[2] && <BentoCard product={bento[2]} />}
          {bento[3] && <BentoCard product={bento[3]} />}
        </div>
      </section>

      {/* All products */}
      <section className="container pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary">Catalog</p>
            <h2 className="text-3xl sm:text-4xl">Shop all Geek Bar.</h2>
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
        className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-3xl border border-border bg-gradient-card p-6 transition-all hover:shadow-glow"
      >
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: `radial-gradient(circle at 70% 30%, hsl(${accent} / 0.6), transparent 60%)` }}
        />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105 ${featured ? "" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative">
          <p className="text-xs uppercase tracking-widest text-primary mb-1">{product.series}</p>
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
