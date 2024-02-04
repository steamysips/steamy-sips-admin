import { Container, Group, Anchor, Text } from "@mantine/core";
import classes from "../styles/FooterSimple.module.css";
import React, { ReactComponentElement, ReactNode } from "react";

const links = [
  { link: "https://github.com/creme332", label: "Github" },
  { link: "mailto:c34560814@gmail.com", label: "Contact" },
];

export default function FooterSimple({ icon }: { icon: ReactNode }) {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        {icon}

        <Text c="dimmed" size="sm">
          Made by creme332
        </Text>

        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
