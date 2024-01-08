import { CustomConnectButton } from "../components/ConnectButton/ConnectButton"

export const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h3>Welcome Home!</h3>
        <div className="pt-2">
          <CustomConnectButton />
        </div>
      </div>
    </div>
  )
}
