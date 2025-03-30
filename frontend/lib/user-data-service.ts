// Importa le configurazioni dal file 'config' (se necessario per la configurazione dell'applicazione)
import { config } from './config';

// --------------------------------------------------------------------------------------
// INTERFACCIA Calculation
// --------------------------------------------------------------------------------------
// Definisce il tipo "Calculation", che rappresenta una misurazione dell'impronta di carbonio
// associata a un utente. È simile a "UserCalculation" presente nel backend.
export interface Calculation {
  id: string;               // Identificativo univoco del calcolo
  username: string;         // Nome utente che ha effettuato il calcolo
  carbonFootprint: number;  // Valore calcolato dell'impronta di carbonio (es. in grammi)
  date: string;             // Data (in formato stringa) in cui è stato registrato il calcolo
  activities: {             // Oggetto che contiene i dettagli delle attività dell'utente
    streamingHours: number;     // Ore di streaming video
    videoQuality: string;       // Qualità video (es. "sd", "hd", "4k")
    socialMediaHours: number;   // Ore dedicate ai social media
    emailsPerDay: number;       // Numero di email inviate/ricevute al giorno
    cloudStorageGB: number;     // Quantità di dati in GB archiviati nel cloud
    videoCallsHours: number;    // Ore di videochiamate
  };
}

// --------------------------------------------------------------------------------------
// FUNZIONE getCalculations
// --------------------------------------------------------------------------------------
// Effettua una chiamata HTTP GET all'endpoint '/api/calculations' per recuperare
// l'elenco dei calcoli salvati e restituisce un array di oggetti di tipo Calculation.
export async function getCalculations(): Promise<Calculation[]> {
  const response = await fetch('/api/calculations');
  
  // Se la risposta non è OK (status non compreso tra 200 e 299), lancia un errore
  if (!response.ok) {
    throw new Error(`Errore getCalculations: status ${response.status}`);
  }
  
  // Restituisce i dati in formato JSON convertiti nell'array di Calculation
  return response.json();
}

// --------------------------------------------------------------------------------------
// FUNZIONE saveCalculation
// --------------------------------------------------------------------------------------
// Effettua una chiamata HTTP POST all'endpoint '/api/calculations' per salvare un nuovo
// calcolo. Il parametro "data" include tutte le proprietà di Calculation, tranne 'id' e 'date',
// che vengono generati dal backend.
export async function saveCalculation(
  data: Omit<Calculation, 'id' | 'date'>
): Promise<Calculation> {
  const response = await fetch('/api/calculations', {
    method: 'POST', // Specifica il metodo POST per l'invio dei dati
    headers: { 'Content-Type': 'application/json' }, // Specifica che il body è in formato JSON
    body: JSON.stringify(data), // Converte l'oggetto data in una stringa JSON
  });
  
  // Verifica che la risposta sia andata a buon fine, altrimenti lancia un errore
  if (!response.ok) {
    throw new Error(`Errore saveCalculation: status ${response.status}`);
  }
  
  // Restituisce il calcolo salvato, convertito dal formato JSON
  return response.json();
}

// --------------------------------------------------------------------------------------
// FUNZIONE getEcoLeaderboard
// --------------------------------------------------------------------------------------
// Recupera tutti i calcoli, li ordina in base all'impronta di carbonio (dal minore al maggiore)
// e restituisce i primi 10 calcoli, formando una "leaderboard" eco-friendly.
export async function getEcoLeaderboard(): Promise<Calculation[]> {
  // 1. Recupera tutti i calcoli eseguendo la funzione getCalculations
  const allCalculations = await getCalculations();

  // 2. Ordina l'array di calcoli in base all'impronta di carbonio (carbonFootprint) in ordine crescente.
  //    Se preferisci i calcoli con l'impronta maggiore in alto, puoi invertire il confronto.
  allCalculations.sort((a, b) => a.carbonFootprint - b.carbonFootprint);

  // 3. Seleziona solo i primi 10 calcoli per formare la leaderboard
  return allCalculations.slice(0, 10);
}
