"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import * as React from "react";

interface Country {
  name: string;
  flag: string;
  code?: string;
}

interface CountrySelectProps {
  countries: Country[];
  value?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function CountrySelect({
  countries,
  value,
  onValueChange,
  disabled = false,
  placeholder = "Select country...",
  className,
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedCountry = countries.find((country) => country.name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full cursor-text justify-between", className)}
          disabled={disabled}
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <Image
                src={selectedCountry.flag}
                width={20}
                height={20}
                className="object-cover"
                alt={selectedCountry.name}
              />
              <span>{selectedCountry.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="w-full">
              {countries.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.name}
                  className="w-full cursor-pointer"
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <Image
                    src={country.flag}
                    width={20}
                    height={20}
                    className="mr-2 rounded-sm object-cover"
                    alt={country.name}
                  />
                  <span>{country.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
