// Importa il tipo React per utilizzare le definizioni tipizzate dei componenti
import type React from "react"

// Importa il file CSS globale per applicare stili comuni all'intera applicazione
import "@/app/globals.css"

// Importa il font "Inter" da Google Fonts tramite il sistema integrato di Next.js
import { Inter } from "next/font/google"

// Importa il componente ThemeProvider per gestire il tema (es. light/dark) dell'applicazione
import { ThemeProvider } from "@/components/theme-provider"

// Inizializza il font "Inter" specificando il subset "latin"
const inter = Inter({ subsets: ["latin"] })

// Definisce i metadati della pagina, utili per SEO e per la visualizzazione nei browser
export const metadata = {
  title: "Carbonico - Comprendi la Tua Impronta di Carbonio Digitale",
  description: "Calcola e riduci l'impatto ambientale delle tue attività online",
  generator: "v0.dev",
}

// Componente RootLayout che funge da layout principale per l'applicazione Next.js
// Riceve come props "children", ovvero i contenuti che verranno visualizzati all'interno del layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Struttura base della pagina HTML, con la lingua impostata su "it" per l'italiano
    <html lang="it">
      {/* Il tag body applica la classe del font "Inter" per utilizzare il font in tutta la pagina */}
      <body className={inter.className}>
        {/* Il ThemeProvider gestisce il tema dell'applicazione:
            - attribute="class": il tema viene applicato tramite classi CSS
            - defaultTheme="light": imposta il tema predefinito a chiaro
            - enableSystem: abilita l'uso del tema di sistema dell'utente
            - disableTransitionOnChange: disabilita le transizioni quando il tema cambia
        */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children} {/* Inserisce i contenuti figli all'interno del ThemeProvider */}
        </ThemeProvider>
      </body>
    </html>
  )
}

// Importazioni aggiuntive del file globale CSS
// Queste importazioni assicurano che gli stili definiti in "globals.css" siano applicati a tutta l'applicazione
import "./globals.css"
import './globals.css'
