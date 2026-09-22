"use client";

import {
  IconBrandAbstract,
  IconBuildingStore,
  IconCategory,
  IconUsers,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const leftBarItems1 = [
    {
      title: "1",
      items: [
        { name: "Users", href: "/admin/users", icon: IconUsers },
        { name: "Products", href: "/admin/products", icon: IconBuildingStore },

        {
          name: `Categories`,
          //   count: favoritesCount,
          href: "/admin/categories",
          icon: IconCategory,
        },
        {
          name: "Brands",
          href: "/admin/brands",
          icon: IconBrandAbstract,
        },
      ],
    },
  ];

  return (
    <div className="sticky top-24 flex h-fit w-full max-w-xs min-w-xs flex-col gap-4">
      <div className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-6 backdrop-blur-md">
        {/* 1 L */}
        <div className="flex flex-col gap-2">
          <div>ZEKA STORE</div>
          {/* <div className="bg-[#FEFEFE] w-full h-px"></div> */}
        </div>
      </div>

      {leftBarItems1.map((section) => (
        <div
          key={section.title}
          className="border-primary flex h-fit flex-col gap-5 rounded-3xl border bg-[#1a1a1a]/20 p-2.5 backdrop-blur-md"
        >
          <div className="flex w-full flex-col items-start justify-center gap-2.5">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "hover:bg-muted/40 flex w-full items-center gap-4 rounded-xl p-3 text-start transition-colors outline-none hover:cursor-pointer",
                    // إذا كان الرابط هو الصفحة الرئيسية المطابقة تكون دقيقة، أما لو مسار آخر فيتم فحص بداية المسار
                    (
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    )
                      ? "bg-primary/40 hover:bg-primary/40"
                      : null,
                  )}
                >
                  <Icon className="size-5" />
                  <span>{item.name}</span>

                  {/* {!!item.count && item.count > 0 && (
                    <span className="bg-primary/20 ml-auto px-2 py-1 rounded-lg text-primary text-xs">
                      {item.count} items
                    </span>
                  )} */}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;
