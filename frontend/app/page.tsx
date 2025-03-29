"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, TreePine, BarChart } from "lucide-react"
import { Navbar } from "@/components/navbar"

/**
 * Componente che mostra un contatore in tempo reale dei dati trasferiti
 * e delle relative emissioni di CO2
 */
function LiveDataCounter() {
  const [mbTransferred, setMbTransferred] = useState(0)
  const [co2Emissions, setCo2Emissions] = useState(0)

  // Fattore di conversione: circa 0.02g CO2 per MB trasferito
  const CO2_PER_MB = 0.02

  useEffect(() => {
    // Stima iniziale basata sulla dimensione della pagina (circa 2MB)
    const initialMB = 2
    setMbTransferred(initialMB)
    setCo2Emissions(initialMB * CO2_PER_MB)

    // Incrementa i MB trasferiti ogni secondo per simulare l'uso continuo
    const interval = setInterval(() => {
      // Incremento casuale tra 0.1 e 0.5 MB per simulare vari tipi di attività
      const increment = 0.1 + Math.random() * 0.4

      setMbTransferred((prev) => {
        const newValue = prev + increment
        // Aggiorna anche le emissioni di CO2
        setCo2Emissions(newValue * CO2_PER_MB)
        return newValue
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-4 bg-white/80 p-8 rounded-xl shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-1">
        <div className="text-5xl font-bold text-eco-600">{mbTransferred.toFixed(1)} MB</div>
        <div className="text-sm text-eco-500">trasferiti in questa sessione</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-4xl font-bold text-eco-700">{co2Emissions.toFixed(2)} g</div>
        <div className="text-lg text-eco-700">di CO₂ emessi</div>
      </div>
      <div className="text-sm text-eco-500 pt-2">Equivalente a {(co2Emissions * 0.004).toFixed(2)} km in auto</div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero section - removed top padding to eliminate space after header */}
        <section className="w-full py-0 md:py-12 lg:py-24 xl:py-36 bg-gradient-to-b from-eco-100 to-eco-200">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-eco-800">
                    Comprendi la Tua Impronta di Carbonio Digitale
                  </h1>
                  <p className="max-w-[600px] text-eco-600 md:text-xl">
                    Scopri come le tue attività online impattano sull'ambiente e impara come ridurre le tue emissioni di
                    carbonio digitali.
                  </p>
                </div>
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
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-eco-300 to-eco-500 rounded-lg opacity-20 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LiveDataCounter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Come funziona section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-eco-800">
                  Come Funziona
                </h2>
                <p className="max-w-[900px] text-eco-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  La nostra piattaforma ti aiuta a comprendere e ridurre la tua impronta di carbonio digitale attraverso
                  tre semplici passaggi.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {/* Card 1: Calcola */}
              <div className="flex flex-col justify-center space-y-4 p-6 bg-eco-50 rounded-xl card-hover">
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
                  Visualizza il tuo impatto con paragoni tangibili e comprendi cosa significa realmente il tuo consumo
                  di dati.
                </p>
              </div>

              {/* Card 3: Migliora */}
              <div className="flex flex-col justify-center space-y-4 p-6 bg-eco-50 rounded-xl card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eco-100 text-eco-600">
                  <TreePine className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-eco-800">Migliora</h3>
                <p className="text-eco-600">
                  Ricevi raccomandazioni personalizzate e monitora i tuoi progressi mentre riduci la tua impronta di
                  carbonio digitale.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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

