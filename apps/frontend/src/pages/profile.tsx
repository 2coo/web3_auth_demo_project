import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

import useUpdateUser from "~/hooks/useUpdateUser"
import { useUser } from "~/hooks/useUser"
import { router } from "~/routes"

const schema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message: "Invalid phone number",
  }),
})

type FormValues = z.infer<typeof schema>

export const ProfilePage = () => {
  const { data: user, isSuccess: isUserReady } = useUser()

  const {
    reset,
    control,
    formState: { isDirty },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!isUserReady || !user) return

    reset({
      email: user.email ?? undefined,
      phoneNumber: String(user.phoneNumber) ?? undefined,
    })
  }, [reset, user, isUserReady])

  const { mutate, isPending } = useUpdateUser()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate({
      email: data.email,
      phoneNumber: data.phoneNumber,
    })

    router.history.push("/")
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <h3 className="text-center font-['Roboto'] text-[64px] font-semibold text-white">
            Welcome to Tucoo's Web3 Auth Demo!
          </h3>
          <div className="pt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card bg-neutral text-neutral-content w-96 p-4">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Update your profile!</h2>

                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Phone number</span>
                        </div>
                        <input
                          type="email"
                          placeholder="example@example.com"
                          className="input input-bordered w-full max-w-xs"
                          {...field}
                        />
                        {error && (
                          <div className="label">
                            <span className="label-text-alt text-red-400">
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
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Phone number</span>
                        </div>
                        <input
                          type="text"
                          placeholder="+96799102030"
                          className="input input-bordered w-full max-w-xs"
                          {...field}
                        />
                        {error && (
                          <div className="label">
                            <span className="label-text-alt text-red-400">
                              {error.message}
                            </span>
                          </div>
                        )}
                      </label>
                    )}
                  />

                  <div className="card-actions mt-6 justify-end">
                    <button
                      disabled={!isDirty}
                      type="submit"
                      className="btn btn-primary btn-wide">
                      {isPending ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
