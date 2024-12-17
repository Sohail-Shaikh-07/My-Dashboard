document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('taskForm').addEventListener('submit', addTask);
    document.getElementById('filterAll').addEventListener('click', () => filterTasks('all'));
    document.getElementById('filterPending').addEventListener('click', () => filterTasks('pending'));
    document.getElementById('filterCompleted').addEventListener('click', () => filterTasks('completed'));
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });
    updateTaskSummary();
}

function addTask(e) {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;
    const task = { title, description, deadline, priority, completed: false };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    e.target.reset();
}

function createTaskElement(task, index) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-card');
    taskElement.innerHTML = `
        <div class="task-info">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Priority: ${task.priority}</p>
        </div>
        <div class="task-actions">
            <button onclick="toggleTaskCompletion(${index})">
                <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
            </button>
            <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
            <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
        </div>
    `;
    taskElement.classList.add(`priority-${task.priority}`);
    if (task.completed) {
        taskElement.classList.add('completed');
    }
    return taskElement;
}

function toggleTaskCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskPriority').value = task.priority;
    deleteTask(index);
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function filterTasks(filter) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = filter === 'all' ? tasks :
        tasks.filter(task => filter === 'completed' ? task.completed : !task.completed);
    
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });


    document.querySelectorAll('.task-filters button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`).classList.add('active');
}

function updateTaskSummary() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
}

