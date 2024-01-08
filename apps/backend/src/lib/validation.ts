import z from "zod"

export const updateUserSchema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message: "Invalid phone number",
  }),
})
