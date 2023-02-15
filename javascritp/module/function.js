
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
                <img src=${item.image} class="card-img-top" alt="${item.name}">
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
export function insertEvent(eventsArray, element) {
  for (let item of eventsArray) {
    element.innerHTML += `
    <div class="card text-center m-3" style="width: 18rem;">
                <img src=${item.image} class="card-img-top" alt="${item.name}">
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
  console.log(categories)
  
  console.log(data)
  
  
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
    if (results.length === 0) {
      insertNotResult(element)
    } else {
      insertEvents(results, element)
    }

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
    if (results.length === 0) {
      insertNotResult(element)
    } else {
      insertEvents(results, element)
    }
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
    if (results.length === 0) {
      insertNotResult(element)
    } else {
      insertEvents(results, element)
    }
    
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
    if (results.length === 0) {
      insertNotResult(element)
    } else {
      insertEvents(results, element)
    }
  }
}
export function insertNotResult(element) {
  element.innerHTML += `
  <p>Not results Found </p>
  `
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
  
  export function eventStatitics(element1, element2, element3, where) {
    where.innerHTML += `
    <tr>
      <td>${element1.name}  ${element1.assistance.toFixed(2)}%</td>
      <td>${element2.name}  ${element2.assistance.toFixed(2)}%</td>
      <td>${element3.name}  ${element3.capacity}</td>
    </tr>
    `
}

  export function statsFilter(array, where) {
    let categories = {}


    for (let item of array) {
        if (categories[item.category]) {
            categories[item.category].push(item)

        } else {
            categories[item.category] = [item]
        }
    }
    where.innerHTML += `
    <tbody>
        <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Porcentage of attendance</td>
        </tr>
    </tbody>
    `

    for (let item of Object.values(categories)) {


        let name
        let revenues = 0
        let assistance = 0


        for (let event of item) {
            name = event.category
            revenues += (event.estimate ? event.estimate : event.assistance) * event.price
            assistance += ((event.estimate ? event.estimate : event.assistance) * 100) / event.capacity
        }
        assistance = (assistance / item.length).toFixed(2)
        where.innerHTML += `
        <tbody>
          <tr>
            <td>${name}</td>
            <td> $ ${revenues}</td>
            <td>${assistance} % </td>
          </tr>
        </tbody>
        `
    }
}

