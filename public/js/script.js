$(document).ready(() => {

  //where new tasks will be appended
  const $ul = $('#listOfTasks');


  //wrapper for new task
  const createNewTaskElement = newTask => {
    const isComplete = newTask.status;

    return $('<li></li>').addClass(`list-group-item ${isComplete ? 'checked' : 'current'} align-items-center`).html(`
      <div class='delete-btn'>
        <button class='deleteTask btn btn-danger' type='submit'>X</button>
      </div>
      <div class='text-btn'>
        <button type='submit' class='btn btn-outline-success ${isComplete ? 'active undoTask' : 'completeTask'}'>V</button>
        <span contenteditable='true' name='text' class='text'>${newTask.description}</span>
      </div>

    `).data('id', newTask.id)
  };

  //making get request to api
  const getAllTasks = () => {
    return fetch('/alltasks');
  };

  //rendering retrieved info on the page
  const renderTasks = (currentTasks) => {
    getAllTasks()
      .then(res => {
        return res.json();
      })
      .then(res => {
        const content = res.data.map(task => createNewTaskElement(task));
        $ul.html(content);
      });
  };

  renderTasks();


  //jQuery ajax post
  const addTask = (newTask) => {
    return $.post('/alltasks', {newTask})
      .catch(err => console.log(err));
  };

  //handler for addTask button
  $('#addForm').submit((event) => {
    event.preventDefault();

    let newTask = $('input[name="newTask"]').val();

    addTask(newTask)
      .then(newTask => {
        $ul.prepend(createNewTaskElement(newTask));
        $('input[name="newTask"]').val('');
      });
  });



  const completeTask = (taskID) => {
    return $.ajax ({
      method: 'PUT',
      url: `/alltasks/completed/${taskID}`,
    });
  };


  //handler for green btn (completing a task)
  $('#listOfTasks').on('click', '.completeTask', (event) => {
    const button = $(event.target);
    const li = button.parents('.list-group-item');
    console.log('this is li', li);
    const id = li.data('id');

    completeTask(id)
      .then(() => {
        console.log('came here ');
        li.toggleClass('checked current');
        button.addClass('active').toggleClass('completeTask undoTask');
      });
  });


  const editTask = (taskID, text) => {
    return $.ajax ({
      method: 'PUT',
      url: `/alltasks/${taskID}`,
      data: {text},
    });
  };


  //handler for clicking on text (editing a task)
  $('#listOfTasks').on('blur', '.text', (event) => {
    const span = $(event.target);
    const li = span.parent().parent();
    const id = li.data('id');
    let newText = span.text();
    editTask(id, newText)
      .then(() => {
        console.log(`Task with id ${id} edited`);
      });
  });


  const deleteTask = taskID => {
    return $.ajax({
      method: 'DELETE',
      url: `/alltasks/${taskID}`
    });
  };


  //handler for red btn - delete task button
  $('#listOfTasks').on('click', '.deleteTask', (event) => {
    const button = $(event.target);
    const li = button.parent().parent();
    const id = li.data('id');
    deleteTask(id)
      .then(() => {
        li.remove();
      });
  });


  const undoComplete = (taskID) => {
    return $.ajax ({
      method: 'PUT',
      url: `/alltasks/undo/${taskID}`,
    });
  };


  $('#listOfCompletedTasks').on('click', '.undoTask', (event) => {
    const button = $(event.target);
    const li = button.parents('.list-group-item');
    const id = li.data('id');
    console.log('id: ', id);
    undoComplete(id)
      .then(() => {
        li.toggleClass('checked current');
        button.removeClass('active').toggleClass('completeTask undoTask');;
      })
  })

  //filters

  function resetFilters() {
    $('.filters').children().removeClass('active');
  }

  function resetLists() {
    const listItems = $ul.children();
    listItems.removeClass('hidden');
  }

  function setHidden(classNameToHide) {
    const listItems = $ul.children();
    listItems.each(function() {
      if($(this).hasClass(classNameToHide)) {
        $(this).addClass('hidden');
      }
    })
  }


  $('.filters').on('click', '.show-all', (event) => {
    event.preventDefault();
    const allBtn = $(event.target);
    if(!allBtn.hasClass('active')) {
      resetFilters();
      allBtn.addClass('active');
      resetLists();
    }
  })


  $('.filters').on('click', '.show-completed, .show-active', (event) => {
    event.preventDefault();
    const btn = $(event.target);
    if(!btn.hasClass('active')) {
      resetFilters();
      btn.addClass('active');
      resetLists();
      const classToHide = btn.hasClass('show-active')? 'checked' : 'current';
      setHidden(classToHide);
    }
  })

}); //end of document ready
