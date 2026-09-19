"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "../../../components/animate-ui/primitives/buttons/button";

import type { IconHandle } from "@animateicons/react";
import {
  BoltIcon,
  CreditCardIcon,
  GiftIcon,
  QrCodeIcon,
  ShoppingBasketIcon,
} from "@animateicons/react/lucide";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { User } from "@/components/animate-ui/icons/user";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetCurrentUser,
  useLogout,
} from "@/features/auth/pages/hooks/useAuth";
import { handleHover } from "@/lib/handle-hover";
import { Bell } from "../../../components/animate-ui/icons/bell";
import { Heart } from "../../../components/animate-ui/icons/heart";
import { LogOut } from "../../../components/animate-ui/icons/log-out";
import { MapPin } from "../../../components/animate-ui/icons/map-pin";
import { useGetFavorites } from "../pages/favorites/hooks/useFavorites";

const icons = {
  Orders: ShoppingBasketIcon,
  Favorites: Heart,
  Notification: Bell,
  Profile: User,
  Adresses: MapPin,
  Payments: CreditCardIcon,
  "Gift Cards": GiftIcon,
  "Security Settings": BoltIcon,
  "QR Code": QrCodeIcon,
};

const SidebarNavItem = ({
  item,
  pathname,
}: {
  item: any;
  pathname: string;
}) => {
  const pathnames = usePathname();
  const isFavoritesPage = pathnames === "/profile/favorites";
  const iconRef = useRef<IconHandle>(null);
  const Icon = item.icon;

  if (item.type === "lucide") {
    return (
      <Button
        className="w-full"
        onMouseEnter={(e) => handleHover(e, iconRef)}
        onMouseLeave={(e) => handleHover(e, iconRef)}
        hoverScale={1.02}
        tapScale={0.98}
      >
        <Link
          href={item.href}
          className={`hover:bg-muted/40 flex w-full items-center gap-4 rounded-xl p-3 text-start transition-colors outline-none hover:cursor-pointer ${
            pathname === item.href ? "bg-primary/40 hover:bg-primary/40" : ""
          }`}
        >
          <Icon className="size-5" ref={iconRef} />
          <span>{item.name}</span>

          {!!item.count && item.count > 0 && (
            <Badge variant={"outline"}>{item.count} items</Badge>
          )}
        </Link>
      </Button>
    );
  }

  return (
    <Button className="w-full" hoverScale={1.02} tapScale={0.98}>
      <AnimateIcon animateOnHover className="w-full">
        <Link
          href={item.href}
          className={`hover:bg-muted/40 flex w-full items-center gap-4 rounded-xl p-3 text-start transition-colors outline-none hover:cursor-pointer ${
            pathname === item.href ? "bg-primary/40 hover:bg-primary/40" : ""
          }`}
        >
          <Icon className="size-5" />
          <span>{item.name}</span>

          {!!item.count && item.count > 0 && (
            <Badge
              variant="default"
              className={
                isFavoritesPage
                  ? "border-border bg-input/20 text-foreground dark:bg-input/30 [a]:hover:bg-muted [a]:hover:text-muted-foreground ml-auto text-xs"
                  : "bg-primary/20 text-primary ml-auto text-xs"
              }
            >
              {item.count} items
            </Badge>
          )}
        </Link>
      </AnimateIcon>
    </Button>
  );
};

const ProfileLeftBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useLogout();
  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    refetch: refetchcurrentUser,
  } = useGetCurrentUser();
  const { data: favoritesData = [], isLoading: isFavoritesDataLoading } =
    useGetFavorites(currentUser?.id);
  const favoritesCount = favoritesData?.length || 0;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const leftBarItems1 = [
    {
      title: "1",
      items: [
        {
          name: "Orders",
          href: "/profile/orders",
          icon: icons.Orders,
          type: "lucide",
        },
        {
          name: "Favorites",
          count: favoritesCount,
          href: "/profile/favorites",
          icon: icons.Favorites,
          type: "animate-ui",
        },
        {
          name: "Notification",
          href: "/profile/notifications",
          icon: icons.Notification,
          type: "animate-ui",
        },
      ],
    },
    {
      title: "2",
      items: [
        {
          name: "Profile",
          href: "/profile",
          icon: icons.Profile,
          type: "animate-ui",
        },
        {
          name: "Adresses",
          href: "/profile/addresses",
          icon: icons.Adresses,
          type: "animate-ui",
        },
        {
          name: "Payments",
          href: "/profile/payments",
          icon: icons.Payments,
          type: "lucide",
        },
        {
          name: "Gift Cards",
          href: "/profile/giftCards",
          icon: icons["Gift Cards"],
          type: "lucide",
        },
      ],
    },
    {
      title: "3",
      items: [
        {
          name: "Security Settings",
          href: "/profile/securitySettings",
          icon: icons["Security Settings"],
          type: "lucide",
        },
        {
          name: "QR Code",
          href: "/profile/QRcode",
          icon: icons["QR Code"],
          type: "lucide",
        },
      ],
    },
  ];

  const isLoading =
    isCurrentUserLoading || !currentUser || isFavoritesDataLoading;

  return (
    <div className="sticky top-24 hidden h-fit w-full max-w-xs flex-col gap-4 md:flex">
      <div className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <>
              <Skeleton className="bg-primary/20 h-6 w-36 rounded-md" />
              <Skeleton className="h-4 w-48 rounded-md bg-zinc-700/40" />
            </>
          ) : (
            <>
              <div className="text-primary">
                Hello, {currentUser.first_name}!
              </div>
              <div className="text-xs text-zinc-400">{currentUser?.email}</div>
            </>
          )}
        </div>
      </div>

      {leftBarItems1.map((section) => (
        <div
          key={section.title}
          className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-2.5 backdrop-blur-md"
        >
          <div className="flex w-full flex-col items-start justify-center gap-2.5">
            {section.items.map((item) => (
              <SidebarNavItem key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </div>
      ))}

      <div className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-2.5 backdrop-blur-md">
        <div className="flex w-full flex-col items-start justify-center gap-2.5">
          <Button
            hoverScale={1.02}
            tapScale={0.98}
            onClick={handleLogout}
            className="hover:bg-muted/40 flex w-full items-center gap-2.5 rounded-xl p-3 text-start transition-colors duration-400 outline-none hover:cursor-pointer"
          >
            <AnimateIcon animateOnHover>
              <LogOut className="size-5" />
            </AnimateIcon>
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftBar;
