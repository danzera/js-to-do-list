$(document).ready(function() {
  getTasks();
  addEventListeners();
});

function updateDOM(tasksArray) {
  var $tbody = $('#tasksTable').children().last();
  $tbody.empty();
  for (var i = 0; i < tasksArray.length; i++) {
    var task = tasksArray[i];
    $tbody.append('<tr>');
    var $row = $tbody.children().last();
    $row.append('<td>' + task.name + '</td>');
    $row.append('<td>' + task.description + '</td>');
    $row.append('<td><input type="date" value=' + task.due_date.slice(0, 10) + '></input></td>');
    $row.append('<td class="checkbox"><input type="checkbox" data-id="' + task.id + '"></td>');
    $row.append('<td><button class="delete" data-id="' + task.id + '">Delete Task</button></td>');
  }
}

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
        // TEST - WORKING
        console.log('sending new task to the server:', task);
        addTask(task);
      } // end if-else
  }); // end on-submit click listener for 'Add Task!' button
} // end addEventListeners()

// clear input fields
function clearInput() {
  $('#taskName').val('');
  $('#taskDescription').val('');
  $('#dueDate').val('');
}

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
} // end newTask()
