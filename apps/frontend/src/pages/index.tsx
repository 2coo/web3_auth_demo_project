import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

import { CustomConnectButton } from "~/components/ConnectButton/ConnectButton"
import useUpdateUser from "~/hooks/useUpdateUser"
import { useUser } from "~/hooks/useUser"
import { useAuthStore } from "~/store/useAuthStore"

const phoneRegex = new RegExp(
  /^(?:[+]?[\s0-9]+)?(?:\d{3}|[(]?[0-9]+[)])?(?:[-]?[\s]?[0-9])+$/
)

const schema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().regex(phoneRegex, {
    message: "Invalid phone number",
  }),
})

type FormValues = z.infer<typeof schema>

export const HomePage = () => {
  const { data: user, isSuccess: isUserReady, isLoading } = useUser()

  const authStatus = useAuthStore((state) => state.status)

  const { reset, control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!isUserReady || !user) return

    reset({
      email: user.email ?? undefined,
      phoneNumber: user.phoneNumber ? String(user.phoneNumber) : undefined,
    })
  }, [reset, user, isUserReady])

  const { mutate, isPending } = useUpdateUser()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate({
      email: data.email,
      phoneNumber: data.phoneNumber,
    })
  }

  if (authStatus !== "authenticated") {
    return (
      <div className="flex flex-col justify-center gap-4">
        <h3 className="font-gil text-center text-[24px] text-white">
          Ethereum Wallet Authentication Web Application
        </h3>
        <div className="mt-4">
          <CustomConnectButton />
        </div>
      </div>
    )
  }

  if (isLoading)
    return (
      <button className="btn btn-square">
        <span className="loading loading-spinner"></span>
      </button>
    )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="font-['GIP'] text-[32px] font-bold leading-loose text-white">
          Edit Profile
        </div>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <label className="form-control mt-8 w-full">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered input-lg w-full"
                {...field}
              />
              {error && (
                <div className="label">
                  <span className="label-text text-red-400">
                    {error.message}
                  </span>
                </div>
              )}
            </label>
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <label className="form-control mt-4 w-full">
              <input
                type="text"
                placeholder="Phone number"
                className="input input-bordered input-lg w-full"
                {...field}
              />
              {error && (
                <div className="label">
                  <span className="label-text text-red-400">
                    {error.message}
                  </span>
                </div>
              )}
            </label>
          )}
        />

        <div className="card-actions mt-6 w-full justify-end">
          <button type="submit" className="btn btn-primary btn-lg w-full">
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </>
  )
}
