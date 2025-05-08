import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      return await authClient.getSession();
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return axios.get("/api/user");
    },
  });
};
