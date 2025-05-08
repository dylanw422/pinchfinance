/* eslint-disable @next/next/no-img-element */
"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "@/queries/auth";
import Link from "next/link";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full translate-y-[-1rem] animate-fade-in border-b opacity-0 backdrop-blur-[12px] [--animation-delay:600ms]">
        <div className="container flex h-[3.5rem] items-center justify-between">
          <Link className="text-md flex items-center" href="/">
            <img src="/pinchFullWhite.webp" alt="" className="h-5" />
          </Link>
          <Link href={session && session.data ? "/dashboard" : "/signin"}>
            <Button className="h-8 border-b-4 border-black/20 active:border-b-0 transition-all">
              Open App
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
}
