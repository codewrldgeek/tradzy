"use client";

import { useMemo } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type CalendarEvent, type FilterOptions } from "@/lib/types";

// Mock data - In a real app, this would come from an API
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    date: new Date("2024-03-20T13:30:00"),
    currency: "USD",
    event: "FOMC Statement",
    impact: "high",
    forecast: "5.25%",
    previous: "5.25%",
    actual: null,
  },
  {
    id: "2",
    date: new Date("2024-03-21T09:00:00"),
    currency: "GBP",
    event: "BOE Interest Rate Decision",
    impact: "high",
    forecast: "5.25%",
    previous: "5.25%",
    actual: null,
  },
  {
    id: "3",
    date: new Date("2024-03-21T12:30:00"),
    currency: "EUR",
    event: "ECB Economic Bulletin",
    impact: "medium",
    forecast: null,
    previous: null,
    actual: null,
  },
];

interface EconomicCalendarProps {
  dateRange: DateRange | undefined;
  filters: FilterOptions;
  sortBy: string;
}

export function EconomicCalendar({
  dateRange,
  filters,
  sortBy,
}: EconomicCalendarProps) {
  const filteredAndSortedEvents = useMemo(() => {
    let events = [...mockEvents];

    // Apply date range filter
    if (dateRange?.from !== undefined && dateRange?.to !== undefined) {
      events = events.filter(
        (event) => event.date >= dateRange.from! && event.date <= dateRange.to!
      );
    }

    // Apply currency filter
    if (filters.currencies.length > 0) {
      events = events.filter((event) =>
        filters.currencies.includes(event.currency)
      );
    }

    // Apply impact filter
    if (filters.impact.length > 0) {
      events = events.filter((event) => filters.impact.includes(event.impact));
    }

    // Apply sorting
    events.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return a.date.getTime() - b.date.getTime();
        case "impact":
          return b.impact.localeCompare(a.impact);
        case "currency":
          return a.currency.localeCompare(b.currency);
        default:
          return 0;
      }
    });

    return events;
  }, [dateRange, filters, sortBy]);

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="destructive">Medium</Badge>;
      case "low":
        return <Badge>Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Forecast</TableHead>
            <TableHead>Previous</TableHead>
            <TableHead>Actual</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{format(event.date, "MMM dd, yyyy")}</TableCell>
              <TableCell>{format(event.date, "HH:mm")}</TableCell>
              <TableCell className="font-medium">{event.currency}</TableCell>
              <TableCell>{event.event}</TableCell>
              <TableCell>{getImpactBadge(event.impact)}</TableCell>
              <TableCell>{event.forecast || "-"}</TableCell>
              <TableCell>{event.previous || "-"}</TableCell>
              <TableCell>{event.actual || "Pending"}</TableCell>
            </TableRow>
          ))}
          {filteredAndSortedEvents.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No events found matching your criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
