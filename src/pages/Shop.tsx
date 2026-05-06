import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const seriesParam = params.get("series") ?? "All";
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const allSeries = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.series)))], []);

  const filtered = useMemo(() => {
    let list = seriesParam === "All" ? [...products] : products.filter((p) => p.series === seriesParam);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [seriesParam, sort]);

  const setSeries = (s: string) => {
    if (s === "All") params.delete("series");
    else params.set("series", s);
    setParams(params, { replace: true });
  };

  return (
    <>
      <Seo
        title="Shop Geek Bar Disposables | Geekbartech"
        description="Browse the full Geek Bar catalog — Pulse X, Pulse, Skyview, Digiflavor, Meloso and more. Premium disposable vapes, fast shipping."
      />

      <section className="bg-hero border-b border-border">
        <div className="container py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm uppercase tracking-widest text-primary mb-2">Catalog</p>
            <h1 className="text-4xl sm:text-5xl">Shop the lineup</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Every Geek Bar series, in one place. Filter by family or sort by price.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {allSeries.map((s) => {
              const active = s === seriesParam;
              return (
                <button
                  key={s}
                  onClick={() => setSeries(s)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-lg border border-border bg-muted/30 p-6 text-center text-muted-foreground">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Shop;
