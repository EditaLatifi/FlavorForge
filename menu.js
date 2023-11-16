// Menu items data 
const menuItems = {
    pasta: [
        {
            name: "Spaghetti Carbonara",
            price: 12.99,
            description: "Delicious spaghetti served with creamy carbonara sauce.",
            ingredients: ["Spaghetti", "Eggs", "Meat"]
        },
        {
            name: "Fettuccine Alfredo",
            price: 11.99,
            description: "Classic fettucine served with creamy carbonara sauce.",
            ingredients: ["Butter", "Eggs", "Meat"]
        },
        {
            name: "Penne Arrabiata",
            price: 10.99,
            description: "Penne pasta served with creamy carbonara sauce.",
            ingredients: ["Tomato sauce", "Eggs", "Meat"]
        }
    ],
    pizza: [
        {
            name:"Margherita",
            price: 14.99,
            description: "Classic pizza topped with tomato sauce, mozzarello cheese and fresh meat.",
            ingredients: ["Pizza dough", "Tomato sauce","Mozzarela cheese"]
        },
        {
            name:"Peperoni",
            price: 16.99,
            description: "Classic pizza topped with pepperoni, mozzarello cheese and fresh meat.",
            ingredients: ["Pizza dough", "Tomato sauce","Pepperoni"]
        },
        {
            name:"Hawaiian",
            price: 15.99,
            description: "Classic pizza topped with pepperoni, mozzarello cheese and pineapple chunks.",
            ingredients: ["Pizza dough", "Tomato sauce","Pineapple"]
        }
    ],
    desserts: [
        {
            name:"Tiramisu",
            price: 8.99,
            description: "Traditional Italian dessert made with layers.",
            ingredients: ["LadyFingers", "Coffee"]
        },
        {
            name:"Chocolate Lava Cake",
            price: 9.99,
            description: "Decadent dessert made with layers.",
            ingredients: ["Chocolate", "Coffee", "Sugar", "Eggs"]
        },
        {
            name:"Trileqe",
            price: 7.99,
            description: "Creamy milk dessert made with layers.",
            ingredients: ["Milk", "Eggs" , "Caramel"]
        }
    ]
};

function updateMenuItems(){
    const menu = document.getElementById("menu");
    const menuItemsList = document.getElementById("menu-items");


    menuItemsList.innerHTML="";

    //Get selected menu value
    const menuValue = menu.value;

    // Get items for the selected menu 
    const items = menuItems[menuValue];

    //Add items to the list 
    items.forEach((item) => {
        const li = document.createElement("li");
        const name = document.createElement("span");
        const price = document.createElement("span");
        const description = document.createElement("p");
        const ingredients = document.createElement("p");
        const addButton = document.createElement("button");

    
    //TextContent
    name.textContent = item.name;
    price.textContent = `$${item.price.toFixed(2)}`;
    description.textContent = `Description: ${item.description}`;
    ingredients.textContent = `Ingredients: ${item.ingredients.join(",")}`;
    addButton.textContent = "+";
    addButton.setAttribute("data-name", item.name);
    addButton.setAttribute("data-price", item.price.toFixed(2));

    addButton.addEventListener("click" , addToBasket);
    
    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(description);
    li.appendChild(ingredients);
    li.appendChild(addButton);

    menuItemsList.appendChild(li);
    });

    applySearchFunctionality();
}

function applySearchFunctionality(){
    const searchInput = document.getElementById("search");
    const menuItemsList = document.getElementById("menu-items");
    const menuItems = menuItemsList.getElementsByTagName("li");

    searchInput.addEventListener("input", function(){
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(menuItems).forEach((item) => {
            const itemName = item.querySelector("span").textContent.toLowerCase();

            if(itemName.includes(searchTerm)){
                item.style.display="block";
            } else {
                item.style.display="none";
            }
        });
    });
}

function addToBasket(event){
    const itemName = event.target.getAttribute("data-name");
    const itemPrice = parseFloat(event.target.getAttribute("data-price"));

    const basketList = document.getElementById("basket-items");
    const li = document.createElement("li");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const removeButton = document.createElement("button");
    const addButton = document.createElement("button");

    name.textContent = itemName;
    price.textContent = `$${itemPrice.toFixed(2)}`;
    removeButton.textContent = "-";
    addButton.textContent="+";
    removeButton.classList.add("remove");
    addButton.classList.add("add");
    addButton.setAttribute("data-name", itemName);
    addButton.setAttribute("data-price", itemPrice.toFixed(2));

    removeButton.addEventListener("click", removeFromBasket);
    addButton.addEventListener("click" , addToBasket);

    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(removeButton);
    li.appendChild(addButton);

    basketList.appendChild(li);

    //calculate total order amount
    calculateTotal();

    //check minimum order 
    checkMinimumOrder();
}

function removeFromBasket(event){
    event.target.parentElement.remove();

    //calculate total 
    calculateTotal();
    //check minimum order
    checkMinimumOrder();
}

function calculateTotal(){
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;
    let tax = 0;
    let total = 0;
    const taxRate = 0.1; //10%

    basketItems.forEach((item) =>{
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
        subtotal += itemPrice;
    });

    tax = subtotal * taxRate;
    total = subtotal + tax;

    document.querySelector("#subtotal-price").textContent = `${subtotal.toFixed(2)}`;
    document.querySelector("#tax-price").textContent = `${tax.toFixed(2)}`;
    document.querySelector("#totali-price").textContent = `${total.toFixed(2)}`;
}
function checkMinimumOrder() {
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;
  
    basketItems.forEach((item) => {
      const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
      subtotal += itemPrice;
    });
  
    const minimumOrderValue = 20.0; // Set your minimum order value here
  
    const basketMessage = document.getElementById("basket-message");
    if (subtotal < minimumOrderValue) {
      basketMessage.style.display = "block";
    } else {
      basketMessage.style.display = "none";
    }
  }
  
  // Call checkMinimumOrder() function initially to determine if minimum order message should be displayed
  checkMinimumOrder();
  
  // Add event listener to update menu items whenever the value of the dropdown menu changes
  const menu = document.getElementById("menu");
  menu.addEventListener("change", updateMenuItems);
  
  // Call updateMenuItems() function to initially populate the menu items
  updateMenuItems();

  const basketList = document.getElementById("basket-items");
  basketList.addEventListener("click" , (event) =>{
    if(event.target.classList.contains("add") || event.target.classList.contains("remove")){
        calculateTotal();
    }
  });

  calculateTotal();

  var checkoutButton = document.getElementById("checkout");

  //add click event listener to button 

  checkoutButton.addEventListener("click", function(){
    //total price 
    var totalPrice = parseFloat(document.getElementById("totali-price").textContent);

    var confirmation = confirm("Do you want to continue with payment?");

    if(confirmation) {
        //store order history
        const basketItems = document.querySelectorAll("#basket-items li");
        const orderItems = Array.from(basketItems).map((item) => {
            const itemName = item.querySelector("span:nth-child(1)").textContent;
            const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
            return{name: itemName, price: itemPrice};
    });
    window.location.href = "payment.html";
 } else{
    var basketItems = document.getElementById("basket-items");
    basketItems.innerHTML="";
    document.getElementById("totali-price").textContent="0.00";
 }
});
