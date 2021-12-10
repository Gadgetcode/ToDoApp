//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filtertodo');

//eventListener
document.addEventListener("DOMContentLoaded" ,Gettodos);
todoButton.addEventListener("click" ,addtodo);
todoList.addEventListener('click' , deleteCheck);
// filteroption.addEventListener("click" ,todoFilter);

//functions

function addtodo (event){
    event.preventDefault();
    //ToDo
    // console.log("clicked")
    //todo div

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    // if value is empty string break
    let text = todoInput.value;
    if(text === ""){
      return
    }
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add to local storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completebutton  = document.createElement('button');
    completebutton.innerHTML = '<i class="fas fa-check-square"></i>';
    completebutton.classList.add("complete-btn");
    todoDiv.appendChild(completebutton);
    //check trashbutton
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashbutton.classList.add('trash-btn');
    // to- append to the list
    todoDiv.appendChild(trashbutton);
    //add to div
    todoList.appendChild(todoDiv);
    todoInput.value = "";
};

function deleteCheck(e){
  const item = e.target;

  //delete button 
  if(item.classList[0] === "trash-btn"){
      const todo = item.parentElement;
      //animation
      todo.classList.add('fall');
      todo.remove();
      removeLocalTodos(todo);
      // todo.addEventListener("transistionend" , function(){
      //   todo.remove();
      // });      
}
    //checked
  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }  
}


function todoFilter(e){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        case "uncompleted":
          if(todo.classList.contains('completed')){
            todo.style.display = "none";
          }else{
            todo.style.display = "flex";
          }
    }
  });
}



function saveLocalTodos(todo){
  //CHECK---HEY Do I already have thing in there
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function Gettodos(){
  console.log("working")
  //CHECK---HEY Do I already have thing in there
  let todos;  
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    // if value is empty string break
    // let text = todo;
    // if(text === ""){
    //   return
    // }
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add to local storage
    // saveLocalTodos(todoInput.value);
    //check mark button
    const completebutton  = document.createElement('button');
    completebutton.innerHTML = '<i class="fas fa-check-square"></i>';
    completebutton.classList.add("complete-btn");
    todoDiv.appendChild(completebutton);
    //check trashbutton
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashbutton.classList.add('trash-btn');
    // to- append to the list
    todoDiv.appendChild(trashbutton);
    //add to div
    todoList.appendChild(todoDiv);
  });
} 


function removeLocalTodos(todo){

  let todos;  
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos",JSON.stringify(todos));
}

