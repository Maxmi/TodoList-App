const {expect} = require('chai');
const {
  getAllTasks,
  addTask,
  editTask,
  completeTask,
  deleteTask,
} = require('../../src/models/tasks');

const {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows,
  getPropertyValue,
  resetAndGetPropValue
} = require('../db/helpers');

describe('database queries', () => {
  describe('getAllTasks', () => {
    context('when table is empty', () => {
      beforeEach(() => {
        return truncateTable();
      });

      it('should return zero results', () => {
        return getAllTasks()
          .then(tasks => {
            expect(tasks.length).to.equal(0);
          });
      });
    });

    context('when table is not empty', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should return all tasks', () => {
        return getAllTasks()
          .then(tasks => {
            expect(tasks.length).to.be.above(0);
          });
      });
    });
  });

  describe('addTask', () => {
    let taskCountBefore;
    beforeEach(() => {
      return resetAndCount()
        .then(res => {
          taskCountBefore = parseInt(res.count);
        });
    });
    it('should save new task in db', () => {
      return addTask('new test task', 'false')
        .then(() => {
          return countRows()
            .then(res => {
              expect(parseInt(res.count)).to.equal(taskCountBefore + 1);
            });
        });
    });
  });

  describe('completeTask', () => {
    let propValueBefore;
    beforeEach(() => {
      return resetAndGetPropValue(1, 'completed')
        .then(res => {
          propValueBefore = res.completed;
        });
    });
    it('should change the completed property of a task to true', () => {
      return completeTask(1)
        .then(() => {
          return getPropertyValue(1, 'completed')
            .then(res => {
              expect(res.completed).to.not.equal(propValueBefore);
              expect(res.completed).to.equal(true);
            });
        });
    });
  });


  describe('editTask', () => {
    let propValueBefore;
    beforeEach(() => {
      return resetAndGetPropValue(1, 'description')
        .then(res => {
          propValueBefore = res.description;
        });
    });
    it('should update the description property of a task', () => {
      return editTask(1, 'changed this test task')
        .then(() => {
          return getPropertyValue(1, 'description')
            .then(res => {
              expect(res.description).to.equal('changed this test task');
            });
        });
    });
  });


  describe('deleteTask', () => {
    let taskCountBefore;
    beforeEach(() => {
      return resetAndCount()
        .then(res => {
          taskCountBefore = parseInt(res.count);
        });
    });
    it('should delete a task from db', () => {
      return deleteTask(1)
        .then(() => {
          return countRows()
            .then(res => {
              expect(parseInt(res.count)).to.equal(taskCountBefore - 1);
            });
        });
    });
  });


}); //end of most outer describe
