import z from "zod";

export const schemaCadastroUsuario = z.object({
  nome: z.string().min(3),
  email: z.email(),
  nome_usuario: z.string().min(6),
  senha: z.string().min(6),
});
