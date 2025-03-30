// Importa React per la definizione dei componenti
import * as React from "react"
// Importa la funzione "cva" e il tipo "VariantProps" dal pacchetto "class-variance-authority"
// "cva" viene utilizzata per creare varianti di classi CSS in modo modulare e gestibile
import { cva, type VariantProps } from "class-variance-authority"

// Importa la funzione "cn" per combinare condizionatamente le classi CSS, utile per evitare conflitti
import { cn } from "@/lib/utils"

/**
 * badgeVariants
 * -------------
 * Definisce le classi CSS per il componente Badge e le sue varianti.
 * La funzione "cva" crea un set di classi di base e permette di definire varianti che modificano
 * lo stile in base alla proprietà "variant".
 *
 * Classi di base applicate:
 * - "inline-flex items-center": visualizza il badge come elemento inline flessibile, centrandone il contenuto.
 * - "rounded-full": conferisce bordi completamente arrotondati, ottenendo un aspetto a pillola.
 * - "border px-2.5 py-0.5": imposta un bordo e padding orizzontale e verticale.
 * - "text-xs font-semibold": dimensione del testo piccola e in grassetto.
 * - "transition-colors": abilita transizioni morbide per i cambi di colore.
 * - "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2": gestisce lo stato di focus con un ring esterno.
 *
 * Varianti definite:
 * - default: Badge con sfondo primario e testo in contrasto, con effetto hover.
 * - secondary: Badge con sfondo secondario.
 * - destructive: Badge per situazioni critiche, come errori o azioni distruttive.
 * - outline: Badge con testo in primo piano e senza sfondo.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Definizione delle proprietà del componente Badge, estendendo le proprietà HTML per un <div>
// e includendo le varianti create con "badgeVariants"
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Componente Badge
 * -----------------
 * Visualizza un badge stilizzato, che può essere utilizzato per etichettare informazioni, stati o categorie.
 *
 * Accetta le proprietà standard di un <div> insieme alla proprietà "variant" per specificare lo stile.
 * Le classi CSS vengono combinate usando la funzione "cn" e la funzione "badgeVariants" per applicare
 * le classi in base alla variante selezionata.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Imposta il displayName del componente per facilitare il debugging in React DevTools
Badge.displayName = "Badge"

// Esporta il componente Badge e la funzione badgeVariants per essere riutilizzati in altri moduli
export { Badge, badgeVariants }
