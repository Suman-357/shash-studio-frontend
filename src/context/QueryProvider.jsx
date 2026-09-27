import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Enterprise TanStack Query Client Configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
      gcTime: 1000 * 60 * 15,    // 15 minutes garbage collection
      retry: 1,                 // Retry failed request once before erroring
      refetchOnWindowFocus: false, // Don't aggressively refetch on browser tab focus
    },
    mutations: {
      retry: 0,
    },
  },
});

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
