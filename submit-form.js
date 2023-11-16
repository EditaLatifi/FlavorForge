// Handle form submission
//This line of code selects the HTML form element with the ID "newsletter-form" and attaches an event listener to it.
// It listens for the "submit" event on this form. When the form is submitted (e.g., when the user clicks the submit button),
// the provided callback function is executed.
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    //By preventing the default behavior, the form will not be submitted to the server, and the page won't be reloaded. 
    //This allows you to handle the form submission using JavaScript without leaving the current page.
  
    // Get the form values
    const email = document.getElementById('email').value.trim();
    const newsletter = document.getElementById('newsletter').checked;
    //This line checks whether a checkbox input with the ID "newsletter" is 
    //checked or not and stores the result (true or false) in the variable newsletter.
  
    // Process the form data
    const data = {
      email: email,
      newsletter: newsletter
    };
  
    // Save the form data to local storage
    localStorage.setItem('formSubmission', JSON.stringify(data));
    //This line uses the localStorage API to save the data object to local storage.
    // It uses localStorage.setItem() to store the data under the key "formSubmission." To save the data as a string in local storage,
    // the JSON.stringify(data) method is used to convert the data object into a JSON string.
  });
  
  //JSON is used for structuring data in a way that is easy for both humans 
  //to read and write and for machines to parse and generate. 
  //It's often used for data exchange between a server and a web application, as well as for configuration files and 
  //various other data storage and transmission tasks. Here are some key characteristics and reasons why JSON is used:
  //JSON is primarily used in programming and web development to structure and exchange data between systems.