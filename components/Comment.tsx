import { Text, Avatar, Group, Paper } from "@mantine/core";

interface Comment {
  readonly author: string;
  readonly comment: string;
  readonly date: string;
}
export function Comment({ author, comment, date }: Comment) {
  return (
    <Paper withBorder radius="md" p="md">
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text size="sm">{author}</Text>
          <Text size="xs" c="dimmed">
            {date}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm" truncate="end">
        {comment}
      </Text>
    </Paper>
  );
}
