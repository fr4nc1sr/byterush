import * as React from "react"

// Definisce il breakpoint per considerare un dispositivo come mobile (in pixel)
const MOBILE_BREAKPOINT = 768

/**
 * Hook personalizzato che restituisce un valore booleano in base alla larghezza dello schermo.
 * Se la larghezza della finestra è inferiore a MOBILE_BREAKPOINT, restituisce true, altrimenti false.
 */
export function useIsMobile() {
  // Stato per tenere traccia se l'utente sta utilizzando un dispositivo mobile.
  // Inizialmente undefined, fino a quando non viene determinata la larghezza corrente.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // useEffect per impostare il listener per le modifiche della dimensione della finestra
  React.useEffect(() => {
    // Crea un MediaQueryList per monitorare se la larghezza è minore di MOBILE_BREAKPOINT (768px)
    // Utilizza MOBILE_BREAKPOINT - 1 perché "max-width" è inclusivo, quindi 767px è il massimo per mobile.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Funzione di callback chiamata quando la condizione della media query cambia
    const onChange = () => {
      // Aggiorna lo stato in base alla larghezza corrente della finestra
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Aggiunge l'evento "change" al MediaQueryList per rilevare le variazioni della dimensione dello schermo
    mql.addEventListener("change", onChange)

    // Imposta lo stato iniziale controllando subito la larghezza corrente della finestra
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Funzione di cleanup: rimuove il listener quando il componente si smonta
    return () => mql.removeEventListener("change", onChange)
  }, []) // L'array delle dipendenze vuoto garantisce che l'effetto venga eseguito una sola volta al montaggio

  // Restituisce un valore booleano: se isMobile è undefined, !!isMobile lo converte in false
  return !!isMobile
}
