import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

const formatUSD = (n: number) => `$${n.toFixed(2)}`;

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const accent = product.flavors[0]?.color ?? "320 95% 60%";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-border bg-gradient-card p-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
        style={{ ["--card-accent" as string]: `hsl(${accent})` }}
      >
        {product.badge && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
            {product.badge}
          </span>
        )}
        <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-surface-2">
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle at 50% 60%, hsl(${accent} / 0.35), transparent 70%)` }}
          />
          <img
            src={product.image}
            alt={`${product.name} disposable vape`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="space-y-2 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {product.series}
          </p>
          <h3 className="line-clamp-1 text-lg font-bold">{product.name}</h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">{product.tagline}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold">{formatUSD(product.price)}</span>
            <div className="flex -space-x-1.5">
              {product.flavors.slice(0, 4).map((f) => (
                <span
                  key={f.name}
                  className="h-5 w-5 rounded-full border-2 border-card"
                  style={{ background: `hsl(${f.color})` }}
                  aria-label={f.name}
                />
              ))}
              {product.flavors.length > 4 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-card bg-muted px-1 text-[9px] font-semibold">
                  +{product.flavors.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
