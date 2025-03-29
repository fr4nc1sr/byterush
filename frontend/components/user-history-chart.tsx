"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react"
import { getUserChartData } from "@/lib/user-data-service"

interface UserHistoryChartProps {
  username: string
}

export function UserHistoryChart({ username }: UserHistoryChartProps) {
  // Stati per i dati del grafico e il trend
  const [chartData, setChartData] = useState<{ date: string; carbonFootprint: number }[]>([])
  const [trend, setTrend] = useState<"up" | "down" | "neutral">("neutral")

  // Carica i dati del grafico all'avvio e quando cambia l'username
  useEffect(() => {
    const data = getUserChartData(username)
    setChartData(data)

    // Calcola il trend confrontando il primo e l'ultimo valore
    if (data.length >= 2) {
      const firstValue = data[0].carbonFootprint
      const lastValue = data[data.length - 1].carbonFootprint

      if (lastValue < firstValue) {
        setTrend("down")
      } else if (lastValue > firstValue) {
        setTrend("up")
      } else {
        setTrend("neutral")
      }
    }
  }, [username])

  // Componente personalizzato per il tooltip del grafico
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-eco-200 rounded-md shadow-md">
          <p className="font-medium text-eco-800">{label}</p>
          <p className="text-eco-600">
            <span className="font-medium">{payload[0].value?.toFixed(1)}</span> g CO₂
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <Card className="border-2 border-primary/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-eco-200 to-eco-100 pb-2">
        <CardTitle className="text-eco-800 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Il Tuo Storico
        </CardTitle>
        <CardDescription className="text-eco-700 flex items-center gap-2">
          {trend === "down" && (
            <>
              <TrendingDown className="h-4 w-4 text-eco-600" />
              <span>Ottimo! La tua impronta sta diminuendo</span>
            </>
          )}
          {trend === "up" && (
            <>
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <span>La tua impronta sta aumentando</span>
            </>
          )}
          {trend === "neutral" && <span>Storico dei tuoi calcoli di impronta di carbonio</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 h-[300px]">
        {/* Mostra il grafico solo se ci sono almeno 2 punti dati */}
        {chartData.length > 1 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6f5e6" />
              <XAxis dataKey="date" stroke="#56a156" tick={{ fill: "#56a156" }} tickLine={{ stroke: "#56a156" }} />
              <YAxis
                stroke="#56a156"
                tick={{ fill: "#56a156" }}
                tickLine={{ stroke: "#56a156" }}
                label={{ value: "g CO₂", angle: -90, position: "insideLeft", fill: "#56a156" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="carbonFootprint"
                stroke="#347834"
                strokeWidth={2}
                activeDot={{ r: 8, fill: "#56a156", stroke: "#fff" }}
                dot={{ r: 4, fill: "#56a156", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-eco-600 h-full flex flex-col items-center justify-center">
            <BarChart3 className="h-12 w-12 mb-3 text-eco-300" />
            {chartData.length === 0 ? (
              <>
                <p>Nessun dato disponibile</p>
                <p className="text-sm mt-2">Completa il tuo primo calcolo per vedere il grafico</p>
              </>
            ) : (
              <>
                <p>Un solo calcolo disponibile</p>
                <p className="text-sm mt-2">Completa più calcoli per vedere il trend</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

