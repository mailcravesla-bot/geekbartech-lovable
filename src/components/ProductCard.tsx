import { Link } from "react-router-dom";
import { WCProduct, formatPrice, stripHtml } from "@/lib/woocommerce";

const ProductCard = ({ product }: { product: WCProduct }) => {
  const img = product.images?.[0]?.src;
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {img ? (
          <img
            src={img}
            alt={product.images[0]?.alt || product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">No image</div>
        )}
      </div>
      <div className="space-y-1 p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-foreground">{product.name}</h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {stripHtml(product.short_description)}
        </p>
        <div className="flex items-baseline gap-2 pt-1">
          {product.on_sale && product.regular_price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.regular_price)}
            </span>
          )}
          <span className="text-base font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
