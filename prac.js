const productContainer = document.getElementById("product-container");

document.getElementById("button").addEventListener('click', async (e) => {
    e.preventDefault();
    productContainer.innerHTML = "Fetching data...";
    
    let inputvalue = document.getElementById("inputName").value
     await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`)
        .then(response => response.json())
        .then(data => {
            
            productContainer.innerHTML="";
            if (data.meals == null) {
                document.getElementById("msg").style.display = "block";
            }
            else {
                document.getElementById("msg").style.display = "none";
                data.meals.forEach(element => {
                    const div = document.createElement("div");
                   
                    div.classList.add("item-card");

                    div.innerHTML = `
                    <div class="card" onclick="Details(${element.idMeal})" style="width: 14rem; color: #ffc75f">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h1 class="card-title">${element.strMeal}</h1>
                    </div>
                    </div>
                    `
                    productContainer.appendChild(div);
                });

            }
        });

});


async function Details(Id) {
    let pop = document.getElementById("pop");
    pop.innerHTML="";
    await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`)
    .then(response => response.json())
        .then(data => {
            let ingredient="<ul>";
            for(let i=1;i<=20;i++){
                let ingri = data.meals[0][`strIngredient${i}`]
                if(!ingri || ingri.trim() === ""){
                    break;
                }
                else{
                    ingredient+=`<li>${ingri}</li>`;
                }
            }
            ingredient+="</ul>";
            pop.innerHTML = `
            <div class="pop-card">
                <img src="${data.meals[0].strMealThumb}" alt="...">
                <h5>${data.meals[0].strMeal}</h5>
                <h6>Ingredients:</h6>
                ${ingredient}
            </div>
        `;

        })

}


