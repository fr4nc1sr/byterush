import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, Leaf } from "lucide-react"

interface SuggestionsProps {
  suggestions: {
    title: string
    description: string
    impact: number
  }[]
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <Card className="border-2 border-primary/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-eco-200 to-eco-100 pb-2">
        <CardTitle className="text-eco-800 flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          Suggerimenti Personalizzati
        </CardTitle>
        <CardDescription className="text-eco-700">
          Modi per ridurre la tua impronta di carbonio digitale
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Mappa i suggerimenti generati */}
          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-4 bg-eco-50 rounded-lg hover:bg-eco-100 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-eco-100 p-2 rounded-full text-eco-600 mt-0.5">
                  <ArrowDown className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-eco-800">{suggestion.title}</h3>
                  <p className="text-eco-600 mt-1">{suggestion.description}</p>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-sm font-medium bg-eco-200 text-eco-800 px-2 py-1 rounded-full">
                    -{suggestion.impact}%
                  </span>
                </div>
              </div>
              <Progress
                value={suggestion.impact}
                max={100}
                className="h-2 bg-eco-200"
                indicatorClassName="bg-gradient-to-r from-eco-400 to-eco-600"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

