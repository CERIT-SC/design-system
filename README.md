# e-INFRA CZ Design System

[![npm version](https://img.shields.io/npm/v/@e-infra/design-system.svg)](https://www.npmjs.com/package/@e-infra/design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React component library for e-INFRA CZ applications, built with TypeScript and Tailwind CSS v4, based on radix UI and shadcn-UI.

## Features

- 30+ reusable components covering common UI patterns
- Fully typed with TypeScript for type safety
- Tailwind CSS v4 for utility-first styling
- Radix UI primitives for accessibility and interactivity
- Dark mode support and responsive design
- Comprehensive documentation and live showcase
- Customizable and extensible for various use cases

## Installation

```bash
bun add @e-infra/design-system

# or using yarn
yarn add @e-infra/design-system

# or using pnpm
pnpm add @e-infra/design-system

# or using npm
npm install @e-infra/design-system
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
bun add react react-dom tailwindcss

# or npm
npm install react react-dom tailwindcss
```

## Requirements

- React 18 or 19
- React DOM 18 or 19
- Tailwind CSS v4

## Quick Start

### 1. Import Styles

! Important: Ensure you import the library styles in your global CSS file, ideally immediately after Tailwind in your global stylesheet:

```css
@import "tailwindcss";
@import "@e-infra/design-system/setup.css";
@source "../node_modules/@e-infra/design-system/dist";
```

### 2. Usage of Components

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@e-infra/design-system";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get started</Button>
      </CardContent>
    </Card>
  );
}
```

## Package Exports

- `@e-infra/design-system` - Components, utilities, and hooks
- `@e-infra/design-system/setup.css` - Library CSS entry for Tailwind v4 setup

## Documentation

- Live showcase: https://design-system.e-infra.cz/
- Comprehensive documentation with usage examples, API reference, and best practices for all components: https://design-system.e-infra.cz/docs
- Source repository: https://github.com/CERIT-SC/design-system

## Development

```bash
# Install dependencies
bun install

# Run development server with live reloading
bun run dev:showcase

# Build library
bun run build:lib

# Build showcase web
bun run build:showcase

# Run linting, format checks and type checks
bun run lint
bun run format:check
bun run typecheck:lib
bun run typecheck:showcase
```

For other commands and scripts, see `package.json`.

## Docker

Run from the project root:

#### Using docker-compose to build and run the production container:

```bash
docker compose -f ./env/prod/docker-compose.yml up --build
```

#### Build image only:

Bun as package manager and runtime:

```bash
docker build -t design-system-showcase:latest -f ./env/prod/Dockerfile.bun .
```

Bun as package manager and node as runtime:

```bash
docker build -t design-system-showcase:latest -f ./env/prod/Dockerfile .
```

## Maintainers

- Romana Ďuráčiová [duraciova@mail.muni.cz](mailto:duraciova@mail.muni.cz)
- Jakub Čillík [cillik@muni.cz](mailto:cillik@muni.cz)
- Michal Mikuš [553650@mail.muni.cz](mailto:553650@mail.muni.cz)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Issues

Please report any bugs or issues to our [GitHub repository](https://github.com/CERIT-SC/design-system/issues).

## License

MIT. See [LICENSE.md](LICENSE.md).
