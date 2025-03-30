// Importazione dei moduli necessari dal pacchetto 'mysql2/promise'
// - createPool: funzione per creare un pool di connessioni al database, utile per gestire in modo efficiente più connessioni contemporaneamente.
// - RowDataPacket: interfaccia che rappresenta le righe restituita dalle query MySQL, utile per tipizzare i risultati.
import { createPool, RowDataPacket } from 'mysql2/promise';

// Creazione di un pool di connessioni al database MySQL
// Le configurazioni vengono prelevate dalle variabili d'ambiente, se presenti, altrimenti vengono usati valori di default.
const pool = createPool({
  // Host del database: utilizza la variabile d'ambiente DB_HOST oppure 'localhost'
  host: process.env.DB_HOST || 'localhost',
  // Utente del database: utilizza DB_USER oppure 'Byterush'
  user: process.env.DB_USER || 'Byterush',
  // Password dell'utente: utilizza DB_PASSWORD oppure 'Byterushpass'
  password: process.env.DB_PASSWORD || 'Byterushpass',
  // Nome del database a cui connettersi: utilizza DB_NAME oppure 'Byterush'
  database: process.env.DB_NAME || 'Byterush',
  // Porta di connessione al database, 3306 è la porta standard per MySQL
  port: 3306,
  // Se true, le richieste saranno messe in coda in attesa che una connessione diventi disponibile
  waitForConnections: true,
  // Numero massimo di connessioni attive nel pool
  connectionLimit: 10,
  // Limite massimo di richieste in coda; 0 significa nessun limite
  queueLimit: 0
});

// Definizione dell'interfaccia 'Calculation' che estende RowDataPacket
// Questa interfaccia serve a tipizzare i record della tabella 'calculations'
export interface Calculation extends RowDataPacket {
  // Identificatore univoco del record (opzionale, perché viene generato automaticamente dal database)
  id?: number;
  // Nome dell'utente associato al calcolo
  username: string;
  // Valore calcolato dell'impronta di carbonio
  carbonFootprint: number;
  // Data in cui il calcolo è stato effettuato (opzionale, verrà impostata in fase di inserimento)
  date?: Date;
  // Oggetto che descrive le attività che contribuiscono al calcolo dell'impronta di carbonio
  activities: {
    // Numero di ore dedicate allo streaming
    streamingHours: number;
    // Qualità del video utilizzata durante lo streaming (ad es. "HD", "Full HD")
    videoQuality: string;
    // Ore spese sui social media
    socialMediaHours: number;
    // Numero di email inviate al giorno
    emailsPerDay: number;
    // Quantità di dati memorizzati nel cloud, espressa in gigabyte
    cloudStorageGB: number;
    // Ore spese in videochiamate
    videoCallsHours: number;
  };
}

// Funzione asincrona per salvare un nuovo calcolo nel database
// Il parametro 'data' è tipizzato come Calculation, escludendo 'id' e 'date' poiché gestiti internamente.
export async function saveCalculation(data: Omit<Calculation, 'id' | 'date'>) {
  // Estrazione dei campi 'username', 'carbonFootprint' e 'activities' dall'oggetto 'data'
  const { username, carbonFootprint, activities } = data;
  // Creazione dell'oggetto 'Date' che rappresenta il momento dell'inserimento del calcolo
  const date = new Date();

  try {
    // Esecuzione della query di inserimento nella tabella 'calculations'
    // Si usano i segnaposto '?' per passare in sicurezza i valori ed evitare SQL Injection
    // Il campo 'activities' viene convertito in una stringa JSON per poter essere salvato come testo
    const [result] = await pool.query(
      'INSERT INTO calculations (username, carbonFootprint, date, activities) VALUES (?, ?, ?, ?)',
      [username, carbonFootprint, date, JSON.stringify(activities)]
    );

    // Recupero del record appena inserito utilizzando l'ID generato (insertId)
    const [rows] = await pool.query<Calculation[]>(
      'SELECT * FROM calculations WHERE id = ?',
      [(result as any).insertId]
    );

    // Restituisce il record recuperato, che corrisponde al calcolo appena salvato
    return rows[0];
  } catch (error) {
    // In caso di errore durante l'inserimento o il recupero, viene stampato l'errore in console
    console.error('Error saving calculation:', error);
    // Rilancio dell'errore per poterlo gestire ulteriormente a monte, se necessario
    throw error;
  }
}

// Funzione asincrona per recuperare tutti i calcoli salvati nel database
export async function getCalculations() {
  try {
    // Esecuzione della query per selezionare tutti i record dalla tabella 'calculations'
    // I risultati sono ordinati in ordine decrescente basato sulla data, così che i calcoli più recenti appaiano per primi
    const [rows] = await pool.query<Calculation[]>('SELECT * FROM calculations ORDER BY date DESC');

    // Mappatura dei risultati per convertire il campo 'activities' da stringa JSON a oggetto JavaScript
    return rows.map((row) => ({
      ...row,
      activities: JSON.parse(row.activities as unknown as string)
    }));
  } catch (error) {
    // In caso di errore durante il recupero dei dati, viene stampato l'errore in console
    console.error('Error fetching calculations:', error);
    // Rilancio dell'errore per la gestione a livello superiore
    throw error;
  }
}

// Test della connessione al database: viene richiesta una connessione dal pool
// Se la connessione ha successo, viene stampato un messaggio di conferma in console
// Se fallisce, viene stampato un messaggio d'errore con i dettagli del problema
pool.getConnection()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));
