import {
  Group,
  Title,
  ScrollArea,
  rem,
  UnstyledButton,
} from "@mantine/core";
import {
  IconGauge,
  IconPresentationAnalytics,
  IconAdjustments,
  IconBuildingStore,
  IconShoppingCartFilled,
  IconCup,
  IconMessage,
  IconLogout,
  IconUsers,
} from "@tabler/icons-react";
import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinksGroup";
import { Logo } from "./Logo";
import classes from "../styles/NavbarNested.module.css";

const mockdata = [
  {
    label: "Dashboard",
    icon: IconGauge,
    initiallyOpened: true,
    link: "/dashboard",
    links: [
      { label: "Sales Overview", link: "/dashboard/sales-overview" },
      { label: "Customer Insights", link: "/dashboard/customer-insights" },
      { label: "Performance Metrics", link: "/dashboard/performance-metrics" },
    ],
  },
  {
    label: "Orders",
    icon: IconShoppingCartFilled,
    links: [
      { label: "Pending Orders", link: "/orders/pending" },
      { label: "Completed Orders", link: "/orders/completed" },
      { label: "Refund Requests", link: "/orders/refunds" },
    ],
  },
  {
    label: "Products",
    icon: IconCup,
    links: [
      { label: "All Products", link: "/products/list" },
      { label: "Categories", link: "/products/categories" },
      { label: "Add New Product", link: "/products/new" },
      { label: "Inventory Management", link: "/products/inventory" },
    ],
  },
  {
    label: "Reviews",
    icon: IconMessage,
    links: [
      { label: "Customer Reviews", link: "/reviews/customers" },
      { label: "Response Templates", link: "/reviews/templates" },
      { label: "Review Analytics", link: "/reviews/analytics" },
    ],
  },
  {
    label: "Staff",
    icon: IconUsers,
    links: [
      { label: "All Staff", link: "/staff/list" },
      { label: "Roles & Permissions", link: "/staff/roles" },
    ],
  },
  {
    label: "Stores",
    icon: IconBuildingStore,
    links: [
      { label: "All Locations", link: "/stores/list" },
      { label: "Add New Store", link: "/stores/new" },
      { label: "Store Settings", link: "/stores/settings" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics },
  {
    label: "Settings",
    icon: IconAdjustments,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

interface NavBarProps {
  readonly handleLogOut: () => void;
}

export function NavbarNested({ handleLogOut }: NavBarProps) {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <ScrollArea>
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <Group>
            <Logo style={{ height: rem(40) }} />
            <Title order={4}>Steamy Sips Admin</Title>{" "}
          </Group>
        </div>
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
        <div className={classes.footer}>
          <UserButton />
          <UnstyledButton onClick={handleLogOut} className={classes.link}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </UnstyledButton>
        </div>
      </nav>
    </ScrollArea>
  );
}
