"use client"

// Importa React per poter utilizzare gli hook e i metodi relativi ai componenti
import * as React from "react"
// Importa tutti i componenti dal modulo "@radix-ui/react-avatar" che fornisce componenti avatar accessibili
import * as AvatarPrimitive from "@radix-ui/react-avatar"

// Importa la funzione "cn" per combinare in modo condizionale le classi CSS
import { cn } from "@/lib/utils"

/**
 * Componente Avatar
 * -----------------
 * Il componente Avatar funge da contenitore principale per visualizzare l'immagine dell'utente o una fallback.
 * Viene creato utilizzando React.forwardRef per inoltrare il ref al componente sottostante di Radix UI.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    // Combina le classi CSS di default per definire un avatar rotondo e di dimensione fissa con eventuali classi aggiuntive passate via props.
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * Componente AvatarImage
 * ----------------------
 * Questo componente visualizza l'immagine dell'avatar.
 * Usa React.forwardRef per inoltrare il ref al componente AvatarPrimitive.Image.
 * Le classi CSS assicurano che l'immagine mantenga un rapporto quadrato e si adatti completamente al contenitore.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * Componente AvatarFallback
 * -------------------------
 * Questo componente viene visualizzato se l'immagine dell'avatar non può essere caricata.
 * Utilizza React.forwardRef per inoltrare il ref al componente AvatarPrimitive.Fallback.
 * Le classi CSS applicano uno stile centrato e un background neutro per indicare una fallback.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Esporta i componenti Avatar, AvatarImage e AvatarFallback per poterli utilizzare in altre parti dell'applicazione
export { Avatar, AvatarImage, AvatarFallback }
