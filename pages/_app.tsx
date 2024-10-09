import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import Head from "next/head";
import { MantineProvider, AppShell, Burger } from "@mantine/core";
import { theme } from "../theme";
import { NavbarNested } from "../components/NavbarNested";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProps {
  readonly Component: () => JSX.Element;
  readonly pageProps: any;
}
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle }] = useDisclosure();
  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  // if user is not logged in redirect to login page
  useEffect(() => {
    if (loggedIn) return;

    // if user is currently on 404 page, ignore
    if (router.pathname == "/404") return;

    // else redirect user to login page
    router.push("/");
  }, [loggedIn, router]);

  /**
   * Call this functions when login is successful
   */
  function handleLogIn() {
    setLoggedIn(true);
    router.push("/dashboard/sales-overview");
  }

  /**
   * Call this function to logout
   */
  function handleLogOut() {
    setLoggedIn(false);
    router.push("/");
  }

  function getMainLayout() {
    return (
      <QueryClientProvider client={queryClient}>
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
            <NavbarNested handleLogOut={handleLogOut} />
          </AppShell.Navbar>

          <AppShell.Main>
            <Component {...pageProps} />
          </AppShell.Main>
        </AppShell>
      </QueryClientProvider>
    );
  }

  const onLoginPage = router.pathname === "/";
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
      {onLoginPage ? (
        <Component {...pageProps} handleLogIn={handleLogIn} />
      ) : (
        getMainLayout()
      )}
    </MantineProvider>
  );
}
