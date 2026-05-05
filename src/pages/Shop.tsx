import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { wcApi } from "@/lib/woocommerce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");

  const { data: categories } = useQuery({
    queryKey: ["wc-categories"],
    queryFn: () => wcApi.listCategories(),
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["wc-products", category],
    queryFn: () =>
      wcApi.listProducts(category ? { per_page: 48, category } : { per_page: 48 }),
  });

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, search]);

  return (
    <>
      <Seo
        title="Shop — Geek Bar Tech Shop"
        description="Browse the full Geek Bar Tech Shop catalog. Find gadgets, accessories and the latest tech."
      />
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container py-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Shop</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our full collection of curated tech and gadgets.
          </p>
        </div>
      </section>

      <section className="container py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={category === "" ? "default" : "outline"}
              onClick={() => setCategory("")}
            >
              All
            </Button>
            {categories?.slice(0, 8).map((c) => (
              <Button
                key={c.id}
                size="sm"
                variant={category === String(c.id) ? "default" : "outline"}
                onClick={() => setCategory(String(c.id))}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Shop;
