import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

const meta = {
    title: 'Components/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const Checked: Story = {
    args: {
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <label htmlFor="airplane-mode" className="text-sm font-medium">
                Airplane Mode
            </label>
        </div>
    ),
};
