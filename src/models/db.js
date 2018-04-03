const pgp = require('pg-promise')();

const makeConnectionString = () => {
  switch(process.env.NODE_ENV) {
  case 'production':
    return `${process.env.DATABASE_URL}?ssl=true`;
  case 'test':
    return `${process.env.DATABASE_URL}_test?ssl=false`;
  default:
    return process.env.DATABASE_URL;
  }
};

const connectionString = makeConnectionString();

const db = pgp(connectionString);

module.exports = db;
