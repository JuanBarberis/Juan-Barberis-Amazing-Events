
const homeTarjet = document.querySelector(".tarjet")

for (let item of data.events) {
    homeTarjet.innerHTML += `
        <div class="card text-center m-3" style="width: 18rem;">
            <img src=${item.image} class="card-img-top" alt="costume_party">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.category}</p>
                    <div class="price-descption">
                        <p class="card-text ms-2">Prices:${item.price}</p>
                        <a href="./assets/description.html" class="btn btn-outline-danger">Description</a>
                    </div>
                </div>
        </div> `
}