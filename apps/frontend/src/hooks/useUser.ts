import { useQuery } from "wagmi"

import { useAuthStore } from "~/store/useAuthStore"
import { UserInfo } from "~/types/user"

const fetchUser = async () => {
  const response = await fetch("/api/me")
  const json = await response.json()
  if (response.status === 401) {
    const setAuthStatus = useAuthStore.getState().setAuthStatus
    setAuthStatus("unauthenticated")
  }
  return json
}

export const useUser = () => {
  const status = useAuthStore((state) => state.status)
  const { data: user } = useQuery<UserInfo>(["me"], fetchUser, {
    enabled: status === "authenticated",
  })

  return user
}
