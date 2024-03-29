import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Link } from "@tanstack/react-router"
import { FC } from "react"

export const Navbar: FC = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl italic">
          LOGO
        </Link>
      </div>
      <div className="flex-none gap-3">
        <ConnectButton.Custom>
          {({ account, chain, authenticationStatus, mounted }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== "loading"
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated")

            if (!connected) return null

            return (
              <>
                <ConnectButton showBalance={false} />
              </>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  )
}
