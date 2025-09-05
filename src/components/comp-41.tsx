"use client"

import { CalendarIcon } from "lucide-react"
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components"

import { Calendar } from "@/components/ui/calendar-rac"
import { DateInput } from "@/components/ui/datefield-rac"

export default function Component() {
  return (
    <DatePicker className="*:not-first:mt-2">
      <Label className="text-neutral-950 text-sm font-medium dark:text-neutral-50">Date picker</Label>
      <div className="flex">
        <Group className="w-full">
          <DateInput className="pe-9" />
        </Group>
        <Button className="text-neutral-500/80 hover:text-neutral-950 data-focus-visible:border-neutral-950 data-focus-visible:ring-neutral-950/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px] dark:text-neutral-400/80 dark:hover:text-neutral-50 dark:data-focus-visible:border-neutral-300 dark:data-focus-visible:ring-neutral-300/50">
          <CalendarIcon size={16} />
        </Button>
      </div>
      <Popover
        className="bg-white text-neutral-950 data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border border-neutral-200 shadow-lg outline-hidden dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-800"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <Calendar />
        </Dialog>
      </Popover>
      <p
        className="text-neutral-500 mt-2 text-xs dark:text-neutral-400"
        role="region"
        aria-live="polite"
      >
        Built with{""}
        <a
          className="hover:text-neutral-950 underline dark:hover:text-neutral-50"
          href="https://react-spectrum.adobe.com/react-aria/DatePicker.html"
          target="_blank"
          rel="noopener nofollow"
        >
          React Aria
        </a>
      </p>
    </DatePicker>
  )
}
