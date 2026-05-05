import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star } from "lucide-react";
import Seo from "@/components/Seo";
import { wcApi, formatPrice, stripHtml } from "@/lib/woocommerce";
import { Button } from "@/components/ui/button";

const Product = () => {
  const { slug = "" } = useParams();
  const [activeImg, setActiveImg] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["wc-product", slug],
    queryFn: () => wcApi.getProductBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container grid gap-8 py-12 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-xl bg-muted" />
        <div className="space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild className="mt-6">
          <Link to="/shop">Back to shop</Link>
        </Button>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [];
  const desc = stripHtml(product.short_description || product.description).slice(0, 160);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: images.map((i) => i.src),
    description: desc,
    sku: String(product.id),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability:
        product.stock_status === "instock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(Number(product.average_rating) > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.average_rating,
            reviewCount: product.rating_count,
          },
        }
      : {}),
  };

  return (
    <>
      <Seo
        title={`${product.name} — Geek Bar Tech Shop`}
        description={desc}
        image={images[0]?.src}
        jsonLd={jsonLd}
      />

      <div className="container py-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
      </div>

      {/* Visually-editable product layout */}
      <article className="container grid gap-10 pb-16 md:grid-cols-2">
        {/* Gallery */}
        <section data-product-section="gallery" className="space-y-3">
          <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
            {images[activeImg] ? (
              <img
                src={images[activeImg].src}
                alt={images[activeImg].alt || product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden rounded-md border ${
                    i === activeImg ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img.src} alt={img.alt || product.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Info */}
        <section data-product-section="info" className="space-y-6">
          <header data-product-field="header" className="space-y-2">
            {product.categories?.[0] && (
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {product.categories[0].name}
              </p>
            )}
            <h1 data-product-field="title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            {Number(product.average_rating) > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span>{product.average_rating}</span>
                <span>({product.rating_count})</span>
              </div>
            )}
          </header>

          <div data-product-field="price" className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
            {product.on_sale && product.regular_price && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>

          {product.short_description && (
            <div
              data-product-field="short-description"
              className="prose prose-sm max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <div data-product-field="actions" className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={product.permalink} target="_blank" rel="noopener noreferrer">
                Buy now
              </a>
            </Button>
            <span
              className={`inline-flex items-center rounded-full border border-border px-3 py-1 text-xs ${
                product.stock_status === "instock" ? "text-green-600" : "text-muted-foreground"
              }`}
            >
              {product.stock_status === "instock" ? "In stock" : "Out of stock"}
            </span>
          </div>

          {product.description && (
            <div data-product-field="description" className="space-y-2 border-t border-border pt-6">
              <h2 className="text-lg font-semibold">Description</h2>
              <div
                className="prose prose-sm max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </section>
      </article>
    </>
  );
};

export default Product;
