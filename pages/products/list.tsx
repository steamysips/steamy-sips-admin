/**
 * Reference: https://github.com/mantinedev/ui.mantine.dev/blob/master/lib/TableSort/TableSort.tsx
 */
import {
  Group,
  LoadingOverlay,
  Table,
  Text,
  Alert,
  rem,
  TextInput,
  keys,
  UnstyledButton,
  Center,
  ActionIcon,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconSearch,
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconTrash,
} from "@tabler/icons-react";
import { Product } from "../../common/types";
import useProducts from "../../hooks/useProducts";
import { useState } from "react";
import classes from "../../styles/TableSort.module.css";
import Link from "next/link";

/**
 * Criteria used for sorting and filtering
 */
export interface ProductSearch {
  product_id: number;
  name: string;
  calories: number;
  category: string;
  price: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function filterData(data: ProductSearch[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData(
  data: ProductSearch[],
  payload: {
    sortBy: keyof ProductSearch | null;
    reversed: boolean;
    search: string;
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export default function ListProducts() {
  const { isPending, error, data } = useProducts();
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof ProductSearch | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  if (isPending) return <LoadingOverlay visible={true} />;
  if (error)
    return (
      <Alert
        variant="danger"
        title={"API is unavailable. Please try again later."}
        icon={<IconInfoCircle />}
      ></Alert>
    );

  const rows = (sortedData || data).map((product: Product) => {
    return (
      <Table.Tr key={`product-${product.product_id}`}>
        <Table.Td>{product.product_id}</Table.Td>
        <Table.Td>{product.name}</Table.Td>
        <Table.Td>{product.category}</Table.Td>
        <Table.Td>{product.calories}</Table.Td>
        <Table.Td>
          <Text lineClamp={1}>{product.description}</Text>
        </Table.Td>
        <Table.Td>{product.price}</Table.Td>
        <Table.Td>
          <Group grow>
            <ActionIcon
              component={Link}
              href={`/products/${product.product_id}`}
              variant="light"
              aria-label="View product"
            >
              <IconInfoCircle
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>{" "}
            <ActionIcon variant="danger" aria-label="Delete product">
              <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>{" "}
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  const setSorting = (field: keyof ProductSearch) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  return (
    <div>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table.ScrollContainer minWidth={500}>
        <Table
          highlightOnHover
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
        >
          {" "}
          <Table.Thead>
            <Table.Tr>
              <Th
                sorted={sortBy === "product_id"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("product_id")}
              >
                ID
              </Th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "category"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("category")}
              >
                Category
              </Th>
              <Th
                sorted={sortBy === "calories"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("calories")}
              >
                Calories
              </Th>
              <Table.Th>Description</Table.Th>
              <Th
                sorted={sortBy === "price"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("price")}
              >
                Price (Rs)
              </Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody pos="relative">{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
