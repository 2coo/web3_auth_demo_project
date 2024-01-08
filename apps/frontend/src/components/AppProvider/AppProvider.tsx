import {
  getDefaultWallets,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FC, PropsWithChildren } from "react"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import { authenticationAdapter } from "~/lib/authenticationAdapter"
import { useAuthStore } from "~/store/useAuthStore"

const { chains, publicClient } = configureChains([mainnet], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: "Tucoo - Web3 Auth Demo",
  projectId: "0c85053a7192079a4042fb3a5986721d",
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const queryClient = new QueryClient()

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const authStatus = useAuthStore((state) => state.status)
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={authStatus}>
        <RainbowKitProvider modalSize="compact" chains={chains}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  )
}
