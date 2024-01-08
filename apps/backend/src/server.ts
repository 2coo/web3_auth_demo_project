import { json, urlencoded } from "body-parser"
import cors from "cors"
import express, { type Express } from "express"

export const createServer = (): Express => {
  const app = express()

  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))

  app.get("/", (req, res) => {
    res.send("Hello World!")
  })

  return app
}
