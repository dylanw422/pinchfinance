import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateData = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await axios.post("/api/sync", {
        userId,
      });

      return res.data;
    },
  });
};
