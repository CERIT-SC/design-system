import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { userEvent, within } from "storybook/test";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Button } from "./button";
import { Input } from "./input";

// `Form` is react-hook-form's FormProvider, so the field composition is the
// meaningful unit to document; the stories render a complete form.
const meta = {
  title: "Primitives/Form",
  component: FormItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormItem>;

export default meta;
type Story = StoryObj<typeof meta>;

interface ProfileValues {
  username: string;
  email: string;
}

function ProfileForm() {
  const form = useForm<ProfileValues>({
    defaultValues: { username: "", email: "" },
  });

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(() => undefined)}
        className="w-[360px] space-y-6"
      >
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: "Username is required.",
            minLength: {
              value: 2,
              message: "Username must be at least 2 characters.",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jnovakova" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address.",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <ProfileForm />,
};

/** Submits the empty form so error labels and messages are a11y-checked too. */
export const WithErrors: Story = {
  render: () => <ProfileForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await canvas.findByText("Username is required.");
  },
};
