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
import { url } from "inspector";
import { useUpdateData } from "@/queries/update-data";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();
  const { data: user } = useUser();
  const syncData = useUpdateData();
  const hasUpdated = useRef(false);

  const [runData, setRunData] = useState<any>(null);

  if (!session && !isLoading) {
    redirect("/signin");
  }

  useEffect(() => {
    const syncFn = async () => {
      try {
        if (!session?.data?.user.id) {
          throw new Error("User ID is missing");
        }
        const res = await syncData.mutateAsync({ userId: session.data.user.id });
        if ("run" in res && res.run) {
          setRunData(res);
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

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: `url('./texture.png')`,
          opacity: 0.3,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
        }}
        className="pointer-events-none absolute inset-0 z-0"
      />
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="sticky top-0" />
        <div className="container flex flex-col">
          <Header user={user} />
          {user.plaidAccounts.length == 0 ||
          user.plaidAccounts.some((acct: any) => acct.outdated === true) ? (
            <ConnectBank />
          ) : (
            children
          )}
          {runData !== null && (
            <RunTracker runId={runData?.run.id} accessToken={runData?.run.publicAccessToken} />
          )}
          <Profile />
        </div>
      </SidebarProvider>
    </div>
  );
}
