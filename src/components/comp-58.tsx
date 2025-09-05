"use client"

import { useId } from "react"
import { OTPInput, SlotProps } from "input-otp"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>OTP input (spaced)</Label>
      <OTPInput
        id={id}
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        maxLength={4}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
      <p
        className="text-neutral-500 mt-2 text-xs dark:text-neutral-400"
        role="region"
        aria-live="polite"
      >
        Built with{""}
        <a
          className="hover:text-neutral-950 underline dark:hover:text-neutral-50"
          href="https://github.com/guilhermerodz/input-otp"
          target="_blank"
          rel="noopener nofollow"
        >
          Input OTP
        </a>
      </p>
    </div>
  )
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-neutral-200 bg-white text-neutral-950 flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        { "border-neutral-950 ring-neutral-950/50 z-10 ring-[3px] dark:border-neutral-300 dark:ring-neutral-300/50": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}
