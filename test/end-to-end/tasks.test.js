const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const {truncateTable, resetTable} = require('../db/helpers');
const app = require('../../src/app');

describe('routes', () => {

  describe('/GET allTasks', () => {
    context('when sending GET request to alltasks and db is empty', () => {
      beforeEach(() => {
        return truncateTable();
      });
      it('should return empty list', () => {
        return chai.request(app)
          .get('/alltasks')
          .then(res => {

            // bds: there are different schools of thought on this, but I 
            // bds: like tests to contain only one "expect" per test.
            // bds: That gives a more accurate picture of the state of your
            // bds: code, since *every* expect will run every time, even if
            // bds: previous expects fail.
            // bds: if you have more than one expect to run for a particular
            // bds: setup, take advantage of "before" and "beforeEach"
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data.length).to.equal(0);
          });
      });
    });
    context('when sending GET request to alltasks and db has data', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should return list of tasks', () => {
        return chai.request(app)
          .get('/alltasks')
          .then(res => {
            // bds: see comments above on multiple expects
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data.length).to.equal(3);
          });
      });
    });
  });


  describe('/POST allTasks', () => {
    context('when sending POST request to alltasks', () => {
      beforeEach(() => {
        return resetTable();
      });
      it(, () => {
        return chai.request(app)
          .post('/alltasks')
          .type('form')
          .send({
            newTask: 'new test task',
          })
          .then(res => {
            // bds: this should be a separate test -- it's not checking
            // bds: 'should add new task'
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            return chai.request(app)
              .get('/alltasks/4')
              // bds: this is checking 'should add new task'... but
              // bds: it's using a separate route to do so. If the test fails,
              // bds: is it the first api call ('/alltasks') that
              // bds: failed, or the second ('/alltasks/4')? 
              // bds: A better test for the 'POST /alltasks' route would
              // bds: be to use pg-promise to check the db after the call 
              // bds: Also: this is relying on the test setup to add three tasks ('/alltasks/4'. 
              // bds: what if you changed the test setup to add another task? This test would break.
              // bds: better strategy: count the number of tasks in the db before the test, then
              // bds: check that the number after the tests is one more.
              .then(res => {
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('status');
                expect(res.body.id).to.equal(4);
                expect(res.body.description).to.equal('new test task');
                expect(res.body.status).to.equal(false);
              });
          });
      });
    });
  });


  describe('/PUT alltasks/completed/:taskID', () => {
    context('when sending PUT request to alltasks/completed/1', () => {
      beforeEach(() => {
        return resetTable();
      });
      // bds: see comments on '/POST allTasks'
      it('should update status of task 1 to true', () => {
        return chai.request(app)
          .put('/alltasks/completed/1')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            return chai.request(app)
              .get('/alltasks/1')
              .then(res => {
                expect(res).to.be.json;
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.equal(true);
              });
          });
      });
    });
  });


  describe('/PUT alltasks/:taskID', () => {
    context('when sending PUT request to alltasks/2', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should update description of task with id 2', () => {
      // bds: see comments on '/POST allTasks'
      return chai.request(app)
          .put('/alltasks/2')
          .send({text: 'updated text'})
          .then(res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            return chai.request(app)
              .get('/alltasks/2')
              .then(res => {
                expect(res).to.be.json;
                expect(res.body).to.have.property('description');
                expect(res.body.description).to.equal('updated text');
              });
          });
      });
    });
  });


  describe('/DELETE alltasks/:taskID', () => {
    context('when sending DELETE request to alltasks/1', () => {
      beforeEach(() => {
        return resetTable();
      });
      // bds: see comments on '/POST allTasks'
      it('should delete the task with id 1', () => {
        return chai.request(app)
          .delete('/alltasks/1')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            return chai.request(app)
              .get('/alltasks')
              .then(res => {
                expect(res).to.be.json;
                expect(res.body.data.length).to.equal(2);
              });
          });
      });
    });
  });

}); //end of most outer describe
