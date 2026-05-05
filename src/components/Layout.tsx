import { Link, NavLink, Outlet } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <ShoppingBag className="h-5 w-5" />
            <span>Geek Bar Tech Shop</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {[
              { to: "/", label: "Home", end: true },
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-muted/30">
        <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Geek Bar Tech Shop. All rights reserved.</p>
          <p>Premium tech, curated for you.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
