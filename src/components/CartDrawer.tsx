import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const formatUSD = (n: number) => `$${n.toFixed(2)}`;

const CartDrawer = () => {
  const { items, isOpen, close, setQty, remove, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-card"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Your Cart</h2>
              </div>
              <button onClick={close} className="rounded-full p-2 hover:bg-muted" aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-3 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Your cart is empty.</p>
                  <Button asChild className="mt-4" onClick={close}>
                    <Link to="/shop">Browse products</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={`${item.slug}-${item.flavor}`}
                      className="flex gap-3 rounded-2xl border border-border bg-surface-2/50 p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{item.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{item.flavor}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-border">
                            <button
                              onClick={() => setQty(item.slug, item.flavor, item.quantity - 1)}
                              className="p-1.5 hover:bg-muted rounded-l-full"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => setQty(item.slug, item.flavor, item.quantity + 1)}
                              className="p-1.5 hover:bg-muted rounded-r-full"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold">{formatUSD(item.price * item.quantity)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(item.slug, item.flavor)}
                        className="self-start rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-border px-5 py-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-semibold">{formatUSD(subtotal)}</span>
                </div>
                <Button asChild size="lg" className="w-full bg-gradient-primary hover:opacity-90" onClick={close}>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
