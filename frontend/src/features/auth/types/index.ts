import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Enter your password'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupInput = z.infer<typeof signupSchema>;

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().optional(),
  createdAt: z.iso.datetime(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
