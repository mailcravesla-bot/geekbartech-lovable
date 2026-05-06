import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck, Zap } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import NotFound from "./NotFound";

const formatUSD = (n: number) => `$${n.toFixed(2)}`;

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProduct(slug) : undefined;
  const { add } = useCart();
  const [flavor, setFlavor] = useState(product?.flavors[0]?.name ?? "");
  const [qty, setQty] = useState(1);

  if (!product) return <NotFound />;

  const accent = product.flavors.find((f) => f.name === flavor)?.color ?? product.flavors[0].color;

  const handleAdd = () => {
    add({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      flavor,
    }, qty);
  };

  const related = products.filter((p) => p.slug !== product.slug && p.series === product.series).slice(0, 4);

  return (
    <>
      <Seo
        title={`${product.name} ${flavor} - Official Geekbartech Store`}
        description={`Shop the ${product.name} (${flavor}) at Geekbartech. ${product.specs.puffs} puffs, ${product.specs.battery}. ${product.tagline}.`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.image,
          brand: { "@type": "Brand", name: "Geek Bar" },
          offers: {
            "@type": "Offer",
            price: product.price.toFixed(2),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        }}
      />

      <div className="container pt-6">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
      </div>

      <section className="container grid gap-10 py-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-gradient-card"
        >
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{ background: `radial-gradient(circle at 50% 60%, hsl(${accent} / 0.4), transparent 70%)` }}
          />
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-2">{product.series}</p>
            <h1 className="text-4xl sm:text-5xl mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.tagline}</p>
          </div>
          <p className="text-3xl font-bold">{formatUSD(product.price)}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          <div>
            <p className="text-sm font-semibold mb-3">Flavor: <span className="text-muted-foreground font-normal">{flavor}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.flavors.map((f) => {
                const active = f.name === flavor;
                return (
                  <button
                    key={f.name}
                    onClick={() => setFlavor(f.name)}
                    className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                    style={active ? { boxShadow: `0 0 0 2px hsl(${f.color} / 0.4)` } : undefined}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ background: `hsl(${f.color})` }} />
                    {f.name}
                    {active && <Check className="h-3 w-3" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 hover:bg-muted rounded-l-full">−</button>
              <span className="min-w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-2 hover:bg-muted rounded-r-full">+</button>
            </div>
            <Button size="lg" onClick={handleAdd} className="flex-1 bg-gradient-primary hover:opacity-90 shadow-glow">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
          </div>

          {/* Specs */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-5">
            <h2 className="text-sm font-semibold mb-4">Tech specs</h2>
            <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              {Object.entries(product.specs).map(([k, v]) => v && (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              { icon: Truck, t: "Fast ship" },
              { icon: ShieldCheck, t: "Authentic" },
              { icon: Zap, t: "Fresh stock" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-2 rounded-xl border border-border bg-surface-2/40 px-3 py-2">
                <Icon className="h-4 w-4 text-primary" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {related.length > 0 && (
        <section className="container pb-16">
          <h2 className="text-2xl mb-6">More from {product.series}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => (
              <Link
                key={p.slug}
                to={`/product/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-gradient-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="aspect-square overflow-hidden bg-surface-2">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{formatUSD(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile buy bar */}
      <div className="sticky bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md p-3 md:hidden">
        <div className="container flex items-center gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{flavor}</p>
            <p className="font-bold">{formatUSD(product.price * qty)}</p>
          </div>
          <Button onClick={handleAdd} className="flex-1 bg-gradient-primary hover:opacity-90">
            Add to cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default Product;
