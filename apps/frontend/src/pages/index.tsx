import { Link } from "@tanstack/react-router"
import { FC } from "react"

import { CustomConnectButton } from "~/components/ConnectButton/ConnectButton"
import { useUser } from "~/hooks/useUser"
import { useAuthStore } from "~/store/useAuthStore"

const UserInfo: FC = () => {
  const authStatus = useAuthStore((state) => state.status)
  const user = useUser()

  if (authStatus !== "authenticated") return <CustomConnectButton />

  if (user.isLoading)
    return (
      <button className="btn btn-square">
        <span className="loading loading-spinner"></span>
      </button>
    )

  if (user.isSuccess && user.data) {
    const { email, phoneNumber } = user.data
    return (
      <div className="card bg-neutral text-neutral-content w-96 p-4">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Welcome!</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 ">
            <div className="justify-self-start text-lg font-semibold text-white">
              Email:&nbsp;
            </div>
            <div className="text-lg text-white">{email ?? "Empty"}</div>
            <div className="justify-self-start text-lg font-semibold text-white">
              Phone Number:&nbsp;
            </div>
            <div className="text-lg text-white">{phoneNumber ?? "Empty"}</div>
          </div>
          <div className="card-actions mt-6 justify-end">
            <Link to="/profile">
              <button className="btn btn-primary">Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <CustomConnectButton />
}

export const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h3 className="text-center font-['Roboto'] text-[64px] font-semibold text-white">
          Welcome to Tucoo's Web3 Auth Demo!
        </h3>
        <div className="pt-2">
          <UserInfo />
        </div>
      </div>
    </div>
  )
}
