import {filterCheck,insertEvent,filterEvent} from "./module/function.js"

const element = document.querySelector(".tarjet")
const eventsData = data.events.filter(item => data.currentDate < item.date)
const cardCategory = data.events.map(item => item.category)
const categorySinRept = new Set(cardCategory);
const categoryArray = [...categorySinRept]
const categorys = document.getElementById("checkCategory")
const button = document.getElementById("button")
const inputSearch = document.getElementById("search")

let filters = {
  searchText: '',
  categories: new Set
}

//FUNCIONES

filterCheck(categoryArray, categorys)


insertEvent(eventsData,element)



function filterButton(e) {
  e.preventDefault();
  filters.searchText = inputSearch.value
  filterEvent(filters.categories, filters.searchText, eventsData, element)
}
//LISTENERS

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

button.addEventListener(`click`, filterButton)