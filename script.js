let todos = [];
const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  onSubmit(event);
});

onSubmit = (event) => {
  event.preventDefault();
  let newTodoText = event.target[0].value.trim();
  let newAuthor = event.target[1].value.trim();
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
    const listItem = document.createElement("li");
    // listItem.textContent = todo.text;

    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    listItem.appendChild(todoText);
    todoText.setAttribute("id", "todo-text");

    if (todo.completed) {
      listItem.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    deleteButton.setAttribute("id", "delete");
    deleteButton.onclick = () => deleteTodo(index);

    const completeButton = document.createElement("button");
    completeButton.innerHTML = todo.completed
      ? `<span class="material-symbols-outlined">undo</span>`
      : `<span class="material-symbols-outlined">done</span>`;
    completeButton.setAttribute("id", "complete");
    completeButton.onclick = () => toggleComplete(index);

    const moveUpButton = document.createElement("button");
    moveUpButton.innerHTML = `<span class="material-symbols-outlined">arrow_upward</span>`;
    moveUpButton.setAttribute("id", "move-up");
    moveUpButton.onclick = () => moveUp(index);

    const moveDownButton = document.createElement("button");
    moveDownButton.innerHTML = `<span class="material-symbols-outlined">arrow_downward</span>`;
    moveDownButton.setAttribute("id", "move-down");
    moveDownButton.onclick = () => moveDown(index);

    const editButton = document.createElement("button");
    editButton.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
    editButton.setAttribute("id", "edit");
    editButton.onclick = () => sortArray();

    const author = document.createElement("span");
    author.setAttribute("id", "author");
    author.innerText = `Author: ${todo.author}`;

    const timeStamp = document.createElement("span");
    timeStamp.setAttribute("id", "time-stamp");
    timeStamp.innerText = `Created: ${todo.time}`;

    listItem.appendChild(moveUpButton);
    listItem.appendChild(moveDownButton);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.appendChild(author);
    listItem.appendChild(timeStamp);

    todoList.appendChild(listItem);
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
