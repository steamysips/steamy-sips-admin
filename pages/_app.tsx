import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider, AppShell, Burger } from "@mantine/core";
import { theme } from "../theme";
import { NavbarNested } from "../components/NavbarNested";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface AppProps {
  Component: () => JSX.Element;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle }] = useDisclosure();
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn, router]);

  function updateLoginStatus(newStatus: boolean) {
    setLoggedIn(newStatus);
    console.log("status changed to " + loggedIn);
  }

  function getMainLayout() {
    return (
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
        <AppShell.Navbar>
          <NavbarNested />
        </AppShell.Navbar>

        <AppShell.Main>
          <Component {...pageProps} />
        </AppShell.Main>
      </AppShell>
    );
  }
  return (
    <MantineProvider theme={theme}>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔒</text></svg>"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Admin website for the Steamy Sips e-commerce platform"
        />
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <title>Steamy Sips Admin</title>
      </Head>
      {router.pathname == "/" ? (
        <Component {...pageProps} updateLoginStatus={updateLoginStatus} />
      ) : (
        getMainLayout()
      )}
    </MantineProvider>
  );
}
