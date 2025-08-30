import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'md', 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button"
  const variantClass = `button-${variant}`
  const sizeClass = `button-${size}`
  
  return (
    <Comp
      className={`button ${variantClass} ${sizeClass} ${className}`}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }