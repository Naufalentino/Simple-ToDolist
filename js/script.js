console.log("Script loaded successfully");

const STORAGE_KEY = "todoList";

// Load tasks from localStorage on page load
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const container = document.getElementById("dataTab");
    container.innerHTML = "";
    
    if (tasks.length === 0) {
        showEmptyMessage();
    } else {
        tasks.forEach((task, index) => {
            renderTask(task, index);
        });
    }
}

// Clear tasks from localStorage
function clearTasks() {
    localStorage.removeItem(STORAGE_KEY);
    loadTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const container = document.getElementById("dataTab");
    const taskRows = container.querySelectorAll(".task-row");
    const tasks = [];
    
    taskRows.forEach((row) => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        tasks.push({
            id: Date.now() + Math.random(),
            todo: row.children[3].textContent,
            date: row.children[1].textContent,
            completed: checkbox.checked
        });
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Render a single task
function renderTask(task, index) {
    const container = document.getElementById("dataTab");
    
    const newTaskDiv = document.createElement("div");
    newTaskDiv.className = "task-row";
    newTaskDiv.dataset.taskId = task.id;
    
    // Number
    const numDiv = document.createElement("div");
    numDiv.className = "boxx1";
    numDiv.textContent = index + 1;
    newTaskDiv.appendChild(numDiv);
    
    // Date
    const tglDiv = document.createElement("div");
    tglDiv.className = "boxx1";
    tglDiv.textContent = task.date;
    newTaskDiv.appendChild(tglDiv);
    
    // Checkbox for status
    const statusDiv = document.createElement("div");
    statusDiv.className = "check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = function() {
        saveTasks();
        applyFilter();
    };
    statusDiv.appendChild(checkbox);
    newTaskDiv.appendChild(statusDiv);
    
    // Todo text
    const todoDiv = document.createElement("div");
    todoDiv.className = "boxx1";
    todoDiv.textContent = task.todo;
    newTaskDiv.appendChild(todoDiv);
    
    // Actions
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "boxx1";
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.onclick = function() {
        deleteTask(task.id);
    };
    actionsDiv.appendChild(delBtn);
    newTaskDiv.appendChild(actionsDiv);
    
    container.appendChild(newTaskDiv);
}

// Delete task
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    
    if (tasks.length === 0) {
        showEmptyMessage();
    } else {
        loadTasks();
    }
}

// Show empty message
function showEmptyMessage() {
    const container = document.getElementById("dataTab");
    container.innerHTML = "";
    const emptyRow = document.createElement("div");
    emptyRow.id = "empty-Row";
    const emptySpan = document.createElement("span");
    emptySpan.className = "empty-message";
    emptySpan.textContent = "Belum ada list kegiatan";
    emptyRow.appendChild(emptySpan);
    container.appendChild(emptyRow);
}

// Filter tasks based on checkbox status
function filterTasks() {
    const filterButton = document.querySelector(".tim");
    
    // Toggle filter state
    filterButton.dataset.filtered = filterButton.dataset.filtered === "true" ? "false" : "true";
    
    // Update button text
    filterButton.textContent = filterButton.dataset.filtered === "true" ? "SHOW ALL" : "FILTER";
    
    applyFilter();
}

// Apply filter logic
function applyFilter() {
    const filterButton = document.querySelector(".tim");
    const container = document.getElementById("dataTab");
    const taskRows = container.querySelectorAll(".task-row");
    
    taskRows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (filterButton.dataset.filtered === "true") {
            // When filtering, show only checked items
            row.style.display = checkbox.checked ? "" : "none";
        } else {
            // Show all items when filter is off
            row.style.display = "";
        }
    });
}

// Add new task
function nambah() {
    console.log("fungsi berhasil");
    
    const tod = document.getElementById("t1").value;
    const tgl = document.getElementById("t2").value;
    
    if (!tod || !tgl) {
        alert("Mohon isi semua form yang tersedia!");
        return;
    }
    
    // Get existing tasks
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    // Create new task object
    const newTask = {
        id: Date.now(),
        todo: tod,
        date: tgl,
        completed: false
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    
    // Reload tasks
    loadTasks();
    
    // Clear form
    document.getElementById("inputForm").reset();
}

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);
