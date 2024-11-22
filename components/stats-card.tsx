"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { value: 400 },
  { value: 300 },
  { value: 200 },
  { value: 450 },
  { value: 350 },
  { value: 500 },
];

interface StatsCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
  percentage: string;
}

export function StatsCard({ title, value, trend, percentage }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={trend === "up" ? "#10b981" : "#ef4444"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground flex items-center">
          {trend === "up" ? (
            <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
          )}
          {percentage} from last month
        </p>
      </CardContent>
    </Card>
  );
}