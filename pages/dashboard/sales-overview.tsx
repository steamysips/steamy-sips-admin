import { StatsGrid } from "../../components/StatsGrid";
import { Card, Group, Stack, Text } from "@mantine/core";
import { AreaChart, BarChart } from "@mantine/charts";
import { Comment } from "../../components/Comment";

export const data = [
  {
    date: "Mar 22",
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: "Mar 23",
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: "Mar 24",
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: "Mar 25",
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: "Mar 26",
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];

export default function SalesOverviewPage() {
  return (
    <Stack gap="md">
      <StatsGrid></StatsGrid>
      <Group grow>
        <Card>
          <AreaChart
            h={300}
            data={data}
            dataKey="date"
            series={[
              { name: "Apples", color: "indigo.6" },
              { name: "Oranges", color: "blue.6" },
              { name: "Tomatoes", color: "teal.6" },
            ]}
            curveType="linear"
          />
        </Card>
        <Stack h={300} align="stretch" justify="center" gap="md">
          <Text size="md" fw={500}>
            Latest Reviews
          </Text>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
        </Stack>
      </Group>
      <BarChart
        mt={30}
        orientation="vertical"
        h={200}
        data={[
          { category: "Cappuccino", Sales: 100 },
          { category: "Latte", Sales: 20 },
          { category: "Cofi", Sales: 35 },
        ]}
        dataKey="category"
        series={[{ name: "Sales" }]}
      />
    </Stack>
  );
}
