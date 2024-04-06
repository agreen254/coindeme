import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryCache, QueryClient } from "@tanstack/react-query";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { renderErrorToast } from "@/components/Toast/ErrorToast";
import { PersistGate } from "@/components/PersistGate";

const TanstackPersistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        const message = [query?.meta?.errorMessage, error?.message].join(" ");
        renderErrorToast(message);
      },
    }),
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  // need to do this check and combine with a <Suspense> or it will throw a `window is undefined` error
  const persister =
    typeof window !== "undefined"
      ? createSyncStoragePersister({
          storage: window.localStorage,
        })
      : null;

  if (!persister) return <></>;
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <PersistGate>{children}</PersistGate>
    </PersistQueryClientProvider>
  );
};

export default TanstackPersistProvider;
