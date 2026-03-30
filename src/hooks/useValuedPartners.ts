import { useQuery } from "@tanstack/react-query";
import { apiFetch, ValuedPartner } from "../lib/api";

export function useValuedPartners() {
  return useQuery<ValuedPartner[]>({
    queryKey: ["valued-partners"],
    queryFn: () => apiFetch<ValuedPartner[]>("/api/home/valued-partners/"),
  });
}
