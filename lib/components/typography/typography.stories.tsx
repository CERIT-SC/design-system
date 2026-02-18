import type { Meta, StoryObj } from "@storybook/react";
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Strong,
  Small,
  Muted,
  Code,
  Link,
  Blockquote,
  List,
  OrderedList,
} from "./typography";

const meta = {
  title: "Typography/All Components",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const AllTypography: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-3xl">
      <div className="space-y-2">
        <Muted>MAIN HEADING (H1)</Muted>
        <H1>The quick brown fox jumps over the lazy dog</H1>
      </div>

      <div className="space-y-2">
        <Muted>SECTION HEADING (H2)</Muted>
        <H2>The quick brown fox jumps over the lazy dog</H2>
      </div>

      <div className="space-y-2">
        <Muted>SUB-HEADING (H3)</Muted>
        <H3>The quick brown fox jumps over the lazy dog</H3>
      </div>

      <div className="space-y-2">
        <Muted>SUB-SECTION (H4)</Muted>
        <H4>The quick brown fox jumps over the lazy dog</H4>
      </div>

      <div className="space-y-2">
        <Muted>LEAD TEXT</Muted>
        <Lead>
          The quick brown fox jumps over the lazy dog. This is lead text used
          for introductions and important opening paragraphs.
        </Lead>
      </div>

      <div className="space-y-2">
        <Muted>BODY TEXT (P)</Muted>
        <P>
          The quick brown fox jumps over the lazy dog. This is standard body
          text that should be used for most content. It provides good
          readability and comfortable reading experience.
        </P>
      </div>

      <div className="space-y-2">
        <Muted>BOLD PARAGRAPH (STRONG)</Muted>
        <Strong>
          The quick brown fox jumps over the lazy dog. This is emphasized body
          text for important information that needs to stand out.
        </Strong>
      </div>

      <div className="space-y-2">
        <Muted>SMALL TEXT</Muted>
        <Small>
          The quick brown fox jumps over the lazy dog. This is smaller text used
          for captions, helper text, or secondary information.
        </Small>
      </div>

      <div className="space-y-2">
        <Muted>EXTRA SMALL / CAPTION (MUTED)</Muted>
        <Muted>
          The quick brown fox jumps over the lazy dog. Used for timestamps,
          labels, and micro-copy.
        </Muted>
      </div>

      <div className="space-y-2">
        <Muted>CODE / MONOSPACE</Muted>
        <Code>const greeting = &quot;Hello World&quot;;</Code>
      </div>

      <div className="space-y-2">
        <Muted>LINK</Muted>
        <Link href="#">This is a standard link</Link>
      </div>

      <div className="space-y-2">
        <Muted>BLOCKQUOTE</Muted>
        <Blockquote>
          &quot;The quick brown fox jumps over the lazy dog. This is a
          blockquote used for quotations and important callouts.&quot;
        </Blockquote>
      </div>

      <div className="space-y-2">
        <Muted>UNORDERED LIST</Muted>
        <List>
          <li>First item in the list</li>
          <li>Second item in the list</li>
          <li>Third item in the list</li>
        </List>
      </div>

      <div className="space-y-2">
        <Muted>ORDERED LIST</Muted>
        <OrderedList>
          <li>First step in the process</li>
          <li>Second step in the process</li>
          <li>Third step in the process</li>
        </OrderedList>
      </div>
    </div>
  ),
};

export const Headings: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
    </div>
  ),
};

export const Paragraphs: StoryObj = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Lead>
        This is a lead paragraph used for introductions. It&apos;s slightly
        larger and stands out from regular body text.
      </Lead>
      <P>
        This is a standard paragraph. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </P>
      <Strong>
        This is a strong/bold paragraph for emphasis. It&apos;s used when you
        need text to stand out more prominently.
      </Strong>
      <Small>
        This is small text used for secondary information, captions, or helper
        text.
      </Small>
      <Muted>
        This is muted text for timestamps, labels, and very small supporting
        text.
      </Muted>
    </div>
  ),
};

export const InlineElements: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <P>
        This is a paragraph with <Code>inline code</Code> in the middle of it.
      </P>
      <P>
        This is a paragraph with a <Link href="#">link element</Link> in the
        middle of it.
      </P>
    </div>
  ),
};
