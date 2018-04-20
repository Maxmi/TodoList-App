require('dotenv').config({path: __dirname + '/../../.env'});
const db = require('../../src/models/db');
const {QueryFile} = require('pg-promise');
const path = require('path');
const {expect} = require('chai');

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

const checkResponseObj = (res) => {
  expect(res).to.be.json;
  expect(res).to.have.status(200);
  expect(res).to.have.property('body');
  expect(res.body).to.be.a('object');
  expect(res.body).to.have.property('tasks');
  expect(res.body.tasks).to.be.a('array');
};

module.exports = {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows,
  getPropertyValue,
  resetAndGetPropValue,
  checkResponseObj,
};
