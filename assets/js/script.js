// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const projectFormEl = $("#formModal");

// import input values from modal
let title = $("#taskTitle");
let dueDate = $("#taskDue");
let description = $("#taskbody");

//create new object from input data
const newTask = {
  taskTitle: title.val().trim(),
  taskDue: dueDate.val(),
  taskBody: description.val().trim(),
  taskID: generateTaskId(),
  status: "to-do",
};

// Generate a unique task id
function generateTaskId() {
  const taskID = crypto.randomUUID();

  nextId = taskID;

  return nextId;
}

// Create a new task card
function createTaskCard(task) {
  const taskCard = $("<div>")
    .addClass("card task-card draggable my-3")
    .attr("data-task-id", task.taskID);
  const cardHeader = $("<div>").addClass("card-header h4").text("taskTitle");
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.taskBody);
  const cardDueDate = $('<p>').addClass('card-text').text(task.taskDue);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.taskID).attr('id', task.taskID);
  cardDeleteBtn.on('click', handleDeleteTask);

   // Sets the card background color based on due date.
   if (task.taskDue && task.status !== 'done') {
    const now = dayjs();
    const DueDate = dayjs(task.taskDue, 'DD/MM/YYYY');

    //If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(DueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(DueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }
    // append task properties to card
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
  
    // Return the card.
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
