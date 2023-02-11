import {filterCheck,insertEvents,filterEvents} from "./module/function.js"


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

filterCheck(categoryArray, categorys)

insertEvents(eventsData,element)




// Listeners

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