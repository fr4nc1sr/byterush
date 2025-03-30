// Definizione dell'interfaccia che rappresenta le attività dell'utente
interface UserActivity {
  streamingHours: number        // Ore dedicate allo streaming video
  videoQuality: string          // Qualità del video (ad esempio "sd", "hd", "4k")
  socialMediaHours: number      // Ore dedicate ai social media
  emailsPerDay: number          // Numero di email inviate/ricevute al giorno
  cloudStorageGB: number        // Quantità di dati in GB memorizzati nel cloud
  videoCallsHours: number       // Ore dedicate alle videochiamate
}

// Fattori di emissione di CO2 espressi in grammi per unità di consumo
// Questi valori rappresentano una stima delle emissioni associate a diverse attività digitali
const EMISSION_FACTORS = {
  streaming: {
    // Calcolo basato su emissioni per GB per ora e consumo stimato in GB per ora
    // SD: 1g/GB * 8GB/ora
    sd: 1.0 * 8,
    // HD: 3g/GB * 12GB/ora
    hd: 3.0 * 12,
    // 4K: 7g/GB * 14GB/ora
    "4k": 7.0 * 14,
  },
  // Emissioni per ora sui social media, con stima di 1.5GB/ora e 0.5g per GB
  socialMedia: 0.5 * 1.5,
  email: {
    // Emissioni per email regolare
    regular: 0.2,
    // Emissioni per email con allegato
    withAttachment: 0.5,
  },
  // Emissioni giornaliere per ogni GB di archiviazione cloud
  cloudStorage: 0.1,
  // Emissioni per ora di videochiamata, basate su 2GB/ora e 2.5g per GB
  videoCall: 2.5 * 2,
}

/**
 * Funzione per calcolare l'impronta di carbonio digitale in grammi,
 * in base alle attività digitali fornite dall'utente.
 *
 * @param activity - Oggetto contenente le attività dell'utente (ore di streaming, qualità video, ecc.)
 * @returns Il totale delle emissioni di CO₂, arrotondato a 1 decimale
 */
export function calculateCarbonFootprint(activity: UserActivity): number {
  // Calcola le emissioni derivanti dallo streaming video.
  // Seleziona il fattore di emissione in base alla qualità video specificata (sd, hd o 4k)
  const streamingEmissions =
    activity.streamingHours *
    EMISSION_FACTORS.streaming[activity.videoQuality as keyof typeof EMISSION_FACTORS.streaming]

  // Calcola le emissioni derivanti dall'utilizzo dei social media
  const socialMediaEmissions = activity.socialMediaHours * EMISSION_FACTORS.socialMedia

  // Calcola le emissioni derivanti dall'invio/ricezione di email.
  // Supponiamo che il 70% delle email sia senza allegato e il 30% con allegato
  const emailEmissions =
    activity.emailsPerDay * 0.7 * EMISSION_FACTORS.email.regular +
    activity.emailsPerDay * 0.3 * EMISSION_FACTORS.email.withAttachment

  // Calcola le emissioni associate all'archiviazione cloud (emissioni per GB al giorno)
  const cloudStorageEmissions = activity.cloudStorageGB * EMISSION_FACTORS.cloudStorage

  // Calcola le emissioni derivanti dalle videochiamate
  const videoCallEmissions = activity.videoCallsHours * EMISSION_FACTORS.videoCall

  // Somma tutte le emissioni parziali per ottenere il totale
  const totalEmissions =
    streamingEmissions + socialMediaEmissions + emailEmissions + cloudStorageEmissions + videoCallEmissions

  // Arrotonda il risultato a un decimale e lo restituisce
  return Math.round(totalEmissions * 10) / 10
}

/**
 * Funzione per ottenere equivalenti pratici delle emissioni di CO₂.
 *
 * @param carbonGrams - Emissioni totali in grammi di CO₂
 * @returns Un oggetto contenente:
 *   - driving: chilometri percorsi in auto equivalenti
 *   - trees: numero di alberi necessari per assorbire le emissioni giornaliere
 *   - lightbulbs: ore di funzionamento di lampadine LED da 10W equivalenti
 */
export function getEquivalent(carbonGrams: number) {
  // Fattore di conversione: km percorsi in auto per grammo di CO₂
  const drivingFactor = 0.12
  // Fattore di conversione: numero di alberi necessari per assorbire 1g di CO₂ al giorno
  const treeFactor = 0.0055
  // Fattore di conversione: ore di funzionamento di LED da 10W per grammo di CO₂
  const lightbulbFactor = 0.1

  return {
    driving: carbonGrams * drivingFactor,
    trees: carbonGrams * treeFactor,
    lightbulbs: carbonGrams * lightbulbFactor,
  }
}

/**
 * Funzione per fornire suggerimenti utili a ridurre l'impronta di carbonio digitale
 * basati sulle attività dell'utente.
 *
 * @param activity - Oggetto che descrive le attività digitali dell'utente
 * @returns Un array di suggerimenti, ciascuno contenente titolo, descrizione e un valore d'impatto
 */
export function getSuggestions(activity: UserActivity) {
  // Inizializza l'array dei suggerimenti
  const suggestions = []

  // Suggerimento: abbassa la qualità dello streaming se usi 4K per più di 1 ora
  if (activity.videoQuality === "4k" && activity.streamingHours > 1) {
    suggestions.push({
      title: "Abbassa la qualità dello streaming",
      description: "Passa da 4K a HD quando la risoluzione più alta non è necessaria",
      impact: 60,
    })
  } else if (activity.videoQuality === "hd" && activity.streamingHours > 2) {
    // Suggerimento: considera la qualità SD se usi HD per più di 2 ore
    suggestions.push({
      title: "Considera SD per alcuni contenuti",
      description: "Per certi programmi o quando sei su mobile, la qualità SD è sufficiente",
      impact: 40,
    })
  }

  // Suggerimento: riduci il tempo di streaming se supera le 3 ore
  if (activity.streamingHours > 3) {
    suggestions.push({
      title: "Riduci il tempo di streaming",
      description: "Cerca di limitare lo streaming a 2 ore al giorno",
      impact: 30,
    })
  }

  // Suggerimento: gestisci la casella di posta se ricevi più di 20 email al giorno
  if (activity.emailsPerDay > 20) {
    suggestions.push({
      title: "Pulisci la tua casella di posta",
      description: "Cancella l'iscrizione alle newsletter che non leggi e riduci le email non necessarie",
      impact: 15,
    })
  }

  // Suggerimento: ottimizza l'archiviazione cloud se usi più di 10GB
  if (activity.cloudStorageGB > 10) {
    suggestions.push({
      title: "Ottimizza l'archiviazione cloud",
      description: "Elimina i file inutilizzati e comprimi i file di grandi dimensioni prima di caricarli",
      impact: 20,
    })
  }

  // Suggerimento: riduci l'uso del video durante le chiamate se superi le 2 ore
  if (activity.videoCallsHours > 2) {
    suggestions.push({
      title: "Disattiva il video quando non necessario",
      description: "Usa la modalità solo audio per parti delle chiamate quando il video non è necessario",
      impact: 50,
    })
  }

  // Suggerimento: limita il tempo sui social media se supera le 2 ore
  if (activity.socialMediaHours > 2) {
    suggestions.push({
      title: "Riduci lo scrolling sui social media",
      description: "Imposta un limite di tempo per le app dei social media per ridurre il consumo di dati",
      impact: 25,
    })
  }

  // Se non sono stati generati abbastanza suggerimenti, aggiunge alcune raccomandazioni generali
  if (suggestions.length < 3) {
    suggestions.push({
      title: "Scarica invece di guardare in streaming",
      description:
        "Per i contenuti che guardi ripetutamente, scarica una volta invece di guardare in streaming più volte",
      impact: 35,
    })

    suggestions.push({
      title: "Usa la modalità scura",
      description: "La modalità scura può risparmiare batteria sugli schermi OLED, riducendo il consumo energetico",
      impact: 10,
    })
  }

  // Restituisce i primi 3 suggerimenti generati
  return suggestions.slice(0, 3)
}
