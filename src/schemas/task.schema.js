import { z } from "zod";

export const createTaskSchema = z.object({
    title:z.string({
        required_error: 'El titulo de la tarea es requerido.'
    }),
    description: z.string({
        required_error: 'La descripción debe ser una string.'
    }),
    date: z.string().datetime().optional(),
})