import type { Meta, StoryObj } from "@storybook/react";
import {
  Panel,
  PanelHeader,
  PanelFooter,
  PanelTitle,
  PanelDescription,
  PanelContent,
} from "./panel";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Checkbox } from "./checkbox";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Switch } from "./switch";
import { Slider } from "./slider";

const meta = {
  title: "Components/Panel",
  component: Panel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Panel className="w-[350px]">
      <PanelHeader>
        <PanelTitle>Panel Title</PanelTitle>
        <PanelDescription>Panel Description</PanelDescription>
      </PanelHeader>
      <PanelContent>
        <p>Panel content goes here.</p>
      </PanelContent>
    </Panel>
  ),
};

export const Simple: Story = {
  render: () => (
    <Panel className="w-[350px]">
      <PanelHeader>
        <PanelTitle>Simple Panel</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <p>This is a simple panel with minimal content.</p>
      </PanelContent>
    </Panel>
  ),
};

export const Form: Story = {
  render: () => (
    <Panel className="w-[800px]">
      <PanelHeader>
        <PanelTitle>Example Form</PanelTitle>
        <PanelDescription>All form components in one place</PanelDescription>
      </PanelHeader>
      <PanelContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="text">Text Input</Label>
            <Input id="text" type="text" placeholder="Enter text" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Input</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password Input</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Number Input</Label>
            <Input id="number" type="number" placeholder="0" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled Input</Label>
            <Input id="disabled" disabled placeholder="Disabled" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="readonly">Readonly Input</Label>
            <Input id="readonly" readOnly defaultValue="Read only value" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Textarea</Label>
          <Textarea id="message" placeholder="Type your message here." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message-large">Large Textarea</Label>
          <Textarea
            id="message-large"
            placeholder="Type a longer message..."
            rows={6}
          />
        </div>

        <div className="space-y-2">
          <Label>Select an option</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>

        <div className="space-y-2">
          <Label>Notifications</Label>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mentions" id="mentions" />
              <Label htmlFor="mentions">Mentions only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">None</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>

        <div className="space-y-2">
          <Label>Volume</Label>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </PanelContent>
      <PanelFooter>
        <Button>Submit</Button>
      </PanelFooter>
    </Panel>
  ),
};

export const DataDisplay: Story = {
  render: () => (
    <Panel className="w-[400px]">
      <PanelHeader>
        <PanelTitle>Resource Allocation</PanelTitle>
        <PanelDescription>
          Current allocation status for compute resources
        </PanelDescription>
      </PanelHeader>
      <PanelContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">CPU Cores</span>
            <span>48 of 96 used</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-chart-1"
              style={{ width: "50%" }}
            ></div>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Memory</span>
            <span>128 GB of 256 GB used</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-chart-2"
              style={{ width: "50%" }}
            ></div>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Storage</span>
            <span>2.5 TB of 5 TB used</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-chart-3"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  ),
};

export const InfrastructureStatus: Story = {
  render: () => (
    <Panel className="w-[400px]">
      <PanelHeader>
        <PanelTitle>e-INFRA CZ Services Status</PanelTitle>
        <PanelDescription>
          Real-time status of infrastructure services
        </PanelDescription>
      </PanelHeader>
      <PanelContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-success size-3 rounded-full"></div>
            <span>Compute Cluster</span>
          </div>
          <span className="text-success text-sm">Operational</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-success size-3 rounded-full"></div>
            <span>Storage System</span>
          </div>
          <span className="text-success text-sm">Operational</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-warning size-3 rounded-full"></div>
            <span>Network</span>
          </div>
          <span className="text-warning text-sm">Degraded</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-success size-3 rounded-full"></div>
            <span>Authentication</span>
          </div>
          <span className="text-success text-sm">Operational</span>
        </div>
      </PanelContent>
    </Panel>
  ),
};
