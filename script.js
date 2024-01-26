let todos = [];
const form = document.querySelector("#form");
let listItem;

form.addEventListener("submit", (event) => {
  onSubmit(event);
});

onSubmit = (event) => {
  event.preventDefault();
  const newTodoText = event.target[0].value.trim();
  const newAuthor = event.target[1].value.trim();
  let timeStamp = getTimeStamp();

  if (newTodoText !== "") {
    const newTodo = {
      text: newTodoText,
      completed: false,
      author: newAuthor,
      time: timeStamp,
    };

    todos.push(newTodo);
    newTodoInput.value = "";
    author.value = "";
    renderTodos();
  }
};

function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    let newListItem = createTodoListItem(todo, index);

    if (todo.completed) {
      newListItem.classList.add("completed");
    }

    todoList.appendChild(newListItem);
    addEventListeners(index);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function moveUp(index) {
  if (index > 0) {
    // Check if the todo is not already at the top
    const temp = todos[index];
    todos[index] = todos[index - 1];
    todos[index - 1] = temp;
    renderTodos();
  }
}

function moveDown(index) {
  // Check if the todo is not already at the bottom
  if (index < todos.length - 1) {
    const temp = todos[index];
    todos[index] = todos[index + 1];
    todos[index + 1] = temp;
  }

  renderTodos();
}

function editTodo(index) {
  let newText = window.prompt(
    "Please enter a new text for the todo",
    `${todos[index].text}`
  );
  todos[index].text = newText;
  renderTodos();
}

function getTimeStamp() {
  let time = new Date().toISOString().split("T")[0];
  return time;
}

function sortArrayByAuthor () {

    function compare(a, b) {
      if (a.author < b.author) {
        return -1;
      }
      if (a.author > b.author) {
        return 1;
      }
      return 0;
    }

    let sortedArray = todos.sort(compare);

    todos = sortedArray
    renderTodos();
}

function sortArrayByDate() {
  function compare(a, b) {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  }

  let sortedArray = todos.sort(compare);

  todos = sortedArray;
  renderTodos();
}


function createTodoListItem(todo, index) {
  let listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  listItem.innerHTML = `
    <span class="todo-text" id="todo-text-${index}">${todo.text}</span>
    <button id="delete-${index}" class="delete-btn"><span class="material-symbols-outlined">delete</span></button>
    <button id="complete-${index}" class="complete-btn"><span class="material-symbols-outlined">${
    todo.completed ? "undo" : "done"
  }</span></button>
    <button id="move-up-${index}" class="move-up-btn"><span class="material-symbols-outlined">arrow_upward</span></button>
    <button id="move-down-${index}" class="move-down-btn"><span class="material-symbols-outlined">arrow_downward</span></button>
    <button id="edit-${index}" class="edit-btn"><span class="material-symbols-outlined">edit</span></button>
    <span id="author-${index}" class="author">Author: ${todo.author}</span>
    <span id="time-stamp-${index}" class="time-stamp">Created: ${
    todo.time
  }</span>
  `;

  return listItem;
}



 function addEventListeners(index) {
   let deleteButton = document.getElementById(`delete-${index}`);
   deleteButton.onclick = () => deleteTodo(index);

   let completeButton = document.getElementById(`complete-${index}`);
   completeButton.onclick = () => toggleComplete(index);

   let moveUpButton = document.getElementById(`move-up-${index}`);
   moveUpButton.onclick = () => moveUp(index);

   let moveDownButton = document.getElementById(`move-down-${index}`);
   moveDownButton.onclick = () => moveDown(index);

   let editButton = document.getElementById(`edit-${index}`);
   editButton.onclick = () => editTodo(index);
 }



