import type { Request, Response } from "express"
import { SiweErrorType, SiweMessage } from "siwe"

export const verify = async (req: Request, res: Response) => {
  try {
    const { message, signature } = req.body as {
      message: string
      signature: string
    }

    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.verify({
      signature,
      nonce: String(req.session?.nonce ?? ""),
    })

    if (fields.data.nonce !== req.session?.nonce) {
      return res.status(422).json({ message: "Invalid nonce." })
    }

    req.session.siwe = fields.data
    if (!fields.data.expirationTime) {
      return res.status(422).json({
        message: "Expected expirationTime to be set.",
      })
    }
    req.session.cookie.expires = new Date(fields.data.expirationTime)
    req.session.save(() => res.status(200).send(true))
  } catch (e) {
    if (req.session) {
      req.session.siwe = null
      req.session.nonce = null
      switch (e) {
        case SiweErrorType.EXPIRED_MESSAGE: {
          req.session.save(() => res.status(440).json({ message: String(e) }))
          break
        }
        case SiweErrorType.INVALID_SIGNATURE: {
          req.session.save(() => res.status(422).json({ message: String(e) }))
          break
        }
        default: {
          req.session.save(() => res.status(500).json({ message: String(e) }))
          break
        }
      }
    }
  }
}
