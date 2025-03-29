import express from 'express';
import cors from 'cors';
import { saveCalculation, getCalculations } from './calculationsService';

const app = express();
app.use(express.json());

// Aggiungi CORS se il frontend gira su un dominio/porta diversa
app.use(cors());

// Endpoint di test
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Endpoint per recuperare i calcoli
app.get('/api/calculations', async (req, res) => {
  const allCalcs = await getCalculations();
  console.log('Tutti i calcoli:', allCalcs);
  res.json(allCalcs);
});

// Endpoint per salvare un calcolo
app.post('/api/calculations', async (req, res) => {
  try {
    const saved = await saveCalculation(req.body);
    console.log('Salvato:', saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error in /api/calculations:', error);
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});

// Avvia il server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend in ascolto sulla porta ${PORT}`);
});
