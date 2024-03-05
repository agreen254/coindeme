import { Query, QueryKey } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function toastError(
  error: Error,
  query: Query<unknown, unknown, unknown, QueryKey>
) {
  toast.error(`${query?.meta?.errorMessage} ${error?.message}`, {
    duration: 10 * 1000,
    position: "bottom-right",
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
}