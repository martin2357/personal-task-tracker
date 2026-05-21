const API_BASE_URL = "http://127.0.0.1:8000";

const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const tasksList = document.getElementById("tasks-list");
const messageBox = document.getElementById("message");

taskForm.addEventListener("submit", createTask);
window.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`);

        if (!response.ok) {
            throw new Error("Could not load tasks.");
        }

        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        showMessage(error.message, true);
    }
}

async function createTask(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priority = priorityInput.value;

    if (!title) {
        showMessage("Please enter a task title.", true);
        return;
    }

    const taskData = {
        title: title,
        description: description || null,
        priority: priority,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error("Could not create the task.");
        }

        taskForm.reset();
        priorityInput.value = "medium";
        showMessage("Task created.");
        await loadTasks();
    } catch (error) {
        showMessage(error.message, true);
    }
}

async function toggleTaskDone(task) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                is_done: !task.is_done,
            }),
        });

        if (!response.ok) {
            throw new Error("Could not update the task.");
        }

        showMessage("Task updated.");
        await loadTasks();
    } catch (error) {
        showMessage(error.message, true);
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Could not delete the task.");
        }

        showMessage("Task deleted.");
        await loadTasks();
    } catch (error) {
        showMessage(error.message, true);
    }
}

function showMessage(message, isError = false) {
    messageBox.textContent = message;
    messageBox.classList.toggle("error", isError);
}

function renderTasks(tasks) {
    tasksList.innerHTML = "";

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-state";
        emptyMessage.textContent = "No tasks yet.";
        tasksList.appendChild(emptyMessage);
        return;
    }

    tasks.forEach((task) => {
        const taskCard = document.createElement("article");
        taskCard.className = "task-card";

        if (task.is_done) {
            taskCard.classList.add("completed");
        }

        const header = document.createElement("div");
        header.className = "task-header";

        const title = document.createElement("h3");
        title.className = "task-title";
        title.textContent = task.title;

        const state = document.createElement("strong");
        state.textContent = task.is_done ? "Done" : "Not done";

        header.appendChild(title);
        header.appendChild(state);
        taskCard.appendChild(header);

        if (task.description) {
            const description = document.createElement("p");
            description.className = "task-description";
            description.textContent = task.description;
            taskCard.appendChild(description);
        }

        const meta = document.createElement("div");
        meta.className = "task-meta";
        meta.appendChild(createMetaItem(`Priority: ${task.priority}`));
        meta.appendChild(createMetaItem(`Created: ${formatDate(task.created_at)}`));
        taskCard.appendChild(meta);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.textContent = task.is_done ? "Mark not done" : "Mark done";
        toggleButton.addEventListener("click", () => toggleTaskDone(task));

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        actions.appendChild(toggleButton);
        actions.appendChild(deleteButton);
        taskCard.appendChild(actions);

        tasksList.appendChild(taskCard);
    });
}

function createMetaItem(text) {
    const item = document.createElement("span");
    item.textContent = text;
    return item;
}

function formatDate(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString();
}
