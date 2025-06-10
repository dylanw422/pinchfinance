import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUserCount = () => {
  return useQuery({
    queryKey: ["user-count"],
    queryFn: async () => {
      const res = await axios.get("/api/waitlist");
      return res.data.count[0].count;
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await axios.post("/api/waitlist", {
        email,
      });

      return res;
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user-count"] }),
  });
};
