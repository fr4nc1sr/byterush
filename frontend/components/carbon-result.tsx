import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Lightbulb, TreePine, BarChart } from "lucide-react"
import { Suggestions } from "@/components/suggestions"
import { CO2Visualization } from "@/components/co2-visualization"

interface CarbonResultProps {
  carbonFootprint: number
  equivalent: {
    driving: number
    trees: number
    lightbulbs: number
  }
  suggestions: {
    title: string
    description: string
    impact: number
  }[]
}

export function CarbonResult({ carbonFootprint, equivalent, suggestions }: CarbonResultProps) {
  // Determina il livello di impatto in base al valore dell'impronta
  const getImpactLevel = (value: number) => {
    if (value < 30) return "Basso"
    if (value < 100) return "Medio"
    return "Alto"
  }

  const impactLevel = getImpactLevel(carbonFootprint)
  const impactColor =
    impactLevel === "Basso"
      ? "text-eco-600 bg-eco-100"
      : impactLevel === "Medio"
        ? "text-amber-600 bg-amber-100"
        : "text-red-600 bg-red-100"

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-eco-200 to-eco-100 pb-2">
          <CardTitle className="text-eco-800 flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            La Tua Impronta di Carbonio Digitale
          </CardTitle>
          <CardDescription className="text-eco-700">Basata sulle tue attività digitali quotidiane</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Visualizzazione del risultato principale */}
          <div className="text-center py-4">
            <div className="text-6xl font-bold mb-2 text-eco-700">{carbonFootprint.toFixed(1)}</div>
            <div className="text-xl text-eco-600">grammi di CO₂ al giorno</div>
            <div className={`text-lg font-medium mt-3 py-1 px-4 rounded-full inline-block ${impactColor}`}>
              Impatto {impactLevel}
            </div>
          </div>

          {/* Visualizzazione grafica dell'impronta */}
          <CO2Visualization carbonGrams={carbonFootprint} />

          {/* Tabs per i diversi equivalenti */}
          <Tabs defaultValue="driving" className="mt-6">
            <TabsList className="grid w-full grid-cols-3 bg-eco-100">
              <TabsTrigger
                value="driving"
                className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
              >
                <Car className="h-4 w-4" />
                <span className="hidden sm:inline">Auto</span>
              </TabsTrigger>
              <TabsTrigger
                value="trees"
                className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
              >
                <TreePine className="h-4 w-4" />
                <span className="hidden sm:inline">Alberi</span>
              </TabsTrigger>
              <TabsTrigger
                value="energy"
                className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
              >
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Energia</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="driving" className="pt-4">
              <div className="text-center space-y-2 p-4 bg-eco-50 rounded-lg">
                <div className="text-4xl font-bold text-eco-700">{equivalent.driving.toFixed(1)} km</div>
                <p className="text-eco-600">
                  La tua impronta di carbonio digitale giornaliera equivale a guidare questa distanza in un'auto media.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="trees" className="pt-4">
              <div className="text-center space-y-2 p-4 bg-eco-50 rounded-lg">
                <div className="text-4xl font-bold text-eco-700">{equivalent.trees.toFixed(2)}</div>
                <p className="text-eco-600">
                  Questo è il numero di alberi necessari per assorbire le tue emissioni di carbonio digitali
                  giornaliere.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="energy" className="pt-4">
              <div className="text-center space-y-2 p-4 bg-eco-50 rounded-lg">
                <div className="text-4xl font-bold text-eco-700">{equivalent.lightbulbs.toFixed(1)} ore</div>
                <p className="text-eco-600">
                  La tua impronta di carbonio digitale giornaliera potrebbe alimentare una lampadina LED da 10W per
                  questo numero di ore.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Componente per i suggerimenti personalizzati */}
      <Suggestions suggestions={suggestions} />
    </div>
  )
}

