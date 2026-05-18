let foods = JSON.parse(localStorage.getItem("foods")) || [];

const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
    console.log('it works here');
    let food = document.getElementById("food");
    let foodQuantity = document.getElementById("food-quantity");
    let drink = document.getElementById("drink");
    let drinkQuantity = document.getElementById("drink-quantity");
    const mainList = document.getElementById("unordered-list");

    let items = {
        food : food.value,
        foodQ : foodQuantity.value,
        drink : drink.value,
        drinkQ : drinkQuantity.value
    };

    foods.push(items);
    localStorage.setItem("foods", JSON.stringify(foods));

    let li = document.createElement("li");
    li.textContent = `You ordered ${items.foodQ} pieces of ${items.food}. `;

    if(items.drink.trim() !== ""){
        li.textContent += `You also ordered ${items.drinkQ} pieces of ${items.drink}`;
    }

    mainList.appendChild(li);

    food.value = "";
    drink.value = "";
    drinkQuantity.value = "";
    foodQuantity.value = "";
});

document.getElementById("submit-order").addEventListener("click", () => {
    // logic for submitting to main user
})