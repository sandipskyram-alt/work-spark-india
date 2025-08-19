import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // WorkSpark India variants
        hero: "bg-gradient-to-r from-saffron to-saffron-light text-white hover:from-saffron-dark hover:to-saffron shadow-lg hover:shadow-xl transition-all duration-300",
        success: "bg-gradient-to-r from-indian-green to-indian-green-light text-white hover:from-indian-green-dark hover:to-indian-green shadow-lg hover:shadow-xl transition-all duration-300",
        "outline-saffron": "border-2 border-saffron text-saffron hover:bg-saffron hover:text-white transition-all duration-300",
        "outline-green": "border-2 border-indian-green text-indian-green hover:bg-indian-green hover:text-white transition-all duration-300",
        premium: "bg-gradient-to-r from-secondary to-secondary-light text-white hover:from-secondary-dark hover:to-secondary shadow-lg hover:shadow-xl transition-all duration-300",
        accent: "bg-gradient-to-r from-accent to-accent-light text-white hover:from-accent-dark hover:to-accent shadow-md hover:shadow-lg transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
