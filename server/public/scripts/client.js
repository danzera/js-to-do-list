$(document).ready(function() {
  console.log('jQ sourced!');
  addEventListeners();
});

// event listeners
function addEventListeners() {
  $('#addTask').on('submit', function(e) {
      e.preventDefault();
      // TEST
      console.log('click listener working');
      var taskName = $('#taskName').val();
      var taskDescription = $('#taskDescription').val();
      var dueDate = $('#dueDate').val();
      var task = {
        name: taskName,
        description: taskDescription,
        due: dueDate
      };
      // TEST
      console.log(task);
  });
} // end addEventListeners()
