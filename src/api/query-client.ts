import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 5 * 1000,
      notifyOnChangeProps: ["data", "error", "isFetchingNextPage"],
    },
  },
});
