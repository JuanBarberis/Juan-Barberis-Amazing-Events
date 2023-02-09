
const pastEvents = document.querySelector(".tarjet")
const eventsData = data.events.filter(item => data.currentDate > item.date)
const cardCategory = data.events.map(item => item.category)
const categorySinRept = new Set(cardCategory);
const categoryArray =  [...categorySinRept]
const categorys = document.getElementById("checkCategory")
const button = document.getElementById("button")
const inputSearch = document.getElementById("search")

let filters = {
  searchText: ``,
  categories: new Set
}

//insert checkboxs

for(let category of categoryArray){
categorys.innerHTML +=`
<div>
<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}" name="categoryName"/>
<label class="form-check-label" for="inlineCheckbox1">${category}</label>
</div>
`
}

// FUNCIONES

function insertEvents(eventsArray){
  for(let item of eventsArray){
    pastEvents.innerHTML += `
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
            </div>
    `
  }
}

insertEvents(eventsData)

function filterEvents(){

  let selectedCategories = [...filters.categories]
  let condition = filters.searchText.toLowerCase()

  if(selectedCategories.length === 0){
    const results = eventsData.filter(event =>{
      const name = event.name.toLowerCase()
      if(name.indexOf(condition) !==-1){
        return true
      }else {
        return false
      }
    })
    pastEvents.innerHTML = ""
    insertEvents(results)
  
  } else { 
    let newEventsArray = []

    for(let selectedCategory of selectedCategories){
      for(let event of eventsData){
        if(selectedCategory === event.category){
          newEventsArray.push(event)
        }
      }
    }
    const results = newEventsArray.filter(event =>{
      const name= event.name.toLowerCase()
      if(name.indexOf(condition) !== -1 ){
        return true
      }else {
        return false
      }
    })
    pastEvents.innerHTML = ""
    insertEvents(results)
  }
}

//LISTENERS

document.querySelectorAll(`.form-check-input`).forEach(checkbox =>{
  checkbox.addEventListener(`change`, event => {
    if(checkbox.checked === true){
      filters.categories.add(event.target.value)
    }else {
      filters.categories.delete(event.target.value)
    }
    filterEvents()
  })
})

inputSearch.addEventListener(`keyup`, event =>{
  filters.searchText = event.target.value
  filterEvents()
});

const filterButton = (e) => {
  filters.searchText = inputSearch.value
  filterEvents()
}
// const checkboxId = document.querySelectorAll('input[name="categoryName"]')
// let selectedCheckbox = []
// if (checkboxId) {
//   checkboxId.forEach((element) =>
//   {
//     element.addEventListener("click", function (event) {
//       const item = event.target.value;
//       if (selectedCheckbox.length === 0) {
//         selectedCheckbox.push(item)
//       }
//       console.log(selectedCheckbox)
//     });
//   });
// }

// const inputSearch = document.getElementById("search")
// inputSearch.addEventListener("keyup", (event) => {
//   const results = eventsData.filter((item) => {
//     let condition = event.target.value.toLowerCase()
//     const name = item.name.toLowerCase()
//     if (name.indexOf(condition) != -1) {
//       return true
//     } else {
//       return false
//     }

//   })
//   pastEvents.innerHTML = ""
//   for (let item of results) {
//     pastEvents.innerHTML += `
//             <div class="card text-center m-3" style="width: 18rem;">
//                 <img src=${item.image} class="card-img-top" alt="costume_party">
//                     <div class="card-body">
//                         <h5 class="card-title">${item.name}</h5>
//                         <p class="card-text">${item.category}</p>
//                         <div class="price-descption">
//                             <p class="card-text ms-2">Prices:${item.price}</p>
//                             <a href="./assets/description.html" class="btn btn-outline-danger">Description</a>
//                         </div>
//                     </div>
//             </div> `
//   }
// });
