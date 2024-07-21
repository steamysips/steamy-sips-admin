import "@mantine/core/styles.css";
import Head from "next/head";
import {
  MantineProvider,
  Container,
  AppShell,
  Burger,
  Group,
  Skeleton,
} from "@mantine/core";
import { theme } from "../theme";
import Header from "../components/HeaderSimple";
import Footer from "../components/FooterSimple";
import { IconBrandGooglePhotos } from "@tabler/icons-react";
import { NavbarNested } from "../components/NavbarNested";
import { useDisclosure } from "@mantine/hooks";

interface AppProps {
  Component: () => JSX.Element;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  const URL = "http://localhost:80/steamy-sips/public";
  const [opened, { toggle }] = useDisclosure();

  // (async function callAPI() {
  //   try {
  //     const response = await fetch(URL, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })();

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔒</text></svg>"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content="Admin website for the Steamy Sips e-commerce platform"
        />
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <title>Steamy Sips Admin</title>
      </Head>
      <AppShell
        // header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        {/* <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </AppShell.Header> */}
        <AppShell.Navbar>
          <NavbarNested />
        </AppShell.Navbar>
        <AppShell.Main>
          <Component {...pageProps} />
        </AppShell.Main>

        {/* <AppShell.Footer>
          <Footer></Footer>
        </AppShell.Footer> */}
      </AppShell>
    </MantineProvider>
  );
}
