import { Paper, TextInput, PasswordInput, Button, Title } from "@mantine/core";
import classes from "../styles/AuthenticationImage.module.css";

export default function LoginPage() {
  async function callAPI() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL ?? "", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Steamy Sips Admin Portal
        </Title>

        <TextInput
          label="Email address"
          placeholder="admin@steamy.com"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>
      </Paper>
    </div>
  );
}
