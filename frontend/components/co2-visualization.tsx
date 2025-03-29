import { Card, CardContent } from "@/components/ui/card"
import { BoxIcon as Bottle, Droplet, Car, Home, TreePine } from "lucide-react"

interface CO2VisualizationProps {
  carbonGrams: number
}

export function CO2Visualization({ carbonGrams }: CO2VisualizationProps) {
  // Determina quale visualizzazione mostrare in base alla quantità di CO2
  const getVisualization = () => {
    if (carbonGrams < 10) {
      return {
        icon: <Bottle className="h-16 w-16 text-water-500" />,
        title: "Bottiglia",
        description: `La tua impronta di carbonio digitale giornaliera (${carbonGrams.toFixed(1)}g) occupa lo stesso volume di CO₂ che potrebbe riempire circa ${(carbonGrams / 2).toFixed(1)} bottiglie da 1 litro.`,
        color: "bg-water-100 border-water-300",
      }
    } else if (carbonGrams < 50) {
      return {
        icon: <Droplet className="h-16 w-16 text-water-600" />,
        title: "Secchio",
        description: `La tua impronta di carbonio digitale giornaliera (${carbonGrams.toFixed(1)}g) occupa lo stesso volume di CO₂ che potrebbe riempire circa ${(carbonGrams / 10).toFixed(1)} secchi d'acqua da 10 litri.`,
        color: "bg-water-100 border-water-300",
      }
    } else if (carbonGrams < 150) {
      return {
        icon: <TreePine className="h-16 w-16 text-eco-600" />,
        title: "Albero",
        description: `La tua impronta di carbonio digitale giornaliera (${carbonGrams.toFixed(1)}g) richiede circa ${(carbonGrams * 0.0055).toFixed(2)} alberi per essere assorbita completamente in un giorno.`,
        color: "bg-eco-100 border-eco-300",
      }
    } else if (carbonGrams < 500) {
      return {
        icon: <Car className="h-16 w-16 text-earth-600" />,
        title: "Auto",
        description: `La tua impronta di carbonio digitale giornaliera (${carbonGrams.toFixed(1)}g) equivale alle emissioni prodotte da un'auto che percorre circa ${(carbonGrams * 0.12).toFixed(1)} km.`,
        color: "bg-earth-100 border-earth-300",
      }
    } else {
      return {
        icon: <Home className="h-16 w-16 text-earth-700" />,
        title: "Casa",
        description: `La tua impronta di carbonio digitale giornaliera (${carbonGrams.toFixed(1)}g) equivale a circa ${(carbonGrams / 1000).toFixed(2)} kg di CO₂, paragonabile al consumo energetico di una casa per ${(carbonGrams / 500).toFixed(1)} ore.`,
        color: "bg-earth-100 border-earth-300",
      }
    }
  }

  const visualization = getVisualization()

  return (
    <Card className={`overflow-hidden border-2 ${visualization.color}`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full p-4 bg-white shadow-md animate-float">{visualization.icon}</div>
          <h3 className="text-xl font-bold">{visualization.title}</h3>
          <p className="text-muted-foreground">{visualization.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

