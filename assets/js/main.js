// element 
const searchInput = document.getElementById('input');
const result = document.getElementById('result');
const seeMore = document.getElementById('seeMore');
const gif = document.getElementById('gif');

//search value 
const search = () => {
    const searchValue = searchInput.value;
    if (searchValue.length == 0) {
        alert('Enter your food name');
    }
    else {
        loadData(searchValue);
        console.log(searchValue);
    }
}
//loading data of search
const loadData = (inputValue) => {
    result.textContent = ''
    gif.style.display = 'block';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => inputData(data));
}
// insert data to html 
const inputData = data => {
    gif.style.display = 'none';
    if (data.meals == null) {
        alert(`We could not find any food match with this "${searchInput.value}" name `);
        searchInput.value = '';

    }
    else {
        searchInput.value = '';

        data.meals.forEach(meal => {
            console.log(meal);
            //new element 
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">  
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text"> 
                                Ingredient of this
                                <ul>
                                <li>${meal.strIngredient1}</li>
                                <li>${meal.strIngredient2}</li>
                                <li>${meal.strIngredient3}</li>
                                <li>${meal.strIngredient4}</li>
                                </ul>
                            </p>
                            <button onclick="more('${meal.idMeal}')" class="btn btn-primary">Try This</button>
                        </div>
                    </div>
            `;
            result.appendChild(div);
        })
    }

}
//on click of try this 
const more = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => details(data));

}
// insert data to see more section 
const details = data => {
    data.meals.forEach(detail => {
        const div = document.createElement('div');
        div.classList.add('card');
        seeMore.textContent = ''
        div.innerHTML = `
        <div class="card border-0">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${detail.strMealThumb}" class="img-fluid" alt="...">  
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">${detail.strInstructions}</p>
                        <a href="${detail.strYoutube}" class='btn btn-success'>Watch on YouTube</a>
                    </div>
                </div>
            </div> 
        </div> 
        `;
        seeMore.appendChild(div);
    })
}