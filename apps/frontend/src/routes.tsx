import {
  Outlet,
  RootRoute,
  Route,
  Router,
  redirect,
} from "@tanstack/react-router"

import { AppProvider } from "./components/AppProvider/AppProvider"
import { Layout } from "./components/Layout/Layout"
import { HomePage } from "./pages"
import { ProfilePage } from "./pages/profile"
import { useAuthStore } from "./store/useAuthStore"

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

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
  beforeLoad: ({ location }) => {
    const authStatus = useAuthStore.getState().status
    if (authStatus !== "authenticated") {
      throw redirect({ to: "/", search: { redirect: location.href } })
    }
  },
})

const routeTree = rootRoute.addChildren([indexRoute, profileRoute])

export const router = new Router({ routeTree })
