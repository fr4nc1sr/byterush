"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { userExists } from "@/lib/user-data-service"
import { User, UserCheck } from "lucide-react"

interface UsernameFormProps {
  onSubmit: (username: string) => void
}

export function UsernameForm({ onSubmit }: UsernameFormProps) {
  // Stati per gestire il form
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [recentUsers, setRecentUsers] = useState<string[]>([])
  const [isExistingUser, setIsExistingUser] = useState(false)

  // Carica gli utenti recenti dal localStorage all'avvio
  useEffect(() => {
    const recentUsersJson = localStorage.getItem("carbonico_recent_users")
    if (recentUsersJson) {
      setRecentUsers(JSON.parse(recentUsersJson))
    }
  }, [])

  // Gestisce il cambio del nome utente e verifica se esiste
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    setError("")

    // Verifica se l'utente esiste già
    if (value.trim()) {
      setIsExistingUser(userExists(value))
    } else {
      setIsExistingUser(false)
    }
  }

  // Gestisce l'invio del form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Inserisci un nome utente")
      return
    }

    // Aggiorna la lista degli utenti recenti
    const updatedRecentUsers = [username, ...recentUsers.filter((user) => user !== username)].slice(0, 5)
    localStorage.setItem("carbonico_recent_users", JSON.stringify(updatedRecentUsers))

    onSubmit(username)
  }

  // Seleziona un utente recente
  const selectRecentUser = (user: string) => {
    setUsername(user)
    setIsExistingUser(true)
  }

  return (
    <Card className="border-2 border-primary/20 card-hover w-full max-w-md mx-auto">
      <CardHeader className="bg-gradient-to-r from-eco-200 to-eco-100 pb-2">
        <CardTitle className="text-eco-800 flex items-center gap-2">
          <User className="h-5 w-5" />
          {isExistingUser ? "Bentornato!" : "Prima di iniziare"}
        </CardTitle>
        <CardDescription className="text-eco-700">
          {isExistingUser
            ? "Continua a monitorare la tua impronta di carbonio digitale"
            : "Inserisci il tuo nome per salvare e confrontare i tuoi risultati"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-eco-700">
              Nome Utente
            </Label>
            <div className="relative">
              <Input
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Inserisci il tuo nome"
                className={`pl-10 ${error ? "border-red-500" : ""}`}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eco-500">
                {isExistingUser ? <UserCheck className="h-5 w-5 text-eco-600" /> : <User className="h-5 w-5" />}
              </div>
              {isExistingUser && username && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-eco-600 bg-eco-100 px-2 py-1 rounded-full">
                  Utente esistente
                </div>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Mostra utenti recenti se disponibili */}
          {recentUsers.length > 0 && (
            <div className="space-y-2">
              <Label className="text-eco-700 text-sm">Utenti recenti</Label>
              <div className="flex flex-wrap gap-2">
                {recentUsers.map((user) => (
                  <Button
                    key={user}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => selectRecentUser(user)}
                    className="bg-eco-50 hover:bg-eco-100 text-eco-700 border-eco-200"
                  >
                    {user}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="bg-eco-50">
        <Button onClick={handleSubmit} className="w-full bg-eco-600 hover:bg-eco-700 text-white">
          {isExistingUser ? "Continua come " + username : "Inizia a calcolare"}
        </Button>
      </CardFooter>
    </Card>
  )
}

