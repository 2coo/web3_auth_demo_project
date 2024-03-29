# Web3 Auth Demo

## Install dependency to project

To install dependency:

```bash
$ pnpm install
```

## To start

```bash
# Starts both frontend, and backend concurrently
$ pnpm run dev
```

Then open [http://localhost:5173](http://localhost:5173) on browser.

## Stacks

### Frontend

- React with Vite

  - RainbowKit
  - [SIWE (Sign in with Ethereum)](https://docs.login.xyz/general-information/siwe-overview/eip-4361)
  - WAGMI
  - React Query (Tanstack)
  - React Router (Tanstack)
  - React Hook Form + Zod
  - DaisyUI + TailwindCSS

### Backend

- ExpressJS
  - [SIWE (Sign in with Ethereum)](https://docs.login.xyz/general-information/siwe-overview/eip-4361)
  - Session based authentication
  - Sqlite + Prisma ORM
  - Zod

### Workspace Tools

- PNPM Workspace
- Commitizen
- Concurrently
- TSX (TypeScript Execution Engine)
- TSUP (Bundler)
- Lint-staged
- Prettier
- Eslint
