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
            expect(tasks.length).to.equal(3);
          });
      });
    });
  });

  describe('addTask', () => {
    context('when user adds new task', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should save new task in db', () => {
        return addTask('new test task', 'false')
          .then(newTask => {
            expect(newTask.description).to.equal('new test task');
            expect(newTask.status).to.equal(false);
          });
      });
    });
  });

  describe('completeTask', () => {
    context('when user clicks on green button (V) next to item', () => {
      beforeEach(() => {
        return resetTable();
      });
      it('should mark this item as completed and change status in db', () => {
        return completeTask(1)
          .then(task => {
            expect(task.status).to.equal(true);
          });
      });
    });
  });


  describe('editTask', () => {
    context('when user changes text of task', () => {
      beforeEach(() => {
        return resetTable();
      });
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
      beforeEach(() => {
        return resetTable();
      });
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
