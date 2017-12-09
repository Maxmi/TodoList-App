$(document).ready(() => {
// console.log('123');
  //where new tasks will be appended
  const $ul = $('#listOfTasks');

  // const renderTask = task => {
  //   return
  // }


  //wrapper for new task
  const createNewTaskElement = newTask => {
    return $('<li></li>').addClass('list-group-item d-flex justify-content-between').html(`
      <input type='checkbox' class='completeTask toggle'>
      <span contenteditable='true' class="desciption">${newTask.description}</span>
      <button class="deleteTask btn btn-outline-danger" type='submit'>Delete</button>
    `).data('id', newTask.id)
  }


  //get all tasks
  const getTasks = () => {
    return fetch('/fetchAll')
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        const content = res.data.map(task => createNewTaskElement(task));
        $ul.html(content);
      })

  };

  getTasks();

});






//
//

//
//
// const addTask = newTask => {
//   return fetch('/'), {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'plain/text'
//     },
//     body: newTask
//   };
// };
//
// // handler for Add button
// const addTaskBtnParent = document.querySelector('#addTask');
//
// addTaskBtnParent.addEventListener('click', (e) => {
//   e.preventDefault();
//   let button = document.getElementById('#addTaskBtn');
//   button = e.target;
//
//   let taskText = document.getElementsByName('description')[0].value;
//   console.log('this is taskText: ', taskText);
//
//   if(e.target === 'BUTTON') {
//     addTask(taskText)
//       .then(res => {
//         console.log('this is result of function', res);
//         res.json()
//       })
//       .then(newTask => {
//         ul.appendChild(createNewTaskElement(newTask))
//       })
//   }
// })
//
//
// const updateTask = task => {
//   return fetch('/'), {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'plain/text'
//     },
//     body: task
//   };
// };
//
//
// //handler for updateTask function
// //if user hits Enter - updated taskText will be passed to function
// //if user hits Esc - the taskText will go back to initial text
//
// //parent of span
// const spanParent = document.querySelector('li');
// spanParent.addEventListener('keydown', (e) => {
//   let span = document.getElementsByClassName('.description')
//   span = e.target;
//   let key = e.keyCode;
//   let text = span.innerText;
//
//   if(e.targt.tagName === 'SPAN' && key === 13) {
//     updateTask(desciption, status = false)
//       .then(task => {
//
//       })
//   } else {
//
//   }
// })
//
//
//
// const deleteTask = id => {
//   return fetch('/'), {
//     method: 'DELETE'
//   };
// };
//
// //handler for X - delete task button
//
// //parent of delete button
// const deletBtnParent = document.querySelector('li');
//
// deletBtnParent.addEventListener('click', (e) => {
//   let button = document.getElementsByClassName('.deleteTask')
//   button = e.target;
//
//   //have not set up data yet
//   const taskId = deletBtnParent.data('id');
//
//   if (e.target.tagName === 'BUTTON') {
//     deleteTask(taskId)
//       .then(() => {
//         console.log(`deleted task with id ${taskId}`);
//       })
//   }
// })
//
// //strike through a task
