"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { JournalEntries } from "@/components/journal-entries";

const journalSchema = z.object({
  date: z.date(),
  marketCondition: z.enum(["bullish", "bearish", "neutral", "volatile"]),
  mindset: z.enum(["positive", "negative", "neutral"]),
  notes: z.string().min(1, "Notes are required").max(1000),
  improvements: z.string().min(1, "Improvements are required").max(500),
});

type JournalFormValues = z.infer<typeof journalSchema>;

export default function JournalPage() {
  const { toast } = useToast();
  const [entries, setEntries] = useState<
    (JournalFormValues & { id: string })[]
  >([]);

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      date: new Date(),
      notes: "",
      improvements: "",
    },
  });

  const onSubmit = (data: JournalFormValues) => {
    const newEntry = {
      id: crypto.randomUUID(),
      ...data,
    };
    setEntries((prev) => [newEntry, ...prev]);
    form.reset();
    toast({
      title: "Journal Entry Added",
      description: "Your journal entry has been saved successfully.",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Daily Journal</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Journal Entry</CardTitle>
            <CardDescription>
              Record your daily trading thoughts and reflections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select market condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bullish">Bullish</SelectItem>
                          <SelectItem value="bearish">Bearish</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="volatile">Volatile</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mindset"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trading Mindset</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your mindset" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="positive">Positive</SelectItem>
                          <SelectItem value="negative">Negative</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trading Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your trading thoughts, observations, and analysis..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="improvements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Areas for Improvement</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What could you improve? What lessons did you learn?"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Save Journal Entry
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <JournalEntries entries={entries} />
        </Card>
      </div>
    </div>
  );
}
