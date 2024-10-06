import {
  Button,
  Group,
  LoadingOverlay,
  Table,
  Text,
  Alert,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { IconInfoCircle } from "@tabler/icons-react";

import { Product } from "../../common/types";

export default function ListProducts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["productData"],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/products").then((res) =>
        res.json()
      ),
  });

  if (isPending) return <LoadingOverlay visible={true} />;
  if (error)
    return (
      <Alert
        variant="danger"
        title={"API is unavailable. Please try again later."}
        icon={<IconInfoCircle />}
      ></Alert>
    );

  const rows = data.map((product: Product) => {
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
            <Button w={120}>View</Button>
            <Button variant="danger" w={120}>
              Delete
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table highlightOnHover>
        {" "}
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Calories</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Price (Rs)</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody pos="relative">{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
