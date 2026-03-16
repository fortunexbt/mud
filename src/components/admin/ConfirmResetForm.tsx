"use client";

import { ReactNode } from "react";

interface ConfirmResetFormProps {
  action: (formData: FormData) => Promise<void>;
  message: string;
  children: ReactNode;
}

export function ConfirmResetForm({ action, message, children }: ConfirmResetFormProps) {
  const handleSubmit = async (formData: FormData) => {
    if (confirm(message)) {
      await action(formData);
    }
  };

  return (
    <form action={handleSubmit} className="mt-4">
      {children}
    </form>
  );
}
