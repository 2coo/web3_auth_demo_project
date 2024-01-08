import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit"
import { addDays } from "date-fns"
import { SiweMessage } from "siwe"

import { useAuthStore } from "~/store/useAuthStore"

export const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch("/api/siwe/nonce")
    return await response.text()
  },

  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Welcome to Tucoo's Web3 Auth Demo!",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
      expirationTime: addDays(Date.now(), 7).toISOString(), // 7 days from now,
    })
  },

  getMessageBody: ({ message }) => {
    return message.prepareMessage()
  },

  verify: async ({ message, signature }) => {
    const verifyRes = await fetch("/api/siwe/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, signature }),
    })

    const verified = Boolean(verifyRes.ok)

    const setAuthStatus = useAuthStore.getState().setAuthStatus
    if (verified) {
      setAuthStatus("authenticated")
    } else {
      setAuthStatus("unauthenticated")
    }
    return verified
  },

  signOut: async () => {
    const logoutRes = await fetch("/api/siwe/logout")
    if (logoutRes.ok) {
      const setAuthStatus = useAuthStore.getState().setAuthStatus
      setAuthStatus("unauthenticated")
    }
  },
})
