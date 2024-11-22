"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Long Trades", value: 65 },
  { name: "Short Trades", value: 35 },
];

const COLORS = ["#10b981", "#ef4444"];

export function TradeDistribution() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Trade Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Long Trades</p>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <p className="text-muted-foreground">Win Rate:</p>
            <p className="text-right">75%</p>
            <p className="text-muted-foreground">Avg Win:</p>
            <p className="text-right text-green-500">$1,250</p>
            <p className="text-muted-foreground">Avg Loss:</p>
            <p className="text-right text-red-500">$450</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Short Trades</p>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <p className="text-muted-foreground">Win Rate:</p>
            <p className="text-right">68%</p>
            <p className="text-muted-foreground">Avg Win:</p>
            <p className="text-right text-green-500">$980</p>
            <p className="text-muted-foreground">Avg Loss:</p>
            <p className="text-right text-red-500">$520</p>
          </div>
        </div>
      </div>
    </div>
  );
}