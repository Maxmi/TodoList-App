const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows,
  getPropertyValue,
  resetAndGetPropValue,
  checkResponseObj
} = require('../db/helpers');

const app = require('../../src/app');

chai.use(chaiHttp);

describe('routes', () => {
  describe('/GET tasks', () => {
    context('when sending GET request to /tasks and db is empty', () => {
      beforeEach('truncate table', () => {
        return truncateTable();
      });
      it('should return empty list', () => {
        return chai.request(app)
          .get('/tasks')
          .then(res => {
            checkResponseObj(res);
            expect(res.body.tasks.length).to.equal(0);
          });
      });
    });
    context('when sending GET request to /tasks and db has data', () => {
      beforeEach('truncate and seed db',() => {
        return resetTable();
      });
      it('should return list of tasks', () => {
        return chai.request(app)
          .get('/tasks')
          .then(res => {
            checkResponseObj(res);
            expect(res.body.tasks).to.have.lengthOf.above(0);
            res.body.tasks.every(task => {
              expect(task).to.be.a('object');
              expect(task).to.have.property('id');
              expect(task.id).to.be.a('number');
              expect(task).to.have.property('description');
              expect(task.description).to.be.a('string');
              expect(task).to.have.property('completed');
              expect(task.completed).to.be.a('boolean');
            });
          });
      });
    });
  });

  describe('/POST tasks', () => {
    context('when sending POST request to /tasks', () => {
      let taskCountBefore;
      beforeEach(() => {
        return resetAndCount()
          .then(count => taskCountBefore = parseInt(count.count));
      });
      it('should add new task to db', () => {
        return chai.request(app)
          .post('/tasks')
          .type('form')
          .send({
            newTask: 'new test task'
          })
          .then(() => {
            return countRows()
              .then(res => {
                expect(parseInt(res.count)).to.equal(taskCountBefore + 1);
              });
          });
      });
    });
  });


  describe('/PUT tasks/complete/:id', () => {
    context('when sending PUT request to /tasks/complete/1', () => {
      let propValueBefore;
      beforeEach(() => {
        return resetAndGetPropValue(1, 'completed')
          .then(res => {
            propValueBefore = res.completed;
          });
      });
      it('should change the value of completed property to true ', () => {
        return chai.request(app)
          .put('/tasks/complete/1')
          .then(() => {
            return getPropertyValue(1, 'completed')
              .then(res => {
                expect(res.completed).to.not.equal(propValueBefore);
              });
          });
      });
    });
  });


  describe('/PUT tasks/:id', () => {
    context('when sending PUT request to /tasks/:id', () => {
      let propValueBefore;
      beforeEach(() => {
        return resetAndGetPropValue(2, 'description')
          .then(res => {
            propValueBefore = res.description;
          });
      });
      it('should update the task description', () => {
        return chai.request(app)
          .put('/tasks/2')
          .send({text: 'updated text'})
          .then(() => {
            return getPropertyValue(2, 'description')
              .then(res => {
                expect(res.description).to.not.equal(propValueBefore);
              });
          });
      });
    });
  });


  describe('/DELETE tasks/:id', () => {
    context('when sending DELETE request to /tasks/:id', () => {
      let taskCountBefore;
      beforeEach(() => {
        return resetAndCount()
          .then(count => taskCountBefore = parseInt(count.count));
      });
      it('should delete the task', () => {
        return chai.request(app)
          .delete('/tasks/1')
          .then(() => {
            return countRows()
              .then(res => {
                expect(parseInt(res.count)).to.equal(taskCountBefore - 1);
              });
          });
      });
    });
  });

}); //end of most outer describe
