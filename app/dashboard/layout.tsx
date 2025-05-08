"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ConnectBank from "@/components/dashboard/connect-bank";
import Header from "@/components/dashboard/header";
import Profile from "@/components/profile";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession, useUser } from "@/queries/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRef } from "react";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data: session, isLoading } = useSession();
  const { data: user } = useUser();
  const hasUpdated = useRef(false);

  if (!session && !isLoading) {
    redirect("/signin");
  }

  const updateUserData = useMutation({
    mutationFn: async (userId: string) => {
      await axios.post("/api/update", {
        userId,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  useEffect(() => {
    const asOfRaw = user?.data.plaidBalances[0]?.asOf;
    const userId = session?.data?.user.id;

    if (!userId || hasUpdated.current) return;

    if (!asOfRaw) {
      hasUpdated.current = true;
      updateUserData.mutate(userId);
      return;
    }

    const asOfDate = new Date(asOfRaw);
    const today = new Date();

    asOfDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (asOfDate < today) {
      hasUpdated.current = true;
      updateUserData.mutate(userId);
    }
  }, [user, session, updateUserData]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="sticky top-0" />
      <div className="flex flex-col container">
        <Header user={user} />
        {user?.data.length == 0 ? <ConnectBank /> : children}
        <Profile />
      </div>
    </SidebarProvider>
  );
}
