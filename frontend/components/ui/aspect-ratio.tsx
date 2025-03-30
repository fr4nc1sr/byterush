"use client"

// Importa il modulo di Radix UI relativo al componente AspectRatio.
// Questo modulo fornisce strumenti per gestire proporzioni fisse per contenuti multimediali.
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

// Definisce il componente "AspectRatio" assegnandolo al componente "Root"
// di AspectRatioPrimitive. In questo modo, "AspectRatio" può essere usato come wrapper
// per mantenere le proporzioni desiderate dei contenuti.
const AspectRatio = AspectRatioPrimitive.Root

// Esporta il componente "AspectRatio" per poterlo utilizzare in altre parti dell'applicazione.
export { AspectRatio }
