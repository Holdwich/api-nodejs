import fs from 'fs'
import db from '../config/database.js'

const migration = fs.readFileSync('./src/database/migrations.sql', 'utf8')

db.exec(migration, (err) => {
  if (err) {
    console.error('Erro ao rodar migration:', err.message)
  } else {
    console.log('Migration executada com sucesso')
  }
})