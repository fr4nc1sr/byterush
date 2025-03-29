interface UserActivity {
  streamingHours: number
  videoQuality: string
  socialMediaHours: number
  emailsPerDay: number
  cloudStorageGB: number
  videoCallsHours: number
}

// Fattori di emissione di CO2 (grammi di CO2 per unità)
const EMISSION_FACTORS = {
  streaming: {
    sd: 1.0 * 8, // 1g per ora per GB, SD ~8GB/ora
    hd: 3.0 * 12, // HD ~12GB/ora
    "4k": 7.0 * 14, // 4K ~14GB/ora
  },
  socialMedia: 0.5 * 1.5, // per ora (stimato 1.5GB/ora)
  email: {
    regular: 0.2, // per email
    withAttachment: 0.5, // per email con allegato
  },
  cloudStorage: 0.1, // per GB al giorno
  videoCall: 2.5 * 2, // per ora (stimato 2GB/ora)
}

export function calculateCarbonFootprint(activity: UserActivity): number {
  // Calcola le emissioni dello streaming
  const streamingEmissions =
    activity.streamingHours *
    EMISSION_FACTORS.streaming[activity.videoQuality as keyof typeof EMISSION_FACTORS.streaming]

  // Calcola le emissioni dei social media
  const socialMediaEmissions = activity.socialMediaHours * EMISSION_FACTORS.socialMedia

  // Calcola le emissioni delle email (supponiamo che il 30% abbia allegati)
  const emailEmissions =
    activity.emailsPerDay * 0.7 * EMISSION_FACTORS.email.regular +
    activity.emailsPerDay * 0.3 * EMISSION_FACTORS.email.withAttachment

  // Calcola le emissioni dell'archiviazione cloud
  const cloudStorageEmissions = activity.cloudStorageGB * EMISSION_FACTORS.cloudStorage

  // Calcola le emissioni delle videochiamate
  const videoCallEmissions = activity.videoCallsHours * EMISSION_FACTORS.videoCall

  // Somma tutte le emissioni
  const totalEmissions =
    streamingEmissions + socialMediaEmissions + emailEmissions + cloudStorageEmissions + videoCallEmissions

  return Math.round(totalEmissions * 10) / 10 // Arrotonda a 1 decimale
}

export function getEquivalent(carbonGrams: number) {
  // Fattori di conversione
  const drivingFactor = 0.12 // km per grammo di CO2
  const treeFactor = 0.0055 // alberi necessari per assorbire 1g CO2 al giorno
  const lightbulbFactor = 0.1 // ore di LED da 10W per grammo di CO2

  return {
    driving: carbonGrams * drivingFactor,
    trees: carbonGrams * treeFactor,
    lightbulbs: carbonGrams * lightbulbFactor,
  }
}

export function getSuggestions(activity: UserActivity) {
  const suggestions = []

  // Suggerimento sulla qualità dello streaming
  if (activity.videoQuality === "4k" && activity.streamingHours > 1) {
    suggestions.push({
      title: "Abbassa la qualità dello streaming",
      description: "Passa da 4K a HD quando la risoluzione più alta non è necessaria",
      impact: 60,
    })
  } else if (activity.videoQuality === "hd" && activity.streamingHours > 2) {
    suggestions.push({
      title: "Considera SD per alcuni contenuti",
      description: "Per certi programmi o quando sei su mobile, la qualità SD è sufficiente",
      impact: 40,
    })
  }

  // Ridurre il tempo di streaming
  if (activity.streamingHours > 3) {
    suggestions.push({
      title: "Riduci il tempo di streaming",
      description: "Cerca di limitare lo streaming a 2 ore al giorno",
      impact: 30,
    })
  }

  // Gestione email
  if (activity.emailsPerDay > 20) {
    suggestions.push({
      title: "Pulisci la tua casella di posta",
      description: "Cancella l'iscrizione alle newsletter che non leggi e riduci le email non necessarie",
      impact: 15,
    })
  }

  // Ottimizzazione archiviazione cloud
  if (activity.cloudStorageGB > 10) {
    suggestions.push({
      title: "Ottimizza l'archiviazione cloud",
      description: "Elimina i file inutilizzati e comprimi i file di grandi dimensioni prima di caricarli",
      impact: 20,
    })
  }

  // Videochiamate
  if (activity.videoCallsHours > 2) {
    suggestions.push({
      title: "Disattiva il video quando non necessario",
      description: "Usa la modalità solo audio per parti delle chiamate quando il video non è necessario",
      impact: 50,
    })
  }

  // Social media
  if (activity.socialMediaHours > 2) {
    suggestions.push({
      title: "Riduci lo scrolling sui social media",
      description: "Imposta un limite di tempo per le app dei social media per ridurre il consumo di dati",
      impact: 25,
    })
  }

  // Se non ci sono suggerimenti specifici, aggiungi quelli generali
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

  // Restituisci i primi 3 suggerimenti
  return suggestions.slice(0, 3)
}

