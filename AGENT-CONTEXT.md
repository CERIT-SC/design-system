# Agent Context: Coding Principles for This Design System

This guide helps new users and contributors use the library correctly and keep changes consistent.

## 1) Core Principles

- Keep components reusable, typed, and accessible.
- Prefer composition over one-off custom variants.
- Follow existing patterns before introducing new abstractions.
- Keep docs and stories in sync with code changes.
- End every task with formatting and lint checks.

## 2) Project Structure and Responsibilities

- `lib/` contains the library source code.
- `lib/components/primitives/` contains atomic UI building blocks.
- `lib/components/compounds/` contains composed components.
- `lib/components/layout/` contains layout and navigation structures.
- `lib/components/foundations/` contains foundational design elements (for example typography).
- `src/` is the showcase/testing app area.
- `docs/components/` contains MDX documentation.

## 3) Naming Conventions

### Files and folders

- Use `kebab-case` for component files.
- Keep story files next to components and name them `*.stories.tsx`.
- Use `index.ts` for barrel exports in directories.

Examples:

- `button.tsx`
- `cookies-banner.tsx`
- `button.stories.tsx`
- `lib/components/primitives/index.ts`

### Symbols and types

- Use `PascalCase` for React components (`Button`, `CookiesBanner`).
- Use `PascalCase` for props interfaces (`ButtonProps`, `HeaderProps`) when explicit interfaces are needed.
- Use `camelCase` for helpers and internal values (`buttonVariants`, `meta`).

### Exports

- Export components through local barrel files and keep the global export chain consistent:
  - component file -> category index -> `lib/components/index.ts` -> `lib/index.ts`

## 4) Component Authoring Rules

- Build primitives first; create compounds only when composing stable primitives.
- Keep component APIs minimal and predictable.
- Preserve semantic HTML (`button`, `label`, `input`, `nav`, `table`, etc.).
- Include ARIA attributes and keyboard support where relevant.
- Use shared class helpers and variant patterns already used in the repo (`cn`, `cva`).
- Avoid hardcoding visual tokens when a design-system token already exists.

## 5) Component Usage Rules

- Import from the package entry when consuming the library externally.
- In library source, follow local relative import patterns already in place.
- Prefer existing variants/sizes/states before adding new props.
- Keep state and behavior composable; avoid embedding app-specific logic inside primitives.
- If a component needs custom behavior, compose around it rather than mutating shared primitive behavior globally.

## 6) Required Documentation for Component Changes

When adding or significantly changing a component, update all of the following:

- Component source in `lib/components/...`
- Storybook story in `lib/components/.../*.stories.tsx`
- MDX documentation in `docs/components/.../*.mdx`

Each docs/stories update should include:

- Basic usage example.
- Variant/state examples.
- Props documentation (type/default/description).
- Accessibility notes if behavior changed.

## 7) Quality Gates (Mandatory at End of Every Task)

Run these commands before opening a PR or marking work as done:

```bash
bun run format
bun run lint
bun run typecheck:lib
```

If you changed showcase/app code in `src/`, also run:

```bash
bun run typecheck:showcase
```

Recommended fix flow when checks fail:

```bash
bun run format
bun run lint:fix
bun run lint
bun run typecheck:lib
```

Note: `bun run check` currently points to `type:check` in `package.json`, while the available scripts are `typecheck:lib` and `typecheck:showcase`. Prefer the explicit commands above until that alias is corrected.

## 8) Definition of Done

A task is complete only when:

- Naming and file placement follow conventions.
- Component API is typed and accessible.
- Stories and MDX docs are updated when applicable.
- Formatting has been run.
- Linting passes.
- Type checks pass for impacted targets.

## 9) Common Anti-Patterns to Avoid

- Creating a new component when an existing primitive + composition solves it.
- Adding one-off variant props without broader design-system value.
- Skipping docs/stories for behavior or API changes.
- Shipping with lint warnings or unformatted files.
- Using inconsistent naming patterns across files and exports.
