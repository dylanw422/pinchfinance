"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup className="text-primary">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && (
                <item.icon
                  className={` ${
                    item.title === "Pinch Assistant" ? "text-pink-300" : "text-foreground"
                  }`}
                />
              )}
              <Link
                href={item.url}
                className={` ${
                  item.title === "Pinch Assistant"
                    ? "bg-gradient-to-r from-pink-300 to-purple-300 text-transparent bg-clip-text"
                    : "text-foreground"
                }`}
              >
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
