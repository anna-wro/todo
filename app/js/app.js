var incomplete = $("#incomplete-tasks");
$("#js-save").click(function () {
  var editedContent = incomplete.html();
  localStorage.incompleteContent = editedContent;
});
var completed = $("#completed-tasks");
$("#js-save").click(function () {
  var editedContent2 = completed.html();
  localStorage.completedContent = editedContent2;
});
if (localStorage.getItem("incompleteContent")) {
  incomplete.html(localStorage.getItem("incompleteContent"));
};
if (localStorage.getItem("completedContent")) {
  completed.html(localStorage.getItem("completedContent"));
};


var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("js-add");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var iconEdit = document.createElement("i");
  var iconDelete = document.createElement("i");
  var deleteButton = document.createElement("button");
  checkBox.type = "checkbox";
  editInput.type = "text";
  label.innerText = taskString;
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  iconDelete.className = "material-icons";
  iconDelete.innerText = "delete";
  deleteButton.className = "delete";
  deleteButton.appendChild(iconDelete);
  listItem.appendChild(deleteButton);
  iconEdit.className = "material-icons";
  iconEdit.innerText = "mode_edit";
  editButton.className = "edit";
  editButton.appendChild(iconEdit);
  listItem.appendChild(editButton);
  return listItem;
};
// Adding new tasks
taskInput.addEventListener('keydown', function (event) {
  if (event.which === 13) //enter
  {
    addTask();
  }
});
var addTask = function () {
  console.log("Task added");
  if (taskInput.value !== "" && taskInput.value !== " ") {
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    incompleteTasksHolder.classList.toggle("show");
    taskInput.value = "";
  } else {
    console.log("No task was appended");
  }
};
var editTask = function () {
  console.log("Task edited");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var checkBox = listItem.querySelector("input[type=checkbox]");
  var iconEdit = listItem.getElementsByTagName("i")[1];
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
    iconEdit.innerText = "mode_edit";
    checkBox.disabled = false;
  } else {
    editInput.value = label.innerText;
    iconEdit.innerText = "playlist_add_check";
    checkBox.disabled = true;
  };
  editInput.addEventListener('keyup', function (event) {
    if (event.which === 13) //enter
    {
      label.innerText = editInput.value;
      iconEdit.innerText = "mode_edit";
      checkBox.disabled = false;
      listItem.classList.toggle("editMode");
    }
  });
  listItem.classList.toggle("editMode");
};

var confirmDialogue = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var body = document.body;
  var noButton = document.createElement('button');
  var yesButton = document.createElement('button');
  var divContainer = document.createElement('div');
  var alertContainer = document.createElement('div');
  alertContainer.className = 'alert';
  noButton.innerText = 'No';
  noButton.setAttribute('class', 'noButton');
  yesButton.setAttribute('class', 'yesButton');
  yesButton.innerText = 'Yes';
  alertContainer.innerHTML = '<p>Delete this item?</p>';
  alertContainer.appendChild(noButton);
  alertContainer.appendChild(yesButton);
  divContainer.setAttribute('id', 'overlay');
  divContainer.appendChild(alertContainer);
  body.appendChild(divContainer);

  yesButton.addEventListener('click', function () {
    deleteTask(ul, listItem, divContainer, body);
  });

  noButton.addEventListener('click', function () {
    body.removeChild(divContainer);
    return;
  });
}

var deleteTask = function (ul, listItem, divContainer, body) {
  console.log('Task deleted');
  ul.removeChild(listItem);
  body.removeChild(divContainer);
}
var taskCompleted = function () {
  console.log("Task completed");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}
var taskIncomplete = function () {
  console.log("Task incomplete");
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
  bindTaskEvents(listItem, taskCompleted);
}
var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = confirmDialogue;
  checkBox.onchange = checkBoxEventHandler;
}
//
addButton.addEventListener("click", addTask);
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
//Accordion
var accordion = document.getElementsByClassName("expand");
incompleteTasksHolder.previousElementSibling.onclick = function () {
  var isHidden = incompleteTasksHolder.classList.contains("hide");
  if (isHidden) {
    accordion[1].innerText = "expand_less";
  } else {
    accordion[1].innerText = "expand_more";
  };
  incompleteTasksHolder.classList.toggle("hide");
};
completedTasksHolder.previousElementSibling.onclick = function () {
  var isHidden = completedTasksHolder.classList.contains("hide");
  if (isHidden) {
    accordion[2].innerText = "expand_less";
  } else {
    accordion[2].innerText = "expand_more";
  };
  completedTasksHolder.classList.toggle("hide");
};
var firstLabel = document.querySelector("[for='new-task']");
firstLabel.onclick = function () {
  var isHidden = addButton.classList.contains("hide");
  if (isHidden) {
    accordion[0].innerText = "expand_less";
  } else {
    accordion[0].innerText = "expand_more";
  };
  addButton.classList.toggle("hide");
  taskInput.classList.toggle("hide");
};
//
$("#completed-tasks :checkbox").attr('checked', true);
$("#incomplete-tasks :checkbox").attr('checked', false);
