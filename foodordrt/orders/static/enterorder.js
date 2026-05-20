let foods = JSON.parse(localStorage.getItem("foods")) || [];
const mainList = document.getElementById("unordered-list");
const addBtn = document.getElementById("add-btn");
renderList();

addBtn.addEventListener("click", () => {
    console.log('it works here');
    let food = document.getElementById("food");
    let foodQuantity = document.getElementById("food-quantity");
    let drink = document.getElementById("drink");
    let drinkQuantity = document.getElementById("drink-quantity");
    

    let items = {
        food : food.value,
        foodQ : foodQuantity.value,
        drink : drink.value,
        drinkQ : drinkQuantity.value
    };

    foods.push(items);
    localStorage.setItem("foods", JSON.stringify(foods));
    console.log(foods)

    renderList();

    food.value = "";
    drink.value = "";
    drinkQuantity.value = "";
    foodQuantity.value = "";

});

function renderList(){
    mainList.innerHTML = "";
    foods.forEach(element => {
        let li = document.createElement("li");
        li.textContent = `${element.food} | ${element.foodQ} pieces || ${element.drink} | ${element.drinkQ} pieces`;
        mainList.append(li)
    });
}

function getCookie(name){
    let cookieValue = null;

    if(document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].trim();
            if(cookie.substring(0, name.length + 1) === (name + '=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie("csrftoken");

document.getElementById("submit-order").addEventListener("click", () => {
    console.log("CLICKED SUBMIT BUTTON~");
    fetch("/submit/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
        },
        body: JSON.stringify(foods)
    })
    .then(res => res.json())
    .then(data => console.log("server:", data))
    .catch(err => console.error("error: ", err))
})


document.getElementById("clear-btn").addEventListener("click", () => {
    foods = [];
    localStorage.removeItem("foods");
    renderList();
});