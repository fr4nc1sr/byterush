"use client"

// Importa React per utilizzare hook e componenti, e importa i componenti di AlertDialog da Radix UI
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

// Importa la funzione "cn" per combinare classi CSS in modo condizionale
import { cn } from "@/lib/utils"
// Importa "buttonVariants" per applicare gli stili dei pulsanti (da un componente UI personalizzato)
import { buttonVariants } from "@/components/ui/button"

/**
 * AlertDialog
 * -----------
 * Esporta il componente AlertDialog come wrapper principale (Root) per il dialogo.
 */
const AlertDialog = AlertDialogPrimitive.Root

/**
 * AlertDialogTrigger
 * ------------------
 * Esporta il trigger che apre l'AlertDialog.
 */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

/**
 * AlertDialogPortal
 * -----------------
 * Esporta il Portal che rende il contenuto dell'AlertDialog in un nodo separato nel DOM.
 */
const AlertDialogPortal = AlertDialogPrimitive.Portal

/**
 * AlertDialogOverlay
 * ------------------
 * Componente per l'overlay di sfondo dell'AlertDialog.
 * Usa React.forwardRef per inoltrare il ref al componente sottostante.
 */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    // Combina le classi predefinite per l'overlay con eventuali classi aggiuntive passate via props
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

/**
 * AlertDialogContent
 * ------------------
 * Componente per il contenuto principale dell'AlertDialog.
 * Viene renderizzato all'interno di un Portal insieme all'Overlay.
 * Usa React.forwardRef per inoltrare il ref.
 */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      // Applica classi per la posizione, dimensioni, transizioni e animazioni
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 " +
        "data-[state=open]:animate-in data-[state=closed]:animate-out " +
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] " +
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] " +
        "sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

/**
 * AlertDialogHeader
 * -----------------
 * Componente per l'intestazione del dialogo.
 * Rende il titolo e altri elementi opzionali in una struttura flessibile.
 */
const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    // Combina le classi base per l'intestazione con eventuali classi aggiuntive
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

/**
 * AlertDialogFooter
 * -----------------
 * Componente per il footer del dialogo, utile per posizionare pulsanti di azione.
 * Organizza i pulsanti in colonna in dispositivi piccoli e in riga in dispositivi più grandi.
 */
const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

/**
 * AlertDialogTitle
 * ----------------
 * Componente per il titolo dell'AlertDialog.
 * Usa React.forwardRef per inoltrare il ref e applica classi per lo stile del titolo.
 */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

/**
 * AlertDialogDescription
 * ----------------------
 * Componente per la descrizione dell'AlertDialog.
 * Fornisce informazioni aggiuntive al titolo, con uno stile più sobrio.
 */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

/**
 * AlertDialogAction
 * -----------------
 * Componente per l'azione principale dell'AlertDialog, come ad esempio un pulsante di conferma.
 * Applica gli stili dei pulsanti tramite "buttonVariants".
 */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

/**
 * AlertDialogCancel
 * -----------------
 * Componente per l'azione di cancellazione o chiusura dell'AlertDialog.
 * Utilizza "buttonVariants" con la variante "outline" per differenziarlo visivamente.
 */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

// Esporta tutti i componenti per l'AlertDialog, che possono essere utilizzati per costruire il dialogo
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
