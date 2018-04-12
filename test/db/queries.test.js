const {expect} = require('chai');
const {
  getAllTasks,
  addTask,
  editTask,
  completeTask,
  deleteTask,
} = require('../../src/models/tasks');

const {truncateTable, resetTable} = require('./helpers');

describe('database queries', () => {
  //this hook runs for each test, that's why it's specified here
  beforeEach(() => {
    return resetTable();
  });
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
      it('should return all tasks', () => {
        return getAllTasks()
          .then(tasks => {
            expect(tasks.length).to.equal(3);
          });
      });
    });
  });

  describe('addTask', () => {
    context('when user adds new task', () => {
      it('should save new task in db', () => {
        return addTask('new test task', 'false')
          .then(newTask => {
            expect(newTask.description).to.equal('new test task');
            expect(newTask.completed).to.equal(false);
          });
      });
    });
  });

  describe('completeTask', () => {
    context('when user clicks on green button (V) next to item', () => {
      it('should change the value of completed column in db to true', () => {
        return completeTask(1)
          .then(task => {
            expect(task.completed).to.equal(true);
          });
      });
    });
  });


  describe('editTask', () => {
    context('when user changes text of task', () => {
      it('should save updated task in db', () => {
        return editTask(1, 'changed this test task')
          .then(task => {
            expect(task.description).to.equal('changed this test task');
          });
      });
    });
  });


  describe('deleteTask', () => {
    context('when user clicks on red button (X) next to item', () => {
      it('should remove that item from db', () => {
        return deleteTask(1)
          .then(() => {
            return getAllTasks();
          })
          .then(list => {
            expect(list).to.have.length(2);
          });
      });
    });
  });


}); //end of most outer describe
