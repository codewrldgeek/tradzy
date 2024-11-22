"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TradeForm } from "@/components/trade-form";
import { RecentTrades } from "@/components/recent-trades";
import type { Trade, TradeFormValues } from "@/lib/types";

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  const handleTradeSubmit = (data: TradeFormValues) => {
    const pnl = calculatePnL(data);
    const newTrade: Trade = {
      id: crypto.randomUUID(),
      ...data,
      pnl,
    };
    setTrades((prev) => [newTrade, ...prev]);
  };

  const calculatePnL = (trade: TradeFormValues) => {
    const { type, entryPrice, exitPrice, quantity } = trade;
    return type === "LONG"
      ? (exitPrice - entryPrice) * quantity
      : (entryPrice - exitPrice) * quantity;
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trade Log</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">New Trade Entry</h3>
          <TradeForm onSubmit={handleTradeSubmit} />
        </Card>
        <Card>
          <RecentTrades trades={trades} />
        </Card>
      </div>
    </div>
  );
}