const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const {truncateTable, resetTable} = require('../db/helpers');
const app = require('../../src/app');

describe('routes', () => {

  describe('/GET tasks', () => {
    context('when sending GET request to /tasks and db is empty', () => {
      beforeEach(() => {
        return truncateTable();
      });
      it('should return empty list', () => {
        return chai.request(app)
          .get('/tasks')
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
    context('when sending GET request to /tasks and db has data', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should return list of tasks', () => {
        return chai.request(app)
          .get('/tasks')
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


  describe('/POST tasks', () => {
    context('when sending POST request to /tasks', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should add new task', () => {
        return chai.request(app)
          .post('/tasks')
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
              .get('/tasks/4')
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
                expect(res.body).to.have.property('completed');
                expect(res.body.id).to.equal(4);
                expect(res.body.description).to.equal('new test task');
                expect(res.body.completed).to.equal(false);
              });
          });
      });
    });
  });


  describe('/PUT tasks/completed/:taskID', () => {
    context('when sending PUT request to tasks/completed/1', () => {
      beforeEach(() => {
        return resetTable();
      });
      // bds: see comments on '/POST allTasks'
      it('should update status of task 1 to true', () => {
        return chai.request(app)
          .put('/tasks/completed/1')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            return chai.request(app)
              .get('/tasks/1')
              .then(res => {
                expect(res).to.be.json;
                expect(res.body).to.have.property('completed');
                expect(res.body.completed).to.equal(true);
              });
          });
      });
    });
  });


  describe('/PUT tasks/:taskID', () => {
    context('when sending PUT request to tasks/2', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should update description of task with id 2', () => {
      // bds: see comments on '/POST allTasks'
      return chai.request(app)
          .put('/tasks/2')
          .send({text: 'updated text'})
          .then(res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            return chai.request(app)
              .get('/tasks/2')
              .then(res => {
                expect(res).to.be.json;
                expect(res.body).to.have.property('description');
                expect(res.body.description).to.equal('updated text');
              });
          });
      });
    });
  });


  describe('/DELETE tasks/:taskID', () => {
    context('when sending DELETE request to tasks/1', () => {
      beforeEach(() => {
        return resetTable();
      });
      // bds: see comments on '/POST allTasks'
      it('should delete the task with id 1', () => {
        return chai.request(app)
          .delete('/tasks/1')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            return chai.request(app)
              .get('/tasks')
              .then(res => {
                expect(res).to.be.json;
                expect(res.body.data.length).to.equal(2);
              });
          });
      });
    });
  });

}); //end of most outer describe
