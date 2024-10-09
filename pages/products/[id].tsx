import { useRouter } from "next/router";
import useProduct from "../../hooks/useProduct";
import {
  Alert,
  Group,
  Breadcrumbs,
  LoadingOverlay,
  Title,
  Text,
  Table,
  Stack,
  Anchor,
  ActionIcon,
  Image,
} from "@mantine/core";
import { IconPencil, IconInfoCircle } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const StoreMap = dynamic(() => import("../../components/StoreMap"), {
  ssr: false,
});

export default function DisplayProduct() {
  const router = useRouter();
  const productId = Number(router.query.id);
  const productQuery = useProduct(productId);

  const storeQuery = useQuery({
    queryKey: ["products/", productId, "stores"],
    queryFn: () =>
      productId
        ? fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/stores`
          ).then((res) => res.json())
        : null,
  });

  if (productQuery.isPending || storeQuery.isPending || !productId)
    return <LoadingOverlay visible={true} />;

  if (productQuery.error)
    return (
      <Alert
        variant="danger"
        title={"Product not found."}
        icon={<IconInfoCircle />}
      ></Alert>
    );

  const navigationLinks = [
    { title: "Products", href: "/products/list" },
    { title: productQuery.data.name, href: "/products/" + productId },
  ].map((item) => (
    <Anchor component={Link} href={item.href} key={item.href}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack>
      <Breadcrumbs>{navigationLinks}</Breadcrumbs>
      <Group>
        <Title order={1}>{productQuery.data.name}</Title>
        <ActionIcon variant="outline" aria-label="Edit product">
          <IconPencil style={{ width: "90%", height: "90%" }} stroke={1.5} />
        </ActionIcon>
      </Group>
      <Image
        w="200"
        radius="md"
        src={`${process.env.NEXT_PUBLIC_STEAMY_IMG_URL}/${productQuery.data.img_url}`}
        alt={productQuery.data.img_alt_text}
      />
      <Text size="md">{productQuery.data.description}</Text>
      <Title order={2}>Data Sheet</Title>
      <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Td>{productQuery.data.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Price (Rs)</Table.Th>
            <Table.Td>{productQuery.data.price}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Calories (kCal)</Table.Th>
            <Table.Td>{productQuery.data.calories}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Category</Table.Th>
            <Table.Td>{productQuery.data.category}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Date of creation</Table.Th>
            <Table.Td>
              {productQuery.data.created_date
                ? productQuery.data.created_date.date
                : "Not set"}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Title order={2}>Stores ({storeQuery.data.length})</Title>
      <StoreMap stores={storeQuery.data} />
    </Stack>
  );
}
