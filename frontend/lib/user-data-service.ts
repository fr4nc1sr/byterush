// Adatta l'URL base del tuo backend Express
// In Docker Compose, in locale di solito: http://localhost:8080
// Oppure, se hai un host diverso, cambia qui.
const BACKEND_URL = "http://backend:8000";

// Tipo "Calculation" (simile a "UserCalculation" del backend)
export interface Calculation {
  id: string;
  username: string;
  carbonFootprint: number;
  date: string;
  activities: {
    streamingHours: number;
    videoQuality: string;
    socialMediaHours: number;
    emailsPerDay: number;
    cloudStorageGB: number;
    videoCallsHours: number;
  };
}

// ------------------------------
// 1) GET /api/calculations
// ------------------------------
export async function getCalculations(): Promise<Calculation[]> {
  const response = await fetch(`${BACKEND_URL}/api/calculations`);
  if (!response.ok) {
    throw new Error(`Errore getCalculations: status ${response.status}`);
  }
  return response.json();
}

// ------------------------------
// 2) POST /api/calculations
// ------------------------------
export async function saveCalculation(
  data: Omit<Calculation, 'id' | 'date'>
): Promise<Calculation> {
  const response = await fetch(`${BACKEND_URL}/api/calculations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Errore saveCalculation: status ${response.status}`);
  }
  return response.json();
}

// ------------------------------
// 3) GET /api/calculations e crea una "leaderboard"
// ------------------------------
export async function getEcoLeaderboard(): Promise<Calculation[]> {
  // 1. Recupera tutti i calcoli
  const allCalculations = await getCalculations();

  // 2. Ordina (ad esempio) per carbonFootprint crescente
  //    Se preferisci i "peggiori" in alto, inverti l'ordinamento
  allCalculations.sort((a, b) => a.carbonFootprint - b.carbonFootprint);

  // 3. Se vuoi mostrare solo i primi 10, fai .slice(0, 10)
  return allCalculations.slice(0, 10);
}