"use client"

// Importazione degli hook di React per gestire stati ed effetti collaterali
import { useState, useEffect } from "react"
// Importa il componente Link di Next.js per la navigazione interna
import Link from "next/link"
// Importa il componente Button personalizzato dalla libreria UI
import { Button } from "@/components/ui/button"
// Importa alcune icone dalla libreria lucide-react per arricchire l'interfaccia utente
import { ArrowRight, Calculator, TreePine, BarChart } from "lucide-react"
// Importa la Navbar per includere la barra di navigazione in cima alla pagina
import { Navbar } from "@/components/navbar"

/**
 * Componente LiveDataCounter
 * ---------------------------
 * Questo componente simula un contatore in tempo reale dei dati trasferiti (in MB)
 * e calcola le relative emissioni di CO₂ in base a un fattore di conversione.
 */
function LiveDataCounter() {
  // Stato per tenere traccia dei MB trasferiti
  const [mbTransferred, setMbTransferred] = useState(0)
  // Stato per tenere traccia delle emissioni di CO₂ calcolate
  const [co2Emissions, setCo2Emissions] = useState(0)

  // Fattore di conversione: circa 0.02 grammi di CO₂ per ogni MB trasferito
  const CO2_PER_MB = 0.02

  useEffect(() => {
    // Imposta una stima iniziale: ad esempio, la pagina inizialmente trasferisce circa 2 MB
    const initialMB = 2
    setMbTransferred(initialMB)
    setCo2Emissions(initialMB * CO2_PER_MB)

    // Simula l'incremento dei MB trasferiti ogni secondo
    const interval = setInterval(() => {
      // Calcola un incremento casuale tra 0.1 e 0.5 MB per rappresentare diverse attività
      const increment = 0.1 + Math.random() * 0.4

      // Aggiorna lo stato dei MB trasferiti e ricalcola le emissioni di CO₂
      setMbTransferred((prev) => {
        const newValue = prev + increment
        // Aggiorna anche le emissioni moltiplicando i MB trasferiti per il fattore di conversione
        setCo2Emissions(newValue * CO2_PER_MB)
        return newValue
      })
    }, 1000) // Aggiornamento ogni 1000 millisecondi (1 secondo)

    // Pulizia dell'intervallo quando il componente viene smontato
    return () => clearInterval(interval)
  }, [])

  // Restituisce il markup del contatore con stili e formattazioni
  return (
    <div className="text-center space-y-4 bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-sm">
      {/* Sezione per mostrare i MB trasferiti */}
      <div className="flex flex-col gap-1">
        <div className="text-5xl font-bold text-eco-600">
          {mbTransferred.toFixed(1)} MB
        </div>
        <div className="text-sm text-eco-500">trasferiti in questa sessione</div>
      </div>
      {/* Sezione per mostrare le emissioni di CO₂ */}
      <div className="flex flex-col gap-1">
        <div className="text-4xl font-bold text-eco-700">
          {co2Emissions.toFixed(2)} g
        </div>
        <div className="text-lg text-eco-700">di CO₂ emessi</div>
      </div>
      {/* Sezione per mostrare l'equivalente in km percorsi in auto */}
      <div className="text-sm text-eco-500 pt-2">
        Equivalente a {(co2Emissions * 0.004).toFixed(2)} km in auto
      </div>
    </div>
  )
}

/**
 * Componente Home
 * ---------------
 * Questo componente rappresenta la homepage dell'applicazione e include:
 * - La Navbar in cima alla pagina
 * - Una sezione "Hero" con titolo, descrizione e pulsanti per navigare ad altre pagine
 * - Un contatore in tempo reale (LiveDataCounter) che mostra i dati trasferiti e le emissioni di CO₂
 * - Una sezione "Come Funziona" che spiega i passaggi per calcolare, comprendere e migliorare l'impronta di carbonio digitale
 * - Il Footer con link a Termini di Servizio e Privacy
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar: barra di navigazione fissa in alto */}
      <Navbar />

      {/* Main: contenuto principale della pagina */}
      <main className="flex-1">
        {/* Sezione Hero: presentazione principale dell'app */}
        <section className="w-full py-0 md:py-12 lg:py-24 xl:py-36 bg-gradient-to-b from-eco-100 to-eco-200">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              {/* Sezione sinistra: titolo, descrizione e pulsanti */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  {/* Titolo principale */}
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-eco-800">
                    Comprendi la Tua Impronta di Carbonio Digitale
                  </h1>
                  {/* Descrizione introduttiva */}
                  <p className="max-w-[600px] text-eco-600 md:text-xl">
                    Scopri come le tue attività online impattano sull'ambiente e impara come ridurre le tue emissioni di carbonio digitali.
                  </p>
                </div>
                {/* Pulsanti per navigare alle pagine del calcolatore e dei consigli eco-friendly */}
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/calculator">
                    <Button size="lg" className="bg-eco-600 hover:bg-eco-700 text-white">
                      Calcola il Tuo Impatto
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/tips">
                    <Button size="lg" variant="outline" className="border-eco-400 text-eco-700 hover:bg-eco-100">
                      Ottieni Consigli Eco
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Sezione destra: visualizzazione del contatore LiveDataCounter */}
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                  {/* Sfondo con effetto gradiente e animazione pulse */}
                  <div className="absolute inset-0 bg-gradient-to-r from-eco-300 to-eco-500 rounded-lg opacity-20 animate-pulse" />
                  {/* Posizionamento centrato del componente LiveDataCounter */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LiveDataCounter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sezione "Come Funziona": spiega in 3 passaggi come l'app aiuta a ridurre l'impronta digitale */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            {/* Titolo e descrizione della sezione */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-eco-800">
                  Come Funziona
                </h2>
                <p className="max-w-[900px] text-eco-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  La nostra piattaforma ti aiuta a comprendere e ridurre la tua impronta di carbonio digitale attraverso tre semplici passaggi.
                </p>
              </div>
            </div>
            {/* Griglia contenente 3 card che illustrano i passaggi: Calcola, Comprendi e Migliora */}
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {/* Card 1: Calcola */}
              <div className="flex flex-col justify-center space-y-4 p-6 bg-eco-50 rounded-xl card-hover">
                {/* Icona della card */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eco-100 text-eco-600">
                  <Calculator className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-eco-800">Calcola</h3>
                <p className="text-eco-600">
                  Misura la tua impronta di carbonio digitale in base alle tue attività online e al consumo di dati.
                </p>
              </div>

              {/* Card 2: Comprendi */}
              <div className="flex flex-col justify-center space-y-4 p-6 bg-eco-50 rounded-xl card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eco-100 text-eco-600">
                  <BarChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-eco-800">Comprendi</h3>
                <p className="text-eco-600">
                  Visualizza il tuo impatto con paragoni tangibili e comprendi cosa significa realmente il tuo consumo di dati.
                </p>
              </div>

              {/* Card 3: Migliora */}
              <div className="flex flex-col justify-center space-y-4 p-6 bg-eco-50 rounded-xl card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eco-100 text-eco-600">
                  <TreePine className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-eco-800">Migliora</h3>
                <p className="text-eco-600">
                  Ricevi raccomandazioni personalizzate e monitora i tuoi progressi mentre riduci la tua impronta di carbonio digitale.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer: contiene informazioni sul copyright e link a Termini di Servizio e Privacy */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t border-eco-200 px-4 md:px-6 bg-eco-50">
        <p className="text-xs text-eco-600">© 2025 Carbonico. Tutti i diritti riservati.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-eco-600 hover:underline underline-offset-4 text-eco-500" href="#">
            Termini di Servizio
          </Link>
          <Link className="text-xs hover:text-eco-600 hover:underline underline-offset-4 text-eco-500" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
