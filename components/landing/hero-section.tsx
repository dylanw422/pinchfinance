"use client";

import TextShimmer from "@/components/magicui/text-shimmer";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useAddUser } from "@/queries/user-count";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const addUser = useAddUser();

  const submitForm = async () => {
    if (email.length > 6 && email.includes("@")) {
      try {
        const res = await addUser.mutateAsync({ email });

        if (res.status === 200) {
          setEmail("");
          toast.success("You're on the waitlist", {
            position: "bottom-left",
          });
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            toast.warning("You're already on the waitlist", {
              position: "bottom-left",
            });
          } else {
            toast.error("Something went wrong", {
              position: "bottom-left",
            });
          }
        }
      }
    } else {
      toast.warning("Please enter a valid email address", {
        position: "bottom-left",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8"
    >
      <div className="backdrop-filter-[12px] group inline-flex h-7 translate-y-[-1rem] animate-fade-in items-center justify-between gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:text-black">
        <TextShimmer className="inline-flex items-center justify-center">
          <span>✨ Introducing Pinch</span>{" "}
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </div>
      <h1 className="translate-y-[-1rem] animate-fade-in text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-4xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-5xl md:text-6xl lg:text-7xl">
        Pinch is the smarter way
        <br className="hidden md:block" /> to manage your money
      </h1>
      <p className="mb-12 translate-y-[-1rem] animate-fade-in text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl">
        Track spending, set goals, and get AI-powered insights
        <br className="hidden md:block" /> into your spending.
      </p>
      <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          className="w-full translate-y-[-1rem] animate-fade-in bg-primary/10 opacity-0 backdrop-blur-md ease-in-out [--animation-delay:600ms] sm:w-1/4"
          placeholder="Email address..."
          value={email}
        />
        <Button
          onMouseDown={submitForm}
          className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg border-b-4 border-black/20 text-white opacity-0 transition-all ease-in-out [--animation-delay:600ms] active:border-b-0 dark:text-black"
        >
          <span>Join Waitlist</span>
          <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
