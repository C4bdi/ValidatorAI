
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100 border border-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary/70 to-primary" />
    </SliderPrimitive.Track>
    {[1, 2, 3, 4, 5].map((step) => (
      <div 
        key={step}
        className={`absolute h-4 w-0.5 bg-gray-300 rounded-full`}
        style={{ left: `${(step - 1) * 25}%` }}
      />
    ))}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
