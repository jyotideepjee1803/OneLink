import * as React from "react"
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: LucideIcon;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    return (
      <div className="w-full relative">
        {StartIcon && (
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
            <StartIcon size={18} className="text-muted-foreground" />
          </div>
        )}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          startIcon ? "pl-10" : "",
        )}
        ref={ref}
        {...props}
      />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
