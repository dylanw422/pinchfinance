"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ConnectBank from "@/components/dashboard/connect-bank";
import Header from "@/components/dashboard/header";
import Profile from "@/components/profile";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession, useUser } from "@/queries/auth";
import { useUpdateData } from "@/queries/update-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRef } from "react";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const updateData = useUpdateData(queryClient);
  const { data: session, isLoading } = useSession();
  const { data: user } = useUser();
  const hasUpdated = useRef(false);

  if (!session && !isLoading) {
    redirect("/signin");
  }

  useEffect(() => {
    if (!hasUpdated.current && session?.data) {
      updateData.mutate(session.data.user.id);
      hasUpdated.current = true;
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="sticky top-0" />
      <div className="flex flex-col container">
        <Header user={user} />
        {user?.data.plaidAccounts.length == 0 ? <ConnectBank /> : children}
        <Profile />
      </div>
    </SidebarProvider>
  );
}
