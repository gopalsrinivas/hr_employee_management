"use client";

import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDialog({
  isOpen,
  title = "Confirm action",
  description,
  confirmLabel = "Confirm",
  isLoading,
  onConfirm,
  onClose
}) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <p className="text-sm leading-6 text-slate-600">This action will update live HR records. Please confirm before continuing.</p>
    </Modal>
  );
}
