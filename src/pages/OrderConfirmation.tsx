import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";

const formatUSD = (n: number) => `$${n.toFixed(2)}`;

interface Order {
  id: string;
  createdAt: string;
  customer: { fullName: string; email: string };
  items: { slug: string; name: string; flavor: string; quantity: number; price: number; image: string }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;
    try {
      const raw = localStorage.getItem(`gbt_order_${id}`);
      if (raw) setOrder(JSON.parse(raw));
    } catch {/* ignore */}
  }, [id]);

  return (
    <>
      <Seo title={`Order ${id} | Geekbartech`} description="Your Geek Bar order has been received." />
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl sm:text-5xl mb-3">Order received</h1>
          <p className="text-muted-foreground mb-2">Thank you{order ? `, ${order.customer.fullName.split(" ")[0]}` : ""}.</p>
          <p className="text-sm text-muted-foreground mb-8">
            We've sent the details to <strong>sales@geekbartech.com</strong>{order && <> and a copy will go to <strong>{order.customer.email}</strong></>}.
          </p>
          <div className="inline-block rounded-2xl border border-border bg-card px-6 py-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Order ID</p>
            <p className="text-2xl font-bold text-gradient">{id}</p>
          </div>
        </motion.div>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Order summary</h2>
            <ul className="space-y-3">
              {order.items.map((i) => (
                <li key={`${i.slug}-${i.flavor}`} className="flex gap-3">
                  <img src={i.image} alt={i.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.flavor} × {i.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatUSD(i.price * i.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-border pt-4 space-y-1.5 text-sm">
              <Row label="Subtotal" value={formatUSD(order.subtotal)} />
              <Row label="Shipping" value={formatUSD(order.shipping)} />
              <Row label="Tax" value={formatUSD(order.tax)} />
              <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
                <span>Total</span><span>{formatUSD(order.total)}</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-10 flex justify-center gap-3">
          <Button asChild variant="outline">
            <a href="mailto:sales@geekbartech.com"><Mail className="mr-2 h-4 w-4" /> Contact sales</a>
          </Button>
          <Button asChild className="bg-gradient-primary hover:opacity-90">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>
);

export default OrderConfirmation;
