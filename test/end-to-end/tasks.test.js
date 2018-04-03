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
      it('should add new task', () => {
        return chai.request(app)
          .post('/alltasks')
          .type('form')
          .send({
            newTask: 'new test task',
          })
          .then(res => {
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            return chai.request(app)
              .get('/alltasks/4')
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
