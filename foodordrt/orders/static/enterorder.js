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


document.getElementById("submit-order").addEventListener("click", () => {
    // logic for submitting to main user
})

document.getElementById("clear-btn").addEventListener("click", () => {
    foods = [];
    localStorage.removeItem("foods");
    renderList();
})