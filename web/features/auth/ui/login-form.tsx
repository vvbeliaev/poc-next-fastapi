"use client";

import { useState } from "react";
import { Button, Input } from "@/shared/ui";
import { useUser } from "../model/use-user";

interface LoginFormProps {
  onCancel?: () => void;
}

export function LoginForm({ onCancel }: LoginFormProps) {
  const { createUser, isCreating } = useUser();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      createUser({ email: email.trim() });
      setEmail("");
      onCancel?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter email to login"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-64"
        autoFocus
      />
      <Button type="submit" disabled={isCreating}>
        {isCreating ? "..." : "Login"}
      </Button>
      {onCancel && (
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </form>
  );
}
