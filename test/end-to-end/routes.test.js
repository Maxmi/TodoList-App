const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const {truncateTable, resetTable} = require('../db/helpers');
const app = require('../../src/app');

chai.use(chaiHttp);

describe('routes', () => {
  beforeEach('truncate and seed db',() => {
    return resetTable();
  });
  describe('/GET tasks', () => {
    context('when sending GET request to /tasks and db is empty', () => {
      beforeEach('truncate table', () => {
        return truncateTable();
      });
      it('should return empty list', () => {
        return chai.request(app)
          .get('/tasks')
          .then(res => {
            /* 
              REVIEW COMMENT: I don't think there's anything wrong with really
              strict testing like this, but I would break out a lot of these
              test cases into a separate function and then just call that function
              instead to keep it readable. Some function named something like 
              `expectListOfTasks(req)` could perform every test case here 
              except the length expectation, so that the body just reads 
              like this:
              ```
              expectListOfTasks(req);
              expect(res.body.tasks.length).to.equal(0);
              ```
              and expectListOfTasks could be used in both tests for this route.
            */
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            expect(res).to.have.property('body');
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('tasks');
            expect(res.body.tasks).to.be.a('array');
            expect(res.body.tasks.length).to.equal(0);
          });
      });
    });
    context('when sending GET request to /tasks and db has data', () => {
      it('should return list of tasks', () => {
        return chai.request(app)
          .get('/tasks')
          .then(res => {
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            expect(res).to.have.property('body');
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('tasks');
            expect(res.body.tasks).to.be.a('array');
            expect(res.body.tasks).to.have.lengthOf.above(0);
            expect(res.body.tasks[0]).to.be.a('object');
            expect(res.body.tasks[0]).to.have.property('id');
            expect(res.body.tasks[0].id).to.be.a('number');
            expect(res.body.tasks[0]).to.have.property('description');
            expect(res.body.tasks[0].description).to.be.a('string');
            expect(res.body.tasks[0]).to.have.property('completed');
            expect(res.body.tasks[0].completed).to.be.a('boolean');
          });
      });
    });
  });

  describe('/POST tasks', () => {
    context('when sending POST request to /tasks', () => {
      let tasksLengthBeforePost;
      let tasksLengthAfterPost;
      it('should add new task', () => {
        /* 
          REVIEW COMMENT: Some of these tests are fairly long and involve a lot of nesting,
          which can be awkwared to read. See if you can break them up some by
          moving parts of them into before blocks. For example, the first two requests in
          this test could reasonably be put in a before block, since they're essentially
          just setup for checking the result of that final request.
          You can make sure your test code waits for those earlier requests to finish
          by using a "done" callback.

          Resources on using a "done" callback:
          https://gregjs.com/javascript/2015/asynchronous-tests-in-mocha-using-before-and-after-blocks/
          https://mochajs.org/#asynchronous-code
        */
        //sending GET request to get length of tasks array before POST
        return chai.request(app)
          .get('/tasks')
          .then(res => {
            tasksLengthBeforePost = res.body.tasks.length;
            //now sending POST request to add one item into tasks array
            return chai.request(app)
              .post('/tasks')
              .type('form')
              .send({
                newTask: 'new test task'
              })
              .then(res => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                //sending GET request again to get new length of tasks array and compare it with the previous one
                return chai.request(app)
                  .get('/tasks')
                  .then(res => {
                    tasksLengthAfterPost = res.body.tasks.length;
                    expect(tasksLengthAfterPost).to.equal(tasksLengthBeforePost + 1);
                  });
              });
          });
      });
    });
  });


  describe('/PUT tasks/completed/:id', () => {
    context('when sending PUT request to /tasks/completed/:id', () => {
      let isCompleteBeforePut;
      let isCompleteAfterPut;
      it('should change the value of completed property to true ', () => {
        //sending get request to get one task before PUT request
        return chai.request(app)
          .get('/tasks/1')
          .then(res => {
            isCompleteBeforePut = res.body.completed;
            //sending PUT request to update the task
            return chai.request(app)
              .put('/tasks/completed/1')
              .then(res => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                //sending GET request again to get new value of completed property of a task object
                return chai.request(app)
                  .get('/tasks/1')
                  .then(res => {
                    isCompleteAfterPut = res.body.completed;
                    expect(isCompleteBeforePut).to.equal(false);
                    expect(isCompleteAfterPut).to.equal(true);
                  });
              });
          });
      });
    });
  });

//need to get the value of description before test and after ?
  describe('/PUT tasks/:id', () => {
    context('when sending PUT request to /tasks/:id', () => {
      it('should update the task description', () => {
        let descriptionBeforePut;
        let descriptionAfterPut;
        //sending GET request to get description of a task before PUT
        return chai.request(app)
          .get('/tasks/2')
          .then(res => {
            descriptionBeforePut = res.body.description;
            //sending PUT request to change the description
            return chai.request(app)
              .put('/tasks/2')
              .send({text: 'updated text'})
              .then(res => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                //sending GET request to get new description of a task
                return chai.request(app)
                  .get('/tasks/2')
                  .then(res => {
                    expect(res.body.description).to.equal('updated text');
                    descriptionAfterPut = res.body.description;
                    expect(descriptionBeforePut).to.not.equal(descriptionAfterPut);
                  });
              });
          });
      });
    });
  });


  describe('/DELETE tasks/:id', () => {
    context('when sending DELETE request to /tasks/:id', () => {
      let tasksLengthBeforeDelete;
      let tasksLengthAfterDelete;
      it('should delete the task', () => {
        //sending GET request to get length of tasks array before DELETE
        return chai.request(app)
          .get('/tasks')
          .then(res => {
            tasksLengthBeforeDelete = res.body.tasks.length;
            //now sending DELETE request to remove one item from tasks array
            return chai.request(app)
              .delete('/tasks/1')
              .then(res => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                //sending GET request again to get new length of tasks array and compare it with the previous one
                return chai.request(app)
                  .get('/tasks')
                  .then(res => {
                    tasksLengthAfterDelete = res.body.tasks.length;
                    expect(tasksLengthAfterDelete).to.equal(tasksLengthBeforeDelete - 1);
                  });
              });
          });
      });
    });
  });

}); //end of most outer describe
