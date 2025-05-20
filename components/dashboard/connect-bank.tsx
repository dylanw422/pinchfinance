/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/queries/auth";
import { useUpdateData } from "@/queries/update-data";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

export default function ConnectBank() {
  const queryClient = useQueryClient();
  const updateData = useUpdateData();
  const { data: session } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await axios.post("/api/plaid/link", {
        user_id: session?.data?.user.id,
      });
      setToken(res.data);
    };

    if (session?.data) {
      createLinkToken();
    }
  }, [session]);

  const config: PlaidLinkOptions = {
    onSuccess: async (public_token, metadata) => {
      if (session?.data?.user) {
        await axios.post("/api/plaid/access-token", {
          user_id: session.data.user.id,
          public_token,
          metadata,
        });

        updateData.mutate(session.data.user.id);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onExit: (err, metadata) => {
      console.log("Plaid Link exited");
    },
    token: token,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <div className="bg-pink-300/5 rounded-lg p-8 flex flex-col items-center gap-4">
        <h1 className="text-xl text-center">Connect a bank account</h1>
        <Button
          onMouseDown={() => open()}
          disabled={!ready || !session}
          variant={"secondary"}
          className="font-bold"
        >
          Connect with <img src="/plaid_logo.svg" alt="plaid logo" className="h-6 pl-1" />
        </Button>
      </div>
    </div>
  );
}
