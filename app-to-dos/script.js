var todos = [];

function saveToDos(){
    localStorage.setItem("app-todos",JSON.stringify(todos));
}

function clearAll(){
    localStorage.removeItem("app-todos");
    todos = [];
    loadToDos();
}

var clear = document.querySelector("#clear-all");
clear.onclick = clearAll;

function add(){
    var newToDo = document.querySelector("#new-todo");
    
    if(newToDo.value === ""){
        alert("Add a task");
        return false;
    }

    todos.push({
        id: "todo"+todos.length,
        text: newToDo.value,
        status: "new"
    });
    newToDo.value = "";

    saveToDos();
    loadToDos();
    
}

var addButton = document.querySelector("#add");
addButton.onclick = add;

function loadToDos(){
    var ul = document.querySelector("#todos");
    ul.innerHTML = "";

    var saved = localStorage.getItem("app-todos");
    if(saved){
        todos = JSON.parse(saved);
    }

    for(var i = 0; i<todos.length; i++){
        var li = document.createElement("li");
        li.id = todos[i].id;
        li.className = todos[i].status === "done" ? "done" : "new";
        li.innerHTML = todos[i].text;

        if(todos[i].status !== "done"){
            var button = document.createElement("button");
            button.id = "btn-todo"+i;
            button.innerText = "";
            li.appendChild(button);
        }
        
        ul.appendChild(li);
    }
}

document.addEventListener("click", toDoDone);

function toDoDone(event){
    var id = event.target.id;
    if(id.match(/btn-todo/)){
        var idLi = id.split("-")[1];
        var li = document.querySelector("#"+idLi);
        li.className = "done";

        for(todo of todos){
            if(todo.id === idLi){
                todo.status = "done";
                break;
            }
        }
        
        event.target.style.display = "none";
        saveToDos();
    }
}

loadToDos();

var input = document.querySelector("#new-todo");
input.onkeydown = function(event){
    if(event.keyCode === 13){
        add();
    }
}