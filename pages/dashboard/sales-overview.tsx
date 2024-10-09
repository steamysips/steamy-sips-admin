import { StatsGrid } from "../../components/StatsGrid";
import { Card, Group, LoadingOverlay, Stack, Text } from "@mantine/core";
import { AreaChart, BarChart } from "@mantine/charts";
import { Comment } from "../../components/Comment";
import { useQueries } from "@tanstack/react-query";
import useOrdersSalesOverTime from "../../hooks/useOrdersSalesOverTime";

interface Review {
  review_id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  created_date: string;
  text: string;
  client_id: number;
  product_id: number;
}

export default function SalesOverviewPage() {
  const ordersQuery = useOrdersSalesOverTime();

  const [salesCategoryQuery, reviewsQuery] = useQueries({
    queries: [
      {
        queryKey: ["products", "stats", "sales-per-category"],
        queryFn: () =>
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/stats/sales-per-category`
          ).then((res) => res.json()),
        refetchInterval: 2000,
        staleTime: 5000,
      },
      {
        queryKey: ["review", "latest"],
        queryFn: () =>
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?limit=3&order_by=created_date`
          ).then((res) => res.json()),
        refetchInterval: 2000,
        staleTime: 5000,
      },
    ],
  });

  if (
    ordersQuery.isLoading ||
    salesCategoryQuery.isLoading ||
    reviewsQuery.isLoading
  ) {
    return <LoadingOverlay visible={true} />;
  }

  const comments = reviewsQuery.data.map((e: Review) => (
    <Comment
      key={e.review_id}
      author={"User " + e.client_id}
      comment={e.text}
      date={e.created_date}
    />
  ));

  return (
    <Stack gap="md">
      <StatsGrid></StatsGrid>
      <Group grow>
        <Stack>
          <Text size="md" fw={500}>
            Total orders{" "}
          </Text>
          <AreaChart
            h={300}
            data={ordersQuery.data}
            dataKey="month"
            series={[{ name: "totalOrders", color: "indigo.6" }]}
            curveType="linear"
          />
        </Stack>
        <Stack h={300} align="stretch" justify="center" gap="md">
          <Text size="md" fw={500}>
            Latest Reviews
          </Text>
          {comments}
        </Stack>
      </Group>
      <div>
        <Text size="md" fw={500}>
          Sales per category{" "}
        </Text>
        <BarChart
          mt={30}
          h={200}
          data={salesCategoryQuery.data}
          dataKey="category"
          series={[{ name: "unitsSold", color: "teal.6" }]}
        />
      </div>
    </Stack>
  );
}
