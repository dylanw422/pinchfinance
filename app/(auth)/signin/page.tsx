import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Pinch",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-[100dvh] w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
        <div className="flex flex-col gap-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">Login to your account</p>
        </div>
        <UserAuthForm signIn />
        <p className="px-8 text-center text-sm text-primary">
          <Link
            href="/signup"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
        <p className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-center text-sm text-primary/50">
          <Link
            href=""
            className="hover:text-brand underline underline-offset-4"
          >
            Forgot password
          </Link>
        </p>
      </div>
    </div>
  );
}
