import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Wallet } from "lucide-react"

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div
            className="flex justify-center"
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}>
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn btn-lg flex h-[68px] w-[243px] items-center justify-center rounded-[100px] bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                    onClick={openConnectModal}
                    type="button">
                    <Wallet />
                    Click here to login
                  </button>
                )
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="btn btn-error"
                    onClick={openChainModal}
                    type="button">
                    Wrong network
                  </button>
                )
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    className="btn btn-primary"
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button">
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}>
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
