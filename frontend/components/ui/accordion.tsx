"use client"

// Importa React per l'utilizzo degli hook e dei componenti, e Radix UI per il componente Accordion
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
// Importa l'icona ChevronDown dalla libreria lucide-react per indicare lo stato di apertura/chiusura dell'Accordion
import { ChevronDown } from "lucide-react"

// Importa la funzione "cn" per combinare classi CSS in modo condizionale e risolvere conflitti (tailwind-merge)
import { cn } from "@/lib/utils"

/**
 * Accordion
 * ---------
 * Esporta il componente Accordion, che è semplicemente il componente Root di AccordionPrimitive.
 */
const Accordion = AccordionPrimitive.Root

/**
 * AccordionItem
 * -------------
 * Componente per rappresentare un elemento (item) dell'Accordion.
 * Utilizza React.forwardRef per passare il ref al componente radice di AccordionPrimitive.Item.
 * La proprietà "className" viene combinata con una classe di default "border-b" per aggiungere un bordo inferiore.
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * AccordionTrigger
 * ----------------
 * Componente per il trigger (ovvero l'intestazione cliccabile) dell'Accordion.
 * Utilizza React.forwardRef per inoltrare il ref a AccordionPrimitive.Trigger.
 * Il trigger è racchiuso in un Header per una migliore struttura semantica.
 * Le classi CSS gestiscono la disposizione, la transizione e l'effetto hover, e ruotano l'icona
 * (ChevronDown) quando il contenuto dell'Accordion è aperto.
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // Classi di base per il trigger: flessibilità, spaziatura e transizioni
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline " +
        // Classe per ruotare l'icona se il contenuto è aperto
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {/* L'icona ChevronDown viene usata per indicare lo stato di apertura e si ruota grazie alle transizioni */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * AccordionContent
 * ----------------
 * Componente per visualizzare il contenuto associato a un AccordionItem.
 * Utilizza React.forwardRef per inoltrare il ref al componente AccordionPrimitive.Content.
 * Applica classi per gestire l'overflow, la transizione e le animazioni basate sullo stato (aperto/chiuso).
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    {/* Aggiunge padding inferiore per una migliore spaziatura interna */}
    <div className={cn("pb-4 pt-0", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Esporta i componenti per essere utilizzati in altre parti dell'applicazione
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
