const eventsData = data.events
const params = new URLSearchParams(location.search)
const id = params.get( "event" )
const eventDescription = eventsData.find(event => event._id === id)
const container = document.getElementById(`description`)


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
`


