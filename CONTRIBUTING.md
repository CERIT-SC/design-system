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

bun run check
```

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

Use descriptive branch names with appropriate prefixes:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `misc/description` - Other changes
- `doc/description` - Documentation updates

### Examples for Branches

- `feature/protein-search-filters`
- `fix/3d-viewer-loading-issue`
- `misc/update-dependencies`
- `doc/api-documentation`
