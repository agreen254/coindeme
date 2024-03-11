"use client";

import { renderErrorToast } from "@/components/Toast/ErrorToast";
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
            /**
             * Each query has the meta prop where a custom error message can be passed in. The meta prop has access to useful information like
             * the query key that helps for further customization.
             * 
             * Error text will be rendered like this:
             * <custom generic error message>: <error status> <error status text>
             */
            const message = [query?.meta?.errorMessage, error?.message].join(
              " "
            );
            renderErrorToast(message);
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
