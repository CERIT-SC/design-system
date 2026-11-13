# Contributing

## Maintainers

- `xcillik` - Jakub Čillík
- `romanaduraciova` - Romana Ďuráčiová
- `michalmikus` - Michal Mikuš

## Technical Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier

## Development Setup

### Prerequisites

- Package manager: **Bun**
- TypeScript
- Linting: **ESLint**
- Formatting: **Prettier**

### Installation

```bash
bun install
```

### Development Commands

Start local development server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Distribution output folder: `dist`

### Code

Folder `./lib` is mainly concerned with the library itself.

Folder `./src` is for testing the library components.

### Local Testing

Link the package locally:

```bash
bun link
```

Link it in any other project to test:

```bash
bun link design-system
```

Prepare and pack for distribution:

```bash
bun pm pack
```

## Code Quality

### Available Commands

```bash
bun run lint
bun run lint:fix

bun run format:check
bun run format

bun run type:check

bun run check:ai-manual

bun run check
```

### AI Agents Manual

[`docs/getting-started/AI-agents-manual.mdx`](docs/getting-started/AI-agents-manual.mdx) contains the skill users paste into their AI coding assistants. When you add, rename or remove an export, or change a component's props, default styles or tokens, update the skill in the same PR:

- `bun run check:ai-manual` fails when the component inventory doesn't match the library's exports. It runs in `bun run check` and in PR checks.
- On a release, review the manual and bump its "Last verified against" version line (the check warns when it differs from `package.json`).
- The repo's own Claude skill ([`.claude/skills/design-system/skill.md`](.claude/skills/design-system/skill.md)) reads the manual instead of duplicating it, so it needs no separate update.

## Commit Conventions

Use the following prefixes for commit messages:

- **Fix**: Bug fixes and error corrections
- **Feat**: New features, feature updates, refactoring
- **Misc**: Deployment changes, comments, scripts, non-direct fixes
- **Doc**: Documentation changes
- **Review**: Small changes during code review
- **Tests**: Test-related changes

### Examples for Commits

- `Fix: Resolve protein search query validation`
- `Feat: Add 3D protein structure visualization`
- `Misc: Update deployment configuration`
- `Doc: Update API documentation`
- `Review: Improve error handling`
- `Tests: Add unit tests for search functionality`

## Branch Naming

Use descriptive branch names with a prefix of the related issue number:

- `44-add-header-component` - New Header Component related to Issue #44
- `12-documentation-update` - Documentation update related to Issue #12
- `33-color-palette-update` - Color Palette update related to Issue #33
