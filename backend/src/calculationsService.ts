import { createPool, RowDataPacket } from 'mysql2/promise';

const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'Byterush',
  password: process.env.DB_PASSWORD || 'Byterushpass',
  database: process.env.DB_NAME || 'Byterush',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export interface Calculation extends RowDataPacket {
  id?: number;
  username: string;
  carbonFootprint: number;
  date?: Date;
  activities: {
    streamingHours: number;
    videoQuality: string;
    socialMediaHours: number;
    emailsPerDay: number;
    cloudStorageGB: number;
    videoCallsHours: number;
  };
}

// Funzione per salvare un nuovo calcolo
export async function saveCalculation(data: Omit<Calculation, 'id' | 'date'>) {
  const { username, carbonFootprint, activities } = data;
  const date = new Date();

  try {
    // Insert query
    const [result] = await pool.query(
      'INSERT INTO calculations (username, carbonFootprint, date, activities) VALUES (?, ?, ?, ?)',
      [username, carbonFootprint, date, JSON.stringify(activities)]
    );

    // Recupera il record appena inserito
    const [rows] = await pool.query<Calculation[]>(
      'SELECT * FROM calculations WHERE id = ?',
      [(result as any).insertId]
    );

    return rows[0];
  } catch (error) {
    console.error('Error saving calculation:', error);
    throw error;
  }
}

// Funzione per ottenere i calcoli
export async function getCalculations() {
  try {
    const [rows] = await pool.query<Calculation[]>('SELECT * FROM calculations ORDER BY date DESC');
    return rows.map((row) => ({
      ...row,
      activities: JSON.parse(row.activities as unknown as string)
    }));
  } catch (error) {
    console.error('Error fetching calculations:', error);
    throw error;
  }
}
pool.getConnection()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));