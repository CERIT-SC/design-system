# Changelog

## v0.2.0

- Added chat components for building conversational interfaces:
  - `Chat` layout wrapper with `ChatHeader`, `ChatMessages` and `ChatFooter`
  - `Message` with `MessageGroup`, `MessageAvatar`, `MessageHeader`, `MessageContent`, `MessageFooter` and `MessageTimestamp`
  - `Bubble` primitive with `BubbleGroup`, `BubbleContent` and `BubbleReactions`, in default, secondary, muted, tinted, outline, ghost and error variants
  - `MessageInput` composer with auto-growing textarea, file attachments, submit/stop button driven by `ready`/`submitted`/`streaming` status, and a `MessageInputToolbar` with left and right slots
  - `MessageScroller` with auto-scroll to the latest message, scroll-to-edge button and `useMessageScroller` / `useMessageScrollerScrollable` hooks
  - `MessageActions` with `MessageCopyButton`
  - `MessageTyping` typing indicator
- Added `typing-dot` animation to all theme setup CSS files and a `scrollbar-gutter-stable` utility to `setup.css`
- Added docs, previews and Storybook stories for all chat components
- Added controlled `step` prop to Stepper, `showNavigation` prop to `StepperHeader`, and icon support in step markers
- Fixed Stepper progress fill protruding past the final step marker
- Fixed `Lead`, `Small` and `Muted` typography not using the muted foreground color

## v0.1.9

- Exported previously missing primitives (chart, command, context-menu, pagination, popover, resizable) from the component library
- Removed the deprecated Panel component
- Added animation utilities and an `elter_setup.css` export for the eLTER theme
- Refined the EOSC color palette
- Fixed feedback form auto-close/progress timing bug
- Fixed minor styling issues in Button, Alert, Avatar, Checkbox, Switch, Sidebar and Content components

## v0.1.8

- Added new color palette for eLTER design system
- Updated EOSC CZ color palette, added dark mode support
- Update base e-infra CZ color palette, fixed dark mode saturation and contrast issues
- added search for docs in the showcase app
- added searchbar component to the component library
- added new footer component with API matching header
- added storybook button for redirect in each component docs page

## v0.1.7

- custom color palette available in beta

## v0.1.6

- Added stepper component
- Fixed shade ramp colors
- Fixed issues with Content component compounds
- Broadened lucide-react peer compatibility to support 0.400.x and 1.x releases

## v0.1.5

- Added Dark Mode support
- Added surface and surface-raised colors for separating content and creating depth
- Added shade ramps for brand and semantic colors to provide more options for design and accessibility

## v0.1.4

## v0.1.3

## v0.1.2

- Update typography components with new styles and variants
- Update card component with new variants and animation

## v0.1.1

- Update header component with bigger components
- Update sidebar spacings, update font boldness, remove uppercase from links
- Update Ghost, Link, and Outline button variants with new colors and hover states
- Add Animated Underline button variant
- Change "muted" color to match purple color scheme

## v0.1.0

- Update header component
- Update and simplify sidebar
- Update card and panel components
- Update setup.css with new radius variable

## v0.0.9

## v0.0.8

- Major changes

## v0.0.7

- Migrate showcase app to Next.js
- Update showcase sidebar
- Minor fixes

## v0.0.6

## v0.0.5

## v0.0.4

- Added stepper

## v0.0.3

- Fix issues related to client components

## v0.0.2

- Added few first components

## v0.0.1 - Initial Commit

- Project setup
