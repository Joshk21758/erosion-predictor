import { z } from "zod";

//Register Schema
export const RegisterFormSchema = z.object({
  email: z.string().trim(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .trim(),
  confirmPassword: z.string().trim(),
});

//Login Schema
export const LoginFormSchema = z.object({
  email: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be at least 8 characters long" }),
});

//Contact Schema
export const ContactFormSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().trim(),
  message: z.string().trim(),
});
