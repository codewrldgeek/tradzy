"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { EconomicCalendar } from "@/components/economic-calendar";
import { CalendarFilters } from "@/components/calendar-filters";
import { type CalendarEvent, type FilterOptions } from "@/lib/types";

export default function CalendarPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [filters, setFilters] = useState<FilterOptions>({
    currencies: [],
    impact: [],
  });
  const [sortBy, setSortBy] = useState<string>("date");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Economic Calendar</h2>
      </div>
      <CalendarFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        filters={filters}
        onFiltersChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <EconomicCalendar
        dateRange={dateRange}
        filters={filters}
        sortBy={sortBy}
      />
    </div>
  );
}
