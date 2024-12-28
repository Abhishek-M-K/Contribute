import { z } from "zod";

const emailRegex = new RegExp(
  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
);

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(emailRegex, { message: "Invalid email format" })
    .optional(),
  password: z.string().min(1, { message: "Password is required" }).optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
