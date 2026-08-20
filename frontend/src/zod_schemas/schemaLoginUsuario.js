import z from "zod";

export const schemaLoginUsuario = z.object({
  email: z.email(),
  senha: z.string().min(6),
});
