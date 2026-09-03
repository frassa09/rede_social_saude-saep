import { z } from "zod";

export const schemaCadastroUsuario = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres."),

  email: z
    .string()
    .email("Insira um e-mail válido (ex: nome@email.com)."),

  nome_usuario: z
    .string()
    .min(6, "O nome de usuário deve ter no mínimo 6 caracteres."),

  senha: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
});