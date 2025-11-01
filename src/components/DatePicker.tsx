"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarPlus2 } from "lucide-react";
import { useState } from "react";

type DatePickerProps = {
  label?: string;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
};

export default function DatePicker({
  defaultValue,
  onChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(defaultValue);

  const formatShortDate = (date: Date | undefined) => {
    if (!date) return "";
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  };

  const currentDateFormatted = formatShortDate(new Date());
  const formattedDate = formatShortDate(date);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    const parsedDate = new Date(value);
    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate);
      onChange?.(parsedDate);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Input
          id="date-input"
          className="font-semibold"
          value={formattedDate}
          placeholder={placeholder || currentDateFormatted}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "ArrowDown" && setOpen(true)}
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
              <CalendarPlus2 className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              captionLayout="dropdown"
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
