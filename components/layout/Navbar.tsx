"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchBar } from "@/components/shop/SearchBar";

interface NavbarProps {
  transparentOnTop?: boolean;
}

export function Navbar({ transparentOnTop = false }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  const openDrawer = useCartStore((s) => s.openDrawer);
  const cartItems = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.isHydrated);
  const cartCount = hydrated ? cartItems.reduce((acc, i) => acc + i.quantity, 0) : 0;

  const wishlistCount = useWishlistStore((s) =>
    s.isHydrated ? s.items.length : 0,
  );

  useEffect(() => {
    setMounted(true);
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const effectiveTransparent = transparentOnTop && !scrolled;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full transition-all duration-300",
          effectiveTransparent
            ? "bg-transparent text-neutral-50"
            : "border-b border-border bg-background/85 text-foreground backdrop-blur-md",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-[0.2em]"
              aria-label={`${SITE.name} home`}
            >
              {SITE.name}
            </Link>
            <nav className="hidden gap-6 md:flex" aria-label="Primary">
              {NAV_LINKS.map((l) => {
                const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "relative text-sm transition-opacity hover:opacity-100",
                      active ? "opacity-100" : "opacity-70",
                    )}
                  >
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Open search"
              aria-expanded={searchOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
            </button>

            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label={`Activate ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}

            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 md:inline-flex"
            >
              <User className="h-4 w-4" />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-foreground">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Open cart, ${cartCount} items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span
                  aria-live="polite"
                  className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-foreground"
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border bg-background text-foreground"
            >
              <div className="container py-4">
                <SearchBar autoFocus onClose={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
