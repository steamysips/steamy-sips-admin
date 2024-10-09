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
import { Store } from "../../common/types";

const StoreMap = dynamic(() => import("../../components/StoreMap"), {
  ssr: false,
});

const stores: Store[] = [
  {
    store_id: 1,
    phone_no: "54353",
    latitude: -20.3484,
    longitude: 57.5522,
    street: "Shitty Street",
    city: "Rose-Hill",
  },
];

export default function DisplayProduct() {
  const router = useRouter();
  const productId = Number(router.query.id);
  const { isPending, error, data } = useProduct(productId);

  if (isPending || !productId) return <LoadingOverlay visible={true} />;
  if (error)
    return (
      <Alert
        variant="danger"
        title={"Product not found."}
        icon={<IconInfoCircle />}
      ></Alert>
    );

  const items = [
    { title: "Products", href: "/products/list" },
    { title: data.name, href: "/products/" + productId },
  ].map((item, index) => (
    <Anchor component={Link} href={item.href} key={item.href}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Group>
        <Title order={1}>{data.name}</Title>
        <ActionIcon variant="outline" aria-label="Edit product">
          <IconPencil style={{ width: "90%", height: "90%" }} stroke={1.5} />
        </ActionIcon>
      </Group>
      <Image
        w="200"
        radius="md"
        src={`${process.env.NEXT_PUBLIC_STEAMY_IMG_URL}/${data.img_url}`}
        alt={data.img_alt_text}
      />
      <Text size="md">{data.description}</Text>
      <Title order={2}>Data Sheet</Title>
      <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Td>{data.name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Price (Rs)</Table.Th>
            <Table.Td>{data.price}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Calories (kCal)</Table.Th>
            <Table.Td>{data.calories}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Category</Table.Th>
            <Table.Td>{data.category}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Date of creation</Table.Th>
            <Table.Td>
              {data.created_date ? data.created_date.date : "Not set"}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Title order={2}>Stores</Title>
      <StoreMap stores={stores} />
    </Stack>
  );
}
