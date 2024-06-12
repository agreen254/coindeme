import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryCache, QueryClient } from "@tanstack/react-query";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useState } from "react";
import toast from "react-hot-toast";

import { PersistGate } from "@/components/PersistGate";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Queries that should be stored in the local storage require a different provider component.
 *
 * This component takes a 'persister':
 * https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient
 */
const TanstackPersistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            const message = [query?.meta?.errorMessage, error?.message].join(
              " "
            );
            toast.error(message, { position: "bottom-right" });
          },
        }),
        defaultOptions: {
          queries: {
            // time before unused data is removed from the store
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      })
  );

  const [persister] = useState(() =>
    createSyncStoragePersister({
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    })
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      <PersistGate>{children}</PersistGate>
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
};

export default TanstackPersistProvider;
