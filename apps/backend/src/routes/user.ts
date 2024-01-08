import { Router } from "express"

const routes = Router()

// This endpoint returns logged user's info
routes.get("/me", (req, res) => {
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

export const injectUserRoutes = (app: Router) => {
  app.use("/user", routes)
}
