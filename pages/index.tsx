import { Paper, TextInput, PasswordInput, Button, Title } from "@mantine/core";
import classes from "../styles/AuthenticationImage.module.css";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

interface formData {
  email: string;
  password: string;
}

interface pageProps {
  updateLoginStatus: (loggedIn: boolean) => void;
}

export default function LoginPage({ updateLoginStatus }: pageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL ?? "",
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 3 ? null : "Password too short"),
    },
  });

  async function validateCredentials(values: formData) {
    try {
      setLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        updateLoginStatus(true);
        router.push("/dashboard/sales-overview");
      } else {
        window.alert("Invalid credentials");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      window.alert("Service is unavailable. Please try again later.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={form.onSubmit(validateCredentials)}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            Steamy Sips Admin Portal
          </Title>
          <TextInput
            label="Email address"
            type="email"
            required
            placeholder="admin@steamy.com"
            size="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            required
            placeholder="Your password"
            mt="md"
            size="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button loading={loading} type="submit" fullWidth mt="xl" size="md">
            Login
          </Button>
        </Paper>
      </div>
    </form>
  );
}
