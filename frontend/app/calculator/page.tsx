"use client"

// Importazione delle funzionalità di React e altri componenti customizzati
import { useState, useEffect } from "react" // Hook per gestire gli stati e gli effetti collaterali nel componente
import { Button } from "@/components/ui/button" // Componente pulsante personalizzato
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Componenti per creare delle card (contenitori stilizzati)
import { Label } from "@/components/ui/label" // Componente per le etichette dei form
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Componenti per gestire le tabulazioni (tabs)
import { Slider } from "@/components/ui/slider" // Componente slider per la selezione di valori numerici
import { Progress } from "@/components/ui/progress" // Componente per visualizzare barre di progresso
import { calculateCarbonFootprint, getEquivalent, getSuggestions } from "@/lib/carbon-calculator" // Funzioni per calcolare l'impronta di carbonio, le equivalenze e suggerimenti
import { CarbonResult } from "@/components/carbon-result" // Componente per mostrare i risultati del calcolo
import { UsernameForm } from "@/components/username-form" // Componente per l'inserimento del nome utente
import { EcoLeaderboard } from "@/components/eco-leaderboard" // Componente per la classifica eco
import { saveCalculation } from "@/lib/user-data-service" // Funzione per salvare i dati del calcolo
import { Activity, Cloud, Smartphone, Calculator, Info, PlayCircle, User } from "lucide-react" // Icone per migliorare l'interfaccia utente
import { Navbar } from "@/components/navbar" // Componente per la barra di navigazione

// Componente principale della pagina del calcolatore
export default function CalculatorPage() {
  // Stati per gestire i valori degli input relativi alle attività digitali
  const [activeTab, setActiveTab] = useState("streaming") // Stato per la tab attiva, inizialmente "streaming"
  const [streamingHours, setStreamingHours] = useState(2) // Ore di streaming video al giorno (default: 2)
  const [videoQuality, setVideoQuality] = useState("hd") // Qualità del video impostata su "hd" per default
  const [socialMediaHours, setSocialMediaHours] = useState(1.5) // Ore dedicate ai social media (default: 1.5)
  const [emailsPerDay, setEmailsPerDay] = useState(15) // Numero di email inviate/ricevute al giorno (default: 15)
  const [cloudStorageGB, setCloudStorageGB] = useState(5) // GB di archiviazione cloud usati (default: 5)
  const [videoCallsHours, setVideoCallsHours] = useState(1) // Ore di videochiamate al giorno (default: 1)

  // Stati per gestire il flusso dell'applicazione e la visualizzazione dei risultati
  const [carbonFootprint, setCarbonFootprint] = useState(0) // Impronta di carbonio calcolata
  const [showResults, setShowResults] = useState(false) // Flag per mostrare/nascondere i risultati del calcolo
  const [isCalculating, setIsCalculating] = useState(false) // Flag per indicare se il calcolo è in corso
  const [username, setUsername] = useState<string | null>(null) // Nome utente, inizialmente non definito
  const [showUsernameForm, setShowUsernameForm] = useState(true) // Flag per mostrare o nascondere il form per il nome utente

  // useEffect per controllare se esiste un utente recente salvato nel localStorage all'avvio del componente
  useEffect(() => {
    const recentUsersJson = localStorage.getItem("carbonico_recent_users")
    if (recentUsersJson) {
      const recentUsers = JSON.parse(recentUsersJson)
      if (recentUsers.length > 0) {
        // Pre-seleziona il primo utente della lista, che rappresenta l'utente più recente
        setUsername(recentUsers[0])
      }
    }
  }, []) // L'effetto viene eseguito solo al montaggio del componente

  // Funzione per gestire l'invio del nome utente dal form
  const handleUsernameSubmit = (name: string) => {
    setUsername(name) // Imposta il nome utente nello stato
    setShowUsernameForm(false) // Nasconde il form dopo l'invio
  }

  // Funzione per gestire il calcolo dell'impronta di carbonio
  const handleCalculate = () => {
    // Se non è presente un nome utente, mostra il form per richiederlo
    if (!username) {
      setShowUsernameForm(true)
      return
    }

    setIsCalculating(true) // Imposta lo stato di calcolo in corso

    // Simula un ritardo (800ms) per dare l'impressione di un elaborazione
    setTimeout(() => {
      // Costruisce l'oggetto "activities" con i valori correnti inseriti dall'utente
      const activities = {
        streamingHours,
        videoQuality,
        socialMediaHours,
        emailsPerDay,
        cloudStorageGB,
        videoCallsHours,
      }

      // Calcola l'impronta di carbonio usando la funzione importata
      const footprint = calculateCarbonFootprint(activities)

      // Salva il calcolo (può essere salvato su localStorage o in un database)
      saveCalculation({
        username,
        carbonFootprint: footprint,
        activities,
      })

      setCarbonFootprint(footprint) // Aggiorna lo stato con il valore calcolato
      setShowResults(true) // Mostra i risultati del calcolo
      setIsCalculating(false) // Termina lo stato di calcolo in corso
    }, 800)
  }

  // Funzione per resettare il form, mostrando nuovamente il form per il nome utente
  const handleReset = () => {
    setShowResults(false)
    setShowUsernameForm(true)
  }

  // Se il form per il nome utente deve essere mostrato, restituisce questo blocco
  if (showUsernameForm) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Barra di navigazione */}
        <Navbar />
        <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
          <div className="flex flex-col items-center space-y-6 text-center mb-10">
            {/* Titolo principale della pagina */}
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-eco-800">
              Calcolatore di Impronta di Carbonio Digitale
            </h1>
            {/* Descrizione introduttiva */}
            <p className="max-w-[700px] text-eco-600 md:text-xl/relaxed">
              Stima quanta CO₂ generano le tue attività online e scopri come ridurre il tuo impatto.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Componente per inserire il nome utente */}
            <UsernameForm onSubmit={handleUsernameSubmit} />
            {/* Classifica eco */}
            <EcoLeaderboard />
          </div>
        </div>
        {/* Footer della pagina */}
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t border-eco-200 px-4 md:px-6 bg-eco-50">
          <p className="text-xs text-eco-600">© 2025 Carbonico. Tutti i diritti riservati.</p>
        </footer>
      </div>
    )
  }

  // Se il form per il nome utente non deve essere mostrato, restituisce l'intera interfaccia del calcolatore
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra di navigazione */}
      <Navbar />
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Titolo e descrizione */}
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-eco-800">
            Calcolatore di Impronta di Carbonio Digitale
          </h1>
          <p className="max-w-[700px] text-eco-600 md:text-xl/relaxed">
            Stima quanta CO₂ generano le tue attività online e scopri come ridurre il tuo impatto.
          </p>

          {/* Badge che mostra il nome utente e consente di resettare il form per cambiare utente */}
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
          {/* Card principale contenente il calcolatore */}
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
              {/* Tabs per suddividere gli input in categorie */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-eco-100">
                  {/* Tab per la sezione di streaming */}
                  <TabsTrigger
                    value="streaming"
                    className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
                  >
                    <Activity className="h-4 w-4" />
                    <span className="hidden sm:inline">Streaming</span>
                  </TabsTrigger>
                  {/* Tab per la sezione di social media e email */}
                  <TabsTrigger
                    value="social"
                    className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span className="hidden sm:inline">Social & Email</span>
                  </TabsTrigger>
                  {/* Tab per la sezione di cloud e videochiamate */}
                  <TabsTrigger
                    value="cloud"
                    className="flex items-center gap-2 data-[state=active]:bg-eco-200 data-[state=active]:text-eco-800"
                  >
                    <Cloud className="h-4 w-4" />
                    <span className="hidden sm:inline">Cloud & Chiamate</span>
                  </TabsTrigger>
                </TabsList>

                {/* Contenuto della tab "streaming" */}
                <TabsContent value="streaming" className="space-y-6">
                  <div className="space-y-6 p-4 bg-eco-50 rounded-lg">
                    <div>
                      {/* Slider per impostare le ore di streaming video al giorno */}
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
                      {/* Sezione per selezionare la qualità del video */}
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

                {/* Contenuto della tab "social" per attività sui social e gestione delle email */}
                <TabsContent value="social" className="space-y-6">
                  <div className="space-y-6 p-4 bg-eco-50 rounded-lg">
                    <div>
                      {/* Slider per impostare le ore spese sui social media */}
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
                      {/* Slider per impostare il numero di email inviate/ricevute al giorno */}
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

                {/* Contenuto della tab "cloud" per gestione di cloud storage e videochiamate */}
                <TabsContent value="cloud" className="space-y-6">
                  <div className="space-y-6 p-4 bg-eco-50 rounded-lg">
                    <div>
                      {/* Slider per impostare i GB di archiviazione cloud utilizzati */}
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
                      {/* Slider per impostare le ore di videochiamate */}
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
            {/* Footer della card con il pulsante per avviare il calcolo */}
            <CardFooter className="bg-eco-50">
              <Button
                onClick={handleCalculate}
                className="w-full bg-eco-600 hover:bg-eco-700 text-white font-medium py-6"
                disabled={isCalculating} // Disabilita il pulsante se il calcolo è in corso
              >
                {isCalculating ? (
                  // Se il calcolo è in corso, mostra un indicatore di caricamento
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
                  // Se il calcolo non è in corso, mostra il pulsante per eseguire il calcolo
                  <span className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Calcola la Mia Impronta
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Sezione per mostrare i risultati oppure una card informativa se il calcolo non è stato ancora eseguito */}
          {showResults ? (
            // Se sono presenti risultati, mostra il componente CarbonResult con i dati calcolati
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
            // Se non ci sono risultati, mostra una card informativa "Lo Sapevi?"
            <Card className="border-2 border-primary/20 card-hover">
              <CardHeader className="bg-gradient-to-r from-eco-200 to-eco-100 pb-2">
                <CardTitle className="text-eco-800 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Lo Sapevi?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  {/* Informazioni sull'impatto ambientale dello streaming video in HD */}
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

                  {/* Informazioni sull'impatto ambientale dello streaming video in 4K */}
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

                  {/* Informazioni sull'impatto ambientale dell'invio di un'email con allegato */}
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

                  {/* Informazioni sull'impatto ambientale dell'archiviazione cloud */}
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

                  {/* Breve testo esplicativo sull'impronta di carbonio delle attività digitali */}
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

        {/* Sezione per visualizzare la classifica eco */}
        <div className="mt-10">
          <EcoLeaderboard />
        </div>
      </div>
      {/* Footer della pagina */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t border-eco-200 px-4 md:px-6 bg-eco-50">
        <p className="text-xs text-eco-600">© 2025 Carbonico. Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}
