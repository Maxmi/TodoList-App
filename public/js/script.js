$(document).ready(() => {
  // where new tasks will be mounted
  const taskList = $('#listOfTasks');
  // wrapper for each task
  const createNewTaskElement = newTask => {
    const isComplete = newTask.status;
    return $('<li></li>')
      .addClass(`list-group-item ${isComplete ? 'checked' : 'current'} align-items-center`)
      .html(`
          <div class='delete-btn'>
            <button
              class='deleteTask btn btn-danger btn-sm'
              type='submit'>
              &times
            </button>
          </div>

          <div class='text-btn'>
            <button
              type='submit'
              class='btn btn-outline-success btn-sm ${isComplete ? 'active undoTask' : 'completeTask'}'>
              &#10003
            </button>
            <span
              contenteditable='true'
              name='text'
              class='text'>${newTask.description}
            </span>
          </div>
    `)
      .data('id', newTask.id);
  };

  // rendering retrieved info on the page
  const renderTasks = tasks => {
    getAllTasks().then(res => {
      const content = res.tasks.map(task => createNewTaskElement(task));
      taskList.html(content);
    });
  };

  renderTasks();

  // handler for + addTask button
  $('#addForm').submit(event => {
    event.preventDefault();
    let newTaskField = $('input[name="newTask"]');
    let newTask = newTaskField.val();

    addTask(newTask).then(newTask => {
      taskList.prepend(createNewTaskElement(newTask));
      newTaskField.val('');
    });
  });

  // handler for v btn (completing a task)
  $('#listOfTasks').on('click', '.completeTask', event => {
    const button = $(event.target);
    const li = button.parents('.list-group-item');
    const id = li.data('id');

    completeTask(id).then(() => {
      toDoAfterComplete(li, button);
    });
  });

  function toDoAfterComplete(li, btn) {
    li.toggleClass('checked current');
    btn.addClass('active').toggleClass('completeTask undoTask');
  }

  // handler for clicking on text (editing a task)
  $('#listOfTasks').on('blur', '.text', event => {
    const span = $(event.target);
    const li = span.parents('.list-group-item');
    const id = li.data('id');
    let newText = span.text();
    editTask(id, newText);
  });

  // handler for x btn - delete task button
  $('#listOfTasks').on('click', '.deleteTask', event => {
    const button = $(event.target);
    const li = button.parents('.list-group-item');
    const id = li.data('id');
    deleteTask(id).then(() => {
      li.remove();
    });
  });

  // undo completion
  $('#listOfTasks').on('click', '.undoTask', event => {
    const button = $(event.target);
    const li = button.parents('.list-group-item');
    const id = li.data('id');
    undoComplete(id).then(() => {
      toDoAfterUndo(button, li);
    });
  });

  function toDoAfterUndo(btn, li) {
    btn.removeClass('active').toggleClass('completeTask undoTask');
    li.toggleClass('checked current');
  }

  // toggle all tasks (complete all or undo all)
  $('#toggle-all').on('click', event => {
    event.preventDefault();

    const toggleBtn = $(event.target);
    const shouldCheck = toggleBtn.hasClass('active');

    if (!shouldCheck) {
      toggleBtn.addClass('active');
    } else {
      toggleBtn.removeClass('active');
    }

    const itemsToToggle = taskList.children();
    itemsToToggle.each(function() {

      const li = $(this);
      const id = li.data('id');
      const btnToComplete = li.find('.completeTask');
      const btnToUndo = li.find('.undoTask');

      if (!shouldCheck && li.hasClass('current')) {
        completeTask(id).then(() => {
          toDoAfterComplete(li, btnToComplete);
        });
      }

      if (shouldCheck && li.hasClass('checked')) {
        undoComplete(id).then(() => {
          toDoAfterUndo(btnToUndo, li);
        });
      }
    });
  });

  //filters
  function resetFilters() {
    $('.filters')
      .children()
      .removeClass('active');
  }

  function resetLists() {
    const listItems = taskList.children();
    listItems.removeClass('hidden');
  }

  function setHidden(classNameToHide) {
    const listItems = taskList.children();
    listItems.each(function() {
      if ($(this).hasClass(classNameToHide)) {
        $(this).addClass('hidden');
      }
    });
  }

  $('.filters').on('click', '.show-all', event => {
    event.preventDefault();
    const allBtn = $(event.target);
    if (!allBtn.hasClass('active')) {
      resetFilters();
      allBtn.addClass('active');
      resetLists();
    }
  });

  $('.filters').on('click', '.show-completed, .show-current', event => {
    event.preventDefault();
    const btn = $(event.target);
    if (!btn.hasClass('active')) {
      resetFilters();
      btn.addClass('active');
      resetLists();
      const classToHide = btn.hasClass('show-current') ? 'checked' : 'current';
      setHidden(classToHide);
    }
  });

  // delete all completed tasks
  $('.filters').on('click', '.clear-completed', event => {
    event.preventDefault();
    const itemsToClear = taskList.children('.checked');
    itemsToClear.each(function() {
      const id = $(this).data('id');
      deleteTask(id).then(() => {
        $(this).remove();
      });
    });
  });
}); // end of document ready
