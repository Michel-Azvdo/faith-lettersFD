import { z } from "zod";

// Regras do formulário. Todos os campos são obrigatórios:
// min(1) rejeita string vazia, e o texto é a mensagem de erro mostrada ao usuário.
export const letterSchema = z.object({
  missionaryId: z.string().min(1, "Selecione um missionário"),
  senderName: z.string().min(1, "Informe seu nome"),
  content: z.string().min(1, "Escreva sua mensagem"),
});

// O TypeScript gera o tipo a partir do schema, então não precisamos escrevê-lo à mão.
export type LetterFormData = z.infer<typeof letterSchema>;