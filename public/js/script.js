$(document).ready(() => {
  // where new tasks will be mounted
  // bds: use ul here instead of $ul -- or even better, taskList
  const $ul = $('#listOfTasks');

  // wrapper for each task
  const createNewTaskElement = newTask => {
    const isComplete = newTask.status;

    return $('<li></li>')
      .addClass(`list-group-item ${isComplete ? 'checked' : 'current'} align-items-center`)
      .html(
        // bds: I would recommend using a check mark character code in the "completed" box (https://www.rapidtables.com/web/html/html-codes/htm-code-check.html)
        // bds: instead of a V -- the V looks funny to me
        // bds: you might also consider &times; instead of the X in the "delete" box
        `
          <div class='delete-btn'>
            <button
              class='deleteTask btn btn-danger btn-sm'
              type='submit'>
              X
            </button>
          </div>

          <div class='text-btn'>
            <button
              type='submit'
              class='btn btn-outline-success btn-sm ${isComplete ? 'active undoTask' : 'completeTask'}'>
              V
            </button>

            <span
              contenteditable='true'
              name='text'
              class='text'>${newTask.description}
            </span>

          </div>
    `
      )
      .data('id', newTask.id);
  };

  // rendering retrieved info on the page
  const renderTasks = tasks => {
    getAllTasks().then(res => {
      // bds: nice :-)
      const content = res.data.map(task => createNewTaskElement(task));
      $ul.html(content);
    });
  };

  renderTasks();

  // handler for addTask button
  $('#addForm').submit(event => {
    // bds: in general, event.preventDefault() is only necessary if there was
    // bds: an event tied to the button (for example, if the button was a submit button
    // bds: for a form). I don't think it's necessary here, or in the other places you
    // bds: used it... but check to make sure (I didn't check.)
    event.preventDefault();

    // bds: store this in a variable since it's used more than once: $('input[name="newTask"]')
    let newTask = $('input[name="newTask"]').val();

    addTask(newTask).then(newTask => {
      $ul.prepend(createNewTaskElement(newTask));
      $('input[name="newTask"]').val('');
    });
  });

  // handler for green btn (completing a task)
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

    // bds: no commented blocks in finished code!
    //   .then(() => {
    //   console.log(`Task with id ${id} edited`);
    // });
  });

  // handler for red btn - delete task button
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

    const itemsToToggle = $ul.children();
    itemsToToggle.each(function() {

      // bds: use li here, not $li
      const $li = $(this);
      const id = $li.data('id');
      const btnToComplete = $li.find('.completeTask');
      const btnToUndo = $li.find('.undoTask');

      if (!shouldCheck && $li.hasClass('current')) {
        completeTask(id).then(() => {
          toDoAfterComplete($li, btnToComplete);
        });
      }

      if (shouldCheck && $li.hasClass('checked')) {
        undoComplete(id).then(() => {
          toDoAfterUndo(btnToUndo, $li);
        });
      }
    });
  });

  //f ilters
  function resetFilters() {
    $('.filters')
      .children()
      .removeClass('active');
  }

  function resetLists() {
    const listItems = $ul.children();
    listItems.removeClass('hidden');
  }

  function setHidden(classNameToHide) {
    const listItems = $ul.children();
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
    const itemsToClear = $ul.children('.checked');
    itemsToClear.each(function() {
      const id = $(this).data('id');
      deleteTask(id).then(() => {
        $(this).remove();
      });
    });
  });
}); // end of document ready
