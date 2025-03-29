import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function TipsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-6 px-4 md:px-6 flex-1">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Consigli Digitali Eco-Friendly
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Semplici cambiamenti nelle tue abitudini digitali possono ridurre significativamente la tua impronta di
            carbonio.
          </p>
        </div>

        <Tabs defaultValue="streaming" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="streaming">Streaming</TabsTrigger>
            <TabsTrigger value="devices">Dispositivi</TabsTrigger>
            <TabsTrigger value="browsing">Navigazione</TabsTrigger>
            <TabsTrigger value="storage">Archiviazione</TabsTrigger>
          </TabsList>

          <TabsContent value="streaming" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100">Impatto Medio</Badge>
                  <CardTitle className="text-xl">Abbassa la Qualità Video</CardTitle>
                  <CardDescription>
                    Lo streaming in 4K utilizza fino a 7 volte più dati rispetto alla definizione standard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Scegli SD o HD invece di 4K quando la risoluzione più alta non è necessaria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Regola le impostazioni della qualità video nei tuoi account di servizi di streaming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Sui dispositivi mobili, usa le modalità "Risparmio dati" quando disponibili</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-green-100 text-green-700 hover:bg-green-100">Impatto Alto</Badge>
                  <CardTitle className="text-xl">Scarica Invece di Guardare in Streaming</CardTitle>
                  <CardDescription>
                    Guardi lo stesso contenuto più volte? Scaricalo una volta invece di guardarlo in streaming
                    ripetutamente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa le funzioni di download su Netflix, Spotify e altre piattaforme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Scarica tramite WiFi piuttosto che dati mobili quando possibile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>
                        Elimina i contenuti scaricati che non ti servono più per risparmiare spazio di archiviazione
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100">Impatto Medio</Badge>
                  <CardTitle className="text-xl">Modalità Solo Audio</CardTitle>
                  <CardDescription>Quando non hai bisogno di guardare, ascolta soltanto</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa la modalità solo audio per i video musicali su YouTube</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Scegli podcast invece di contenuti video quando appropriato</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>
                        Disattiva il video durante parti di videochiamate lunghe quando il video non è necessario
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-green-100 text-green-700 hover:bg-green-100">Impatto Alto</Badge>
                  <CardTitle className="text-xl">Estendi la Durata dei Dispositivi</CardTitle>
                  <CardDescription>
                    La produzione di nuovi dispositivi ha un'enorme impronta di carbonio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Mantieni i tuoi dispositivi per almeno 3-4 anni prima di aggiornarli</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Ripara piuttosto che sostituire quando possibile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Considera dispositivi ricondizionati per il tuo prossimo aggiornamento</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100">Impatto Medio</Badge>
                  <CardTitle className="text-xl">Gestione Energetica</CardTitle>
                  <CardDescription>
                    Ottimizza le impostazioni del tuo dispositivo per usare meno energia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Abilita le modalità di risparmio energetico su tutti i tuoi dispositivi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Riduci la luminosità dello schermo al livello più basso confortevole</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Imposta periodi di timeout dello schermo più brevi</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100">Impatto Medio</Badge>
                  <CardTitle className="text-xl">Scollega e Disconnetti</CardTitle>
                  <CardDescription>Riduci il consumo energetico fantasma dei dispositivi inattivi</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Scollega i caricabatterie quando non in uso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa ciabatte elettriche per spegnere facilmente più dispositivi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>
                        Spegni completamente i computer invece di usare la modalità sospensione durante la notte
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="browsing" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100">Impatto Basso</Badge>
                  <CardTitle className="text-xl">Navigazione Efficiente</CardTitle>
                  <CardDescription>
                    Piccoli cambiamenti nelle abitudini di navigazione si accumulano nel tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Aggiungi ai preferiti i siti visitati frequentemente invece di cercarli</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Digita direttamente gli URL quando li conosci</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa estensioni del browser che bloccano il caricamento di contenuti non necessari</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100">Impatto Medio</Badge>
                  <CardTitle className="text-xl">Gestione Email</CardTitle>
                  <CardDescription>Riduci l'impronta di carbonio della tua casella di posta</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Cancella l'iscrizione alle newsletter che non leggi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Comprimi gli allegati prima di inviarli</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa link a file condivisi invece di allegati quando possibile</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100">Impatto Basso</Badge>
                  <CardTitle className="text-xl">Cerca in Modo Intelligente</CardTitle>
                  <CardDescription>Ricerche più efficienti significano meno elaborazione del server</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa termini di ricerca specifici per trovare ciò di cui hai bisogno più velocemente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Considera motori di ricerca ecologici come Ecosia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa operatori di ricerca avanzati per restringere i risultati</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100">Impatto Medio</Badge>
                  <CardTitle className="text-xl">Decluttering Digitale</CardTitle>
                  <CardDescription>Pulisci regolarmente il tuo spazio di archiviazione digitale</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Elimina app inutilizzate, vecchie email e foto duplicate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Svuota le cartelle del cestino nelle email e nell'archiviazione cloud</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa strumenti di analisi dello spazio per identificare file grandi inutilizzati</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-green-100 text-green-700 hover:bg-green-100">Impatto Alto</Badge>
                  <CardTitle className="text-xl">Ottimizza l'Uso del Cloud</CardTitle>
                  <CardDescription>Sii strategico su ciò che archivi nel cloud</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Archivia nel cloud solo ciò di cui hai bisogno</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Comprimi i file prima di caricarli</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Scegli provider cloud che utilizzano energia rinnovabile</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100">Impatto Basso</Badge>
                  <CardTitle className="text-xl">Locale vs. Cloud</CardTitle>
                  <CardDescription>Bilancia tra archiviazione locale e cloud</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Archivia localmente i file a cui accedi frequentemente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Usa hard disk esterni per backup di grandi dimensioni invece del cloud</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Considera l'efficienza energetica dei tuoi dispositivi di archiviazione locali</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t border-eco-200 px-4 md:px-6 bg-eco-50">
        <p className="text-xs text-eco-600">© 2025 Carbonico. Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}

