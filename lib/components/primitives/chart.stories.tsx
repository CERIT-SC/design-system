import type { Meta, StoryObj } from "@storybook/react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart";

const meta = {
  title: "Primitives/Chart",
  component: ChartContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
  { month: "January", cpu: 186, gpu: 80 },
  { month: "February", cpu: 305, gpu: 200 },
  { month: "March", cpu: 237, gpu: 120 },
  { month: "April", cpu: 73, gpu: 190 },
  { month: "May", cpu: 209, gpu: 130 },
  { month: "June", cpu: 214, gpu: 140 },
];

const config = {
  cpu: { label: "CPU hours", color: "var(--chart-1)" },
  gpu: { label: "GPU hours", color: "var(--chart-2)" },
} satisfies ChartConfig;

// `config` and `children` are required by ChartContainer; every story
// renders its own chart, so these args only satisfy the type.
const baseArgs = { config, children: <></> };

export const Bars: Story = {
  args: baseArgs,
  render: () => (
    <ChartContainer config={config} className="min-h-[250px] w-[500px]">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="cpu" fill="var(--color-cpu)" radius={4} />
        <Bar dataKey="gpu" fill="var(--color-gpu)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};

export const Lines: Story = {
  args: baseArgs,
  render: () => (
    <ChartContainer config={config} className="min-h-[250px] w-[500px]">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="cpu"
          type="monotone"
          stroke="var(--color-cpu)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="gpu"
          type="monotone"
          stroke="var(--color-gpu)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
};
