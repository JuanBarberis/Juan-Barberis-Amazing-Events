import { filterCheck, insertEvents, filterEvents } from "./module/function.js"


const element = document.querySelector(".tarjet")
let eventsData = []
const api = (`https://mindhub-xj03.onrender.com/api/amazing`)
const inputSearch = document.getElementById("search")
const categorys = document.getElementById("checkCategory")
const button = document.getElementById("button")

let filters = {
    searchText: '',
    categories: new Set
}
fetch(api)
    .then(response => response.json())
    .then(data => {
        eventsData = data.events
        let cardCategory = data.events.map(item => item.category)
        let categorySinRept = new Set(cardCategory);
        let categoryArray = [...categorySinRept]
        filterCheck(categoryArray, categorys)
        insertEvents(eventsData, element)
        document.querySelectorAll('.form-check-input').forEach(checkbox => {
            checkbox.addEventListener('change', event => {
                if (checkbox.checked === true) {
                    filters.categories.add(event.target.value);
                } else {
                    filters.categories.delete(event.target.value);
                }
        
                filterEvents(filters.categories, filters.searchText, eventsData, element)
            });
            inputSearch.addEventListener("keyup", event => {
                filters.searchText = event.target.value
            
                filterEvents(filters.categories, filters.searchText, eventsData, element)
            });
        });

    })
    .catch(error => console.log(error))

//FUNCIONES






// Listeners



const filterButton = (e) => {
    e.preventDefault();
    filters.searchText = inputSearch.value

    filterEvents(filters.categories, filters.searchText, eventsData, element)
}

button.addEventListener("click", filterButton)