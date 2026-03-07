import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

// configuração do caminho para o banco de dados

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.resolve(__dirname, '../database/db.sqlite')

// conexão com o banco de dados

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err.message)
  } else {
    console.log('Conectado ao banco de dados')
  }
})

export default db