import { z } from "zod";

const requiredString = z.string().min(1, { message: "Required" });

export const loginSchema = z.object({
  email: requiredString.email({ message: "Invalid email" }),
  password: requiredString,
});

export const registerSchema = z.object({
  name: requiredString.min(3, { message: "At least 3 characters long" }),
  email: requiredString.email({ message: "Invalid email" }),
  password: requiredString.min(6, { message: "At least 6 characters long" }),
});
