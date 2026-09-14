"use client";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart } from "@/features/cart/pages/hooks/useCart";
import { ShoppingCartIcon } from "@animateicons/react/lucide";
import { ShieldCogCorner } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { User } from "./animate-ui/icons/user";
import { Button } from "./animate-ui/primitives/buttons/button";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
  const pathname = usePathname();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: cart = [], isLoading: isCartLoading } = useGetCart(
    currentUser?.id,
  );

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT", href: "/aboutUs" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="bg-background sticky top-0 left-0 z-50 w-full border-b md:border-0 md:bg-transparent md:backdrop-blur-md">
      <div className="flex h-18 w-full items-center justify-between px-4 md:h-20 md:px-10">
        <img
          src="/images/zekaLogo.png"
          className="absolute top-1/2 left-1/2 w-24 -translate-x-1/2 -translate-y-1/2 object-contain sm:w-28 md:static md:w-30 md:translate-x-0 md:translate-y-0"
        />

        <div className="hidden items-center gap-5 md:flex">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <Button
                className={`menu-item rounded-full hover:cursor-pointer ${
                  pathname === item.href
                    ? "menu-item-active rounded-full"
                    : "menu-item-inactive"
                }`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        {isCurrentUserLoading || isCartLoading ? (
          <div className="hidden w-20 items-center justify-end gap-3 md:flex">
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-7 w-7 rounded-md" />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              {currentUser?.role === "admin" ? (
                <Button className="hover:cursor-pointer">
                  <Link href="/admin">
                    <ShieldCogCorner
                      className={`hover:text-primary transition-color size-8 p-1 duration-300 hover:cursor-pointer ${
                        pathname.includes("/admin")
                          ? "text-primary"
                          : "hover:text-primary"
                      }`}
                    />
                  </Link>
                </Button>
              ) : null}
            </div>
            <div className="mt-1 hidden items-center justify-center md:flex">
              {currentUser ? (
                <Link href="/profile">
                  <Button className="hover:cursor-pointer">
                    <AnimateIcon animateOnHover>
                      <User
                        className={`hover:text-primary transition-color size-8 p-1 duration-300 hover:cursor-pointer ${
                          pathname.includes("/profile")
                            ? "text-primary"
                            : "hover:text-primary"
                        }`}
                      />
                    </AnimateIcon>
                  </Button>
                </Link>
              ) : (
                <Link
                  href="/login"
                  // className={`login-button ${pathname === "/login" ? "text-primary border-primary " : " hover:text-primary hover:border-primary "}`}
                >
                  <Button
                    className={`login-button relative hover:cursor-pointer ${pathname === "/login" ? "text-primary border-primary" : "hover:text-primary hover:border-primary"}`}
                  >
                    LOG IN
                  </Button>
                </Link>
              )}
            </div>
            {currentUser && (
              <Link href="/cart" className="relative hidden md:inline-flex">
                <Button className="flex items-center justify-center hover:cursor-pointer">
                  <ShoppingCartIcon
                    className={`hover:cursor-pointer ${pathname === "/cart" ? "text-primary" : "hover:text-primary"}`}
                  />
                  {cart.length > 0 ? (
                    <span className="bg-primary/70 absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[8px]">
                      {cart.length}
                    </span>
                  ) : null}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
