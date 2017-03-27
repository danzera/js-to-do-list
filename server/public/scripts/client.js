$(document).ready(function() {
  getTasks();
  addEventListeners();
});

// get tasks from the server/database and display in the outputArea
function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/getTasks',
    success: function(res) {
      updateDOM(res);
    }
  });
} // end getTasks()

// send new 'task' object to the server
function addTask(task) {
  $.ajax({
    type: 'POST',
    url: '/addTask',
    data: task,
    success: function(res) {
      // TEST (after hooking up foam cup on the server) - WORKING
      getTasks();
    }
  });
} // end addTask()

function updateTask(taskID, taskStatus) {
  $.ajax({
    type: 'PUT',
    url: '/updateTask',
    data: {
      id: taskID,
      dueDate: $('#due-date-' + taskID).val(),
      complete: $('#checkbox-' + taskID).prop('checked')
    },
    success: function(res) {
      getTasks();
    }
  });
}

// send request to server to delete a task
function deleteTask(taskID) {
  $.ajax({
    type: 'DELETE',
    url: '/deleteTask/' + taskID,
    success: function(res) {
      getTasks();
    }
  });
} // end deleteTask()

// updateDOM() is called by the getTasks() function
// changes table display based on various user activities
function updateDOM(tasksArray) {
  var $tbody = $('#tasksTable').children().last();
  $tbody.empty();
  for (var i = 0; i < tasksArray.length; i++) {
    var task = tasksArray[i];
    var taskID = task.id;
    $tbody.append('<tr>');
    var $row = $tbody.children().last();
    $row.append('<td>' + task.name + '</td>');
    $row.append('<td>' + task.description + '</td>');
    $row.append('<td><input id="due-date-' + taskID + '"  type="date" value=' + task.due_date.slice(0, 10) + '></input></td>');
    $row.append('<td><button class="update" data-id="' + taskID + '">upDate</button></td>');
    $row.append('<td class="tdCheck"><input class="checkbox" id="checkbox-' + taskID + '" type="checkbox" data-id="' + taskID + '"></td>');
    $row.append('<td><button class="delete" data-id="' + taskID + '">Delete Task</button></td>');
    if (task.complete === true) { // additional logic for completed tasks
      $row.addClass('complete'); // add 'complete' styling
      $('#checkbox-' + taskID).prop('checked', true); // check complete box
    }
  } // end for-loop through tasksArray
} // end updateDOM()

// clear input fields
function clearInput() {
  $('#taskName').val('');
  $('#taskDescription').val('');
  $('#dueDate').val('');
} // end clearInput()

// event listeners
function addEventListeners() {
  // 'Add Task!' click handler
  $('#addTask').on('submit', function(e) {
      e.preventDefault();
      var taskName = $('#taskName').val();
      var taskDescription = $('#taskDescription').val();
      var dueDate = $('#dueDate').val();
      // verify input
      if (taskName === '' || taskDescription === '' || dueDate === '') {
        alert('Please add input for all fields. Thank you, kindly.');
      } else {
        clearInput();
        var task = {
          name: taskName,
          description: taskDescription,
          due: dueDate
        };
        console.log('sending new task to the server:', task);
        addTask(task);
      } // end if-else
  }); // end on-submit click listener for 'Add Task!' button

  // 'upDate' button click handler
  $('tbody').on('click', '.update', function() {
    var taskID = $(this).data('id');
    console.log('change date for task', taskID);
    updateTask(taskID);
  }); // end click listener for 'upDate' button

  // 'Complete' checkbox click handler
  $('tbody').on('click', '.checkbox', function() {
    var taskID = $(this).data('id');
    //var complete = this.checked; // state of the task (true/false)
    updateTask(taskID); // update task completion status
  }); // end click listener for 'Complete' checkbox

  // 'Delete Task' click handler
  $('tbody').on('click', '.delete', function() {
    if (confirm("Are you certain you wish to delete the task? If so, it shall be permanently vanquished.")) {
      var taskID = $(this).data('id'); // task ID stored as data on each delete btn
      deleteTask(taskID); // delete the associated task from the database
    }
  }); // end on-click listener for 'Delete Task' button
} // end addEventListeners()
