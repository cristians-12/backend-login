import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El username es requerido",
  }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email(),
  password: z.string().min(6, {
    message: "La contraseña debe contener almenos 6 caracteres.",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email inválido.",
    }),
  password: z
    .string({
      required_error: "Contraseña es necesaria.",
    })
    .min(6, {
      message: "La contraseña debe contener almenos 6 caracteres.",
    }),
});
