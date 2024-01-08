// sort-imports-ignore
import "dotenv/config"

import { json, urlencoded } from "body-parser"
import cors from "cors"
import express, { type Express } from "express"
import session from "express-session"

import { injectSiweRoutes } from "./routes/siwe"

export const createServer = (): Express => {
  const app = express()

  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: process.env.NODE_ENV === "production" },
    })
  )

  injectSiweRoutes(app)

  return app
}
