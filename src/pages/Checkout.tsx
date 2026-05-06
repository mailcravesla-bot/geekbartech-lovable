import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { ArrowLeft, Lock } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const formatUSD = (n: number) => `$${n.toFixed(2)}`;

const schema = z.object({
  fullName: z.string().trim().min(2, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Required").max(30),
  address1: z.string().trim().min(3, "Required").max(200),
  address2: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().min(2, "Required").max(80),
  state: z.string().trim().min(2, "Required").max(80),
  zip: z.string().trim().min(3, "Required").max(20),
  country: z.string().trim().min(2, "Required").max(80),
});

const fields: { name: keyof z.infer<typeof schema>; label: string; full?: boolean; type?: string }[] = [
  { name: "fullName", label: "Full name", full: true },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "address1", label: "Address", full: true },
  { name: "address2", label: "Apt, suite (optional)", full: true },
  { name: "city", label: "City" },
  { name: "state", label: "State / Region" },
  { name: "zip", label: "ZIP / Postal code" },
  { name: "country", label: "Country" },
];

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const shipping = items.length > 0 ? (subtotal >= 75 ? 0 : 7.99) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <section className="container py-24 text-center">
        <Seo title="Checkout | Geekbartech" description="Secure checkout for your Geek Bar order." />
        <h1 className="text-3xl mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add a product before heading to checkout.</p>
        <Button asChild className="bg-gradient-primary hover:opacity-90">
          <Link to="/shop">Browse products</Link>
        </Button>
      </section>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);

    const orderId = `GBT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: parsed.data,
      items,
      subtotal,
      shipping,
      tax,
      total,
    };
    try {
      localStorage.setItem(`gbt_order_${orderId}`, JSON.stringify(order));
    } catch {/* ignore */}

    // Build a mailto with the order summary as a fallback transport
    const itemLines = items.map((i) => `• ${i.quantity}× ${i.name} — ${i.flavor} — ${formatUSD(i.price * i.quantity)}`).join("%0D%0A");
    const body = [
      `Order ID: ${orderId}`,
      ``,
      `Customer: ${parsed.data.fullName}`,
      `Email: ${parsed.data.email}`,
      `Phone: ${parsed.data.phone}`,
      ``,
      `Ship to:`,
      `${parsed.data.address1}${parsed.data.address2 ? ", " + parsed.data.address2 : ""}`,
      `${parsed.data.city}, ${parsed.data.state} ${parsed.data.zip}`,
      `${parsed.data.country}`,
      ``,
      `Items:`,
      itemLines,
      ``,
      `Subtotal: ${formatUSD(subtotal)}`,
      `Shipping: ${formatUSD(shipping)}`,
      `Tax: ${formatUSD(tax)}`,
      `Total: ${formatUSD(total)}`,
    ].join("%0D%0A");
    const mailto = `mailto:sales@geekbartech.com?subject=New%20Order%20${orderId}&body=${body}`;
    // Open mail client in a new tab — non-blocking
    window.open(mailto, "_blank");

    setTimeout(() => {
      clear();
      navigate(`/order/${orderId}`);
    }, 400);
  };

  return (
    <>
      <Seo title="Secure Checkout | Geekbartech" description="Complete your Geek Bar order with secure, fast checkout." />
      <div className="container pt-6">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>
      </div>

      <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_400px]">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
          noValidate
        >
          <div>
            <h1 className="text-3xl mb-1">Checkout</h1>
            <p className="text-sm text-muted-foreground">Confirm your details to place the order.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-5">Contact & shipping</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.full ? "sm:col-span-2" : undefined}>
                  <Label htmlFor={f.name}>{f.label}</Label>
                  <Input
                    id={f.name}
                    name={f.name}
                    type={f.type ?? "text"}
                    autoComplete={autoCompleteFor(f.name)}
                    aria-invalid={!!errors[f.name]}
                    className="mt-1.5"
                  />
                  {errors[f.name] && <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>}
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={submitting} size="lg" className="w-full bg-gradient-primary hover:opacity-90 shadow-glow">
            <Lock className="mr-2 h-4 w-4" />
            {submitting ? "Placing order…" : `Place order — ${formatUSD(total)}`}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By placing this order you confirm you are 21+ and agree to our terms.
          </p>
        </motion.form>

        <aside className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={`${i.slug}-${i.flavor}`} className="flex gap-3">
                  <img src={i.image} alt={i.name} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="truncate font-medium">{i.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{i.flavor} × {i.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatUSD(i.price * i.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5 border-t border-border pt-4 text-sm">
              <Row label="Subtotal" value={formatUSD(subtotal)} />
              <Row label={shipping === 0 ? "Shipping (Free)" : "Shipping"} value={formatUSD(shipping)} />
              <Row label="Tax (est.)" value={formatUSD(tax)} />
              <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
                <span>Total</span>
                <span>{formatUSD(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span>{value}</span>
  </div>
);

const autoCompleteFor = (name: string) => {
  const map: Record<string, string> = {
    fullName: "name",
    email: "email",
    phone: "tel",
    address1: "address-line1",
    address2: "address-line2",
    city: "address-level2",
    state: "address-level1",
    zip: "postal-code",
    country: "country-name",
  };
  return map[name];
};

export default Checkout;
