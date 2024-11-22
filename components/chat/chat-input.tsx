"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your trade setup..."
        className="min-h-[60px] flex-1 resize-none bg-background/50 focus-visible:ring-primary/20"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim()}
        className="h-[60px] w-[60px] bg-primary hover:bg-primary/90"
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
}
