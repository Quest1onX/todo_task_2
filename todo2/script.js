let tasks = [];

let form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let taskName = document.querySelector('#task-name').value;
    let date = document.querySelector('#date').value;
    let priority = document.querySelector('#priority').value;
    let task = {name: taskName, date: date, priority: priority, completed: false};
    tasks.push(task);
    displayTasks();
    form.reset();


    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "getData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name=" + taskName + "&date=" + date + "&priority=" + priority);
});

let taskList = document.querySelector('#task-list');

function displayTasks() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        if (new Date(tasks[i].date) >= new Date()) {
            let taskElement = document.createElement('div');
            taskElement.innerHTML = `
                <h3>${tasks[i].name}</h3>
                <p>Date: ${tasks[i].date}</p>
                <p>Priority: ${tasks[i].priority}</p>
                ${tasks[i].completed ? '<p>Completed</p>' : '<button onclick="completeTask(' + i + ')">Complete</button>'}
                <button onclick="editTask(${i})">Edit</button>
                <button onclick="deleteTask(${i})">Delete</button>
            `;
            taskElement.style.backgroundColor = tasks[i].completed ? '#68fd5563' : '#ffffff';
            taskList.appendChild(taskElement);
        }
    }
}

function completeTask(index) {
    tasks[index].completed = true;
    displayTasks();
}

function editTask(index) {
    let task = tasks[index];
    document.querySelector('#task-name').value = task.name;
    document.querySelector('#date').value = task.date;
    document.querySelector('#priority').value = task.priority;
    tasks.splice(index, 1);
    displayTasks();
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        displayTasks();
    }
}
displayTasks();