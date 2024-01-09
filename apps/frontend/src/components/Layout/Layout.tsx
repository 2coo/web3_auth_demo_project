import { FC, PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast"

import { Navbar } from "./Navbar"

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex h-[80vh] items-center justify-center">
          <div className="w-[500px]">
            <div className="mt-6 flex justify-center">{children}</div>
          </div>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        containerStyle={{
          fontSize: 24,
        }}
      />
    </>
  )
}
