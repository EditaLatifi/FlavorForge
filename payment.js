var paymentForm = document.getElementById("payment-form");
var payButton = document.getElementById("pay-button");

paymentForm.addEventListener("submit", function(event){
    event.preventDefault();

    var name = document.getElementById("name").value;
    var cardNumber = document.getElementById("card-number").value;
    var cvc = document.getElementById("cvc").value;
    var expirationDate = document.getElementById("expiration-date").value;

    //validate inputs 
    if(name.trim() === '' || cardNumber.trim() === '' || cvc.trim() ==='' || expirationDate.trim() ===''){
      alert('Please fill all fields that are required.');
      return;
    }

    //validate card number cvc
    //start in the beginning of string 
    //consist on number 0-9 
    //have a total from 13 16 digits 
    //end at the end of the string  
    if(!cardNumber.match(/^\d{13,16}$/)){
       alert("Please enter a valid card number,");
       return;
    }

    //validate cvc 
    //start string
    //this is the start
    //only digits 0 to 9
    //have a total from 3 4 digits 
    // \d
    if(!cvc.match(/^\d{3,4}$/)){
      alert("Please enter a valid CVC");
      return;
    }

    document.getElementById("success-message").style.display = "block";
    
    //blur the form
    paymentForm.style.filter = "blur(4px)";
    
    //reset form
    paymentForm.reset();
}); 