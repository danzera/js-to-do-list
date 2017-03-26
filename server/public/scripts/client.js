$(document).ready(function() {
  getTasks();
  addEventListeners();
});

function updateDOM(tasksArray) {
  var $tbody = $('#tasksTable').children().last();
  for (var i = 0; i < tasksArray.length; i++) {
    var task = tasksArray[i];
    var $row = $tbody.append('<tr>');
    $row.data('id', i);
    $row.append('<td>' + task.name + '</td>');
    $row.append('<td>' + task.description + '</td>');
    $row.append('<td><input type="date" value=' + task.due_date.slice(0, 10) + '></input></td>');
    $row.append('<td><input type="checkbox" name="complete"></td>');
    $row.append('<td><button class="delete">Delete Task</button></td>');
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
  $('#addTask').on('submit', function(e) {
      e.preventDefault();
      // TEST - WORKING
      console.log('click listener working');
      var taskName = $('#taskName').val();
      var taskDescription = $('#taskDescription').val();
      var dueDate = $('#dueDate').val();
      // verify input
      if (taskName === '' || taskDescription === '' || dueDate === '') {
        alert('Please add input for all fields. Thank you, kindly.');
      } else {
        var task = {
          name: taskName,
          description: taskDescription,
          due: dueDate
        };
        // TEST - WORKING
        console.log(task);
        addTask(task);
      } // end if-else
  }); // end on-submit click listener
} // end addEventListeners()

// send new 'task' object to the server
function addTask(task) {
  $.ajax({
    type: 'POST',
    url: '/addTask',
    data: task,
    success: function(res) {
      // TEST (after hooking up foam cup on the server) - WORKING
      console.log(res);
    }
  });
} // end newTask()
