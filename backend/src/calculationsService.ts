import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'mariadb',       // Nome del servizio DB in docker-compose
  user: 'Byterush',
  password: 'Byterushpass',
  database: 'Byterush',
});

export interface Calculation {
  id: number;         // Unique identifier
  name: string;       // Name of the calculation
  value: number;      // Value of the calculation
  createdAt: Date;    // Timestamp of when it was created
}

// Funzione per salvare un nuovo calcolo
export async function saveCalculation(data: Omit<Calculation, 'id'>) {
  const { name, value, createdAt } = data;

  try {
    // Insert query
    const [result] = await pool.query(
      'INSERT INTO calculations (name, value, createdAt) VALUES (?, ?, ?)',
      [name, value, createdAt]
    );

    // Return the result of the query (e.g., the inserted ID)
    return result;
  } catch (error) {
    console.error('Error saving calculation:', error);
    throw error;
  }
}

// Funzione per ottenere i calcoli
export async function getCalculations() {
  try {
    const [rows] = await pool.query('SELECT * FROM calculations');
    return rows; // Elaborale se necessario
  } catch (error) {
    console.error('Error fetching calculations:', error);
    throw error;
  }
}
pool.getConnection()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));