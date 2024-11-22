"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { calculatePositionSize } from "@/lib/calculator";
import type { Message } from "@/lib/types";

export default function CalculatorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your forex risk calculator. Tell me about your trade setup and I'll help calculate the optimal position size. For example, try:\n\n• 'I want to trade EURUSD with $5000 and a 25 pip stop loss'\n• 'Calculate position size for GBPUSD with $10000 account and 30 pip SL'",
    },
  ]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await calculatePositionSize(content);
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I apologize, but I couldn't process that request. Please try rephrasing with your account size (in $), currency pair, and stop loss in pips.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            AI Risk Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Calculate optimal position sizes with risk management
          </p>
        </div>
      </div>

      <Card className="flex h-[calc(100vh-12rem)] flex-col border-none bg-gradient-to-b from-background to-background/50 shadow-xl">
        <ScrollArea className="flex-1 p-6">
          <ChatMessages messages={messages} />
        </ScrollArea>
        <div className="border-t bg-gradient-to-b from-background/50 to-background p-6">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </Card>
    </div>
  );
}
