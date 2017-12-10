$(document).ready(() => {
  //where new tasks will be appended
  const $ul = $('#listOfTasks');

  //wrapper for new task
  const createNewTaskElement = newTask => {
    return $('<li></li>').addClass('list-group-item d-flex justify-content-between').html(`
      <input type='checkbox' class='completeTask toggle'>
      <span contenteditable='true' class="desciption">${newTask.description}</span>
      <button class="deleteTask btn btn-outline-danger" type='submit'>X</button>
    `).data('id', newTask.id)
  }

  //making get request to api
  const getTasks = () => {
    return fetch('/alltasks');
  }

  //rendering retrieved info on the page
  const renderTasks = (tasks) => {
    getTasks()
      .then(res => {
        return res.json();
      })
      .then(res => {
        const content = res.data.map(task => createNewTaskElement(task));
        $ul.html(content);
      })
  }

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
  const addTask = (description) => {
    return $.post('/alltasks', {description})
      .catch(err => console.log(err));
  };

  //handler for addTask button
  $('#addForm').submit((event) => {
    event.preventDefault();

    let description = $('input[name="description"]').val();

    addTask(description)
      .then(newTask => {
        $ul.prepend(createNewTaskElement(newTask));
        $('input[name="description"]').val('');
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


  //handler for checkbox (completing a task)
  $(() => {
    $('input').on('click', () => {
      $(this).parent().toggleClass('checked');
    });
  });


  //handler for clicking on input (editing a task)

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
    })
  }


  //handler for X - delete task button
  $('#listOfTasks').on('click', '.deleteTask', (event) => {
    const button = $(event.target);
    const li = button.parent();
    const id = li.data('id');
    deleteTask(id)
      .then(() => {
        li.remove();
      })
  });


}); //end of document ready
