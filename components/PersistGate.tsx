import { useIsRestoring } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

/**
 * Used to prevent nextjs hydration errors: prevents UI from rendering while data from local storage is being loaded.
 * Only a good solution for client components.
 *
 * https://github.com/TanStack/query/issues/6472
 */
export function PersistGate({ children, fallback = null }: Props) {
  const isRestoring = useIsRestoring();

  return isRestoring ? fallback : children;
}
