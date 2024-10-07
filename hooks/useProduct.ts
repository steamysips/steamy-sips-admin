import { useQuery } from "@tanstack/react-query";

export default function useProduct(productId: number) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      productId
        ? fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`
          ).then((res) => res.json())
        : null,
  });
}
