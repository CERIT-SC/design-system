# e-INFRA CZ Design System

[![npm version](https://img.shields.io/npm/v/@e-infra/design-system.svg)](https://www.npmjs.com/package/@e-infra/design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive React component library built with shadcn/ui and Tailwind CSS v4, designed for the e-INFRA CZ app ecosystem.

## ✨ Features

- 🎨 **46+ Components** - Complete set of UI components based on shadcn/ui
- 🎯 **TypeScript First** - Full TypeScript support with type definitions
- 💅 **Tailwind CSS v4** - Modern styling with the latest Tailwind features
- 🌗 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - WAI-ARIA compliant components
- 📦 **Tree-shakeable** - Import only what you need
- 🎭 **Customizable** - Easy to theme and customize

## 📦 Installation

```bash
# Using npm
npm install @e-infra/design-system

# Using yarn
yarn add @e-infra/design-system

# Using pnpm
pnpm add @e-infra/design-system

# Using bun
bun add @e-infra/design-system
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom tailwindcss
```

## 🚀 Quick Start

### 1. Import Styles

**Important:** Import the CSS file in your main application file **AFTER importing tailwindcss**:

```css
@import "@e-infra/design-system/setup.css";
@source "../node_modules/@e-infra/design-system/dist";
```

Example:

```css
@import "tailwindcss";
@import "@e-infra/design-system/setup.css";
@source "../node_modules/@e-infra/design-system/dist";
```

### 2. Use Components

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@e-infra/e-infra-design-system";

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to e-INFRA CZ</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Start building with our design system!</p>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## 📖 Documentation

For full documentation and live examples, visit:

🔗 **[Live Showcase](https://design-system.e-infra.cz/)**

## 🛠️ Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev:showcase

# Build library
bun run build:lib

# Build showcase
bun run build:showcase

# Run linting
bun run lint

# Run type checking
bun run type:check
```

For other commands consult `package.json`.

## Docker

**Be in root of the project directory.**

### Using Compose File (build and run)

```sh
docker compose -f ./env/prod/docker-compose.yml up --build
```

### Build Only Image

#### Bun as Package Manager and Runtime

```sh
docker build -t design-system-showcase:latest -f ./env/prod/Dockerfile.bun .
```

#### Bun as Package Manager, Node as Runtime

```sh
docker build -t design-system-showcase:latest -f ./env/prod/Dockerfile .
```

## 📄 License

MIT © [CERIT-SC, Masaryk University](https://cerit-sc.cz)

## 👥 Maintainers

- Jakub Čillík <cillik@muni.cz>
- Romana Ďuráčiová <duraciova@mail.muni.cz>
- Michal Mikuš <553650@mail.muni.cz>

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 🐛 Issues

Found a bug? Please report it at our [GitHub Issues](https://github.com/CERIT-SC/design-system/issues).
