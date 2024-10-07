import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`).then((res) =>
        res.json()
      ),
  });
}
