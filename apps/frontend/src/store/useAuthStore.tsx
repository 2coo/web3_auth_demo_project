import { AuthenticationStatus } from "@rainbow-me/rainbowkit"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
  status: AuthenticationStatus
  setAuthStatus: (status: AuthenticationStatus) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      status: "unauthenticated",
      setAuthStatus: (status) => set({ status }),
    }),
    {
      name: "auth-storage",
    }
  )
)
