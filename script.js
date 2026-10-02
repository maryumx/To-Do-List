
// GET HTML ELEMENTS


const form = document.getElementById("taskForm");
const taskInput = document.getElementById("task");
const container = document.getElementById("container");

const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completedBtn = document.getElementById("completed");

const count = document.getElementById("count");
const themeBtn = document.getElementById("theme");


// GET TASKS FROM LOCAL STORAGE


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Which tasks are currently being shown
let currentFilter = "all";



// ADD TASK


form.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get text from input
    const taskText = taskInput.value.trim();

    // Don't allow empty tasks
    if (taskText === "") {
        return;
    }


    // Create new task
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };


    // Add task to array
    tasks.push(newTask);


    // Save tasks
    saveTasks();


    // Show tasks
    renderTasks();


    // Clear input
    taskInput.value = "";


    // Put cursor back in input
    taskInput.focus();
});


// DISPLAY TASKS


function renderTasks() {

    // Remove currently displayed tasks
    container.innerHTML = "";


    // By default show all tasks
    let filteredTasks = tasks;


    // If ACTIVE button is selected
    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function (task) {

            return task.completed === false;

        });
    }


    // If COMPLETED button is selected
    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function (task) {

            return task.completed === true;

        });
    }


    // Loop through tasks
    filteredTasks.forEach(function (task) {


        // CREATE TASK DIV
        

        const taskDiv = document.createElement("div");


        
        // CREATE CHECKBOX
        

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        // CREATE TASK TEXT
   

        const taskText = document.createElement("span");

        taskText.textContent = task.text;


        // If task is completed
        if (task.completed === true) {

            taskText.classList.add("completed-task");

        }


       
        // CREATE DELETE BUTTON
       
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");


        
        // CHECKBOX EVENT
       

        checkbox.addEventListener("change", function () {

            // Change completed status
            task.completed = checkbox.checked;


            // Save new status
            saveTasks();


            // Refresh task display
            renderTasks();

        });


        // DELETE EVENT
     
        deleteBtn.addEventListener("click", function () {

            // Remove selected task
            tasks = tasks.filter(function (item) {

                return item.id !== task.id;

            });


            // Save after deleting
            saveTasks();


            // Display updated tasks
            renderTasks();

        });


        
        // ADD ELEMENTS TO TASK DIV
      

        taskDiv.appendChild(checkbox);

        taskDiv.appendChild(taskText);

        taskDiv.appendChild(deleteBtn);


        // Add task to main container
        container.appendChild(taskDiv);

    });


    // Update remaining task count
    updateCount();
}



// UPDATE TASK COUNT


function updateCount() {

    // Find tasks that are NOT completed
    const remainingTasks = tasks.filter(function (task) {

        return task.completed === false;

    });


    // Grammar for 1 task
    if (remainingTasks.length === 1) {

        count.textContent = "1 Task Remaining";

    } else {

        count.textContent =
            remainingTasks.length + " Tasks Remaining";

    }
}


// SAVE TASKS TO LOCAL STORAGE


function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}



// ALL BUTTON


allBtn.addEventListener("click", function () {

    currentFilter = "all";

    renderTasks();

});


// ACTIVE BUTTON


activeBtn.addEventListener("click", function () {

    currentFilter = "active";

    renderTasks();

});



// COMPLETED BUTTON


completedBtn.addEventListener("click", function () {

    currentFilter = "completed";

    renderTasks();

});



// DARK / LIGHT MODE


themeBtn.addEventListener("click", function () {


    // Add/remove dark class from body
    document.body.classList.toggle("dark");


    // Check if dark mode is active
    if (document.body.classList.contains("dark")) {

        // Change button text
        themeBtn.textContent = "Light Mode";


        // Save theme
        localStorage.setItem("theme", "dark");

    } else {

        // Change button text
        themeBtn.textContent = "Dark Mode";


        // Save theme
        localStorage.setItem("theme", "light");

    }

});



// LOAD SAVED THEME


const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {

    // Turn dark mode on
    document.body.classList.add("dark");


    // Change button text
    themeBtn.textContent = "Light Mode";

} else {

    themeBtn.textContent = "Dark Mode";

}



// DISPLAY SAVED TASKS WHEN PAGE LOADS

renderTasks();