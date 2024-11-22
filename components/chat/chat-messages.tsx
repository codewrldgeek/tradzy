import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";
import { Bot, User } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex gap-3",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.role === "assistant" && (
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
          )}
          <div
            className={cn(
              "rounded-lg px-4 py-3 max-w-[85%] shadow-md",
              message.role === "user"
                ? "bg-gradient-to-br from-primary to-primary-foreground/90 text-primary-foreground"
                : "bg-gradient-to-br from-muted/50 to-muted border"
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          {message.role === "user" && (
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
