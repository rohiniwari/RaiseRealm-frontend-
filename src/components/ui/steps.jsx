import * as React from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"

const Steps = React.forwardRef(({ className, value = 0, onValueChange, children, ...props }, ref) => {
  const totalSteps = React.Children.count(children)
  
  const prevStep = () => {
    onValueChange?.(Math.max(0, value - 1))
  }
  
  const nextStep = () => {
    onValueChange?.(Math.min(totalSteps - 1, value + 1))
  }

  return (
    <div className={cn("space-y-6", className)} ref={ref} {...props}>
      <StepHeader value={value} totalSteps={totalSteps} />
      <div className="space-y-6">
        {React.Children.map(children, (child, index) => (
          <Step key={index} index={index} active={value === index}>
            {child}
          </Step>
        ))}
      </div>
      <StepNavigation 
        value={value} 
        totalSteps={totalSteps} 
        onPrev={prevStep} 
        onNext={nextStep}
      />
    </div>
  )
})
Steps.displayName = "Steps"

const StepHeader = ({ value, totalSteps }) => (
  <div className="flex items-center justify-center w-full">
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div 
          key={index}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-200",
            value === index 
              ? "bg-primary-600 w-8 scale-110 shadow-md" 
              : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
          )}
        />
      ))}
    </div>
  </div>
)

const Step = React.forwardRef(({ className, index, active, children, ...props }, ref) => (
  <div 
    className={cn(
      "transition-all duration-200 p-6 border rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm",
      active ? "ring-2 ring-primary-200/50 dark:ring-primary-800/50 shadow-md" : "opacity-50",
      className
    )} 
    ref={ref}
    {...props}
  >
    {children}
  </div>
))
Step.displayName = "Step"

const StepNavigation = ({ value, totalSteps, onPrev, onNext }) => {
  const isFirstStep = value === 0
  const isLastStep = value === totalSteps - 1

  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
      <Button
        type="button"
        variant="outline"
        onClick={onPrev}
        disabled={isFirstStep}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <div className="text-sm text-slate-500">
        Step {value + 1} of {totalSteps}
      </div>
      
      <Button 
        type="button"
        onClick={onNext}
        disabled={isLastStep}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export { Steps, Step, StepNavigation }

