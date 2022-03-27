import { EmptyPropsWithChildren } from "../types/react";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function ReactQueryProvider({ children }: EmptyPropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export { ReactQueryProvider };
