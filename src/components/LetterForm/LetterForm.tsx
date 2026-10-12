import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { letterSchema, type LetterFormData } from "../../schemas/letterSchema";
import styles from "./LetterForm.module.css";

interface MissionaryOption {
  id: string | number;
  name: string;
}

interface LetterFormProps {
  missionaries: MissionaryOption[];
  // Pode ser assíncrona: o formulário espera o envio terminar antes de limpar
  onSubmit: (data: LetterFormData) => Promise<void> | void;
  onCancel: () => void;
}

export function LetterForm({ missionaries, onSubmit, onCancel }: LetterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LetterFormData>({
    resolver: zodResolver(letterSchema),
    defaultValues: { missionaryId: "", senderName: "", content: "" },
  });

  // Só limpa o formulário se o envio der certo.
  // Se o componente pai lançar erro, o catch impede o reset e o usuário não perde o texto.
  async function submitAndReset(data: LetterFormData) {
    try {
      await onSubmit(data);
      reset();
    } catch {
      // O erro já é mostrado pelo componente pai
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitAndReset)} noValidate>
      <div className={styles.field}>
        <label htmlFor="missionaryId" className={styles.label}>
          Missionário
        </label>
        <select
          id="missionaryId"
          className={styles.input}
          aria-invalid={!!errors.missionaryId}
          {...register("missionaryId")}
        >
          <option value="">Selecione...</option>
          {missionaries.map((m) => (
            <option key={m.id} value={String(m.id)}>
              {m.name}
            </option>
          ))}
        </select>
        {errors.missionaryId && (
          <span className={styles.error} role="alert">
            {errors.missionaryId.message}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="senderName" className={styles.label}>
          Seu nome
        </label>
        <input
          id="senderName"
          type="text"
          className={styles.input}
          aria-invalid={!!errors.senderName}
          {...register("senderName")}
        />
        {errors.senderName && (
          <span className={styles.error} role="alert">
            {errors.senderName.message}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="content" className={styles.label}>
          Mensagem
        </label>
        <textarea
          id="content"
          rows={5}
          className={styles.input}
          aria-invalid={!!errors.content}
          {...register("content")}
        />
        {errors.content && (
          <span className={styles.error} role="alert">
            {errors.content.message}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar carta"}
        </button>
      </div>
    </form>
  );
}