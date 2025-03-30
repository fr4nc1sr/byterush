// Importazione dei moduli necessari
import express from 'express'; // Importa il framework Express per creare il server HTTP
import cors from 'cors'; // Importa il middleware CORS per gestire le richieste provenienti da domini differenti
import { saveCalculation, getCalculations } from './calculationsService'; // Importa le funzioni per salvare e recuperare i calcoli

// Creazione dell'applicazione Express
const app = express();

// Middleware per il parsing del body delle richieste in formato JSON
app.use(express.json());

// Configurazione del middleware CORS per accettare richieste da specifici domini
app.use(cors({
  // Lista di origini (domini) autorizzati a fare richieste al backend
  origin: ['http://localhost:3000', 'http://frontend:3000'],
  // Metodi HTTP consentiti
  methods: ['GET', 'POST'],
  // Header consentiti nelle richieste
  allowedHeaders: ['Content-Type']
}));

// Endpoint di test per verificare che il backend sia attivo
// Quando viene effettuata una richiesta GET all'URL /api/hello, viene restituito un messaggio JSON
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Endpoint per recuperare tutti i calcoli salvati nel database
// Effettua una chiamata asincrona alla funzione getCalculations per ottenere i dati
app.get('/api/calculations', async (req, res) => {
  // Recupera tutti i calcoli
  const allCalcs = await getCalculations();
  // Logga i calcoli nel terminale per il debug
  console.log('Tutti i calcoli:', allCalcs);
  // Risponde al client con i dati in formato JSON
  res.json(allCalcs);
});

// Endpoint per salvare un nuovo calcolo nel database
// Riceve i dati tramite una richiesta POST e li salva usando la funzione saveCalculation
app.post('/api/calculations', async (req, res) => {
  try {
    // Salva il calcolo utilizzando i dati ricevuti nel body della richiesta
    const saved = await saveCalculation(req.body);
    // Logga il calcolo salvato per il debug
    console.log('Salvato:', saved);
    // Risponde con lo status 201 (Created) e il calcolo salvato in formato JSON
    res.status(201).json(saved);
  } catch (error) {
    // In caso di errore, logga il problema nel terminale
    console.error('Error in /api/calculations:', error);
    // Risponde con lo status 500 (Internal Server Error) e un messaggio di errore in formato JSON
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});

// Avvio del server
// Il server ascolta sulla porta specificata nella variabile d'ambiente PORT oppure sulla porta 8000 di default
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  // Logga un messaggio di conferma nel terminale una volta che il server è in ascolto
  console.log(`Backend in ascolto sulla porta ${PORT}`);
});
