"use client";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <div
      onMouseEnter={toggleOpen}
      onMouseLeave={toggleOpen}
      className="fixed bottom-4 right-4 flex items-end flex-row gap-4 text-xs"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="space-x-2"
          >
            <Button
              className="bg-red-600 text-white/90 hover:bg-red-600/90"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <button>
        <User className="border border-foreground/50 p-1 h-7 w-7 text-foreground/50 rounded-full hover:cursor transition-all hover:border-foreground hover:text-foreground bg-slate-900" />
      </button>
    </div>
  );
}
