import { useMutation, useQueryClient } from "@tanstack/react-query"

import { EditableUserInfo } from "~/types/user"

const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: EditableUserInfo) => {
      return fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["me"],
        exact: true,
      }),
  })
}

export default useUpdateUser
