import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryCache, QueryClient } from "@tanstack/react-query";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { renderErrorToast } from "@/components/Toast/ErrorToast";
import { useState } from "react";

import { PersistGate } from "@/components/PersistGate";

/**
 * This provider allows the fetched history data to persist in the local storage.
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
            renderErrorToast(message);
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
    </PersistQueryClientProvider>
  );
};

export default TanstackPersistProvider;
