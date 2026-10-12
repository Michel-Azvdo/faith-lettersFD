import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { LetterForm } from "../LetterForm/LetterForm";
import type { LetterFormData } from "../../schemas/letterSchema";
import type { Letter } from "../../types";
import { saveLetterToAPI } from "../../api/api";
import { useAppContext } from "../../contexts/AppContext";
import styles from "./CreateLetterModal.module.css";

interface CreateLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Smart Component: busca dados no contexto, salva na API e controla os feedbacks.
export function CreateLetterModal({ isOpen, onClose }: CreateLetterModalProps) {
  const { missionaries, refetchLetters } = useAppContext();

  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Esconde a mensagem de sucesso sozinha depois de 4 segundos
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 4000);
    return () => clearTimeout(timer); // limpeza: evita timer "solto" ao desmontar
  }, [showSuccess]);

  async function handleSubmit(data: LetterFormData) {
    setSubmitError("");

    // 1) Busca o missionário selecionado pelo ID
    const missionary = missionaries.find((m) => m.id === data.missionaryId);
    if (!missionary) {
      setSubmitError("Missionário não encontrado. Selecione outro.");
      throw new Error("Missionário não encontrado");
    }

    // 2) Monta a carta (o json-server gera o id sozinho)
    const newLetter: Letter = {
      missionaryId: missionary.id,
      senderName: data.senderName,
      content: data.content,
      date: new Date().toISOString(),
    };

    // 3) Salva na API e atualiza a lista de cartas da tela
    try {
      await saveLetterToAPI(newLetter);
      refetchLetters();
      setSuccessName(missionary.name);
      setShowSuccess(true);
    } catch (error) {
      setSubmitError("Não foi possível enviar a carta. Tente novamente.");
      throw error; // avisa o formulário para NÃO limpar os campos
    }
  }

  function handleClose() {
    setShowSuccess(false);
    setSubmitError("");
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Escrever carta">
      {showSuccess && (
        <div className={styles.success} role="status">
          ✓ Carta enviada para {successName}!
        </div>
      )}
      {submitError && (
        <div className={styles.errorBox} role="alert">
          {submitError}
        </div>
      )}

      <LetterForm
        missionaries={missionaries}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </Modal>
  );
}