import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEY } from "../utils/query-keys";
import { useInfiniteQueryObserver } from "./useInfiniteQueryObserver";

export function useTanstackQuery() {
  const queryClient = useQueryClient();
  const queryKey = QUERY_KEY;

  return {
    queryKey,
    queryClient,
    useMutation,
    useQuery,
    useInfiniteQuery,
    useInfiniteQueryObserver,
  };
}
