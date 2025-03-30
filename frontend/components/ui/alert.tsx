// Importa React per creare componenti e gestire i riferimenti (refs)
import * as React from "react"
// Importa "cva" (Class Variance Authority) e il tipo VariantProps per gestire le varianti delle classi CSS
import { cva, type VariantProps } from "class-variance-authority"

// Importa la funzione "cn" per combinare le classi CSS in modo condizionale
import { cn } from "@/lib/utils"

/**
 * alertVariants
 * -------------
 * Definisce le varianti per lo stile dell'alert usando la funzione "cva".
 * La stringa di base contiene le classi di default:
 * - "relative": posizionamento relativo
 * - "w-full": larghezza piena
 * - "rounded-lg": bordi arrotondati di dimensione "lg"
 * - "border": applica un bordo
 * - "p-4": padding di 4 unità
 * - Le classi con i selettori "[&>svg~*]" e simili applicano stili specifici agli elementi SVG e ai relativi fratelli
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    // Definisce le varianti basate sulla proprietà "variant"
    variants: {
      variant: {
        // Variante predefinita: sfondo e testo usano i colori definiti dalle variabili CSS (bg-background e text-foreground)
        default: "bg-background text-foreground",
        // Variante "destructive": per messaggi di errore o allerta grave
        // Applica un bordo e testo in tonalità "destructive" e, in modalità dark, mantiene il bordo destructivo
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    // Specifica la variante di default se non viene indicata
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Alert
 * -----
 * Componente Alert che visualizza un messaggio di avviso.
 * Usa React.forwardRef per inoltrare il ref al div principale.
 * Combina le classi definite in alertVariants con eventuali classi aggiuntive passate via props.
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert" // Ruolo ARIA per rendere l'elemento accessibile come alert
    // Combina le classi base definite in alertVariants per la variante specificata con eventuali classi aggiuntive
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

/**
 * AlertTitle
 * ----------
 * Componente per il titolo dell'Alert.
 * Usa React.forwardRef per inoltrare il ref ad un elemento <h5>.
 * Applica stili base per il titolo (margine inferiore, font medio, etc.).
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    // Combina le classi di default per il titolo con eventuali classi aggiuntive passate via props
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/**
 * AlertDescription
 * ----------------
 * Componente per la descrizione dell'Alert.
 * Usa React.forwardRef per inoltrare il ref ad un elemento <div>.
 * Applica uno stile di base per il testo della descrizione.
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Applica una dimensione del testo piccola e garantisce una buona leggibilità dei paragrafi interni
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

// Esporta i componenti Alert, AlertTitle e AlertDescription per l'utilizzo in altre parti dell'applicazione
export { Alert, AlertTitle, AlertDescription }
