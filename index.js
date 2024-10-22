let data = document.getElementById("data");
let submitBtn;
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
let searchBox = document.getElementById("searchBox");;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})


    $('.sideBarSmall').click(()=>{
        
      $( '.sideBarBig').toggle(1000);

    })



async function searchByName(term) {

    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}
function search() {
    searchBox.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
    </div>`

    data.innerHTML = ""
}

async function getArea() {
  data.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300)

  // searchBox.innerHTML = "";
//   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)

  res = await res.json();

  displayArea(res.meals);
  $(".inner-loading-screen").fadeOut(300);
}

async function getAreaMeals(area) {

    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)

  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
function displayArea(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" >
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `;
  }
console.log(arr);
data.innerHTML = cartoona;
}

async function displayMeals(meals) {
  let mealList = "";
  for (let i = 0; i < meals.length; i++) {
    mealList += `
        <div class="col-md-3">
            <div class="meal position-relative rounded-2 overflow-hidden" onclick="getMealDetail('${meals[i].idMeal}')" >
                    <img class=" w-100 rounder-3" src="${meals[i].strMealThumb}" alt="Meal Image">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
            </div>
        </div>
        `;
         data.innerHTML = mealList
  }
}

async function getMealDetail(id) {
    $(".inner-loading-screen").fadeIn(300);

  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  res = await res.json();
  displayDetail(res.meals[0]);
  $(".inner-loading-screen").fadeOut(300);

}

function displayDetail(meal) {
  let ingredients = ``;
  for (let i = 1; i <= 10; i++) {
    ingredients += `<li>${meal[`strIngredient${i}`]}</li>`;
  }
  let tags = [];
  tags = meal.strTags?.split(",");
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let detail = `
    <div class= "col-md-4">
        <img class="w-100 rounder-3" src="${meal.strMealThumb}" alt="Meal Image">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class= "col-md-8">
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
     <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
    <h3>Recipes :</h3>
     <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
    </ul>

    <h3>Tags :</h3>
     <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
    </ul>

    <a class="btn btn-success" target="_blank" htef="${meal.strSource}">Source</a>
    <a class="btn btn-danger" target="_blank" htef="${meal.strYoutube}">Youtube</a>


    </div>
    `;
  data.innerHTML = detail;
}


async function getCategory(category)
{
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeals(response.meals.slice(0,20));
    $(".inner-loading-screen").fadeOut(300);

}

async function getAllCategories()
{
    data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}
function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    data.innerHTML = cartoona
}

async function getAllIngredient()
{
    $(".inner-loading-screen").fadeIn(300);
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    
    respone = await respone.json()
    displayIngredient(respone.meals.slice(0,20));

    $(".inner-loading-screen").fadeOut(300);

}
function displayIngredient(list)
{
    let ingredientList = "";
    for (let i = 0; i < list.length; i++) {
        ingredientList += `
        <div class="col-md-3">
            <div class="meal position-relative rounded-2 overflow-hidden" onclick="getIngredientMeals('${list[i].strIngredient}')" >
                    <img class=" w-100 rounder-3" src="https://www.themealdb.com/images/ingredients/${list[i].strIngredient}-Small.png" alt="Meal Image">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${list[i].strIngredient}</h3>
                        <p>${list[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
            </div>
        </div>
        `;
         data.innerHTML = ingredientList
    }
}

async function getIngredientMeals(ingredient)
{
    $(".inner-loading-screen").fadeIn(300);
    data.innerHTML ="";
    let res = await fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    res = await res.json();

    displayMeals(res.meals.slice(0,20));
    $(".inner-loading-screen").fadeIn(300);

}

function Contact(){
    data.innerHTML =`<div class="d-flex justify-content-center align-items-center">
        <div class="container text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="name" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-3 d-none">
                        Invalid Name , special characters and numbers are not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="email" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-3 d-none">
                        Invalid Email 
                    </div>
                </div>
                 <div class="col-md-6">
                    <input id="phone" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-3 d-none">
                        Invalid Phone 
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="Age" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Age">
                    <div id="AgeAlert" class="alert alert-danger w-100 mt-3 d-none">
                        Enter valid age 
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="password" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Enter Your password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-3 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:* 
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="RePassword" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Repassword">
                    <div id="RePasswordAlert" class="alert alert-danger w-100 mt-3 d-none">
                        Invalid Password
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>`;
     submitBtn = document.getElementById("submitBtn");


     document.getElementById("name").addEventListener("focus", ()=>{
        nameInputTouched = true
     })
     document.getElementById("email").addEventListener("focus", ()=>{
        emailInputTouched = true
     })
     document.getElementById("Phone").addEventListener("focus", ()=>{
        phoneInputTouched = true
     })
     document.getElementById("Age").addEventListener("focus", ()=>{
        ageInputTouched = true
     })
     document.getElementById("password").addEventListener("focus", ()=>{
        passwordInputTouched = true
     })
     document.getElementById("RePassword").addEventListener("focus", ()=>{
        repasswordInputTouched = true
     })
}

function namevalidation(){
    return (/^[a-zA-Z]+$/.test(document.getElementById("name").value))
}
function emailValidation(){
    return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("name").value))
}
function phoneValidation(){
    return (/^[0,1][0-9]*$/.test(document.getElementById("name").value))
}
function ageValidation(){
    return (/^[1-9][1-9][1-9]$/.test(document.getElementById("age").value))
}


function inputsValidation(){
    if(nameInputTouched)
    {

    }
}
function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() ) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
