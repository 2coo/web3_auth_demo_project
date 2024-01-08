import { Router } from "express"

import { db } from "~/lib/db"
import { updateUserSchema } from "~/lib/validation"
import type { SessionSiwe } from "~/types/session"

const routes = Router()

// Get user's info
routes.get("/", async (req, res) => {
  if (!req.session) {
    throw new Error("Session is not available")
  }

  const siwe = req.session.siwe as SessionSiwe | null
  if (!siwe) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  if (!siwe.address) {
    return res.status(403).json({ message: "Forbidden" })
  }

  const user = await db.user.findUniqueOrThrow({
    where: {
      walletAddress: siwe.address,
    },
  })

  res.status(200).json({
    address: siwe.address,
    email: user.email,
    phoneNumber: String(user.phoneNumber),
  })
})

// Update user's info
routes.put("/", async (req, res) => {
  if (!req.session) {
    throw new Error("Session is not available")
  }

  const parsedData = updateUserSchema.parse(req.body)

  const siwe = req.session.siwe as SessionSiwe | null
  if (!siwe) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  if (!siwe.address) {
    return res.status(403).json({ message: "Forbidden" })
  }

  await db.user.upsert({
    where: {
      walletAddress: siwe.address,
    },
    update: {
      email: parsedData.email,
      phoneNumber: parsedData.phoneNumber,
    },
    create: {
      walletAddress: siwe.address,
      email: parsedData.email,
      phoneNumber: parsedData.phoneNumber,
    },
  })

  res.status(200).send(true)
})

export const injectUserRoutes = (app: Router) => {
  app.use("/user", routes)
}
