//find us modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  //This code is written in jQuery and is meant to be executed when the document is fully loaded and ready.
  //$(document).ready(function)This is a jQuery construct that waits for the HTML document to be fully 
  //loaded before executing the enclosed code.
  // It ensures that the JavaScript code within it won't run until the HTML document is ready,
  // which is essential for manipulating the DOM elements.
  $(document).ready(function() {
    // This code selects the HTML form element with the ID "newsletter-form" and attaches an event handler to it.
    // It's listening for the form's submission event.
    $('#newsletter-form').submit(function(event) {
      event.preventDefault(); // Prevent form from submitting
   
      // Get the form values
      //val metodë përdoret për të marrë vlerën aktuale të elementit të zgjedhur, në këtë rast, vlerën e një elementi hyrës.
      var email = $('#email').val().trim();
      var newsletter = $('#checkbox').is(':checked');
  
      // Perform client-side form validation
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }
  
      // Process the form data
      //This code is using jQuery's $.ajax() function to make an asynchronous HTTP request,
      // typically referred to as an AJAX request
      // ajax It takes an object as an argument, where you can specify various settings for the request.
      $.ajax({
        url: '/submit-form.js',
        type: 'POST',
        data: {
          email: email,
          newsletter: newsletter
        },
        success: function(response) {
          // Handle the server's response here
          showMessage('Thank you for subscribing!', 'success');
          $('#newsletter-form')[0].reset(); // Reset the form
        },
        //xhr XMLHttpRequest object that contains details about the error.
        //status string describing the status of the request (e.g., "error").
        error: function(xhr, status, error) {
          showMessage('An error occurred. Please try again later.', 'error');
          console.log(xhr.responseText);
        }
      });
    });
  
    // Email validation function
    function isValidEmail(email) {
      // Use a regular expression to validate the email format
      var emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    }
  //The type of the message, which can be "success" or "error."
  function showMessage(message, type) {
    var messageContainer = $('#message-container');
    messageContainer.text(message);
    //It removes all CSS classes from the message container:
    //add CSS classes
    messageContainer.removeClass().addClass(type); // Add a class based on message type (e.g., 'success' or 'error')
  
    // Set a timeout to reload the page after 40 seconds
    setTimeout(function() {
      window.location.reload();
    }, 50000);
  }
});