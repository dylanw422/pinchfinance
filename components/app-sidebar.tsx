"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  Brain,
  BarChart,
  Heart,
  Target,
  Repeat,
  Layers2,
  PiggyBank,
  CreditCard,
  Landmark,
  Sparkle,
  Sparkles,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import NavHeader from "./nav-header";
import { AnimatePresence, motion } from "motion/react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: "Loans",
      url: "#",
      icon: Landmark,
      items: [],
    },
    {
      title: "Goals",
      url: "#",
      icon: Target,
      items: [],
    },
    {
      title: "Subscriptions",
      url: "#",
      icon: Repeat,
      items: [],
    },
    {
      title: "Reports",
      url: "#",
      icon: Layers2,
      items: [],
    },

    {
      title: "Investing",
      url: "#",
      icon: PiggyBank,
      items: [],
    },
    {
      title: "Credit Health",
      url: "#",
      icon: Heart,
      items: [],
    },
    {
      title: "Virtual Cards",
      url: "#",
      icon: CreditCard,
    },
    {
      title: "Pinch Assistant",
      url: "#",
      icon: Sparkle,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="bg-background relative">
        <AnimatePresence>
          {state === "expanded" ? (
            <motion.div exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.125 }}>
              <NavHeader />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
