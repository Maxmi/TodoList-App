const pgp = require('pg-promise')();
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todolistapp';

const connectionString = {
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENV === 'test' ? 'todolistapp_test' : 'todolistapp'
};

const db = pgp(connectionString);

module.exports = db;
