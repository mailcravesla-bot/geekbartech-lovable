import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Truck, ShieldCheck, Sparkles } from "lucide-react";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { wcApi } from "@/lib/woocommerce";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data: products, isError } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => wcApi.listProducts({ per_page: 8, orderby: "popularity" }),
    retry: 1,
  });

  return (
    <>
      <Seo
        title="Geek Bar Tech Shop — Premium Tech & Gadgets"
        description="Discover curated tech, gadgets and accessories at Geek Bar Tech Shop. Fast shipping, secure checkout and the latest products."
      />

      {/* Hero */}
      <section className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
        <div className="container grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> New arrivals weekly
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Premium tech, <span className="text-primary">curated</span> for you.
            </h1>
            <p className="max-w-prose text-base text-muted-foreground sm:text-lg">
              Geek Bar Tech Shop brings you hand-picked gadgets, accessories and gear from
              the brands you love — with secure checkout and fast delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">
                  Shop now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">About us</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
            {products?.[0]?.images?.[0]?.src ? (
              <img
                src={products[0].images[0].src}
                alt={products[0].name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                {isError ? "Products are temporarily unavailable." : "Loading featured product…"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-border/60">
        <div className="container grid gap-6 py-10 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Fast shipping", text: "Quick dispatch on every order" },
            { icon: ShieldCheck, title: "Secure checkout", text: "Encrypted, PCI-compliant" },
            { icon: Sparkles, title: "Curated picks", text: "Only the best gear makes it in" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2 text-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured products</h2>
            <p className="text-sm text-muted-foreground">Trending picks from the shop</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/shop">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {!products && !isError ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : isError ? (
          <p className="rounded-lg border border-border bg-muted/30 p-6 text-center text-muted-foreground">
            Products are temporarily unavailable. Please check back shortly.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products?.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Index;
