'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

interface AccordionItemProps
    extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
    showIcon?: boolean
}

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    AccordionItemProps
>(({ className, showIcon, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn('border-b', className)}
        {...props}
    />
))
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps
    extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
    showIcon?: boolean
    showIconBlue?: boolean
}

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    AccordionTriggerProps
>(({ className, children, showIcon, showIconBlue, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                'flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180',
                className,
                showIconBlue && ' justify-start gap-3',
            )}
            {...props}
        >
            {showIconBlue && (
                <ChevronDown
                    className={cn(
                        'w-[24px] pointer-events-auto text-[#3F88EC] duration-300 h-[24px]',
                    )}
                />
            )}
            {children}
            {showIcon && (
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    AccordionItemProps
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }