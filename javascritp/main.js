
const element = document.querySelector(".tarjet")
const eventsData = data.events
const cardCategory = data.events.map(item => item.category)
const categorySinRept = new Set(cardCategory);
const categoryArray = [...categorySinRept]
const inputSearch = document.getElementById("search")
const categorys = document.getElementById("checkCategory")
const button = document.getElementById("button")

let filters = {
    searchText: '',
    categories: new Set
}

//FUNCIONES

function filterCheck(categoryArray, inner) {
    for (let category of categoryArray) {
        inner.innerHTML += `
        <div>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}" name="categoryName"/>
            <label class="form-check-label" for="inlineCheckbox1">${category}</label>
        </div>
    `
    }
}
filterCheck(categoryArray, categorys)
console.log(filterCheck)

function insertEvents(eventsArray) {
    for (let item of eventsArray) {
        element.innerHTML += `
            <div class="card text-center m-3" style="width: 18rem;">
                <img src=${item.image} class="card-img-top" alt="costume_party">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.category}</p>
                        <div class="price-descption">
                            <p class="card-text ms-2">Prices: $${item.price}</p>
                            <a href="./assets/description.html?event=${item._id}" class="btn btn-outline-danger">Description</a>
                        </div>
                        </div>
                        </div> `
    }
}
insertEvents(eventsData)


function filterEvents(categories, searchText, data, prueba) {


    let selectedCategories = [...categories]
    let condition = searchText.toLowerCase()

    if (selectedCategories.length === 0) {

        const results = data.filter(event => {
            const name = event.name.toLowerCase()
            if (name.indexOf(condition) !== -1) {
                return true
            } else {
                return false
            }
        })

        prueba.innerHTML = ""
        insertEvents(results)

    } else {

        let newEventsArray = []


        for (let selectedCategory of selectedCategories) {
            for (let event of data) {
                if (selectedCategory === event.category) {
                    newEventsArray.push(event)
                }
            }
        }

        const results = newEventsArray.filter(event => {
            const name = event.name.toLowerCase()
            if (name.indexOf(condition) !== -1) {
                return true
            } else {
                return false
            }
        })

        prueba.innerHTML = ""
        insertEvents(results)
    }
    
}
filterEvents(filters.categories, filters.searchText, eventsData, element)
//Listeners

document.querySelectorAll('.form-check-input').forEach(checkbox => {
    checkbox.addEventListener('change', event => {
        if (checkbox.checked === true) {
            filters.categories.add(event.target.value);
        } else {
            filters.categories.delete(event.target.value);
        }
        filterEvents(filters.categories, filters.searchText, eventsData, element)
    });
});

inputSearch.addEventListener("keyup", event => {
    filters.searchText = event.target.value
    filterEvents(filters.categories, filters.searchText, eventsData, element)
});

const filterButton = (e) => {
    e.preventDefault();
    filters.searchText = inputSearch.value
    filterEvents(filters.categories, filters.searchText, eventsData, element)
}

button.addEventListener("click", filterButton)