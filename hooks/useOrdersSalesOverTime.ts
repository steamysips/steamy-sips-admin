import { useQuery } from "@tanstack/react-query";

export default function useOrdersSalesOverTime() {
  return useQuery({
    queryKey: ["orders", "stats", "sales-over-time"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/stats/sales-over-time`
      ).then((res) => res.json()),
    refetchInterval: 2000,
    staleTime: 5000,
  });
}
