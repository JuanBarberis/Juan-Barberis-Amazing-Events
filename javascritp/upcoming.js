
const upCominEvent = document.querySelector(".tarjet")
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

//insert checkboxs

for (let category of categoryArray) {
  categorys.innerHTML += `
      <div>
          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}" name="categoryName"/>
          <label class="form-check-label" for="inlineCheckbox1">${category}</label>
      </div>
  `
}

//FUNCIONES

function insertEvents(eventsArray) {
  for (let item of eventsArray) {
    upCominEvent.innerHTML += `
    <div class="card text-center m-3" style="width: 18rem;">
                <img src=${item.image} class="card-img-top" alt="costume_party">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.category}</p>
                        <div class="price-descption">
                            <p class="card-text ms-2">Prices:${item.price}</p>
                            <a href="./description.html?event=${item._id}" class="btn btn-outline-danger">Description</a>
                        </div>
                    </div>
            </div>`

  }
}
insertEvents(eventsData)

function filterEvents() {

  let selectedCategories = [...filters.categories]
  let condition = filters.searchText.toLowerCase()

  if (selectedCategories.length === 0) {
    const results = eventsData.filter(event => {
      const name = event.name.toLowerCase()
      if (name.indexOf(condition) !== -1) {
        return true
      } else {
        return false
      }
    })
   
    // eliminado los registros renderizados
    upCominEvent.innerHTML = ""
    insertEvents(results)

  } else {

    let newEventsArray = []

    // recorremos por c/categoria todos los eventos y comparamos la categoria del evento con las  categorias .

    for (let selectedCategory of selectedCategories) {
      for (let event of eventsData) {
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
    // volvemos a eliminar los registros renderizados
    upCominEvent.innerHTML = ""
    insertEvents(results)
  }
}

function filterButton(e) {
  e.preventDefault();
  filters.searchText = inputSearch.value
  filterEvents()
}
//LISTENERS

document.querySelectorAll(`.form-check-input`).forEach(checkbox => {
  checkbox.addEventListener(`change`, event => {
    if (checkbox.checked === true) {
      filters.categories.add(event.target.value);
    } else {
      filters.categories.delete(event.target.value);
    }
    filterEvents()
  });
});

inputSearch.addEventListener(`keyup`, event => {
  filters.searchText = event.target.value
  filterEvents()
});



button.addEventListener(`click`, filterButton)