"use client"

import { ComponentProps } from "react"
import { getLocalTimeZone, today } from "@internationalized/date"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  Button,
  CalendarCell as CalendarCellRac,
  CalendarGridBody as CalendarGridBodyRac,
  CalendarGridHeader as CalendarGridHeaderRac,
  CalendarGrid as CalendarGridRac,
  CalendarHeaderCell as CalendarHeaderCellRac,
  Calendar as CalendarRac,
  composeRenderProps,
  Heading as HeadingRac,
  RangeCalendar as RangeCalendarRac,
} from "react-aria-components"

import { cn } from "@/lib/utils"

interface BaseCalendarProps {
  className?: string
}

type CalendarProps = ComponentProps<typeof CalendarRac> & BaseCalendarProps
type RangeCalendarProps = ComponentProps<typeof RangeCalendarRac> &
  BaseCalendarProps

function CalendarHeader() {
  return (
    <header className="flex w-full items-center gap-1 pb-1">
      <Button
        slot="previous"
        className="text-neutral-500/80 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:ring-neutral-950/50 flex size-9 items-center justify-center rounded-md transition-[color,box-shadow] outline-none focus-visible:ring-[3px] dark:text-neutral-400/80 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300/50"
      >
        <ChevronLeftIcon size={16} />
      </Button>
      <HeadingRac className="grow text-center text-sm font-medium" />
      <Button
        slot="next"
        className="text-neutral-500/80 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:ring-neutral-950/50 flex size-9 items-center justify-center rounded-md transition-[color,box-shadow] outline-none focus-visible:ring-[3px] dark:text-neutral-400/80 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300/50"
      >
        <ChevronRightIcon size={16} />
      </Button>
    </header>
  )
}

function CalendarGridComponent({ isRange = false }: { isRange?: boolean }) {
  const now = today(getLocalTimeZone())

  return (
    <CalendarGridRac>
      <CalendarGridHeaderRac>
        {(day) => (
          <CalendarHeaderCellRac className="text-neutral-500/80 size-9 rounded-md p-0 text-xs font-medium dark:text-neutral-400/80">
            {day}
          </CalendarHeaderCellRac>
        )}
      </CalendarGridHeaderRac>
      <CalendarGridBodyRac className="[&_td]:px-0 [&_td]:py-px">
        {(date) => (
          <CalendarCellRac
            date={date}
            className={cn(
              "text-neutral-950 data-hovered:bg-neutral-100 data-selected:bg-neutral-900 data-hovered:text-neutral-950 data-selected:text-neutral-50 data-focus-visible:ring-neutral-950/50 relative flex size-9 items-center justify-center rounded-md p-0 text-sm font-normal whitespace-nowrap [transition-property:color,background-color,border-radius,box-shadow] duration-150 outline-none data-disabled:pointer-events-none data-disabled:opacity-30 data-focus-visible:z-10 data-focus-visible:ring-[3px] data-unavailable:pointer-events-none data-unavailable:line-through data-unavailable:opacity-30 dark:text-neutral-50 dark:data-hovered:bg-neutral-800 dark:data-selected:bg-neutral-50 dark:data-hovered:text-neutral-50 dark:data-selected:text-neutral-900 dark:data-focus-visible:ring-neutral-300/50",
              // Range-specific styles
              isRange &&
                "data-selected:bg-neutral-100 data-selected:text-neutral-950 data-invalid:data-selection-end:bg-red-500 data-invalid:data-selection-start:bg-red-500 data-selection-end:bg-neutral-900 data-selection-start:bg-neutral-900 data-selection-end:text-neutral-50 data-selection-start:text-neutral-50 data-invalid:bg-red-100 data-selected:rounded-none data-selection-end:rounded-e-md data-invalid:data-selection-end:text-white data-selection-start:rounded-s-md data-invalid:data-selection-start:text-white dark:data-selected:bg-neutral-800 dark:data-selected:text-neutral-50 dark:data-invalid:data-selection-end:bg-red-900 dark:data-invalid:data-selection-start:bg-red-900 dark:data-selection-end:bg-neutral-50 dark:data-selection-start:bg-neutral-50 dark:data-selection-end:text-neutral-900 dark:data-selection-start:text-neutral-900",
              // Today indicator styles
              date.compare(now) === 0 &&
                cn(
                  "after:bg-neutral-900 after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full dark:after:bg-neutral-50",
                  isRange
                    ? "data-selection-end:after:bg-white data-selection-start:after:bg-white dark:data-selection-end:after:bg-neutral-950 dark:data-selection-start:after:bg-neutral-950"
                    : "data-selected:after:bg-white dark:data-selected:after:bg-neutral-950"
                )
            )}
          />
        )}
      </CalendarGridBodyRac>
    </CalendarGridRac>
  )
}

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <CalendarRac
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
    >
      <CalendarHeader />
      <CalendarGridComponent />
    </CalendarRac>
  )
}

function RangeCalendar({ className, ...props }: RangeCalendarProps) {
  return (
    <RangeCalendarRac
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
    >
      <CalendarHeader />
      <CalendarGridComponent isRange />
    </RangeCalendarRac>
  )
}

export { Calendar, RangeCalendar }
