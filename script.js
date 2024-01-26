let todos = []
const form = document.querySelector('#form')


form.addEventListener("submit", (event) => {
    onSubmit(event)
});


 onSubmit = (event) => {
    event.preventDefault()
    let newTodoText = event.target[0].value.trim()
    let newAuthor = event.target[1].value.trim();
    
    
    if (newTodoText !== "") {
      const newTodo = {
        text: newTodoText,
        completed: false,
        author: newAuthor,
      }

      todos.push(newTodo)
      newTodoInput.value = ""
      author.value = ""
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

     // let timeStamp = new Date().getTime()

     const deleteButton = document.createElement("button")
     deleteButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`
     deleteButton.onclick = () => deleteTodo(index)

     const completeButton = document.createElement("button")
     completeButton.innerHTML = todo.completed
       ? `<span class="material-symbols-outlined">undo</span>`
       : `<span class="material-symbols-outlined">done</span>`
     completeButton.onclick = () => toggleComplete(index)

      const moveUpButton = document.createElement("button")
      moveUpButton.innerHTML = `<span class="material-symbols-outlined">arrow_upward</span>`
      moveUpButton.onclick = () => moveUp(index)

       const moveDownButton = document.createElement("button")
       moveDownButton.innerHTML = `<span class="material-symbols-outlined">arrow_downward</span>`
       moveDownButton.onclick = () => moveDown(index)

       const author = document.createElement('span')
       author.innerText = todo.author

    listItem.appendChild(moveUpButton)
    listItem.appendChild(moveDownButton)
    listItem.appendChild(completeButton)
    listItem.appendChild(deleteButton)
    listItem.appendChild(author)
    

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