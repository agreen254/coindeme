import { Query, QueryKey } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function toastError(
  error: Error,
  query: Query<unknown, unknown, unknown, QueryKey>
) {
  toast.error(`${query?.meta?.errorMessage} ${error?.message}`);
}
