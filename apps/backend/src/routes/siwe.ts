import type { Express } from "express"
import { generateNonce } from "siwe"

import { verify } from "~/handlers"

export const injectSiweRoutes = (app: Express) => {
  // This is the nonce endpoint
  app.get("/api/nonce", (req, res) => {
    if (!req.session) {
      throw new Error("Session is not available")
    }
    req.session.nonce = generateNonce()
    res.setHeader("Content-Type", "text/plain")
    res.status(200).send(req.session.nonce)
  })

  // This is the verify endpoint which initializes the session
  app.post("/api/verify", verify)

  // This is the me endpoint
  app.get("/api/me", (req, res) => {
    if (!req.session) {
      throw new Error("Session is not available")
    }

    const siwe = req.session.siwe as Record<string, unknown> | null
    if (!siwe) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    res.status(200).json({
      account: siwe.address,
    })
  })

  // This is the logout endpoint
  app.get("/api/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(() => res.status(200).send(true))
    }
  })
}
