import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

import { EditableUserInfo } from "~/types/user"

const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: EditableUserInfo) => {
      const tid = toast.loading("Saving...")
      const result = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      toast.dismiss(tid)
      return result.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
        exact: true,
      })

      toast.success("Successfully saved!")
    },
  })
}

export default useUpdateUser
