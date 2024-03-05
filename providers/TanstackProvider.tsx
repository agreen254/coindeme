"use client";

import { toastError } from "@/utils/toastError";
import { useState } from "react";

import {
  QueryCache,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose#defining-on-demand-messages
        queryCache: new QueryCache({
          onError: (error, query) => {
            toastError(error, query);
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
