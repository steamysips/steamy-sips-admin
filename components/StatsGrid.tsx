import { Group, LoadingOverlay, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "../styles/StatsGrid.module.css";
import { useQueries } from "@tanstack/react-query";

interface OrdersSalesOverTime {
  month: string;
  totalOrders: number;
  totalRevenue: string;
  percentageDifferenceOrders: string;
  percentageDifferenceRevenue: string;
}

interface ReviewStatsOverTime {
  month: string;
  totalReviews: number;
  percentageDifference: number;
}

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

/**
 * Get the current year and month in the format YYYY-MM-01.
 *
 * @returns {string} The current date in the format YYYY-MM-01.
 */
function getCurrentYearMonthFirstDay() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
  return `${year}-${month}-01`;
}

export function StatsGrid() {
  const [ordersQuery, reviewsQuery, productsQuery] = useQueries({
    queries: [
      {
        queryKey: ["orders", "stats", "sales-over-time"],
        queryFn: () =>
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/stats/sales-over-time`
          ).then((res) => res.json()),
        refetchInterval: 2000,
        staleTime: 5000,
      },
      {
        queryKey: ["reviews", "stats", "count-over-time"],
        queryFn: () =>
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/stats/count-over-time`
          ).then((res) => res.json()),
        refetchInterval: 2000,
        staleTime: 5000,
      },
      {
        queryKey: ["products", "stats", "sales-per-category"],
        queryFn: () =>
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/stats/sales-per-category`
          ).then((res) => res.json()),
        refetchInterval: 2000,
        staleTime: 5000,
      },
    ],
  });

  if (
    ordersQuery.isLoading ||
    reviewsQuery.isLoading ||
    productsQuery.isLoading
  ) {
    return <LoadingOverlay visible={true} />;
  }

  const currentMonth = getCurrentYearMonthFirstDay();

  // find orders stats for current month
  const currentMonthOrderData = ordersQuery.data.filter(
    (e: OrdersSalesOverTime) => e.month === currentMonth
  )[0];

  // find review stats for current month
  const currentMonthReviewData = reviewsQuery.data.filter(
    (e: ReviewStatsOverTime) => e.month === currentMonth
  )[0];

  const data = [
    {
      title: "Revenue",
      icon: "receipt",
      value: currentMonthOrderData ? currentMonthOrderData.totalRevenue : 0,
      diff: currentMonthOrderData
        ? currentMonthOrderData.percentageDifferenceRevenue
        : 0,
    },
    {
      title: "Reviews",
      icon: "coin",
      value: currentMonthReviewData ? currentMonthReviewData.totalReviews : 0,
      diff: currentMonthReviewData
        ? currentMonthReviewData.percentageDifference
        : 0,
    },
    {
      title: "Orders",
      icon: "discount",
      value: currentMonthOrderData ? currentMonthOrderData.totalOrders : 0,
      diff: currentMonthOrderData
        ? currentMonthOrderData.percentageDifferenceOrders
        : 0,
    },
  ] as const;

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
