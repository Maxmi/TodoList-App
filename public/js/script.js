$(document).ready(() => {
  //where new tasks will be appended
  const $ul = $('#listOfTasks');

  //wrapper for new task
  const createNewTaskElement = newTask => {
    return $('<li></li>').addClass('list-group-item d-flex align-items-center').html(`
      <div class='p2'>
        <button type='submit' class='completeTask btn btn-outline-success'>V</button>
        <span contenteditable='true' name='text' class='text'>${newTask.description}</span>
      </div>
      <div class='ml-auto p-2'>
        <button class='deleteTask btn btn-outline-danger' type='submit'>X</button>
      </div>
    `).data('id', newTask.id)
  };

  //making get request to api
  const getCurrentTasks = () => {
    return fetch('/alltasks');
  };

  //rendering retrieved info on the page
  const renderTasks = (currentTasks) => {
    getCurrentTasks()
      .then(res => {
        return res.json();
      })
      .then(res => {
        const content = res.data.map(task => createNewTaskElement(task));
        $ul.html(content);
      });
  };

  renderTasks();


  //making post request to api
  // const addTask = (description) => {
  //   return fetch('/alltasks', {
  //     method: 'POST',
  //     // headers: {
  //     //   'Content-Type': 'application/json'
  //     // },
  //     // body: JSON.stringify(description)
  //     // body: new FormData(document.getElementById('addForm'))
  //     // body: {description: document.getElementById('desc')}
  //   });
  // };

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


  //making PUT requst to api
  // const editOrCompleteTask = (task) => {
  //   return fetch('/'), {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'plain/text'
  //     },
  //     body: JSON.stringify(task)
  //   };
  // };



  const completeTask = (taskID) => {
    return $.ajax ({
      method: 'PUT',
      url: `/alltasks/completed/${taskID}`,
    });
  };

  //handler for green btn (completing a task)
  $('#listOfTasks').on('click', '.completeTask', (event) => {
    const button = $(event.target);
    const li = button.parent().parent();
    const id = li.data('id');
    completeTask(id)
      .then(() => {
        li.addClass('checked');
        // li.hide('slow');
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

  //making DELETE request to api
  // const deleteTask = id => {
  //   return fetch('/alltasks'), {
  //     method: 'DELETE'
  //   };
  // };
  //

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


  //filters
  // $('.filters').on('click', '.show-all', (event) => {
  //   const allBtn = $(event.target);
  //   const listItems = $ul.children();
  //   listItems.removeClass('checked')
  // })


}); //end of document ready
