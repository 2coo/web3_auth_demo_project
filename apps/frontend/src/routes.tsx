import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router"

import { AppProvider } from "./components/AppProvider/AppProvider"
import { Layout } from "./components/Layout/Layout"
import { HomePage } from "./pages"

const rootRoute = new RootRoute({
  component: () => (
    <AppProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AppProvider>
  ),
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = new Router({ routeTree })
