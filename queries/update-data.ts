import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateData = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (userId: string) => {
      await axios.post("/api/sync", {
        userId,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
