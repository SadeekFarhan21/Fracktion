"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-gradient-to-br from-white via-slate-50 to-gray-50 rounded-xl shadow-lg border border-gray-100", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-2 pb-4 relative items-center",
        caption_label: "text-lg font-semibold text-gray-800 tracking-wide",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-white/80 backdrop-blur-sm border-gray-200 p-0 opacity-80 hover:opacity-100 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105"
        ),
        nav_button_previous: "absolute left-2 hover:-translate-x-0.5",
        nav_button_next: "absolute right-2 hover:translate-x-0.5",
        table: "w-full border-collapse mt-4",
        head_row: "flex mb-2",
        head_cell:
          "text-gray-500 rounded-lg w-11 h-11 font-semibold text-sm flex items-center justify-center uppercase tracking-wider",
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-0.5 text-center text-sm focus-within:relative focus-within:z-20",
          "transition-all duration-200"
        ),
        day: cn(
          "h-11 w-11 p-0 font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95",
          "hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
          "aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold",
          "hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-110",
          "focus:from-blue-600 focus:to-blue-700 shadow-md",
          "ring-2 ring-blue-200 ring-offset-2"
        ),
        day_today: cn(
          "bg-gradient-to-br from-orange-200 to-orange-300 text-orange-900 font-bold",
          "ring-2 ring-orange-300 ring-offset-1",
          "hover:from-orange-300 hover:to-orange-400 hover:shadow-md"
        ),
        day_outside:
          "day-outside text-gray-300 opacity-40 hover:text-gray-400 hover:opacity-60 aria-selected:bg-accent/30 aria-selected:text-muted-foreground",
        day_disabled: "text-gray-200 opacity-25 cursor-not-allowed hover:scale-100",
        day_range_middle:
          "aria-selected:bg-blue-100 aria-selected:text-blue-800 hover:bg-blue-200",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
