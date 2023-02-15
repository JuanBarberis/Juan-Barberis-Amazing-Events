import { filterCheck, insertEvent, filterEvent } from "./module/function.js"
const api = (`https://mindhub-xj03.onrender.com/api/amazing`)

const element = document.querySelector(".tarjet")
let eventsData = []
const categorys = document.getElementById("checkCategory")
const button = document.getElementById("button")
const inputSearch = document.getElementById("search")

let filters = {
  searchText: '',
  categories: new Set
}

//FUNCIONES


fetch(api)
  .then(response => response.json())
  .then(data => {
    let eventsData = data.events.filter(item => data.currentDate < item.date)
    let cardCategory = data.events.map(item => item.category)
    let categorySinRept = new Set(cardCategory);
    let categoryArray = [...categorySinRept]
    filterCheck(categoryArray, categorys)
    insertEvent(eventsData, element)
    document.querySelectorAll(`.form-check-input`).forEach(checkbox => {
      checkbox.addEventListener(`change`, event => {
        if (checkbox.checked === true) {
          filters.categories.add(event.target.value);
        } else {
          filters.categories.delete(event.target.value);
        }
        filterEvent(filters.categories, filters.searchText, eventsData, element)
      });
    });
    inputSearch.addEventListener(`keyup`, event => {
      filters.searchText = event.target.value
      filterEvent(filters.categories, filters.searchText, eventsData, element)
    });
  })
.catch(error => console.log(error))


function filterButton(e) {
  e.preventDefault();
  filters.searchText = inputSearch.value
  filterEvent(filters.categories, filters.searchText, eventsData, element)
}
//LISTENERS


button.addEventListener(`click`, filterButton)