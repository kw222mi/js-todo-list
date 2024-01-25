let todos = []
const form = document.querySelector('#form')


form.addEventListener("submit", (event) => {
    onSubmit(event)
});


 onSubmit = (event) => {
    event.preventDefault()
    let newTodoText = event.target[0].value.trim()
    
    if (newTodoText !== "") {
      const newTodo = {
        text: newTodoText,
        completed: false,
      }

      todos.push(newTodo)
      newTodoInput.value = ""
      renderTodos()
    }
} 

 function renderTodos() {
   const todoList = document.getElementById("todoList")
   todoList.innerHTML = ""

   todos.forEach((todo, index) => {
     const listItem = document.createElement("li")
     listItem.textContent = todo.text;

     if (todo.completed) {
       listItem.classList.add("completed")
     }

     const deleteButton = document.createElement("button")
     deleteButton.textContent = "Delete"
     deleteButton.onclick = () => deleteTodo(index)

     const completeButton = document.createElement("button")
     completeButton.textContent = todo.completed ? "Undo" : "Complete"
     completeButton.onclick = () => toggleComplete(index)

      const moveUpButton = document.createElement("button")
      moveUpButton.textContent = "Move Uo"
      moveUpButton.onclick = () => moveUp(index)

       const moveDownButton = document.createElement("button")
       moveDownButton.textContent = "Move Down"
       moveDownButton.onclick = () => moveDown(index)

     listItem.appendChild(deleteButton)
     listItem.appendChild(completeButton)
     listItem.appendChild(moveUpButton)
     listItem.appendChild(moveDownButton)

     todoList.appendChild(listItem)
   })
 }

 function deleteTodo(index) {
   todos.splice(index, 1)
   renderTodos()
 }

 function toggleComplete(index) {
   todos[index].completed = !todos[index].completed
   renderTodos()
 }

  function moveUp(index) {
    if (index > 0) {
      // Check if the todo is not already at the top
      const temp = todos[index]
      todos[index] = todos[index - 1]
      todos[index - 1] = temp
      renderTodos()
    }
  }

   function moveDown(index) {
     // Check if the todo is not already at the bottom
     if (index < todos.length - 1) {
        const temp = todos[index]
        todos[index] = todos[index + 1]
        todos[index + 1] = temp
     }
     
     renderTodos();
   }