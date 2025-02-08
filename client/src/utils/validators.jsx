import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Email ไม่ถูกต้อง"),
    firstname: z.string().min(3, "Firstname ต้องมากกว่า 3 ตัวอักษร"),
    lastname: z.string().min(3, "Lastname ต้องมากกว่า 3 ตัวอักษร"),
    password: z.string().min(6, "Password ต้องมากกว่า 6 ตัวอักษร"), 
    confirmPassword: z.string().min(6, "Confirm Password ต้องมากกว่า 6 ตัวอักษร")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password ไม่ตรงกัน",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: z.string().email("Email ไม่ถูกต้อง"),
  password: z.string().min(6, "Password ต้องมากกว่า 6 ตัวอักษร")
});
