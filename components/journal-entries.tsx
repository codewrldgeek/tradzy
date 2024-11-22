"use client";

import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface JournalEntry {
  id: string;
  date: Date;
  marketCondition: string;
  mindset: string;
  notes: string;
  improvements: string;
}

interface JournalEntriesProps {
  entries: JournalEntry[];
}

export function JournalEntries({ entries }: JournalEntriesProps) {
  const getMarketConditionColor = (condition: string) => {
    switch (condition) {
      case "bullish":
        return "bg-green-500/10 text-green-500";
      case "bearish":
        return "bg-red-500/10 text-red-500";
      case "volatile":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-blue-500/10 text-blue-500";
    }
  };

  const getMindsetColor = (mindset: string) => {
    switch (mindset) {
      case "positive":
        return "bg-green-500/10 text-green-500";
      case "negative":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-blue-500/10 text-blue-500";
    }
  };

  return (
    <div className="h-full">
      <CardHeader>
        <CardTitle>Journal Entries</CardTitle>
        <CardDescription>Your trading journal history</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[700px] pr-4">
          <div className="space-y-4">
            {entries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No journal entries yet. Start by adding your first entry.
              </p>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        {format(entry.date, "MMMM d, yyyy")}
                      </h4>
                      <div className="flex gap-2">
                        <Badge
                          variant="secondary"
                          className={getMarketConditionColor(entry.marketCondition)}
                        >
                          {entry.marketCondition}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={getMindsetColor(entry.mindset)}
                        >
                          {entry.mindset}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          Trading Notes
                        </h5>
                        <p className="text-sm">{entry.notes}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          Areas for Improvement
                        </h5>
                        <p className="text-sm">{entry.improvements}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </div>
  );
}