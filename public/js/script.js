$(document).ready(() => {
  //where new tasks will be appended
  const $ul = $('#listOfTasks');

  //wrapper for new task
  const createNewTaskElement = newTask => {
    return $('<li></li>').addClass('list-group-item d-flex justify-content-between').html(`

        <input type='checkbox' class='completeTask'>
        <span contenteditable='true' name='text' class='text'>${newTask.description}</span>
        <button class="deleteTask btn btn-outline-danger" type='submit'>X</button>

    `).data('id', newTask.id)
  }

  //making get request to api
  const getAllTasks = () => {
    return fetch('/alltasks');
  }

  //rendering retrieved info on the page
  const renderTasks = (tasks) => {
    getAllTasks()
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




  // should be only one PUT request for both complete and update actions?
  //
  const completeTask = (taskID) => {
    return $.ajax ({
      method: 'PUT',
      url: `/alltasks/completed/${taskID}`,
    })
  }

  //handler for checkbox (completing a task)
  $('#listOfTasks').on('change', '.completeTask', (event) => {
    const checkbox = $(event.target);
    const li = checkbox.parent();
    const id = li.data('id');
    completeTask(id)
      .then(() => {
        li.addClass('checked').hide('slow')
        // li.remove()
      })
  })


  const editTask = (taskID, text) => {
    return $.ajax ({
      method: 'PUT',
      url: `/alltasks/${taskID}`,
      data: {text},
      // dataType: 'json'
    })
  }

  //handler for clicking on text (editing a task)
  $('#listOfTasks').on('keypress', '.text', (event) => {
    const span = $(event.target);
    const li = span.parent();
    const id = li.data('id');
    if(event.which === 13) {
      let newText = span.text();
      console.log(newText);
      editTask(id, newText)
        .then(() => {
          console.log(`Task with id ${id} edited`);
        })
    }
    // console.log('Keypress');
  })



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
