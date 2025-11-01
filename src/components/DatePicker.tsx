"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

type DatePickerProps = {
  label?: string;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  readOnly?: boolean;
};

export default function DatePicker({
  label = "Select Date",
  defaultValue,
  onChange,
  placeholder,
  readOnly = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(defaultValue);
  const [inputValue, setInputValue] = useState(
    defaultValue ? format(defaultValue, "M/d/yy") : "",
  );
  const [error, setError] = useState<string>("");

  function formatShortDate(date: Date | undefined): string {
    if (!date || !isValid(date)) return "";
    return format(date, "M/d/yy");
  }

  const currentDateFormatted = format(new Date(), "M/d/yy");

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setInputValue(formatShortDate(selectedDate));
    setError("");
    onChange?.(selectedDate);
    setOpen(false);
  };
  function handleInputChange(value: string) {
    setInputValue(value);

    if (error) setError("");
    if (value === "") {
      setDate(undefined);
      onChange?.(undefined);
    }
  }

  function handleInputBlur() {
    if (inputValue === "") {
      setDate(undefined);
      setError("");
      return;
    }
    const parsedDate = parse(inputValue, "M/d/yy", new Date());

    if (isValid(parsedDate)) {
      setDate(parsedDate);
      setInputValue(format(parsedDate, "M/d/yy"));
      setError("");
      onChange?.(parsedDate);
    } else {
      setError("Invalid date format. Use M/D/YY (e.g., 1/15/25)");
      setInputValue(formatShortDate(date));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor="date-input">{label}</Label>}
      <div className="relative">
        <Input
          id="date-input"
          value={inputValue}
          placeholder={placeholder || currentDateFormatted}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
            if (e.key === "Enter") {
              handleInputBlur();
            }
          }}
          readOnly={readOnly}
          className={cn(
            "pr-10",
            error && "border-destructive focus-visible:ring-destructive",
          )}
          aria-invalid={!!error}
          aria-describedby={error ? "date-error" : undefined}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-1 size-8 -translate-y-1/2"
              aria-label="Open calendar"
            >
              <CalendarIcon className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleCalendarSelect}
              captionLayout="dropdown"
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && (
        <p id="date-error" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
