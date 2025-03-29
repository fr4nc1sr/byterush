"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { calculateCarbonFootprint, getEquivalent, getSuggestions } from "@/lib/carbon-calculator"
import { CarbonResult } from "@/components/carbon-result"
import { UsernameForm } from "@/components/username-form"
import { EcoLeaderboard } from "@/components/eco-leaderboard"
import { saveCalculation } from "@/lib/user-data-service"
import { Activity, Cloud, Smartphone, Calculator, Info, PlayCircle, User } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function CalculatorPage() {
  // Stati per gestire i valori del calcolatore
  const [activeTab, setActiveTab] = useState("streaming")
  const [streamingHours, setStreamingHours] = useState(2)
  const [videoQuality, setVideoQuality] = useState("hd")
  const [socialMediaHours, setSocialMediaHours] = useState(1.5)
  const [emailsPerDay, setEmailsPerDay] = useState(15)
  const [cloudStorageGB, setCloudStorageGB] = useState(5)
  const [videoCallsHours, setVideoCallsHours] = useState(1)

  // Stati per gestire il flusso dell'applicazione
  const [carbonFootprint, setCarbonFootprint] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [showUsernameForm, setShowUsernameForm] = useState(true)

  // Controlla se c'è un utente recente nel localStorage all'avvio
  useEffect(() => {
    const recentUsersJson = localStorage.getItem("carbonico_recent_users")
    if (recentUsersJson) {
      const recentUsers = JSON.parse(recentUsersJson)
      if (recentUsers.length > 0) {
        // Preseleziona l'utente più recente, ma comunque mostra il form
        setUsername(recentUsers[0])
      }
    }
  }, [])

  // Gestisce l'invio del nome utente
  const handleUsernameSubmit = (name: string) => {
    setUsername(name)
    setShowUsernameForm(false)
  }

  // Gestisce il calcolo dell'impronta di carbonio
  const handleCalculate = () => {
    if (!username) {
      setShowUsernameForm(true)
      return
    }

    setIsCalculating(true)

    // Simuliamo un breve ritardo per dare l'impressione di calcolo
    setTimeout(() => {
      const activities = {
        streamingHours,
        videoQuality,
        socialMediaHours,
        emailsPerDay,
        cloudStorageGB,
        videoCallsHours,
      }

      const footprint = calculateCarbonFootprint(activities)

      // Salva il calcolo nel localStorage
      saveCalculation({
        username,
        carbonFootprint: footprint,
        activities,
      })

      setCarbonFootprint(footprint)
      setShowResults(true)
      setIsCalculating(false)
    }, 800)
  }

  // Gestisce il reset del form
  const handleReset = () => {
    setShowResults(false)
    setShowUsernameForm(true)
  }

  // Mostra il form del nome utente se necessario
  if (showUsernameForm) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
          <div className="flex flex-col items-center space-y-6 text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-eco-800">
              Calcolatore di Impronta di Carbonio Digitale
            </h1>
            <p className="max-w-[700px] text-eco-600 md:text-xl/relaxed">
              Stima quanta CO₂ generano le tue attività online e scopri come ridurre il tuo impatto.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <UsernameForm onSubmit={handleUsernameSubmit} />
            <EcoLeaderboard />
          </div>
        </div>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t border-eco-200 px-4 md:px-6 bg-eco-50">
          <p className="text-xs text-eco-600">© 2025 Carbonico. Tutti i diritti riservati.</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-eco-800">
            Calcolatore di Impronta di Carbonio Digitale
          </h1>
          <p className="max-w-[700px] text-eco-600 md:text-xl/relaxed">
            Stima quanta CO₂ generano le tue attività online e scopri come ridurre il tuo impatto.
          </p>

          {/* Badge con il nome utente */}
          {username && (
            <div className="bg-eco-100 px-4 py-2 rounded-full flex items-center gap-2 text-eco-700">
              <User className="h-4 w-4" />
              <span>
                Utente: <strong>{username}</strong>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="ml-2 h-7 text-xs text-eco-600 hover:text-eco-800 hover:bg-eco-200"
              >
                Cambia
              </Button>
            </div>
          )}
        </div>

        <div className="grid gap-8 mt-8 lg:grid-cols-[2fr_1fr]">
          {/* Card principale del calcolatore */}
          <Card className="border-2 border-primary/20 card-hover">
            <CardHeader className="bg-gradient-to-r from-eco-200 to-eco-100 pb-2">
              <CardTitle className="text-eco-800 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Le Tue Attività Digitali
              </CardTitle>
              <CardDescription className="text-eco-700">
                Inserisci le tue attività digitali quotidiane medie per calcolare la tua impronta di carbonio
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-eco-100">
                  <TabsTrigger
                    value="streaming"
                    className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
                  >
                    <Activity className="h-4 w-4" />
                    <span className="hidden sm:inline">Streaming</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span className="hidden sm:inline">Social & Email</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="cloud"
                    className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
                  >
                    <Cloud className="h-4 w-4" />
                    <span className="hidden sm:inline">Cloud & Chiamate</span>
                  </TabsTrigger>
                </TabsList>

                {/* Tab per lo streaming */}
                <TabsContent value="streaming" className="space-y-6">
                  <div className="space-y-6 p-4 bg-eco-50 rounded-lg">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="streaming-hours" className="text-eco-700 flex items-center gap-1">
                          <PlayCircle className="h-4 w-4" />
                          Streaming Video (ore/giorno)
                        </Label>
                        <span className="px-2 py-1 bg-eco-200 rounded-md text-eco-800 font-medium">
                          {streamingHours}h
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="streaming-hours"
                          min={0}
                          max={10}
                          step={0.5}
                          value={[streamingHours]}
                          onValueChange={(value) => setStreamingHours(value[0])}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-eco-700">Qualità Video</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={videoQuality === "sd" ? "default" : "outline"}
                          onClick={() => setVideoQuality("sd")}
                          className="w-full bg-eco-100 hover:bg-eco-200 text-eco-800 border-eco-300 hover:text-eco-900 data-[state=active]:bg-eco-300"
                        >
                          SD
                        </Button>
                        <Button
                          variant={videoQuality === "hd" ? "default" : "outline"}
                          onClick={() => setVideoQuality("hd")}
                          className="w-full bg-eco-100 hover:bg-eco-200 text-eco-800 border-eco-300 hover:text-eco-900 data-[state=active]:bg-eco-300"
                        >
                          HD
                        </Button>
                        <Button
                          variant={videoQuality === "4k" ? "default" : "outline"}
                          onClick={() => setVideoQuality("4k")}
                          className="w-full bg-eco-100 hover:bg-eco-200 text-eco-800 border-eco-300 hover:text-eco-900 data-[state=active]:bg-eco-300"
                        >
                          4K
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab per social e email */}
                <TabsContent value="social" className="space-y-6">
                  <div className="space-y-6 p-4 bg-eco-50 rounded-lg">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="social-hours" className="text-eco-700 flex items-center gap-1">
                          <Smartphone className="h-4 w-4" />
                          Navigazione Social Media (ore/giorno)
                        </Label>
                        <span className="px-2 py-1 bg-eco-200 rounded-md text-eco-800 font-medium">
                          {socialMediaHours}h
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="social-hours"
                          min={0}
                          max={8}
                          step={0.5}
                          value={[socialMediaHours]}
                          onValueChange={(value) => setSocialMediaHours(value[0])}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="emails" className="text-eco-700 flex items-center gap-1">
                          <Info className="h-4 w-4" />
                          Email Inviate/Ricevute (al giorno)
                        </Label>
                        <span className="px-2 py-1 bg-eco-200 rounded-md text-eco-800 font-medium">{emailsPerDay}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="emails"
                          min={0}
                          max={100}
                          step={5}
                          value={[emailsPerDay]}
                          onValueChange={(value) => setEmailsPerDay(value[0])}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab per cloud e videochiamate */}
                <TabsContent value="cloud" className="space-y-6">
                  <div className="space-y-6 p-4 bg-eco-50 rounded-lg">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="cloud-storage" className="text-eco-700 flex items-center gap-1">
                          <Cloud className="h-4 w-4" />
                          Archiviazione Cloud Utilizzata (GB)
                        </Label>
                        <span className="px-2 py-1 bg-eco-200 rounded-md text-eco-800 font-medium">
                          {cloudStorageGB}GB
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="cloud-storage"
                          min={0}
                          max={50}
                          step={1}
                          value={[cloudStorageGB]}
                          onValueChange={(value) => setCloudStorageGB(value[0])}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="video-calls" className="text-eco-700 flex items-center gap-1">
                          <Activity className="h-4 w-4" />
                          Videochiamate (ore/giorno)
                        </Label>
                        <span className="px-2 py-1 bg-eco-200 rounded-md text-eco-800 font-medium">
                          {videoCallsHours}h
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="video-calls"
                          min={0}
                          max={8}
                          step={0.5}
                          value={[videoCallsHours]}
                          onValueChange={(value) => setVideoCallsHours(value[0])}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-eco-50">
              <Button
                onClick={handleCalculate}
                className="w-full bg-eco-600 hover:bg-eco-700 text-white font-medium py-6"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Calcolo in corso...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Calcola la Mia Impronta
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Mostra i risultati o la card informativa */}
          {showResults ? (
            <CarbonResult
              carbonFootprint={carbonFootprint}
              equivalent={getEquivalent(carbonFootprint)}
              suggestions={getSuggestions({
                streamingHours,
                videoQuality,
                socialMediaHours,
                emailsPerDay,
                cloudStorageGB,
                videoCallsHours,
              })}
            />
          ) : (
            <Card className="border-2 border-primary/20 card-hover">
              <CardHeader className="bg-gradient-to-r from-eco-200 to-eco-100 pb-2">
                <CardTitle className="text-eco-800 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Lo Sapevi?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  {/* Informazioni sull'impatto delle attività digitali */}
                  <div className="space-y-2 p-3 bg-eco-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-eco-700">1 ora di streaming video HD</span>
                      <span className="font-medium text-eco-800">≈ 36g CO₂</span>
                    </div>
                    <Progress
                      value={36}
                      max={100}
                      className="h-2 bg-eco-200"
                      indicatorClassName="bg-gradient-to-r from-eco-400 to-eco-600"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-eco-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-eco-700">1 ora di streaming video 4K</span>
                      <span className="font-medium text-eco-800">≈ 97g CO₂</span>
                    </div>
                    <Progress
                      value={97}
                      max={100}
                      className="h-2 bg-eco-200"
                      indicatorClassName="bg-gradient-to-r from-eco-400 to-eco-600"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-eco-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-eco-700">1 email con allegato</span>
                      <span className="font-medium text-eco-800">≈ 0.5g CO₂</span>
                    </div>
                    <Progress
                      value={50}
                      max={1000}
                      className="h-2 bg-eco-200"
                      indicatorClassName="bg-gradient-to-r from-eco-400 to-eco-600"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-eco-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-eco-700">1GB di archiviazione cloud (mensile)</span>
                      <span className="font-medium text-eco-800">≈ 3g CO₂</span>
                    </div>
                    <Progress
                      value={30}
                      max={100}
                      className="h-2 bg-eco-200"
                      indicatorClassName="bg-gradient-to-r from-eco-400 to-eco-600"
                    />
                  </div>

                  <div className="mt-6 text-sm text-eco-600 p-3 bg-eco-50 rounded-lg">
                    <p>
                      L'impronta di carbonio delle attività digitali varia in base all'efficienza del dispositivo, alle
                      fonti energetiche dei data center e all'infrastruttura di rete.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sezione per la classifica */}
        <div className="mt-10">
          <EcoLeaderboard />
        </div>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t border-eco-200 px-4 md:px-6 bg-eco-50">
        <p className="text-xs text-eco-600">© 2025 Carbonico. Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}

