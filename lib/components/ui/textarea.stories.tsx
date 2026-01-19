import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta = {
    title: 'Components/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Type your message here...',
    },
};

export const WithValue: Story = {
    args: {
        defaultValue: 'This is some default text in the textarea.',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Disabled textarea',
        disabled: true,
    },
};
