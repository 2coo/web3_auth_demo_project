import { Router } from "express"
import { generateNonce } from "siwe"

import { verify } from "~/handlers"

const routes = Router()

// This is the nonce endpoint
routes.get("/nonce", (req, res) => {
  if (!req.session) {
    throw new Error("Session is not available")
  }
  req.session.nonce = generateNonce()
  res.setHeader("Content-Type", "text/plain")
  res.status(200).send(req.session.nonce)
})

// This is the verify endpoint which initializes the session
routes.post("/verify", verify)

// This is the logout endpoint
routes.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => res.status(200).send(true))
  }
})

export const injectSiweRoutes = (app: Router) => {
  app.use("/siwe", routes)
}
