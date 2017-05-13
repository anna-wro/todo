'use strict';

const labelAdd = document.getElementById('js-label-add');
const taskInput = document.getElementById('js-new-task');
const buttonAdd = document.getElementById('js-add-button');
const accordion = document.getElementsByClassName('expand');
const todoList = document.getElementById('js-incomplete-tasks');
const todoHeader = document.getElementById('js-todo');
const doneList = document.getElementById('js-completed-tasks');
const doneHeader = document.getElementById('js-completed');

const addTask = () => {
  let taskName = taskInput.value;
  if (taskName !== '' && taskName !== ' ') {
    let newTask = createNewTask(taskName);
    todoList.appendChild(newTask);
    // bindTaskEvents(listItem, taskCompleted);
    todoList.classList.toggle('show');
    taskInput.value = '';
  }
};

const createNewTask = (taskTitle) => {
  let listItem = document.createElement('li');
  let checkBox = document.createElement('input');
  let label = document.createElement('label');
  let editInput = document.createElement('input');
  let editButton = document.createElement('button');
  let iconEdit = document.createElement('i');
  let iconDelete = document.createElement('i');
  let deleteButton = document.createElement('button');
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  label.textContent = taskTitle;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  iconDelete.className = 'material-icons';
  iconDelete.innerText = 'delete';
  deleteButton.className = 'task__delete';
  deleteButton.appendChild(iconDelete);
  listItem.appendChild(deleteButton);
  iconEdit.className = 'material-icons';
  iconEdit.innerText = 'mode_edit';
  editButton.className = 'task__edit';
  editButton.appendChild(iconEdit);
  listItem.appendChild(editButton);
  return listItem;
};

// Accordion
todoHeader.addEventListener('click', () => {
  let isHidden = todoList.classList.contains('hide');
  if (isHidden) {
    accordion[1].innerText = 'expand_less';
  } else {
    accordion[1].innerText = 'expand_more';
  }

  todoList.classList.toggle('hide');
});

doneHeader.addEventListener('click', () => {
  let isHidden = doneList.classList.contains('hide');
  if (isHidden) {
    accordion[2].innerText = 'expand_less';
  } else {
    accordion[2].innerText = 'expand_more';
  }

  doneList.classList.toggle('hide');
});

labelAdd.addEventListener('click', () => {
  let isHidden = buttonAdd.classList.contains('hide');
  if (isHidden) {
    accordion[0].innerText = 'expand_less';
  } else {
    accordion[0].innerText = 'expand_more';
  }
  buttonAdd.classList.toggle('hide');
  taskInput.classList.toggle('hide');
});

buttonAdd.addEventListener('click', addTask);


//
// var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
//   let checkBox = taskListItem.querySelector('input[type=checkbox]');
//   let editButton = taskListItem.querySelector('button.edit');
//   let deleteButton = taskListItem.querySelector('button.delete');
//   editButton.onclick = editTask;
//   deleteButton.onclick = confirmDialogue;
//   checkBox.onchange = checkBoxEventHandler;
// };

// Local storage
// var incomplete = $('#incomplete-tasks');
// $('#js-save').click(function () {
//   var editedContent = incomplete.html();
//   localStorage.incompleteContent = editedContent;
// });
// var completed = $('#completed-tasks');
// $('#js-save').click(function () {
//   var editedContent2 = completed.html();
//   localStorage.completedContent = editedContent2;
// });
// if (localStorage.getItem('incompleteContent')) {
//   incomplete.html(localStorage.getItem('incompleteContent'));
// }
//
// if (localStorage.getItem('completedContent')) {
//   completed.html(localStorage.getItem('completedContent'));
// }
//
// var taskInput = document.getElementById('new-task');
// var addButton = document.getElementById('js-add');

// // Adding new tasks
// taskInput.addEventListener('keydown', function (event) {
//   if (event.which === 13) //enter
//   {
//     addTask();
//   }
// });

// var editTask = function () {
//   console.log('Task edited');
//   var listItem = this.parentNode;
//   var editInput = listItem.querySelector('input[type=text]');
//   var checkBox = listItem.querySelector('input[type=checkbox]');
//   var iconEdit = listItem.getElementsByTagName('i')[1];
//   var label = listItem.querySelector('label');
//   var containsClass = listItem.classList.contains('editMode');
//   if (containsClass) {
//     label.innerText = editInput.value;
//     iconEdit.innerText = 'mode_edit';
//     checkBox.disabled = false;
//   } else {
//     editInput.value = label.innerText;
//     iconEdit.innerText = 'playlist_add_check';
//     checkBox.disabled = true;
//   }
//
//   editInput.addEventListener('keyup', function (event) {
//     if (event.which === 13) //enter
//     {
//       label.innerText = editInput.value;
//       iconEdit.innerText = 'mode_edit';
//       checkBox.disabled = false;
//       listItem.classList.toggle('editMode');
//     }
//   });
//   listItem.classList.toggle('editMode');
// };
//
// var confirmDialogue = function () {
//   var listItem = this.parentNode;
//   var ul = listItem.parentNode;
//   var body = document.body;
//   var noButton = document.createElement('button');
//   var yesButton = document.createElement('button');
//   var divContainer = document.createElement('div');
//   var alertContainer = document.createElement('div');
//   alertContainer.className = 'alert';
//   noButton.innerText = 'No';
//   noButton.setAttribute('class', 'noButton');
//   yesButton.setAttribute('class', 'yesButton');
//   yesButton.innerText = 'Yes';
//   alertContainer.innerHTML = '<p>Delete this item?</p>';
//   alertContainer.appendChild(noButton);
//   alertContainer.appendChild(yesButton);
//   divContainer.setAttribute('id', 'overlay');
//   divContainer.appendChild(alertContainer);
//   body.appendChild(divContainer);
//
//   yesButton.addEventListener('click', function () {
//     deleteTask(ul, listItem, divContainer, body);
//   });
//
//   noButton.addEventListener('click', function () {
//     body.removeChild(divContainer);
//     return;
//   });
// };
//
// var deleteTask = function (ul, listItem, divContainer, body) {
//   console.log('Task deleted');
//   ul.removeChild(listItem);
//   body.removeChild(divContainer);
// };
// var taskCompleted = function () {
//   var listItem = this.parentNode;
//   completedTasksHolder.appendChild(listItem);
//   bindTaskEvents(listItem, taskIncomplete);
// };
// var taskIncomplete = function () {
//   var listItem = this.parentNode;
//   incompleteTasksHolder.appendChild(listItem);
//   bindTaskEvents(listItem, taskIncomplete);
//   bindTaskEvents(listItem, taskCompleted);
// };
//
// //
// for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
//   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
// }
// for (var i = 0; i < completedTasksHolder.children.length; i++) {
//   bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
// }

// $('#completed-tasks :checkbox').attr('checked', true);
// $('#incomplete-tasks :checkbox').attr('checked', false);
