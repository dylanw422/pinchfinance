import { useQuery, useQueryClient } from "@tanstack/react-query";

const SELECTED_ACCOUNT_KEY = ["selected-account-id"];

export const useSelectedAccount = () => {
  const queryClient = useQueryClient();

  const { data: selectedAccountId } = useQuery({
    queryKey: SELECTED_ACCOUNT_KEY,
    queryFn: () => null,
    staleTime: Infinity,
  });

  const setSelectedAccount = (id: string | null) => {
    queryClient.setQueryData(SELECTED_ACCOUNT_KEY, id);
  };

  return { selectedAccountId, setSelectedAccount };
};
