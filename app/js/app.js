'use strict';

const labelAdd = document.getElementById('js-label-add');
const taskInput = document.getElementById('js-new-task');
const buttonAdd = document.getElementById('js-add-button');
const accordion = document.getElementsByClassName('expand');
const todoList = document.getElementById('js-incomplete-tasks');
const todoHeader = document.getElementById('js-todo');
const doneList = document.getElementById('js-completed-tasks');
const doneHeader = document.getElementById('js-completed');
const body = document.body;

// Adding new task
const addTask = () => {
  let taskName = taskInput.value;
  if (taskName !== '' && taskName !== ' ') {
    let newTask = createNewTask(taskName);
    todoList.appendChild(newTask);
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
  label.className = 'task__title';
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  iconDelete.className = 'material-icons icon__delete';
  iconDelete.innerText = 'delete';
  deleteButton.className = 'task__delete';
  deleteButton.appendChild(iconDelete);
  listItem.appendChild(deleteButton);
  iconEdit.className = 'material-icons icon__edit';
  iconEdit.innerText = 'mode_edit';
  editButton.className = 'task__edit';
  editButton.appendChild(iconEdit);
  listItem.appendChild(editButton);
  return listItem;
};

const moveToOtherList = (listItem, currentList) => {
  switch (currentList){
    case 'js-incomplete-tasks':
      doneList.appendChild(listItem);
      break;
    case 'js-completed-tasks':
      todoList.appendChild(listItem);
      break;
  }
};

const confirmDialogue = function (buttonClicked) {
  let listItem = buttonClicked.parentNode;
  let ul = listItem.parentNode;
  let noButton = document.createElement('button');
  let yesButton = document.createElement('button');
  let divContainer = document.createElement('div');
  let alertContainer = document.createElement('div');
  alertContainer.className = 'alert';
  noButton.textContent = 'No';
  noButton.setAttribute('class', 'noButton');
  yesButton.setAttribute('class', 'yesButton');
  yesButton.textContent = 'Yes';
  alertContainer.innerHTML = '<p>Delete this item?</p>';
  alertContainer.appendChild(noButton);
  alertContainer.appendChild(yesButton);
  divContainer.setAttribute('id', 'overlay');
  divContainer.appendChild(alertContainer);
  body.appendChild(divContainer);

  yesButton.addEventListener('click', function () {
    deleteTask(ul, listItem, divContainer);
  });

  noButton.addEventListener('click', function () {
    body.removeChild(divContainer);
  });
};

const deleteTask = function (ul, listItem, divContainer,) {
  ul.removeChild(listItem);
  body.removeChild(divContainer);
};

// Add event listeners to edit/delete buttons

const whatToDo = (e) => {
  if (e.target.classList.contains('icon__edit') || e.target.classList.contains('task__title')) {
    editTask();
  } else if (e.target.classList.contains('icon__delete')) {
    let buttonClicked = e.target.parentNode;
    confirmDialogue(buttonClicked);
  } else if (e.target.type === 'checkbox') {
    let listItem = e.target.parentNode;
    let currentList = listItem.parentNode.id;
    moveToOtherList(listItem, currentList);
  }
};

todoList.addEventListener('click', whatToDo);
doneList.addEventListener('click', whatToDo);

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

// Add new task - listeners
taskInput.addEventListener('keydown', function (e) {
  if (e.which === 13) //enter
  {
    addTask();
  }
});
buttonAdd.addEventListener('click', addTask);

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
// $('#completed-tasks :checkbox').attr('checked', true);
// $('#incomplete-tasks :checkbox').attr('checked', false);
