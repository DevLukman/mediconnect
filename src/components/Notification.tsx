"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { Separator } from "./ui/separator";

export function Notification() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" aria-label="Open notifications">
          <Bell aria-hidden="true" />
          <span className="sr-only">Open notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="">
          <SheetTitle className="text-2xl">Notifications</SheetTitle>
        </SheetHeader>
        <Separator />
      </SheetContent>
    </Sheet>
  );
}
