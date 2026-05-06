import { Link, NavLink, Outlet } from "react-router-dom";
import { ShoppingBag, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import AgeGate from "./AgeGate";
import CartDrawer from "./CartDrawer";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

const Layout = () => {
  const { count, open } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AgeGate />
      <CartDrawer />

      <header className="sticky top-0 z-40 border-b border-border/60 glass">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </span>
            <span>Geek<span className="text-gradient">bartech</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `transition-colors hover:text-foreground ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={open}
              className="relative rounded-full p-2 hover:bg-muted transition-colors"
              aria-label={`Cart, ${count} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenu(!menu)}
              className="md:hidden rounded-full p-2 hover:bg-muted"
              aria-label="Menu"
            >
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menu && (
          <nav className="md:hidden border-t border-border/60 px-4 py-3 flex flex-col gap-1 bg-card">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenu(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-surface-1">
        <div className="container py-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </span>
              <span>Geek<span className="text-gradient">bartech</span></span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Premium vape tech, curated. Adults 21+ only.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
              <li><Link to="/shop?series=Pulse" className="hover:text-foreground">Pulse Series</Link></li>
              <li><Link to="/shop?series=Skyview" className="hover:text-foreground">Skyview</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><a href="mailto:sales@geekbartech.com" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              WARNING: This product contains nicotine. Nicotine is an addictive chemical. Sales restricted to adults 21+.
            </p>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="container py-5 text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Geekbartech. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
