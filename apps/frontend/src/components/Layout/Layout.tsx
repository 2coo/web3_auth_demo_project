import { FC, PropsWithChildren } from "react"

import { Navbar } from "./Navbar"

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-4">{children}</div>
    </>
  )
}
