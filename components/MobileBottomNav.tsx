"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  User as UserIcon,
  ShoppingCart,
  Info,
  Phone,
  Store,
} from "lucide-react";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart } from "@/features/cart/pages/hooks/useCart";
import { Button } from "./ui/button";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { data: currentUser } = useGetCurrentUser();
  const { data: cart = [] } = useGetCart(currentUser?.id);

  const navItems = [
    { href: "/", icon: Home },

    { href: "/shop", icon: Store },

    {
      href: currentUser ? "/cart" : "/contact",
      icon: currentUser ? ShoppingCart : Phone,
      badge: currentUser && cart.length > 0 ? cart.length : null,
    },

    {
      name: currentUser ? null : "LOGIN",
      href: currentUser ? "/profile" : "/login",
      icon: currentUser ? UserIcon : UserIcon,
    },
  ];

  return (
    <nav className="fixed bottom-0 z-50 mb-3 block w-full items-center justify-center px-3 md:hidden">
      <div className="flex h-16 items-center justify-around rounded-full border border-white/10 px-3 backdrop-blur-md">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={i}
              href={item.href}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-white"
              }`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {item.badge && (
                  <span className="bg-primary absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white">
                    {item.badge}
                  </span>
                )}
              </div>

              {item.name ? (
                <span className="text-[9px]">{item.name}</span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
