
export function filterCheck(categoryArray, inner) {
    for (let category of categoryArray) {
        inner.innerHTML += `
        <div>
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}" name="categoryName"/>
            <label class="form-check-label" for="inlineCheckbox1">${category}</label>
        </div>
    `
    }
}

export function insertEvents(eventsArray, element) {
    
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
export function insertEvent(eventsArray,element) {
  for (let item of eventsArray) {
    element.innerHTML += `
    <div class="card text-center m-3" style="width: 18rem;">
                <img src=${item.image} class="card-img-top" alt="costume_party">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.category}</p>
                        <div class="price-descption">
                            <p class="card-text ms-2">Prices: $${item.price}</p>
                            <a href="./description.html?event=${item._id}" class="btn btn-outline-danger">Description</a>
                        </div>
                    </div>
            </div>
    `
  }
}

export function filterEvents(categories, searchText, data, element) {

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

        element.innerHTML = ""
        insertEvents(results, element)

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

        element.innerHTML = ""
        insertEvents(results, element)
    }

}

export function filterEvent(categories, searchText, data, element) {

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
        element.innerHTML = ""
        insertEvent(results,element)
    
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
        element.innerHTML = ""
        insertEvent(results,element)
      }
    }

export function renderCard(eventDescription, container) {
    container.innerHTML = `
    <div class="card" style="width: 75%">
    <div class="card-descrip">
    <h1 class="	text-danger">Amazing Evenet Presents</h1>
    <h3 class=" mb-2 text-warning">${eventDescription.name}</h3>
    <p class="card-text">${eventDescription.description}</p>
    <p class="card-text">date: ${eventDescription.date}</p>
    <p class="card-text">capacity: ${eventDescription.capacity}</p>
    <p class="card-text">place: ${eventDescription.place}</p>
    <p class="card-text">price: $${eventDescription.price}</p>
    </div>
    </div>
    <div class="card" style="width: 75%;" >
    <img src="${eventDescription.image}" class="card-img-top" alt="special-events" style="width: 100%; height: 100%;">
    </div>
    `}
