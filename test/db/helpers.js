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

const countRows = () => db.one(`
  SELECT COUNT(id) FROM tasks;
`);

const getPropertyValue = (id, prop) => db.one(`
  SELECT ${prop} FROM tasks WHERE id=${id};
`);

const seedFile = sql('../../src/models/seed.sql');
const loadTable = () => db.none(seedFile);
const resetTable = () => truncateTable().then(() => loadTable());
const resetAndCount = () => resetTable().then(() => countRows());
const resetAndGetPropValue = (id, prop) => resetTable().then(() => {
  return getPropertyValue(id, prop);
});

module.exports = {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows,
  getPropertyValue,
  resetAndGetPropValue,
};
