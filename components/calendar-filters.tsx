"use client";

import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { type FilterOptions } from "@/lib/types";

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "NZD",
] as const;

const impactLevels = [
  { value: "high", label: "High Impact", color: "destructive" },
  { value: "medium", label: "Medium Impact", color: "warning" },
  { value: "low", label: "Low Impact", color: "default" },
] as const;

interface CalendarFiltersProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function CalendarFilters({
  dateRange,
  onDateRangeChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
}: CalendarFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start font-normal">
              Currencies{" "}
              {filters.currencies.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                  {filters.currencies.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search currencies..." />
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {currencies.map((currency) => (
                  <CommandItem
                    key={currency}
                    onSelect={() => {
                      const newCurrencies = filters.currencies.includes(
                        currency
                      )
                        ? filters.currencies.filter((c) => c !== currency)
                        : [...filters.currencies, currency];
                      onFiltersChange({
                        ...filters,
                        currencies: newCurrencies,
                      });
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filters.currencies.includes(currency)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {currency}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start font-normal">
              Impact{" "}
              {filters.impact.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                  {filters.impact.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandGroup>
                {impactLevels.map((level) => (
                  <CommandItem
                    key={level.value}
                    onSelect={() => {
                      const newImpact = filters.impact.includes(level.value)
                        ? filters.impact.filter((i) => i !== level.value)
                        : [...filters.impact, level.value];
                      onFiltersChange({
                        ...filters,
                        impact: newImpact,
                      });
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filters.impact.includes(level.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {level.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="impact">Impact</SelectItem>
          <SelectItem value="currency">Currency</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
