"use client";

import { Bell } from "@/components/animate-ui/icons/bell";
import { Heart } from "@/components/animate-ui/icons/heart";
import { LogOut } from "@/components/animate-ui/icons/log-out";
import { MapPin } from "@/components/animate-ui/icons/map-pin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  useGetCurrentUser,
  useLogout,
} from "@/features/auth/pages/hooks/useAuth";
import {
  BoltIcon,
  CreditCardIcon,
  GiftIcon,
  QrCodeIcon,
  ShoppingBasketIcon,
} from "@animateicons/react/lucide";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetFavorites } from "../favorites/hooks/useFavorites";

const AccountMobilePage = () => {
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

  const CalculateProfilePercentage = () => {
    let percentage = 0;

    if (currentUser?.email) {
      percentage += 20;
    }

    if (currentUser?.gender) {
      percentage += 20;
    }

    if (currentUser?.birthday) {
      percentage += 20;
    }

    if (currentUser?.birthday) {
      percentage += 20;
    }

    if (currentUser?.addresses && currentUser.addresses.length > 0) {
      percentage += 20;
    }

    return percentage;
  };

  const profilePercentage = CalculateProfilePercentage();

  const isLoading =
    isFavoritesDataLoading || isCurrentUserLoading || !currentUser;
  const accountMenu = [
    {
      title: "1",
      items: [
        {
          name: "Orders",
          describtion: "Manage & Track",
          href: "/profile/orders",
          icon: ShoppingBasketIcon,
        },
        {
          name: "Wishlists",
          describtion: isLoading ? (
            <Skeleton className="mt-0.75 h-3 w-auto" />
          ) : (
            `${favoritesCount} saved items`
          ),
          href: "/profile/favorites",
          icon: Heart,
        },
      ],
    },
    {
      title: "My Account",
      items: [
        {
          name: "Adresses",
          describtion: "",
          href: "/profile/addresses",
          icon: MapPin,
        },
        {
          name: "Payments",
          describtion: "",
          href: "/profile/payments",
          icon: CreditCardIcon,
        },
        {
          name: "Notifications",
          describtion: "",
          href: "/profile/notifications",
          icon: Bell,
        },
        {
          name: "Gift Cards",
          describtion: "",
          href: "/profile/giftCards",
          icon: GiftIcon,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          name: "Security Settings",
          describtion: "",
          href: "/profile/securitySettings",
          icon: BoltIcon,
        },
        {
          name: "QR Code",
          describtion: "",
          href: "/profile/QRcode",
          icon: QrCodeIcon,
        },
      ],
    },
  ];

  return (
    <div className="mx-4 mt-6 flex h-fit flex-col gap-4">
      <div className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-5.5 backdrop-blur-md">
        {/* 1 L */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex">
              {isLoading ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                "Hello," + currentUser?.first_name + "!"
              )}
            </div>
            <div className="text-muted-foreground text-xs">
              {isLoading ? (
                <Skeleton className="mt-0.5 h-5 w-50" />
              ) : (
                currentUser?.email
              )}
            </div>
          </div>

          <Button variant="default" asChild size={"sm"} className="w-fit">
            <Link href="/profile">Edit</Link>
          </Button>
        </div>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-7.5 w-full" />
          </div>
        ) : (
          <>
            {profilePercentage < 100 ? (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Slider
                    isDot={false}
                    value={[profilePercentage]}
                    defaultValue={[100]}
                    max={100}
                    step={1}
                    disabled
                    className="mx-auto w-full max-w-xs"
                  />
                  <Badge>{profilePercentage}%</Badge>
                </div>
                <div className="text-muted-foreground text-xs">
                  Complete your profile to personalize your experience!
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>

      {accountMenu.map((section, i) => {
        return (
          <div key={section.title}>
            {section.title == "1" ? (
              <div className="mt-1 flex flex-row items-start justify-center gap-3">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`hover:bg-primary border-primary flex w-full rounded-3xl border py-6 pr-3 pl-5.5 text-start outline-none hover:cursor-pointer`}
                    >
                      <div className="flex w-full items-center gap-3">
                        <Icon className="size-5" />
                        <div className="flex flex-col gap-1">
                          <span className="text-sm">{item.name}</span>
                          <span className="text-muted-foreground text-[10px]">
                            {item.describtion}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div>
                <div className="text-primary mt-1 mb-3 ml-1 text-base">
                  {section.title}
                </div>
                <div className="border-primary divide-primary/20 flex h-fit flex-col divide-y rounded-3xl border bg-[#1a1a1a]/20 px-5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`hover:bg-primary flex items-center justify-between py-5 text-start transition-colors outline-none hover:cursor-pointer`}
                      >
                        <div className="flex items-center gap-4">
                          <Icon className="size-5" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {/* 5 L */}
      <div className="border-primary/50 mx-auto my-2 flex w-40 items-center justify-center border-b"></div>
      <div
        onClick={handleLogout}
        className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-3 backdrop-blur-md"
      >
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="hover:bg-primary flex items-center gap-3 rounded-xl p-3 text-start transition-colors duration-400 outline-none hover:cursor-pointer">
            <LogOut className="size-5" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMobilePage;
