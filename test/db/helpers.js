require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/models/db');
const {QueryFile} = require('pg-promise');
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath);
}

const table = ['tasks'];

const truncateTable = () => db.none(`
  TRUNCATE ${table} RESTART IDENTITY;
`);

const seedFile = sql('../../src/models/seed.sql');
const loadTable = () => db.none(seedFile);
const resetTable = () => truncateTable().then(() => loadTable());


module.exports = {truncateTable, resetTable};
