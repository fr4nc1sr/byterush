import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, User } from "lucide-react"
import { getEcoLeaderboard } from "@/lib/user-data-service"

export function EcoLeaderboard() {
  // Ottiene i dati della classifica
  const leaderboard = getEcoLeaderboard(5)

  // Icone per le posizioni sul podio
  const positionIcons = [
    <Trophy key="trophy" className="h-5 w-5 text-yellow-500" />,
    <Medal key="silver" className="h-5 w-5 text-gray-400" />,
    <Medal key="bronze" className="h-5 w-5 text-amber-700" />,
  ]

  return (
    <Card className="border-2 border-primary/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-eco-200 to-eco-100 pb-2">
        <CardTitle className="text-eco-800 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-600" />
          Classifica Eco-Eroi
        </CardTitle>
        <CardDescription className="text-eco-700">
          Gli utenti con l'impronta di carbonio digitale più bassa
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {leaderboard.length > 0 ? (
          <div className="space-y-4">
            {/* Mappa gli utenti nella classifica */}
            {leaderboard.map((user, index) => (
              <div
                key={user.username}
                className={`flex items-center p-3 rounded-lg ${
                  index === 0
                    ? "bg-yellow-50 border border-yellow-200"
                    : index === 1
                      ? "bg-gray-50 border border-gray-200"
                      : index === 2
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-eco-50 border border-eco-200"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm mr-3">
                  {index < 3 ? positionIcons[index] : <User className="h-5 w-5 text-eco-500" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-eco-800">{user.username}</div>
                  <div className="text-xs text-eco-600">
                    {user.calculationsCount} {user.calculationsCount === 1 ? "calcolo" : "calcoli"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-eco-700">{user.averageFootprint.toFixed(1)}</div>
                  <div className="text-xs text-eco-600">g CO₂/giorno</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-eco-600">
            <Trophy className="h-12 w-12 mx-auto mb-3 text-eco-300" />
            <p>Nessun dato disponibile</p>
            <p className="text-sm mt-2">Sii il primo a entrare in classifica!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

