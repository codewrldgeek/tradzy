"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Trade } from "@/lib/types";

interface RecentTradesProps {
  trades?: Trade[];
}

const defaultTrades = [
  {
    id: "1",
    date: new Date("2024-03-15"),
    symbol: "AAPL",
    type: "LONG",
    entryPrice: 170.50,
    exitPrice: 175.25,
    quantity: 100,
    pnl: 475.00,
  },
  {
    id: "2",
    date: new Date("2024-03-15"),
    symbol: "TSLA",
    type: "SHORT",
    entryPrice: 180.75,
    exitPrice: 185.25,
    quantity: 50,
    pnl: -225.00,
  },
] as Trade[];

export function RecentTrades({ trades = defaultTrades }: RecentTradesProps) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Net P&L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{format(trade.date, "yyyy-MM-dd")}</TableCell>
              <TableCell className="font-medium">{trade.symbol}</TableCell>
              <TableCell>{trade.type}</TableCell>
              <TableCell
                className={cn(
                  "text-right font-medium",
                  trade.pnl > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                ${trade.pnl.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}