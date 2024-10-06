import {
  TextInput,
  NumberInput,
  Button,
  SimpleGrid,
  Image,
  Text,
  Textarea,
  Select,
  MultiSelect,
  Group,
  rem,
  Stack,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { useState } from "react";
import classes from "../../styles/Dropzone.module.css";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";

export default function CreateProductForm() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        alt=""
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  return (
    <Stack >
      <h1>Create Product ☕</h1>
      <TextInput
        label="Name"
        type="text"
        required
        placeholder="Chocco Chips"
        size="md"
      />{" "}
      <Textarea label="Description" placeholder="A succulent coffee" required />{" "}
      <Select
        required
        label="Category"
        placeholder="Choose a category"
        data={["Espresso", "Cappuccino", "Vue", "Svelte"]}
      />
      <Group grow>
        <NumberInput label="Calories" placeholder="230" min={0} required />{" "}
        <NumberInput label="Price (Rs)" placeholder="100" min={1} required />{" "}
      </Group>
      <MultiSelect
        label="Stores"
        placeholder="Pick stores where product will be sold"
        data={["React", "Angular", "Vue", "Svelte"]}
      />
      <div>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={setFiles}
          className={classes.root}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>{" "}
        </Dropzone>

        <SimpleGrid
          cols={{ base: 1, sm: 4 }}
          mt={previews.length > 0 ? "xl" : 0}
        >
          {previews}
        </SimpleGrid>
      </div>
      <TextInput
        label="Image Alt Text"
        placeholder="A description of the uploaded image"
        type="text"
        required
        size="md"
      />
      <Button fullWidth>Create</Button>
    </Stack>
  );
}
