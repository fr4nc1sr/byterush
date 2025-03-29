import { createPool } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function runMigration() {
  const pool = createPool({
    host: 'localhost',
    user: 'Byterush',
    password: 'Byterushpass',
    database: 'Byterush',
    port: 3306
  });

  try {
    // Leggi il file SQL
    const sql = fs.readFileSync(
      path.join(__dirname, 'create_calculations_table.sql'),
      'utf8'
    );

    // Esegui la migrazione
    await pool.query(sql);
    console.log('Migrazione completata con successo!');
  } catch (error) {
    console.error('Errore durante la migrazione:', error);
  } finally {
    await pool.end();
  }
}

runMigration(); 