import { z } from "zod";

export const tradeFormSchema = z.object({
  date: z.date(),
  symbol: z.string().min(1, "Symbol is required").max(10),
  type: z.enum(["LONG", "SHORT"]),
  entryPrice: z.number().positive("Entry price must be positive"),
  exitPrice: z.number().positive("Exit price must be positive"),
  quantity: z.number().positive("Quantity must be positive"),
  notes: z.string().optional(),
});

export type TradeFormValues = z.infer<typeof tradeFormSchema>;

export type Trade = TradeFormValues & {
  id: string;
  pnl: number;
};

export interface CalendarEvent {
  id: string;
  date: Date;
  currency: string;
  event: string;
  impact: "high" | "medium" | "low";
  forecast: string | null;
  previous: string | null;
  actual: string | null;
}

export interface FilterOptions {
  currencies: string[];
  impact: string[];
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}
