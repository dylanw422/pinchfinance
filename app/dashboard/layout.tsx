"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ConnectBank from "@/components/dashboard/connect-bank";
import Header from "@/components/dashboard/header";
import Profile from "@/components/profile";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession, useUser } from "@/queries/auth";
import { redirect } from "next/navigation";
import RunTracker from "@/components/run-tracker";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const { data: user } = useUser();
  const hasUpdated = useRef(false);

  const [runData, setRunData] = useState<any>(null);

  if (!session && !isLoading) {
    redirect("/signin");
  }

  useEffect(() => {
    const syncFn = async () => {
      try {
        const res = await axios.post("/api/sync", {
          userId: session?.data?.user.id,
        });

        if (res.data?.run) {
          setRunData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!hasUpdated.current && session?.data) {
      syncFn();
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
        {runData !== null && (
          <RunTracker runId={runData?.run.id} accessToken={runData?.run.publicAccessToken} />
        )}
        <Profile />
      </div>
    </SidebarProvider>
  );
}
