const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const clearButton = document.querySelector("#clear-todos");
const cardBody = document.querySelector(".card-body");
eventListener();

function eventListener(){//tüm event listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    clearButton.addEventListener("click",clearAllTodos);
    cardBody.addEventListener("click",deleteTodo);

}



function clearAllTodos(e){
   
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
      //Arayüzden todoları temizleme
      todoList.innerHTML = "";
      localStorage.removeItem("todos");
     }
 
 
 
 
 }
 function deleteTodo(e){
    // console.log(e.target);//target nereye basıldığını veriyor
 
    if(e.target.className === "fa fa-trash delete"){//sadece bu butona tıklanmışsa
         e.target.parentElement.parentElement.remove();//li elementini silmek istediğimiz için  parentElemente ulaştık
         deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
     }
 
 }
 function deleteTodoFromStorage(deletetodo){
     let todos = getTodosFromStorage();
 
     todos.forEach(function(todo,index){
         if(todo === deletetodo){
             todos.splice(index,1);
         }
     });
     localStorage.setItem("todos",JSON.stringify(todos));
 
 }
 function loadAllTodosToUI(){
    
     let todos = getTodosFromStorage();
     todos.forEach(function(todo){
         addTodoUI(todo);
     });

  
 
 }
 function addTodo(e){
     const newTodo = todoInput.value.trim();
    
         addTodoUI(newTodo);
         
         addTodoStorage(newTodo);
     e.preventDefault();
 }
 function  getTodosFromStorage(){//Storage'dan todoları alma
      let todos;
          if(localStorage.getItem("todos") === null){
              todos = [];
          }else{
              todos = JSON.parse(localStorage.getItem("todos"));
          }
          return todos;
 
 }
 function addTodoStorage(newTodo){
  
    let todos = getTodosFromStorage();
       todos.push(newTodo);
       localStorage.setItem("todos",JSON.stringify(todos));
 }
 function addTodoUI(newTodo){
 
     //list ıtem oluşturma               
     const listItem = document.createElement("li");
   
     //link oluşturma
     const link = document.createElement("a");
     link.href = "#";
     link.className = "delete-item";
     link.innerHTML = "<i class = 'fa fa-trash delete'></i>";
     
     listItem.className = "list-item";
    
     //text node ekleme
     if(newTodo != ""){
     listItem.appendChild(document.createTextNode(newTodo));
     listItem.appendChild(link);
     //todo liste list ıtemı ekleme
     todoList.appendChild(listItem);
     todoInput.value = "";
    }

 
 
 }