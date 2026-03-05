let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

const title = document.getElementById("taskTitle").value;
const desc = document.getElementById("taskDesc").value;

if(title === "") return alert("Enter task title");

const task = {
id: Date.now(),
title,
desc,
status:"todo"
};

tasks.push(task);
saveTasks();
renderTasks();

document.getElementById("taskTitle").value="";
document.getElementById("taskDesc").value="";
}

function renderTasks(){

document.getElementById("todo").innerHTML="<h2>Todo</h2>";
document.getElementById("inprogress").innerHTML="<h2>In Progress</h2>";
document.getElementById("done").innerHTML="<h2>Done</h2>";

tasks.forEach(task => {

const card = document.createElement("div");
card.className="task";
card.draggable=true;
card.id=task.id;

card.ondragstart=drag;

card.innerHTML=
`
<strong>${task.title}</strong><br>
${task.desc}<br>

<button onclick="editTask(${task.id})">Edit</button>
<button onclick="deleteTask(${task.id})">Delete</button>
`;

document.getElementById(task.status).appendChild(card);

});

}

function deleteTask(id){

tasks = tasks.filter(t => t.id !== id);
saveTasks();
renderTasks();

}

function editTask(id){

const task = tasks.find(t => t.id === id);

const newTitle = prompt("Edit Title", task.title);
const newDesc = prompt("Edit Description", task.desc);

if(newTitle){
task.title = newTitle;
task.desc = newDesc;
}

saveTasks();
renderTasks();

}

function allowDrop(ev){
ev.preventDefault();
}

function drag(ev){
ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev){

ev.preventDefault();
const id = ev.dataTransfer.getData("text");

const task = tasks.find(t => t.id == id);

task.status = ev.currentTarget.id;

saveTasks();
renderTasks();

}

renderTasks();