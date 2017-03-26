$(document).ready(function() {
  console.log('jQ sourced!');
  addEventListeners();
});

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
